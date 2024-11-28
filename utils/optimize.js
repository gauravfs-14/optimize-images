import fs from "fs";
import path from "path";
import sharp from "sharp";
import chokidar from "chokidar";
import ora from "ora";

export async function optimizeImages(inputDir, outputDir, options) {
  const { quality, format, width, height, report } = options;
  const parsedQuality = parseInt(quality, 10); // Ensure quality is a number
  const validFormats = ["jpeg", "png", "webp", "avif"]; // Supported formats
  const reportData = [];

  if (isNaN(parsedQuality) || parsedQuality < 1 || parsedQuality > 100) {
    console.error("Error: Quality must be an integer between 1 and 100.");
    return;
  }

  if (!validFormats.includes(format)) {
    console.error(`Error: Unsupported format '${format}'. Use one of: ${validFormats.join(", ")}`);
    return;
  }

  try {
    const spinner = ora("Optimizing images...").start();

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const processDirectory = async (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const entryPath = path.join(dir, entry.name);
        const outputFileName = `${path.basename(entryPath, path.extname(entryPath))}.${format}`;
        const outputEntryPath = path.join(
          outputDir,
          path.relative(inputDir, path.join(path.dirname(entryPath), outputFileName))
        );

        if (entry.isDirectory()) {
          if (!fs.existsSync(outputEntryPath)) {
            fs.mkdirSync(outputEntryPath, { recursive: true });
          }
          await processDirectory(entryPath);
        } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
          const originalSize = fs.statSync(entryPath).size;

          console.log(`Processing file: ${entryPath}`);
          console.log(`Output file: ${outputEntryPath}`);

          await sharp(entryPath)
            .resize(
              width ? parseInt(width, 10) : null,
              height ? parseInt(height, 10) : null,
              { fit: "inside", withoutEnlargement: true }
            )
            [format]({ quality: parsedQuality })
            .toFile(outputEntryPath);

          const compressedSize = fs.statSync(outputEntryPath).size;

          if (report) {
            reportData.push({
              file: path.relative(inputDir, entryPath),
              originalSize,
              compressedSize,
            });
          }
        } else {
          console.log(`Skipping non-image file: ${entry.name}`);
        }
      }
    };

    await processDirectory(inputDir);

    spinner.succeed("Image optimization complete!");

    if (report) {
      console.log("\nOptimization Report:");
      reportData.forEach(({ file, originalSize, compressedSize }) => {
        console.log(`${file}: ${originalSize} → ${compressedSize}`);
      });
    }
  } catch (error) {
    console.error("Error during image optimization:", error.message);
  }
}

export function watchDirectory(inputDir, outputDir, options) {
  const watcher = chokidar.watch(inputDir, { persistent: true });

  watcher.on("add", async (filePath) => {
    console.log(`New file detected: ${filePath}`);
    await optimizeImages(inputDir, outputDir, options);
  });

  watcher.on("change", async (filePath) => {
    console.log(`File modified: ${filePath}`);
    await optimizeImages(inputDir, outputDir, options);
  });

  watcher.on("unlink", (filePath) => {
    console.log(`File removed: ${filePath}`);
  });
}
