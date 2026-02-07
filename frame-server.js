// frame-server.js
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { exec } from "child_process";

const app = express();
const port = 3001;
const outDir = path.join(process.cwd(), "recordings");

app.use(cors());
app.use(express.raw({ type: "image/png", limit: "50mb" }));

// 1. CLEAR FOLDER ON START
// if (fs.existsSync(outDir)) {
//   console.log("🧹 Clearing old frames...");
//   fs.rmSync(outDir, { recursive: true, force: true });
// }
fs.mkdirSync(outDir);

app.post("/save-frame", (req, res) => {
  const frameNum = req.query.frame;
  const fileName = `frame_${frameNum.padStart(4, "0")}.png`;
  fs.writeFileSync(path.join(outDir, fileName), req.body);
  res.send("Saved");
});

// 2. AUTO-STITCH ENDPOINT
app.post("/finish", (req, res) => {
  console.log("🎬 All frames received. Starting FFmpeg...");
  const outputName = `short_${Date.now()}.mp4`;
  const cmd = `ffmpeg -framerate 60 -i recordings/frame_%04d.png -c:v libx264 -crf 15 -pix_fmt yuv420p ${outputName}`;

  exec(cmd, (err) => {
    if (err) {
      console.error("❌ FFmpeg Error:", err);
      return res.status(500).send(err);
    }
    console.log(`✅ Video Ready: ${outputName}`);

    // REMOVE the immediate cleanup logic here.
    // The files will be deleted next time you START a recording
    // by the 'fs.rmSync' at the top of the file.

    res.send({ video: outputName });
  });
});

app.listen(port, () =>
  console.log(`🚀 Pro Server at http://localhost:${port}`),
);
