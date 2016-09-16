require("babel-polyfill");

import WebVRConfig from './webvrconfig.js'
import THREE from './vreffect.js'
import Cube from './cube.js'
import WebVRManager from 'webvr-boilerplate'
import App from './app.js'


const options = {
  bgColor: 0x343434
};

let app = new App(options);
