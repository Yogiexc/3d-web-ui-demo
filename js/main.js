// ===================================
// Global Variables
// ===================================
let scene, camera, renderer, raycaster, mouse;
let objects = [];
let selectedObject = null;
let frameCount = 0;
let lastTime = Date.now();

// NEW: Variables untuk fitur baru
let particles;
let autoRotate = true;
let currentPreset = 'space';

// ===================================
// Initialization Function
// ===================================
function init() {
    // Create Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0e27, 10, 50);

    // Setup Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 8;

    // Setup Renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: true // Untuk screenshot feature
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    const container = document.getElementById('canvas-container');
    container.appendChild(renderer.domElement);

    // Setup Raycaster for Mouse Interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Setup Lighting
    setupLighting();

    // Create 3D Objects
    createObjects();

    // NEW: Create Particle System
    createParticleSystem();

    // Event Listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
    window.addEventListener('wheel', onMouseWheel);

    // NEW: Feature Controls Event Listeners
    setupFeatureControls();

    // Hide loading screen
    document.getElementById('loading').classList.add('hidden');

    // Start animation loop
    animate();
}

// ===================================
// NEW FEATURE 1: Particle System
// ===================================
function createParticleSystem() {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50;
        positions[i + 1] = (Math.random() - 0.5) * 50;
        positions[i + 2] = (Math.random() - 0.5) * 50;

        velocities[i] = (Math.random() - 0.5) * 0.02;
        velocities[i + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.6
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    document.getElementById('particle-count').textContent = particleCount;
}

function updateParticles() {
    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.attributes.velocity.array;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Wrap around bounds
        if (Math.abs(positions[i]) > 25) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 25) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 25) velocities[i + 2] *= -1;
    }

    particles.geometry.attributes.position.needsUpdate = true;
}

// ===================================
// NEW FEATURE 2-6: Feature Controls
// ===================================
function setupFeatureControls() {
    // Color Picker
    const colorPicker = document.getElementById('color-picker');
    colorPicker.addEventListener('input', (e) => {
        if (selectedObject) {
            selectedObject.material.color.set(e.target.value);
        }
    });

    // Wireframe Toggle
    const wireframeToggle = document.getElementById('wireframe-toggle');
    wireframeToggle.addEventListener('change', (e) => {
        objects.forEach(obj => {
            obj.material.wireframe = e.target.checked;
        });
    });

    // Auto Rotate Toggle
    const autoRotateToggle = document.getElementById('auto-rotate-toggle');
    autoRotateToggle.addEventListener('change', (e) => {
        autoRotate = e.target.checked;
    });

    // Screenshot Button
    const screenshotBtn = document.getElementById('screenshot-btn');
    screenshotBtn.addEventListener('click', takeScreenshot);

    // Scene Preset
    const scenePreset = document.getElementById('scene-preset');
    scenePreset.addEventListener('change', (e) => {
        changeScenePreset(e.target.value);
    });
}

// NEW: Screenshot Feature
function takeScreenshot() {
    const link = document.createElement('a');
    link.download = `3d-scene-${Date.now()}.png`;
    link.href = renderer.domElement.toDataURL('image/png');
    link.click();
}

// NEW: Scene Preset Changer
function changeScenePreset(preset) {
    currentPreset = preset;

    switch(preset) {
        case 'space':
            scene.background = null;
            scene.fog = new THREE.Fog(0x0a0e27, 10, 50);
            particles.material.color.set(0xffffff);
            break;
        case 'neon':
            scene.background = new THREE.Color(0x1a0033);
            scene.fog = new THREE.Fog(0x1a0033, 10, 50);
            particles.material.color.set(0xff00ff);
            break;
        case 'minimal':
            scene.background = new THREE.Color(0xf0f0f0);
            scene.fog = new THREE.Fog(0xf0f0f0, 10, 50);
            particles.material.color.set(0x333333);
            break;
    }
}

// ===================================
// Lighting Setup
// ===================================
function setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x667eea, 1, 100);
    pointLight1.position.set(5, 5, 5);
    pointLight1.castShadow = true;
    pointLight1.shadow.mapSize.width = 1024;
    pointLight1.shadow.mapSize.height = 1024;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x764ba2, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);
}

