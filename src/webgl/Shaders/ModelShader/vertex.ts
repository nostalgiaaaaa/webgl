// import Locatoins from "./locations";

// export default `
//     precision mediump float;
//     attribute vec3 ${Locatoins.POSITION};
//     varying vec3 color;
//     uniform mat4 transformationMatrix;

//     void main(void) {
//         color = ${Locatoins.POSITION};
//         gl_Position = transformationMatrix * vec4(${Locatoins.POSITION}, 1.0);
//     }
// `;

// import Locatoins from "./locations";

// export default `
//     precision mediump float;
//     attribute vec3 ${Locatoins.POSITION};
//     attribute vec3 ${Locatoins.NORMAL};

//     varying vec3 surfaceNormal;
//     varying vec3 lightVector;
//     varying vec3 pass_lightColor;
//     varying float pass_lightAmbient;

//     uniform mat4 transformationMatrix;
//     uniform vec3 lightPosition;
//     uniform vec3 lightColor;
//     uniform float lightAmbient;

//     void main(void) {
//         vec4 worldPos = transformationMatrix * vec4(${Locatoins.POSITION}, 1.0);
//         surfaceNormal = (transformationMatrix * vec4(${Locatoins.NORMAL}, 0.0)).xyz;
//         lightVector = lightPosition - worldPos.xyz;
//         gl_Position = worldPos;

//         pass_lightColor = lightColor;
//         pass_lightAmbient = lightAmbient;
//     }
// `;

import Locations from "./locations";

export default `
    precision mediump float;
    attribute vec3 ${Locations.POSITION};
    attribute vec2 ${Locations.TEXTURE_COORDS};
    attribute vec3 ${Locations.NORMAL};

    varying vec3 surfaceNormal;
    varying vec3 lightVector;
    varying vec2 pass_textureCoords;

    uniform mat4 ${Locations.TRANSFORMATION_MATRIX};
    uniform vec3 ${Locations.LIGHT_POSITION};

    vec4 getWorldPosition() {
        return ${Locations.TRANSFORMATION_MATRIX} * vec4(${Locations.POSITION}, 1.0);
    }

    vec3 getSurfaceNormal() {
        return (${Locations.TRANSFORMATION_MATRIX} * vec4(${Locations.NORMAL}, 0.0)).xyz;
    }

    void main(void) {
        vec4 worldPos = getWorldPosition();
        surfaceNormal = getSurfaceNormal();
        lightVector = ${Locations.LIGHT_POSITION} - worldPos.xyz;
        gl_Position = worldPos;
        pass_textureCoords = ${Locations.TEXTURE_COORDS};
    }

`;
