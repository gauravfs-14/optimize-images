import fs from "fs";
import path from "path";
import sharp from "sharp";
import chokidar from "chokidar";
import ora from "ora";

export async function optimizeImages(inputDir, outputDir, options) {
  const { quality, format, width, height, report } = options;
  const parsedQuality = parseInt(quality, 10);
  const validFormats = ["jpeg", "png", "webp", "avif"]; // Supported formats
  const reportData = [];

  if (isNaN(parsedQuality) || parsedQuality < 1 || parsedQuality > 100) {
    console.error("Error: Quality must be an integer between 1 and 100.");
    return;
  }

  if (format && !validFormats.includes(format)) {
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

        // Determine file format and target output path
        const inputFileFormat = path.extname(entry.name).slice(1).toLowerCase();
        const outputFileFormat = format || inputFileFormat; // Use specified format or preserve original
        const outputFileName = `${path.basename(entry.name, path.extname(entry.name))}.${outputFileFormat}`;
        const outputEntryPath = path.join(outputDir, path.relative(inputDir, entryPath));

        // Correct path for files (preserving directory structure)
        const correctedOutputPath = path.join(path.dirname(outputEntryPath), outputFileName);

        if (entry.isDirectory()) {
          // Create corresponding subdirectory in the output folder
          if (!fs.existsSync(outputEntryPath)) {
            fs.mkdirSync(outputEntryPath, { recursive: true });
          }
          await processDirectory(entryPath);
        } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
          const originalSize = fs.statSync(entryPath).size;

          console.log(`Processing file: ${entryPath}`);
          console.log(`Output file: ${correctedOutputPath}`);

          // Ensure parent directory exists for the output file
          const parentDir = path.dirname(correctedOutputPath);
          if (!fs.existsSync(parentDir)) {
            fs.mkdirSync(parentDir, { recursive: true });
          }

          // Process and save the image
          const imageProcessor = sharp(entryPath).resize(
            width ? parseInt(width, 10) : null,
            height ? parseInt(height, 10) : null,
            { fit: "inside", withoutEnlargement: true }
          );

          if (format) {
            imageProcessor[format]({ quality: parsedQuality });
          } else {
            imageProcessor.toFormat(inputFileFormat, { quality: parsedQuality });
          }

          await imageProcessor.toFile(correctedOutputPath);

          const compressedSize = fs.statSync(correctedOutputPath).size;

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
