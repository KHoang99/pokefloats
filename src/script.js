import "./main.css";
import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Stats from "three/examples/jsm/libs/stats.module";

const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
dracoLoader.setDecoderConfig({ type: "js" });
loader.setDRACOLoader(dracoLoader);

const container = document.getElementById("container");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#c8f0f9");
const space = new THREE.TextureLoader().load("images/space.png");
scene.background = space;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.z = 48;
scene.add(camera);

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(2);
});

const controls = new OrbitControls(camera, renderer.domElement);

const ambient = new THREE.AmbientLight(0xa0a0fc, 0.82);
scene.add(ambient);

const sunLight = new THREE.DirectionalLight(0xe8c37b, 1.96);
sunLight.position.set(-69, 44, 14);
scene.add(sunLight);

var loadedModel;
loader.load("models/gltf/pikachu/scene.gltf", function (gltf) {
  loadedModel = gltf.scene;
  gltf.scene.scale.set(0.2, 0.2, 0.2);
  scene.add(gltf.scene);
});

var loadedModel2;
loader.load("models/gltf/isabelle_animal_crossing/scene.gltf", function (gltf) {
  loadedModel2 = gltf.scene;
  gltf.scene.position.y = -40;
  gltf.scene.position.x = -20;
  scene.add(gltf.scene);
});

var loadedModel3;
loader.load("models/gltf/bob/scene.gltf", function (gltf) {
  loadedModel3 = gltf.scene;
  gltf.scene.scale.set(1.2, 1.2, 1.2);
  gltf.scene.position.z = 10;
  gltf.scene.position.y = -10;
  gltf.scene.position.x = -200;
  gltf.scene.rotation.z += -36.3;
  gltf.scene.rotation.y += -59;
  scene.add(gltf.scene);
});

var donut1;
loader.load("models/gltf/donut_2.0/scene.gltf", function (gltf) {
  donut1 = gltf.scene;
  gltf.scene.scale.set(40, 40, 40);
  gltf.scene.position.y = 10;
  gltf.scene.position.z = -10;
  gltf.scene.position.x = 20;
  gltf.scene.rotation.z += 70;
  scene.add(gltf.scene);
});

var donut2;
loader.load("models/gltf/brown_glazed_donut/scene.gltf", function (gltf) {
  donut2 = gltf.scene;
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.y = -10;
  gltf.scene.position.z = 10;
  gltf.scene.position.x = -10;
  gltf.scene.rotation.z += -70;
  scene.add(gltf.scene);
});

function setOrbitControlsLimits() {
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.minDistance = 35;
  controls.maxDistance = 60;
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.maxPolarAngle = Math.PI / 2.5;
}

function rendeLoop() {
  TWEEN.update();
  controls.update();
  if (loadedModel) {
    loadedModel.rotation.y += 0.0025;
    loadedModel.position.x += 0.0069;
    loadedModel.position.y += 0.0069;
  }
  if (loadedModel2) {
    loadedModel2.rotation.y += 0.0025;
    loadedModel2.position.x += 0.013;
    loadedModel2.position.y += 0.013;
  }
  if (loadedModel3) {
    loadedModel3.rotation.x += 0.071;
    loadedModel3.position.x += 0.07;
  }
  if (donut1) {
    donut1.rotation.x += 0.0031;
    donut1.rotation.y += 0.003;
  }
  if (donut2) {
    donut2.rotation.x += 0.0001;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(rendeLoop);
}

rendeLoop();
