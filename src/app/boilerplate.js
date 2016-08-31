import THREE from './vreffect.js'
import WebVRManager from 'webvr-boilerplate'

/**
 * Boilerplate class for a three js setup with
 * VR support
 */
export default class Boilerplate {
  constructor(options) {
    this.init();
  }

  init() {
    // Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
    // Only enable it if you actually need to.
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Append the canvas element created by the renderer to document body element.
    document.body.appendChild(this.renderer.domElement);

    // Create a three.js camera.
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    // Apply VR headset positional data to camera.
    this.controls = new THREE.VRControls(this.camera);
    this.controls.standing = true;

    // Apply VR stereo rendering to renderer.
    this.effect = new THREE.VREffect(this.renderer);
    this.effect.setSize(window.innerWidth, window.innerHeight);

    // Create a VR manager helper to enter and exit VR mode.
    var params = {
      hideButton: false, // Default: false.
      isUndistorted: false // Default: false.
    };
    this.manager = new WebVRManager(this.renderer, this.effect, params);

    // For high end VR devices like Vive and Oculus, take into account the stage
    // parameters provided.
    this.setupStage();

    //Run custom setup code
    this.setup();

    this.lastRender = 0;

    //Add some event handlers for resizing the window
    window.addEventListener('resize', this.onResize.bind(this), true);
    window.addEventListener('vrdisplaypresentchange', this.onResize, true);

    // Kick off animation loop
    requestAnimationFrame(this.animate.bind(this));
  }

  onResize() {
    this.effect.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  setupStage() {
    navigator.getVRDisplays().then(function(displays) {
      if (displays.length > 0) {
        let display = displays[0];
        if (display.stageParameters) {
          this.setStageDimensions(display.stageParameters);
        }
      }
    });
  }

  setStageDimensions() {
    // Things that need to happen when the VR stage changes
  }


  animate(timestamp) {
    var delta = Math.min(timestamp - this.lastRender, 500);
    this.lastRender = timestamp;

    //Execute custom animation code
    this.loop(delta);

    // Update VR headset position and apply to camera.
    this.controls.update();

    // Render the scene through the manager.
    this.manager.render(this.scene, this.camera, timestamp);

    requestAnimationFrame(this.animate.bind(this));
  }

  setup() {
    // Override me with custom code as well!
    this.scene = new THREE.Scene();
  }

  loop(delta) {
    //override me with custom code
  }
}
