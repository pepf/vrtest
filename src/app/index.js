import WebVRConfig from './webvrconfig.js'
import THREE from './vreffect.js'
import Cube from './cube.js'
import WebVRManager from 'webvr-boilerplate'
import App from './app.js'

// let skybox, display, scene, camera, loader, effect, renderer, lastRender, controls;

//References to other instances;
// let objectRefs = {};

// window.WebVRConfig = WebVRConfig;
// window.WebVRManager = WebVRManager;
// window.THREE = THREE;


const options = {
  bgColor: 0x111111
};
let app = new App(options);

// let init = () => {
//
//
//
//
//   // Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
//   // Only enable it if you actually need to.
//   renderer = new THREE.WebGLRenderer({antialias: true});
//   renderer.setPixelRatio(window.devicePixelRatio);
//
//   // Append the canvas element created by the renderer to document body element.
//   document.body.appendChild(renderer.domElement);
//
//   // Create a three.js scene.
//   scene = new THREE.Scene();
//
//   // Create a three.js camera.
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
//
//   // Apply VR headset positional data to camera.
//   controls = new THREE.VRControls(camera);
//   controls.standing = true;
//
//   // Apply VR stereo rendering to renderer.
//   var effect = new THREE.VREffect(renderer);
//   effect.setSize(window.innerWidth, window.innerHeight);
//
//
//   // Add a repeating grid as a skybox.
//   var boxSize = 5;
//   var loader = new THREE.TextureLoader();
//
//   /**
//    * Texture loading callback
//    */
//   let onTextureLoaded = (texture) => {
//     texture.wrapS = THREE.RepeatWrapping;
//     texture.wrapT = THREE.RepeatWrapping;
//     texture.repeat.set(boxSize, boxSize);
//
//     var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
//     var material = new THREE.MeshBasicMaterial({
//       map: texture,
//       // color: 0x01BE00,
//       color: 0x665522,
//       side: THREE.BackSide
//     });
//
//     // Align the skybox to the floor (which is at y=0).
//     skybox = new THREE.Mesh(geometry, material);
//     skybox.position.y = boxSize/2;
//     // scene.add(skybox);
//
//     // For high end VR devices like Vive and Oculus, take into account the stage
//     // parameters provided.
//     setupStage();
//   }
//   loader.load('http://raw.githubusercontent.com/borismus/webvr-boilerplate/master/img/box.png', onTextureLoaded);
//
//   // Create a VR manager helper to enter and exit VR mode.
//   var params = {
//     hideButton: false, // Default: false.
//     isUndistorted: false // Default: false.
//   };
//   var manager = new WebVRManager(renderer, effect, params);
//
//   let wrapper = new THREE.Object3D();
//   wrapper.position.set(0,0,0);
//   scene.add(wrapper);
//   objectRefs.wrapper = wrapper;
//
//   //add a cube;
//   // objectRefs.cube = createCube(0.4, 0, controls.userHeight, -1);
//   objectRefs.cube = new Cube({
//     size:0.4,
//     position: [0, controls.userHeight, -1],
//     speed: 0
//   });
//   objectRefs.cube2 = createCube(0.2, -0.5, controls.userHeight, -2);
//   objectRefs.cube3 = createCube(0.2, 0.5, controls.userHeight, -3);
//   objectRefs.cube4 = createCube(0.2, 0.8, controls.userHeight, -1);
//
//   wrapper.add(objectRefs.cube.cube);
//   wrapper.add(objectRefs.cube2);
//   wrapper.add(objectRefs.cube3);
//   wrapper.add(objectRefs.cube4);
//
//   var ambientLight = new THREE.AmbientLight("#0c0c0c");
//   scene.add(ambientLight);
//
//   let gridHelper = new THREE.GridHelper( 10, 10);
//   gridHelper.rotation.x = Math.PI;
//   wrapper.add( gridHelper );
//
//
//   //reset render timer
//   lastRender = 0;
//
//   // Kick off animation loop
//   requestAnimationFrame(animate);
//
//   window.addEventListener('resize', onResize, true);
//   window.addEventListener('vrdisplaypresentchange', onResize, true);
//
//   // Request animation frame loop function
//
//   function animate(timestamp) {
//     var delta = Math.min(timestamp - lastRender, 500);
//     lastRender = timestamp;
//
//     // Apply rotation to cube mesh
//     objectRefs.cube.cube.rotation.y += delta * 0.0006;
//     objectRefs.cube2.rotation.y += delta * 0.0006;
//     objectRefs.cube3.rotation.y += delta * 0.0003;
//     objectRefs.cube4.rotation.y += delta * 0.0003;
//     // objectRefs.wrapper.rotation.y += delta * 0.0001;
//
//     objectRefs.wrapper.position.z += delta * 0.0001;
//
//     // Update VR headset position and apply to camera.
//     controls.update();
//
//     // Render the scene through the manager.
//     manager.render(scene, camera, timestamp);
//
//     //show debug info about camera rotation
//     // document.querySelector(".debuginfo").textContent = `
//     // camera x:${camera.rotation.x} y:${camera.rotation.y} z:${camera.rotation.z}`;
//
//     requestAnimationFrame(animate);
//   }
//
//   function onResize(e) {
//     effect.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//   }
//
// }
//
// // Get the HMD, and if we're dealing with something that specifies
// // stageParameters, rearrange the scene.
// function setupStage() {
//   navigator.getVRDisplays().then(function(displays) {
//     if (displays.length > 0) {
//       display = displays[0];
//       if (display.stageParameters) {
//         setStageDimensions(display.stageParameters);
//       }
//     }
//   });
// }
//
// function setStageDimensions(stage) {
//   // Make the skybox fit the stage.
//   var material = skybox.material;
//   scene.remove(skybox);
//
//   // Size the skybox according to the size of the actual stage.
//   var geometry = new THREE.BoxGeometry(stage.sizeX, boxSize, stage.sizeZ);
//   skybox = new THREE.Mesh(geometry, material);
//
//   // Place it on the floor.
//   // skybox.position.y = boxSize/2;
//   // scene.add(skybox);
//
//   // Place the cube in the middle of the scene, at user height.
//   // cube.position.set(0, controls.userHeight, 0);
// }
//
// let createCube = (size, x, y, z) => {
//   console.log(`create cube with ${size}, x:${x} y:${y} z:${z}`);
//   // Create 3D objects.
//   var geometry = new THREE.BoxGeometry(size, size, size);
//   var material = new THREE.MeshNormalMaterial();
//   var cube = new THREE.Mesh(geometry, material);
//
//   // Position cube mesh to be right in front of you.
//   cube.position.set(x, y, z);
//
//   return cube;
// }

// init();
