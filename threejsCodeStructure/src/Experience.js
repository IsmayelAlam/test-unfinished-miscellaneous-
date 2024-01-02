import * as THREE from "three";

import Camera from "./Camera";
import Renderer from "./Renderer";
import sources from "./sources";
import Debug from "./utils/Debug";
import Resources from "./utils/Resources";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import World from "./world";

let instance = null;

export default class Experience {
  constructor(_canvas) {
    if (instance) return instance;
    instance = this;

    // global access
    window.experience = this;

    // canvas
    this.canvas = _canvas;

    // setup
    this.debug = new Debug();
    this.size = new Sizes();
    this.time = new Time();
    this.resources = new Resources(sources);
    this.scene = new THREE.Scene();

    this.world = new World();
    this.camera = new Camera();
    this.renderer = new Renderer();

    // update on event
    this.size.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.world.update();
    this.camera.update();
    this.renderer.update();
  }

  destroy() {
    this.size.off("resize");
    this.time.off("tick");

    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.control.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
