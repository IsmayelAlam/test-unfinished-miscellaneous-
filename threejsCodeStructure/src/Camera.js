import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Experience from "./Experience";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.size = this.experience.size;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.size.width / this.size.height,
      0.01,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.control = new OrbitControls(this.instance, this.canvas);
    this.control.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.size.width / this.size.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.control.update();
  }
}
