import GLC from "webgl/GLCommander";
import VertexSource from "webgl/Shaders/ModelShader/vertex";
import FragmentSource from "webgl/Shaders/ModelShader/fragment";
import Locations from "webgl/Shaders/ModelShader/locations";

export default class ModelShader {
  positionAttribute: number | undefined;
  normalAttribute: number | undefined;
  program: any;
  transformationMatrix: any;
  lightPosition!: WebGLUniformLocation | null;
  lightColor!: WebGLUniformLocation | null;
  lightAmbient!: WebGLUniformLocation | null;
  constructor() {
    const vertexShader = GLC.createVertexShader();
    if (!vertexShader) return;
    GLC.addShaderSource(vertexShader, VertexSource);
    GLC.compileShader(vertexShader);

    const fragmentShader = GLC.createFragmentShader();
    if (!fragmentShader) return;
    GLC.addShaderSource(fragmentShader, FragmentSource);
    GLC.compileShader(fragmentShader);

    const program = GLC.createShaderProgram();
    if (!program) return;
    GLC.attachShaderToProgram(program, vertexShader);
    GLC.attachShaderToProgram(program, fragmentShader);
    GLC.linkProgram(program);

    this.positionAttribute = GLC.getAttribLocation(program, Locations.POSITION);
    this.normalAttribute = GLC.getAttribLocation(program, Locations.NORMAL);
    this.transformationMatrix = GLC.getUniformLocation(
      program,
      "transformationMatrix"
    );
    this.lightPosition = GLC.getUniformLocation(program, "lightPosition");
    this.lightColor = GLC.getUniformLocation(program, "lightColor");
    this.lightAmbient = GLC.getUniformLocation(program, "lightAmbient");

    this.program = program;
  }

  use = () => {
    GLC.useProgram(this.program);
  };

  enablePosition = () => {
    GLC.enableVertexAttribArray(this.positionAttribute as number);
    GLC.pointToAttribute(this.positionAttribute as number, 3);
  };

  enableNormals = () => {
    GLC.enableVertexAttribArray(this.normalAttribute as number);
    GLC.pointToAttribute(this.normalAttribute as number, 3);
  };

  enableTransformationMatrix = (matrix: Iterable<number>) => {
    GLC.upLoadMatrix4fv(this.transformationMatrix, matrix);
  };

  enableLight = (light: {
    getPosition: () => any;
    getColor: () => any;
    getAmbient: () => any;
  }) => {
    GLC.upLoadvec3f(this.lightPosition, light.getPosition());
    GLC.upLoadvec3f(this.lightColor, light.getColor());
    GLC.uploadFloat(this.lightAmbient, light.getAmbient());
  };
}