// ===================================
// Create 3D Objects
// ===================================
function createObjects() {
    // Central Rotating Cube
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshStandardMaterial({
        color: 0x667eea,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x667eea,
        emissiveIntensity: 0.1
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.userData = { 
        name: 'Cube', 
        rotationSpeed: 0.01 
    };
    scene.add(cube);
    objects.push(cube);

    // Orbiting Spheres
    for (let i = 0; i < 5; i++) {
        const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: Math.random() * 0xffffff,
            metalness: 0.5,
            roughness: 0.3
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        
        const angle = (i / 5) * Math.PI * 2;
        sphere.position.x = Math.cos(angle) * 4;
        sphere.position.z = Math.sin(angle) * 4;
        sphere.position.y = Math.sin(i) * 2;
        
        sphere.castShadow = true;
        sphere.userData = { 
            name: `Sphere ${i + 1}`, 
            angle: angle,
            orbitSpeed: 0.5 + Math.random() * 0.5,
            initialY: sphere.position.y
        };
        
        scene.add(sphere);
        objects.push(sphere);
    }

    // Torus Knot
    const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x764ba2,
        metalness: 0.8,
        roughness: 0.1,
        wireframe: false
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.y = 3;
    torus.castShadow = true;
    torus.userData = { 
        name: 'Torus Knot', 
        rotationSpeed: 0.005 
    };
    scene.add(torus);
    objects.push(torus);

    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.8, 0);
    const icoMaterial = new THREE.MeshStandardMaterial({
        color: 0xff6b6b,
        metalness: 0.6,
        roughness: 0.4,
        wireframe: true
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(-3, -2, 0);
    icosahedron.userData = { 
        name: 'Icosahedron', 
        rotationSpeed: 0.008 
    };
    scene.add(icosahedron);
    objects.push(icosahedron);

    document.getElementById('object-count').textContent = objects.length;
}

// ===================================
// Window Resize Handler
// ===================================
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===================================
// Mouse Move Handler
// ===================================
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    objects.forEach(obj => {
        if (obj !== selectedObject) {
            obj.scale.set(1, 1, 1);
        }
    });

    if (intersects.length > 0) {
        const hoveredObject = intersects[0].object;
        if (hoveredObject !== selectedObject) {
            hoveredObject.scale.set(1.1, 1.1, 1.1);
        }
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'default';
    }
}

// ===================================
// Mouse Click Handler
// ===================================
function onMouseClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    if (selectedObject) {
        selectedObject.scale.set(1, 1, 1);
    }

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        selectedObject.scale.set(1.3, 1.3, 1.3);
        document.getElementById('selected').textContent = selectedObject.userData.name;
        
        // Update color picker dengan warna objek yang dipilih
        const color = '#' + selectedObject.material.color.getHexString();
        document.getElementById('color-picker').value = color;
    } else {
        selectedObject = null;
        document.getElementById('selected').textContent = 'None';
    }
}

// ===================================
// Mouse Wheel Handler (Zoom)
// ===================================
function onMouseWheel(event) {
    event.preventDefault();
    
    const zoomSpeed = 0.01;
    const minZoom = 3;
    const maxZoom = 15;
    
    camera.position.z += event.deltaY * zoomSpeed;
    camera.position.z = Math.max(minZoom, Math.min(maxZoom, camera.position.z));
}

// ===================================
// Animation Loop
// ===================================
function animate() {
    requestAnimationFrame(animate);

    // FPS Counter
    frameCount++;
    const currentTime = Date.now();
    if (currentTime - lastTime >= 1000) {
        document.getElementById('fps').textContent = frameCount;
        frameCount = 0;
        lastTime = currentTime;
    }

    // Update particles
    updateParticles();

    // Animate objects (only if autoRotate is enabled)
    if (autoRotate) {
        objects.forEach((obj) => {
            if (obj.userData.rotationSpeed) {
                obj.rotation.x += obj.userData.rotationSpeed;
                obj.rotation.y += obj.userData.rotationSpeed;
            }

            if (obj.userData.orbitSpeed) {
                obj.userData.angle += obj.userData.orbitSpeed * 0.01;
                obj.position.x = Math.cos(obj.userData.angle) * 4;
                obj.position.z = Math.sin(obj.userData.angle) * 4;
                obj.position.y = Math.sin(obj.userData.angle * 2) * 2;
            }
        });
    }

    // Smooth camera movement
    const targetX = mouse.x * 2;
    const targetY = -mouse.y * 2;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// ===================================
// Start Application
// ===================================
init();