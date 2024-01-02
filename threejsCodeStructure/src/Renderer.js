import * as THREE from "three";

import Experience from "./Experience";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.size = this.experience.size;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = window.experience.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setSize(this.size.width, this.size.height);
    this.instance.setPixelRatio(this.size.pixelRatio);
    this.instance.setClearColor("#211d20");
  }

  resize() {
    this.instance.setSize(this.size.width, this.size.height);
    this.instance.setPixelRatio(this.size.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
