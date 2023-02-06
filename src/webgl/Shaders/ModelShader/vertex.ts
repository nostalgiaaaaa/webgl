import Locatoins from "./locations";

export default `
    precision mediump float;
    attribute vec3 ${Locatoins.POSITION};
    varying vec3 color;
    uniform mat4 transformationMatrix;

    void main(void) {
        color = ${Locatoins.POSITION};
        gl_Position = transformationMatrix * vec4(${Locatoins.POSITION}, 1.0);
    }
`;
