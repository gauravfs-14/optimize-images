# **Optimize Images CLI**

**Optimize Images CLI** is a powerful and flexible command-line tool for compressing, resizing, and converting images. It supports modern image formats like WebP and AVIF, making it easy to optimize images for web and app development.

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

## 💬 **Feedback and Support**
If you encounter any issues or have suggestions, feel free to open an issue on GitHub or contact at [contact@gaurabchhetri.com.np](mailto:contact@gaurabchhetri.com.np).
