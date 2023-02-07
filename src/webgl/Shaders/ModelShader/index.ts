import GLC from "../../GLCommander";
import VertexSource from "./vertex";
import FragmentSource from "./fragment";
import Locations from "./locations";

export default class ModelShader {
  positionAttribute!: number;
  textureCoordsAttribute!: number;
  normalAttribute!: number;
  transformationMatrix!: WebGLUniformLocation | null;
  lightPosition!: WebGLUniformLocation | null;
  lightColor!: WebGLUniformLocation | null;
  lightAmbient!: WebGLUniformLocation | null;
  diffuseTexture!: WebGLUniformLocation | null;
  hasDiffuseTexture!: WebGLUniformLocation | null;
  program!: WebGLProgram;
  constructor() {
    const vertexShader = GLC.createVertexShader();
    if (!vertexShader) return;
    GLC.addShaderSource(vertexShader, VertexSource);
    GLC.compileShader(vertexShader);
    this.compileStatus(vertexShader);

    const fragmentShader = GLC.createFragmentShader();
    if (!fragmentShader) return;
    GLC.addShaderSource(fragmentShader, FragmentSource);
    GLC.compileShader(fragmentShader);
    this.compileStatus(fragmentShader);

    const program = GLC.createShaderProgram();
    if (!program) return;
    GLC.attachShaderToProgram(program, vertexShader);
    GLC.attachShaderToProgram(program, fragmentShader);
    GLC.linkProgram(program);

    this.positionAttribute = GLC.getAttribLocation(program, Locations.POSITION);
    this.textureCoordsAttribute = GLC.getAttribLocation(
      program,
      Locations.TEXTURE_COORDS
    );
    this.normalAttribute = GLC.getAttribLocation(program, Locations.NORMAL);
    this.transformationMatrix = GLC.getUniformLocation(
      program,
      Locations.TRANSFORMATION_MATRIX
    );
    this.lightPosition = GLC.getUniformLocation(
      program,
      Locations.LIGHT_POSITION
    );
    this.lightColor = GLC.getUniformLocation(program, Locations.LIGHT_COLOR);
    this.lightAmbient = GLC.getUniformLocation(
      program,
      Locations.LIGHT_AMBIENT
    );
    this.diffuseTexture = GLC.getUniformLocation(
      program,
      Locations.DIFFUSE_TEXTURE
    );
    this.hasDiffuseTexture = GLC.getUniformLocation(
      program,
      Locations.HAS_DIFFUSE_TEXTURE
    );
    this.program = program;
  }

  compileStatus = (shader: WebGLShader) => {
    if (!GLC.gl.getShaderParameter(shader, GLC.gl.COMPILE_STATUS)) {
      console.error(GLC.gl.getShaderInfoLog(shader));
    }
  };

  use = () => {
    GLC.useProgram(this.program);
  };

  enablePosition = () => {
    GLC.enableVertexAttribArray(this.positionAttribute);
    GLC.pointToAttribute(this.positionAttribute, 3);
  };

  enableTextureCoords = () => {
    GLC.enableVertexAttribArray(this.textureCoordsAttribute);
    GLC.pointToAttribute(this.textureCoordsAttribute, 2);
  };

  enableNormals = () => {
    GLC.enableVertexAttribArray(this.normalAttribute);
    GLC.pointToAttribute(this.normalAttribute, 3);
  };

  enableTransformationMatrix = (matrix: Iterable<number>) => {
    if (!this.transformationMatrix) return;
    GLC.uploadMatrix4fv(this.transformationMatrix, matrix);
  };

  enableLight = (light: {
    getPosition: any;
    getColor: any;
    getAmbient: any;
  }) => {
    GLC.uploadVec3f(this.lightPosition, light.getPosition());
    GLC.uploadVec3f(this.lightColor, light.getColor());
    GLC.uploadFloat(this.lightAmbient, light.getAmbient());
  };
}
