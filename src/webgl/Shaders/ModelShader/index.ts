import GLC from "webgl/GLCommander";
import VertexSource from "webgl/Shaders/ModelShader/vertex";
import FragmentSource from "webgl/Shaders/ModelShader/fragment";
import Locations from "webgl/Shaders/ModelShader/locations";

export default class ModelShader {
  positionAttribute: any;
  program: any;
  transformationMatrix: any;
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
    this.transformationMatrix = GLC.getUniformLocation(
      program,
      "transformationMatrix"
    );

    this.program = program;
  }

  use = () => {
    GLC.useProgram(this.program);
  };

  enablePosition = () => {
    GLC.enableVertexAttribArray(this.positionAttribute);
    GLC.pointToAttribute(this.positionAttribute, 3);
  };

  enableTransformationMatrix = (matrix: Iterable<number>) => {
    GLC.upLoadMatrix4fv(this.transformationMatrix, matrix);
  };
}
