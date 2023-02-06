class GLCommander {
  gl!: WebGLRenderingContext;
  init(gl: WebGLRenderingContext) {
    this.gl = gl;
  }
  clear = (r: number, g: number, b: number, a: number) => {
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  };

  viewPort() {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }
  depthTest(use: boolean) {
    use
      ? this.gl.enable(this.gl.DEPTH_TEST)
      : this.gl.disable(this.gl.DEPTH_TEST);
  }

  createBuffer = () => this.gl.createBuffer();
  // float buffers

  bindArrayBuffer = (vertexBuffer: Iterable<number>) =>
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
  addArrayBufferData = (vertices: Iterable<number>) =>
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      this.gl.STATIC_DRAW
    );

  unbindArrayBuffer = () => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  // int buffers

  bindElementArrayBuffer = (indexBuffer: Iterable<number>) =>
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  addElementArrayBufferData = (indices: Iterable<number>) =>
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      this.gl.STATIC_DRAW
    );
  unbindElementArrayBuffer = () =>
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  // shader functions
  createVertexShader = () => this.gl.createShader(this.gl.VERTEX_SHADER);

  createFragmentShader = () => this.gl.createShader(this.gl.FRAGMENT_SHADER);

  addShaderSource = (shader: WebGLShader, source: string) =>
    this.gl.shaderSource(shader, source);

  compileShader = (shader: WebGLShader) => this.gl.compileShader(shader);

  createShaderProgram = () => this.gl.createProgram();

  attachShaderToProgram = (program: WebGLProgram, shader: WebGLShader) =>
    this.gl.attachShader(program, shader);

  linkProgram = (program: WebGLProgram) => this.gl.linkProgram(program);

  useProgram = (program: WebGLProgram) => this.gl.useProgram(program);

  getAttribLocation = (program: WebGLProgram, attribute: string) =>
    this.gl.getAttribLocation(program, attribute);

  enableVertexAttribArray = (positionAttribute: number) =>
    this.gl.enableVertexAttribArray(positionAttribute);

  pointToAttribute = (data: number, dimensions: number) =>
    this.gl.vertexAttribPointer(data, dimensions, this.gl.FLOAT, false, 0, 0);

  drawTriangles = (noOfIndices: number) =>
    this.gl.drawElements(
      this.gl.TRIANGLES,
      noOfIndices,
      this.gl.UNSIGNED_SHORT,
      0
    );

  upLoadMatrix4fv = (
    location: WebGLUniformLocation,
    matrix: Iterable<number>
  ) => this.gl.uniformMatrix4fv(location, false, matrix);

  getUniformLocation = (program: WebGLProgram, uniform: string) =>
    this.gl.getUniformLocation(program, uniform);
}

const GLC = new GLCommander();

export default GLC;
