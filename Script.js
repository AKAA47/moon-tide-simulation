// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('simulationCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Adding Earth
const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Adding the Moon
const moonGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(10, 0, 0);
scene.add(moon);

camera.position.z = 20;

// Interactivity: Dragging the Moon
let isDragging = false;

document.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        moon.position.x = x * 15;
        earth.scale.set(1 + Math.abs(x / 10), 1, 1); // Simulate tide effect
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
