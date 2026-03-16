declare const faceapi: typeof import("face-api.js");

faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
