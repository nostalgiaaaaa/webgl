import GLC from "webgl/GLCommander";
import ModelRenderer from "webgl/Render/ModelRenderer";
import ModelType from "webgl/Models/ModelType";
import ModelInstance from "webgl/Models/ModelInstance";
import Cube from "./cube";
import Light from "webgl/LightSource";
import Material from "webgl/Materials/material";

let raf = 0;

export const init = (id: string) => {
  const canvas = document.querySelector(`#${id}`);

  if (!canvas) {
    return;
  }

  const gl = (canvas as HTMLCanvasElement).getContext(`webgl`);

  if (!gl) {
    return;
  }

  GLC.init(gl);

  const vertices = Cube.vertices;

  const indices = Cube.indices;

  const normals = Cube.normals;

  const textureCoords = Cube.textureCoords;

  const ModelRender = new ModelRenderer();
  const light = new Light(100, 100, -100, 1.0, 1.0, 1.0, 0.4);

  const material = new Material();
  material.addDiffuse(require("../resources/testimage.png"));

  const modelType = new ModelType(vertices, indices, normals, textureCoords);
  modelType.addMaterial(material);

  ModelRender.registerNewModel(modelType, "cube");
  const instance = new ModelInstance(0, 0, 0, 0, 0, 0, 0.5);
  ModelRender.addInstance(instance, "cube");

  const render = () => {
    GLC.clear(1.0, 1.0, 1.0, 1.0);
    instance.updateRotation(0.05, 0.05, 0.05);
    ModelRender.render(light);
    raf = window.requestAnimationFrame(render);
  };

  render();
};

export const clear = () => {
  window.cancelAnimationFrame(raf);
  GLC.clear(1.0, 1.0, 1.0, 1.0);
};
