# 🔮 Glass UI Generator

**A free, open-source visual tool to create beautiful glassmorphism CSS effects with live preview and one-click copy.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-brightgreen?style=flat-square)

---

## ✨ Features

- 🎛️ **Real-time Preview** — See your glassmorphism effect update instantly as you adjust controls
- 📋 **One-Click Copy** — Copy generated CSS, Tailwind classes, or a full HTML example
- 🎨 **6 Ready-to-Use Presets** — Start with a preset and customize from there
- 🌈 **6 Background Options** — Test your glass effect on different gradient backgrounds
- 📱 **Fully Responsive** — Works perfectly on desktop, tablet, and mobile
- 🚀 **Zero Dependencies** — Pure HTML, CSS, and JavaScript. No build tools, no npm, no frameworks
- 🌐 **Works Offline** — Just open `index.html` in your browser

## 🎛️ Adjustable Properties

| Property | Range | Description |
|---|---|---|
| **Blur** | 0 – 40px | Controls the frosted glass blur intensity |
| **Background Opacity** | 0 – 1.00 | Transparency of the glass background |
| **Saturation** | 100% – 300% | Color saturation of the backdrop |
| **Background Color** | Any color | The tint color of the glass |
| **Border Radius** | 0 – 50px | Corner roundness of the glass element |
| **Border Opacity** | 0 – 1.00 | Visibility of the glass border |
| **Border Color** | Any color | Color of the glass border |
| **Shadow Blur** | 0 – 80px | Spread of the drop shadow |
| **Shadow Opacity** | 0 – 0.50 | Darkness of the shadow |
| **Padding** | 8 – 60px | Internal spacing of the glass card |

## 🚀 Quick Start

### Option 1: Just Open It
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/glass-ui-generator.git

# Open in browser
open glass-ui-generator/index.html
# or on Windows:
start glass-ui-generator/index.html
```

### Option 2: Use with Live Server
If you have VS Code, install the **Live Server** extension and click "Go Live".

### Option 3: GitHub Pages
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **main branch**
4. Your tool is now live at `https://YOUR_USERNAME.github.io/glass-ui-generator/`

## 📁 Project Structure

```
glass-ui-generator/
├── index.html      # Main HTML — the complete app
├── style.css       # All styles — premium dark theme with animations
├── script.js       # Interactive logic — controls, preview, code generation
├── README.md       # This file
└── LICENSE         # MIT License
```

## 🎨 Output Formats

The generator produces code in **3 formats**:

### CSS
```css
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  padding: 24px;
}
```

### Tailwind CSS
Generates both approximate utility classes and exact arbitrary values.

### HTML
A complete, self-contained HTML page with inline styles — ready to open and see.

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome 76+ | ✅ Full |
| Firefox 103+ | ✅ Full |
| Safari 9+ | ✅ Full (with `-webkit-` prefix) |
| Edge 79+ | ✅ Full |
| IE 11 | ❌ Not supported |

> **Note:** `backdrop-filter` degrades gracefully. On unsupported browsers, the glass effect falls back to a semi-transparent solid background.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this tool for personal and commercial projects.

---

<p align="center">
  Made with ♥ — Open Source & Free Forever
</p>
