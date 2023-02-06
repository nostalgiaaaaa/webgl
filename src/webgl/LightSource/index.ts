import { vec3 } from "gl-matrix";

export default class Light {
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
  ambient: number;
  transformationMatrix: any;
  constructor(
    x: number,
    y: number,
    z: number,
    r: number,
    g: number,
    b: number,
    ambient: number
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.g = g;
    this.b = b;
    this.ambient = ambient;
  }

  getPosition = () => vec3.fromValues(this.x, this.y, this.z);
  getColor = () => vec3.fromValues(this.r, this.g, this.b);
  getAmbient = () => this.ambient;
}
