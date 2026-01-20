# 🌌 3D Web UI Demo

<div align="center">

![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js)
![WebGL](https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### **Exploring 3D rendering and GPU-powered interactions to expand frontend capabilities beyond traditional UI**

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Contributing](#-contributing)



</div>

---

## 🎯 About This Project

Sebuah **interactive 3D web application** yang membuktikan bahwa frontend development bukan hanya tentang form dan layout. Project ini menggunakan **Three.js** dan **WebGL** untuk menciptakan pengalaman visual yang immersive dengan performa GPU-accelerated.

### **Why This Matters?**

- 🚀 **Beyond 2D UI**: Mengeksplorasi dimensi baru dalam web development
- ⚡ **GPU-Powered**: Memanfaatkan hardware acceleration untuk rendering real-time
- 🎨 **Interactive**: Real-time interaction menggunakan raycasting
- 📚 **Educational**: Cocok untuk belajar fundamental 3D graphics di web
- 💼 **Portfolio-Ready**: Menunjukkan kemampuan teknis yang advanced

---

## ✨ Features

<table>
  <tr>
    <td align="center">
      <img src="https://img.icons8.com/fluency/96/000000/3d-object.png" width="50"/><br/>
      <b>3D Rendering</b><br/>
      <sub>Real-time WebGL graphics</sub>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/96/000000/mouse.png" width="50"/><br/>
      <b>Mouse Interaction</b><br/>
      <sub>Click, hover, zoom controls</sub>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/96/000000/sparkling.png" width="50"/><br/>
      <b>Particle System</b><br/>
      <sub>1000+ animated particles</sub>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/96/000000/color-palette.png" width="50"/><br/>
      <b>Color Picker</b><br/>
      <sub>Real-time color changes</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.icons8.com/fluency/96/000000/settings.png" width="50"/><br/>
      <b>Wireframe Mode</b><br/>
      <sub>Toggle visualization</sub>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/96/000000/rotate.png" width="50"/><br/>
      <b>Auto-Rotate</b><br/>
      <sub>Toggleable animations</sub>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/96/000000/camera.png" width="50"/><br/>
      <b>Screenshots</b><br/>
      <sub>Download PNG captures</sub>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/96/000000/theme.png" width="50"/><br/>
      <b>Scene Presets</b><br/>
      <sub>3 different themes</sub>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Three.js** | 3D rendering library | r128 |
| **WebGL** | GPU-accelerated graphics | 2.0 |
| **JavaScript** | Core logic | ES6+ |
| **CSS3** | Modern styling | - |
| **HTML5** | Structure | - |

---

## 🚀 Installation

### Prerequisites

- Modern browser (Chrome, Firefox, Edge, Safari)
- Text editor (VS Code recommended)
- (Optional) Local server untuk development

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/3d-web-ui-demo.git

# 2. Navigate to project
cd 3d-web-ui-demo

# 3. Open in browser
# Option A: Double-click index.html
# Option B: Use live server
python -m http.server 8000
# or
npx http-server

# 4. Access at http://localhost:8000
```

---

## 🎮 How to Use

| Action | Result |
|--------|--------|
| **Move Mouse** | Camera follows cursor smoothly |
| **Hover Object** | Object scales up (visual feedback) |
| **Click Object** | Select object, shows info panel |
| **Scroll** | Zoom camera in/out (3-15 units) |
| **Color Picker** | Change selected object color |
| **Wireframe Toggle** | Switch between solid/wireframe |
| **Auto-Rotate** | Enable/disable animations |
| **Screenshot** | Download current view as PNG |
| **Scene Preset** | Switch between Space/Neon/Minimal |

---

## 📁 Project Structure

```
3d-web-ui-demo/
│
├── index.html              # Main entry point
├── css/
│   └── style.css          # Glassmorphism UI styling
├── js/
│   └── main.js            # Three.js logic & features
├── assets/
│   └── screenshots/       # Demo images
├── .gitignore
├── README.md
└── package.json           # Project metadata
```

---

## 🧠 Core Concepts Explained

### 1. **Three.js Rendering Pipeline**

```
Scene → Camera → Renderer → Canvas
  ↓
Geometry + Material = Mesh
  ↓
Animation Loop (60 FPS)
```

### 2. **Raycasting for 3D Interaction**

```javascript
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(objects);
// Detects which 3D object mouse is pointing at
```

### 3. **Particle System**

```javascript
// 1000 particles with individual velocities
BufferGeometry + PointsMaterial = Particle System
```

### 4. **GPU Acceleration**

- WebGL communicates directly dengan GPU
- Parallel processing untuk ribuan vertices
- Real-time lighting calculations
- Shadow mapping

---

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| **Target FPS** | 60 FPS |
| **3D Objects** | 8 meshes |
| **Particles** | 1,000 points |
| **Total Polygons** | ~5,000 triangles |
| **Initial Load** | ~550 KB |
| **Runtime Memory** | 30-50 MB |

---

## 🎨 Feature Highlights

### 🌟 1. Particle System
**1000 animated particles** yang bergerak secara independent, menciptakan efek "bintang bergerak" di background.

### 🎨 2. Color Picker
Pilih objek → ubah warnanya secara **real-time** tanpa reload. Material color update instantly.

### 🔲 3. Wireframe Toggle
Switch antara **solid rendering** dan **wireframe mode** untuk melihat struktur polygon objek.

### ⏸️ 4. Auto-Rotate Toggle
**Pause/resume** semua animasi dengan satu klik. Berguna untuk inspect objek secara detail.

### 📸 5. Screenshot Feature
**Download canvas** sebagai PNG file. Capture moment favorit dari scene 3D kamu!

### 🎭 6. Scene Presets
Tiga tema berbeda:
- **🌌 Space**: Dark background, white particles
- **💜 Neon**: Purple cyberpunk vibe
- **⚪ Minimal**: Clean white aesthetic

---

## 🤔 When to Use 3D in Web?

### ✅ Good Use Cases

- **Data Visualization**: 3D charts, spatial data
- **Product Showcase**: E-commerce (furniture, cars)
- **Creative Portfolios**: Wow-factor untuk designers
- **Education**: Anatomy models, physics simulations
- **Gaming**: Browser-based games

### ❌ Not Recommended For

- Form-heavy CRUD apps
- Text-centric content (blogs)
- Accessibility-critical applications
- Low-end device targets

---

## 🔮 Future Roadmap

- [ ] Load external GLTF models
- [ ] Physics engine integration (Cannon.js)
- [ ] Post-processing effects (bloom, DOF)
- [ ] VR mode dengan WebXR API
- [ ] WebGPU support
- [ ] Touch controls untuk mobile
- [ ] Audio-reactive visuals
- [ ] Multiplayer collaboration

---

## 🤝 Contributing

Contributions are **welcome**! Here's how you can help:

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### Contribution Ideas

- Add new 3D objects/shapes
- Implement new scene presets
- Optimize performance
- Improve mobile responsiveness
- Add keyboard shortcuts
- Create tutorial documentation

---

## 📚 Learning Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [The Book of Shaders](https://thebookofshaders.com/)
- [WebGPU Spec](https://www.w3.org/TR/webgpu/)

---

## 🐛 Known Issues

- Mobile performance dapat bervariasi tergantung hardware
- Safari may require WebGL experimental features enabled
- Particles mungkin lag pada low-end devices

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free to use untuk learning, portfolio, dan commercial projects!
```

---

## 👨‍💻 Author

**Your Name**

- 🌐 Portfolio: [yourwebsite.com](https://yourwebsite.com)
- 💼 LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 📧 Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Three.js Team** - For the incredible 3D library
- **WebGL Community** - For comprehensive documentation
- **Icons8** - For beautiful feature icons
- **You** - For checking out this project! ⭐

---

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/3d-web-ui-demo?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/3d-web-ui-demo?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/3d-web-ui-demo?style=social)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Built with ❤️ to push web boundaries beyond forms and buttons**

[⬆ Back to Top](#-3d-web-ui-demo)

</div></parameter>