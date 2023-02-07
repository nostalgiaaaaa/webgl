import GLC from "webgl/GLCommander";
import ModelShader from "webgl/Shaders/ModelShader";

export default class ModelType {
  vertices: Iterable<number>;
  indices: Iterable<number>;
  normals!: Iterable<number>;
  vertexBuffer!: WebGLBuffer | null;
  indexBuffer!: WebGLBuffer | null;
  normalBuffer!: WebGLBuffer | null;

  constructor(vertices: any, indices: any, normals: any) {
    this.vertices = vertices;
    this.indices = indices;
    this.normals = normals;
    this._genVertexBuffer();
    this._genIndexBuffer();
    this._genNormalBuffer();
  }

  _genNormalBuffer() {
    this.normalBuffer = GLC.createBuffer();
    GLC.bindArrayBuffer(this.normalBuffer);
    GLC.addArrayBufferData(this.normals);
    GLC.unbindArrayBuffer();
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

  use = (shader: ModelShader) => {
    GLC.bindArrayBuffer(this.vertexBuffer);
    shader.enablePosition();
    GLC.bindArrayBuffer(this.normalBuffer);
    shader.enableNormals();
    GLC.bindElementArrayBuffer(this.indexBuffer);
  };
}
