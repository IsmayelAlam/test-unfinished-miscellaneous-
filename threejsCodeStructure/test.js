import * as THREE from "three";
// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create objects
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Position objects
cube.position.x = -2;
sphere.position.x = 2;

// Add objects to the scene
scene.add(cube);
scene.add(sphere);

// Create a stencil material
const stencilMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  stencilWrite: true,
  stencilFunc: THREE.AlwaysStencilFunc,
  stencilRef: 0,
  stencilFuncMask: 0xff,
  stencilFail: THREE.ReplaceStencilOp,
  stencilZFail: THREE.ReplaceStencilOp,
  stencilZPass: THREE.ReplaceStencilOp,
});

// Create a mask geometry
const maskGeometry = new THREE.BoxGeometry(2, 2, 2);
const maskMesh = new THREE.Mesh(maskGeometry, stencilMaterial);
scene.add(maskMesh);

// Enable the stencil test for the mask
maskMesh.renderOrder = 0;
maskMesh.onBeforeRender = function (renderer) {
  renderer.clearStencil();
};

// Set up cube and sphere to be masked
cube.renderOrder = 1;
sphere.renderOrder = 1;

// Enable the stencil test for the cube and sphere
cube.onBeforeRender = function (renderer) {
  renderer.setStencilTest(true);
};

sphere.onBeforeRender = function (renderer) {
  renderer.setStencilTest(true);
};

// Render loop
const animate = function () {
  requestAnimationFrame(animate);

  // Rotate objects
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

// Run the animation loop
animate();
