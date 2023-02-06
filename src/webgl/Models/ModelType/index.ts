import GLC from "webgl/GLCommander";

export default class ModelType {
  vertices: any;
  indices: any;
  vertexBuffer: any;
  indexBuffer: any;
  constructor(vertices: any, indices: any) {
    this.vertices = vertices;
    this.indices = indices;
    this._genVertexBuffer();
    this._genIndexBuffer();
  }

  _genVertexBuffer() {
    this.vertexBuffer = GLC.createBuffer();
    GLC.bindArrayBuffer(this.vertexBuffer);
    GLC.addArrayBufferData(this.vertices);
    GLC.unbindArrayBuffer();
  }
  _genIndexBuffer() {
    this.indexBuffer = GLC.createBuffer();
    GLC.bindElementArrayBuffer(this.indexBuffer);
    GLC.addElementArrayBufferData(this.indices);
    GLC.unbindElementArrayBuffer();
  }

  use = (shader: any) => {
    GLC.bindArrayBuffer(this.vertexBuffer);
    shader.enablePosition();
    GLC.bindElementArrayBuffer(this.indexBuffer);
  };
}
