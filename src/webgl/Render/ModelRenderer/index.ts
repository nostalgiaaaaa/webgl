import GLC from "webgl/GLCommander";
import ModelType from "webgl/Models/ModelType";
import ModelShader from "webgl/Shaders/ModelShader";

export default class ModelRenderer {
  shader: ModelShader;
  models: any;

  constructor() {
    this.shader = new ModelShader();
    this.models = {};
  }

  registerNewModel = (model: ModelType, id: string) => {
    if (!this.models[id]) {
      this.models[id] = {
        type: model,
        instances: [],
      };
    }
  };

  addInstance = (instance: any, id: string) => {
    this.models[id].instances.push(instance);
  };

  preRender = () => {
    GLC.viewPort();
    GLC.depthTest(true);
  };

  render = (light: {
    getPosition: () => any;
    getColor: () => any;
    getAmbient: () => any;
  }) => {
    this.preRender();
    this.shader.use();
    this.shader.enableLight(light);
    Object.keys(this.models).forEach((model) => {
      this.models[model].type.use(this.shader);
      this.models[model].instances.forEach((instance: any) => {
        this.shader.enableTransformationMatrix(
          instance.getTransformationMatrix()
        );
        GLC.drawTriangles(this.models[model].type.indices.length);
      });
    });
  };
}
