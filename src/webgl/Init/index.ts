import GLC from "webgl/GLCommander";
import ModelRenderer from "webgl/Render/ModelRenderer";
import ModelType from "webgl/Models/ModelType";
import ModelInstance from "webgl/Models/ModelInstance";

export default (id: string) => {
  const canvas = document.querySelector(`#${id}`);

  if (!canvas) {
    return;
  }

  const gl = (canvas as HTMLCanvasElement).getContext(`webgl`);

  if (!gl) {
    return;
  }

  GLC.init(gl);

  const vertices = [0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0];

  const indices = [0, 1, 2];

  const ModelRender = new ModelRenderer();
  ModelRender.registerNewModel(new ModelType(vertices, indices), "triangle");
  const instance = new ModelInstance(0, 0, 0, 0, 0, 0, 1.0);
  ModelRender.addInstance(instance, "triangle");

  const render = () => {
    GLC.clear(1.0, 1.0, 1.0, 1.0);
    instance.updateRotation(0.5, 0.5, 0.5);
    ModelRender.render();
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);
};
