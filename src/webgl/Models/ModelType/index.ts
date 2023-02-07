import ModelShader from "webgl/Shaders/ModelShader";
import GLC from "../../GLCommander";
import Material from "../../Materials/material";

export default class ModelType {
  vertices: Iterable<number>;
  indices: Iterable<number>;
  normals: Iterable<number>;
  textureCoords: Iterable<number>;
  material: Material;
  textureCoordBuffer!: WebGLBuffer | null;
  normalBuffer!: WebGLBuffer | null;
  vertexBuffer!: WebGLBuffer | null;
  indexBuffer!: WebGLBuffer | null;
  constructor(
    vertices: Iterable<number>,
    indices: Iterable<number>,
    normals: Iterable<number>,
    textureCoords: Iterable<number>
  ) {
    this.vertices = vertices;
    this.indices = indices;
    this.normals = normals;
    this.textureCoords = textureCoords;
    this._genTextureCoordBuffer();
    this._genVertexBuffer();
    this._genIndexBuffer();
    this._genNormalBuffer();
    this.material = new Material();
  }

  _genTextureCoordBuffer = () => {
    this.textureCoordBuffer = GLC.createBuffer();
    GLC.bindArrayBuffer(this.textureCoordBuffer);
    GLC.addArrayBufferData(this.textureCoords);
    GLC.unbindArrayBuffer();
  };

  _genNormalBuffer = () => {
    this.normalBuffer = GLC.createBuffer();
    GLC.bindArrayBuffer(this.normalBuffer);
    GLC.addArrayBufferData(this.normals);
    GLC.unbindArrayBuffer();
  };

  _genVertexBuffer = () => {
    this.vertexBuffer = GLC.createBuffer();
    GLC.bindArrayBuffer(this.vertexBuffer);
    GLC.addArrayBufferData(this.vertices);
    GLC.unbindArrayBuffer();
  };

  _genIndexBuffer = () => {
    this.indexBuffer = GLC.createBuffer();
    GLC.bindElementArrayBuffer(this.indexBuffer);
    GLC.addElementArrayBufferData(this.indices);
    GLC.unbindElementArrayBuffer();
  };

  addMaterial = (material: Material) => {
    this.material = material;
  };

  use = (shader: ModelShader) => {
    GLC.bindArrayBuffer(this.vertexBuffer);
    shader.enablePosition();
    GLC.bindArrayBuffer(this.textureCoordBuffer);
    shader.enableTextureCoords();
    GLC.bindArrayBuffer(this.normalBuffer);
    shader.enableNormals();
    GLC.bindElementArrayBuffer(this.indexBuffer);
    this.material.enable(shader);
  };
}
