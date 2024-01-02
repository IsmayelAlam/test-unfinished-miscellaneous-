import * as THREE from "three";
import Debug from "./Debug";
import Resources from "./Resources";
import Sizes from "./Sizes";
import Time from "./Time";

export default class Utils {
  constructor(_canvas) {
    if (instance) return instance;
    instance = this;

    // global access
    window.experience = this;

    // canvas
    this.canvas = _canvas;

    // setup
  }

  debug = new Debug();
  size = new Sizes();
  time = new Time();
  resources = new Resources(sources);
  scene = new THREE.Scene();
}
