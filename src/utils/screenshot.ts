// src/utils/screenshot.ts
export const captureThumbnail = (
  sourceCanvas: HTMLCanvasElement,
  scale: number = 0.1,
): Promise<string> => {
  return new Promise((resolve) => {
    // 1. Create a temporary canvas for downscaling
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");

    const thumbWidth = sourceCanvas.width * scale;
    const thumbHeight = sourceCanvas.height * scale;

    tempCanvas.width = thumbWidth;
    tempCanvas.height = thumbHeight;

    // 2. Draw and downscale
    if (ctx) {
      // Use high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(sourceCanvas, 0, 0, thumbWidth, thumbHeight);
    }

    // 3. Export as Base64 (or Blob)
    resolve(tempCanvas.toDataURL("image/webp", 0.8));
  });
};

export const downloadImage = (dataUrl: string, filename: string) => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
};
