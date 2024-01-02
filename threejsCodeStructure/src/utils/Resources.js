import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
  constructor(_sources) {
    super();

    this.sources = _sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfModel = new GLTFLoader();
    this.loaders.texture = new THREE.TextureLoader();
    this.loaders.cubeTexture = new THREE.CubeTextureLoader();
  }

  startLoading() {
    this.sources.map((source) =>
      this.loaders[source.type].load(source.path, (file) =>
        this.sourceLoaded(source, file)
      )
    );
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) this.trigger("ready");
  }
}
