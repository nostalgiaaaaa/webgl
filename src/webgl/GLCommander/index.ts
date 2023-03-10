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

  bindArrayBuffer = (vertexBuffer: WebGLBuffer | null) =>
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);

  addArrayBufferData = (vertices: Iterable<number>) =>
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      this.gl.STATIC_DRAW
    );

  unbindArrayBuffer = () => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  // int buffers

  bindElementArrayBuffer = (indexBuffer: WebGLBuffer | null) =>
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

  uploadMatrix4fv = (
    location: WebGLUniformLocation,
    matrix: Iterable<number>
  ) => this.gl.uniformMatrix4fv(location, false, matrix);

  getUniformLocation = (program: WebGLProgram, uniform: string) =>
    this.gl.getUniformLocation(program, uniform);

  uploadVec3f = (location: WebGLUniformLocation | null, vec3: any) =>
    this.gl.uniform3fv(location, vec3);

  uploadFloat = (location: WebGLUniformLocation | null, value: any) =>
    this.gl.uniform1f(location, value);

  createTexture = () => this.gl.createTexture();

  bindTexture = (texture: WebGLTexture | null) =>
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

  activeTexture = (texture: number) =>
    this.gl.activeTexture(this.gl.TEXTURE0 + texture);

  defineTexture = (img: any) =>
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      img
    );

  defineDummyTexture = () =>
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      1,
      1,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255])
    );

  texturePowerOfTwo = () => this.gl.generateMipmap(this.gl.TEXTURE_2D);

  textureNoPowerOfTwo = () => {
    this.gl.texParameterf(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameterf(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameterf(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    );
  };

  uploadInt = (location: WebGLUniformLocation | null, value: number) =>
    this.gl.uniform1i(location, value);
  uploadBool = (location: WebGLUniformLocation | null, value: boolean) =>
    this.gl.uniform1i(location, value ? 1 : 0);
}

const GLC = new GLCommander();

export default GLC;
