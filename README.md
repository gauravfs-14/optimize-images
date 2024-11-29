# **Optimize Images CLI**

![npm version](https://img.shields.io/npm/v/optimize-images-cli)
![npm downloads](https://img.shields.io/npm/dm/optimize-images-cli)
![license](https://img.shields.io/npm/l/optimize-images-cli)
![GitHub stars](https://img.shields.io/github/stars/gauravfs-14/optimize-images-cli)
![GitHub issues](https://img.shields.io/github/issues/gauravfs-14/optimize-images-cli)


**Optimize Images CLI** is a powerful and flexible command-line tool for compressing, resizing, and converting images. It supports modern image formats like WebP and AVIF, making it easy to optimize images for web and app development.

## 📚 Table of Contents
- [Features](#-features)
- [Installation](#️-installation)
- [Usage](#-usage)
- [Examples](#-examples)
  - [Basic Optimization](#1-basic-optimization)
  - [Convert Images to WebP](#2-convert-images-to-webp)
  - [Resize Images](#3-resize-images)
  - [Generate an Optimization Report](#4-generate-an-optimization-report)
  - [Watch Mode](#5-watch-mode)
- [Directory Structure](#-directory-structure)
- [Requirements](#-requirements)
- [Tips](#-tips)
- [License](#-license)
- [Contributing](#-contributing)
- [Feedback and Support](#-feedback-and-support)


---

## 🚀 **Features**
- Convert images to formats like **JPEG**, **PNG**, **WebP**, and **AVIF**.
- Resize images with custom dimensions while maintaining aspect ratio.
- Recursive optimization for nested directories.
- Watch mode for real-time image optimization.
- Generate detailed optimization reports.

---

## 🛠️ **Installation**
You can install the CLI globally using **npm**:

```bash
npm install -g optimize-images-cli
```

---

## 🔧 **Usage**
Run the CLI with the following basic syntax:
```bash
optimize-images <input> [options]
```

### **Options**
| Option              | Description                                            | Default          |
|---------------------|--------------------------------------------------------|------------------|
| `--output`          | Output directory for optimized images                  | `./optimized`    |
| `--quality <number>`| Image quality (1-100)                                  | `80`             |
| `--format <type>`   | Convert images to a specific format (`jpeg`, `png`, `webp`, `avif`) | Preserves original |
| `--width <number>`  | Maximum width of images                                | No resizing      |
| `--height <number>` | Maximum height of images                               | No resizing      |
| `--watch`           | Watch directory for changes and optimize dynamically   | `false`          |
| `--report`          | Generate a detailed optimization report                | `false`          |

---

## 📖 **Examples**

### **1. Basic Optimization**
Optimize all images in the `./images` directory and save them in `./optimized`:
```bash
optimize-images ./images --output ./optimized --quality 80
```

---

### **2. Convert Images to WebP**
Convert all images to the WebP format:
```bash
optimize-images ./images --output ./optimized --format webp
```

---

### **3. Resize Images**
Resize images to fit within a maximum of 800x600 pixels:
```bash
optimize-images ./images --output ./optimized --width 800 --height 600
```

---

### **4. Generate an Optimization Report**
Generate a report showing original and optimized file sizes:
```bash
optimize-images ./images --output ./optimized --quality 75 --report
```

---

### **5. Watch Mode**
Monitor a directory for changes and optimize images dynamically:
```bash
optimize-images ./images --output ./optimized --watch
```

---

## 🌲 **Directory Structure**
The tool preserves the original directory structure in the output folder. For example:

**Input Directory:**
```
images/
├── photo1.jpg
├── photo2.png
└── nested/
    └── photo3.jpeg
```

**Output Directory:**
```
optimized/
├── photo1.webp
├── photo2.webp
└── nested/
    └── photo3.webp
```

---

## 🧰 **Requirements**
- **Node.js** (v14.0.0 or higher)
- NPM (v7.0.0 or higher)

---

## 💡 **Tips**
- Use the `--watch` option for real-time optimization during development.
- Combine resizing (`--width`, `--height`) with format conversion (`--format`) for maximum optimization.

## ⚠️ Troubleshooting

### "Command not found"
If you encounter this error, make sure the CLI is installed globally:
```bash
npm install -g optimize-images-cli
```

---

## 📜 **License**
This project is licensed under the [MIT License](LICENSE).

---

## 🤝 **Contributing**
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## 🚀 Roadmap
Here are some planned features for future releases:
- Support for **GIF** and **TIFF** formats.
- Multi-threaded optimization for faster performance.
- Export logs to a file with `--log` option.
- Config file support for default options (`optimize-images.config.json`).

Feel free to suggest new features by [opening an issue](https://github.com/gauravfs-14/optimize-images-cli/issues).


## 💬 **Feedback and Support**
If you encounter any issues or have suggestions, feel free to open an issue on GitHub or contact at [contact@gaurabchhetri.com.np](mailto:contact@gaurabchhetri.com.np).

## 🔒 Security
If you find any security issues, please report them responsibly by contacting [contact@gaurabchhetri.com.np](mailto:contact@gaurabchhetri.com.np). We will address them promptly.

## ❤️ Support
If you like this project and want to support its development, consider:
- ⭐ Starring this repository on GitHub.
- ☕ [Buying me a coffee](https://www.buymeacoffee.com/gaurabch).
- 💬 Sharing this tool with your network.

Your support keeps this project alive and growing!