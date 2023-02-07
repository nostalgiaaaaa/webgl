import Locatoins from "./locations";

export default `
    precision mediump float;
    attribute vec3 ${Locatoins.POSITION};
    attribute vec3 ${Locatoins.NORMAL};

    varying vec3 surfaceNormal;
    varying vec3 lightVector;
    varying vec3 pass_lightColor;
    varying float pass_lightAmbient;

    uniform mat4 transformationMatrix;
    uniform vec3 lightPosition;
    uniform vec3 lightColor;
    uniform float lightAmbient;

    void main(void) {
        vec4 worldPos = transformationMatrix * vec4(${Locatoins.POSITION}, 1.0);
        surfaceNormal = (transformationMatrix * vec4(${Locatoins.NORMAL}, 0.0)).xyz;
        lightVector = lightPosition - worldPos.xyz;
        gl_Position = worldPos;

        pass_lightColor = lightColor;
        pass_lightAmbient = lightAmbient;
    }
`;
