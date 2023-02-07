import { createTransformationMatrix } from "webgl/Utils/maths";

export default class ModelInstance {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  scale: number;
  transformationMatrix: any;
  constructor(
    x: number,
    y: number,
    z: number,
    rx: number,
    ry: number,
    rz: number,
    scale: number
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this.scale = scale;
  }

  updateRotation = (rx: number, ry: number, rz: number) => {
    this.rx += rx;
    this.ry += ry;
    this.rz += rz;
    this.updateTransformationMatrix();
  };

  updateTransformationMatrix = () => {
    this.transformationMatrix = createTransformationMatrix(
      this.x,
      this.y,
      this.z,
      this.rx,
      this.ry,
      this.rz,
      this.scale
    );
  };

  getTransformationMatrix = () => this.transformationMatrix;
}
