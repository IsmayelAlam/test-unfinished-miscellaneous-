import Experience from "../Experience";
// import Environment from "./Environment";
// import Floor from "./Floor";
// import Fox from "./Fox";

import * as THREE from "three";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);

    // this.resources.on("ready", () => {
    //   this.fox = new Fox();
    //   // this.floor = new Floor();
    //   this.environment = new Environment();
    // });
  }
  update() {
    // this.fox?.update();
  }
}
