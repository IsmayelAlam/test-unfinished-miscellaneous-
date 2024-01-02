import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = innerWidth;
    this.height = innerHeight;
    this.pixelRatio = Math.min(devicePixelRatio, 3);

    addEventListener("resize", () => {
      this.width = innerWidth;
      this.height = innerHeight;
      this.pixelRatio = Math.min(devicePixelRatio, 3);

      this.trigger("resize");
    });
  }
}
