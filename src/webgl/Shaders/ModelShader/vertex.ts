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
    uniform mat3 lightPosition;
    uniform mat3 lightColor;
    uniform mat3 lightAmbient;

    void main(void) {
        vec4 worldPos = gl_Position = transformationMatrix * vec4(${Locatoins.POSITION}, 1.0);
        surfaceNormal = (transformationMatrix * vec4(${Locatoins.NORMAL}, 0.0)).xyz;
        lightVector = lightPosition = worlePos.xyz;
        gl_Position = worldPos;

        pass_lightColor = lightColor;
        pass_lightAmbient = lightAmbient;
    }
`;
