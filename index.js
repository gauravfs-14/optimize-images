#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import fs from "fs";
import { optimizeImages, watchDirectory } from "./utils/optimize.js";

program
  .name("optimize-images")
  .description("CLI tool for compressing and optimizing images")
  .version("1.0.0");

program
  .argument("<input>", "Input directory containing images")
  .option("-o, --output <directory>", "Output directory", "./optimized")
  .option("-q, --quality <number>", "Quality level (1-100)", "80")
  .option("--format <type>", "Output format (jpeg, png, webp, avif)", "jpeg")
  .option("--width <number>", "Max width of images")
  .option("--height <number>", "Max height of images")
  .option("--watch", "Watch the input directory for changes")
  .option("--report", "Generate optimization report");

program.action((input, options) => {
  const inputDir = path.resolve(input);
  const outputDir = path.resolve(options.output);

  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory does not exist: ${inputDir}`);
    process.exit(1);
  }

  if (options.watch) {
    console.log(`Watching ${inputDir} for changes...`);
    watchDirectory(inputDir, outputDir, options);
  } else {
    optimizeImages(inputDir, outputDir, options);
  }
});

program.parse(process.argv);
