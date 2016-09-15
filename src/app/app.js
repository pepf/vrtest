import Boilerplate from './boilerplate.js'
import THREE from './vreffect.js'
import Cube from './cube.js'
import Icosahedron from './icosahedron.js'
import Utils from './utils.js'

import roadModel from './models/road.json'

export default class App extends Boilerplate {

  constructor (options) {

    super(options);
  }

  setup() {
    super.setup();

    this.scene.fog = new THREE.FogExp2( this.options.bgColor, 0.2 );

    this.objectRefs = {};

    let light = new THREE.PointLight( 0xffffff, 1, 0 );
    light.position.set( 0, 50, 0 );
    this.scene.add(light)

    let light2 = new THREE.PointLight( 0xffffff, 1, 0 );
    light2.position.set( 25, 50, 25 );
    this.scene.add(light2)

    let light3 = new THREE.PointLight( 0xffffff, 1, 0 );
    light3.position.set( -25, 50, -25 );
    this.scene.add(light3)

    let wrapper = new THREE.Object3D();
    wrapper.position.set(0,0,0);
    this.scene.add(wrapper);
    this.objectRefs.wrapper = wrapper;

    let material = new THREE.MeshStandardMaterial({
      color: '#21ce2b',
      shading: THREE.FlatShading
    });
    this.material=material;

    let roadMaterial = new THREE.MeshStandardMaterial({
      color: '#422E18',
      shading: THREE.FlatShading
    })

    // this.objectRefs.ico = new Icosahedron({
    //   size: Utils.random(0.1,0.7),
    //   position: [0.75, this.controls.userHeight+Utils.random(-1,1), -1],
    //   speed: new THREE.Vector3(0,0,0.0002),
    //   rotspeed: new THREE.Vector3(0,0.0006, 0.0003),
    //   material: material
    // });
    //
    // this.objectRefs.ico2 = new Icosahedron({
    //   size: Utils.random(0.1,0.7),
    //   position: [0.4, this.controls.userHeight+Utils.random(-1,1), -2],
    //   speed: new THREE.Vector3(0,0,0.0002),
    //   rotspeed: new THREE.Vector3(0,0.0006, 0.0003),
    //   material: material
    // });
    //
    // this.objectRefs.ico3 = new Icosahedron({
    //   size: Utils.random(0.1,0.7),
    //   position: [-0.75, this.controls.userHeight+Utils.random(-1,1), -3],
    //   speed: new THREE.Vector3(0,0,0.0002),
    //   rotspeed: new THREE.Vector3(0.005,0, 0.0003),
    //   material: material
    // });
    //
    // wrapper.add(this.objectRefs.ico.cube);
    // wrapper.add(this.objectRefs.ico2.cube);
    // wrapper.add(this.objectRefs.ico3.cube);

    this.createRandomIcosahedron(wrapper);
    this.createRandomIcosahedron(wrapper);
    this.createRandomIcosahedron(wrapper);
    this.createRandomIcosahedron(wrapper);
    this.createRandomIcosahedron(wrapper);
    this.createRandomIcosahedron(wrapper);
    this.createRandomIcosahedron(wrapper);


    // Show loaded JSON object
    var loader = new THREE.JSONLoader()

    // load a resource from a file
    loader.load(
    	// resource URL
    	roadModel,
    	// Function when resource is loaded
      ( geometry, materials ) => {
    		let object = new THREE.Mesh( geometry, roadMaterial );
        // console.log(object)
    		this.scene.add( object );
        object.position.set(-2,0,0)
        object.rotation.set(0, 0.5*Math.PI, 0)
    	}
    );

    let gridHelper = new THREE.GridHelper( 10, 10);
    gridHelper.rotation.x = Math.PI;
    wrapper.add( gridHelper );
  }

  loop( delta ) {

    for (let key in this.objectRefs) {
      let obj = this.objectRefs[key]
      if(typeof obj.integrate === "function") {
        obj.integrate(delta);
      }
    }

    this.camera.translateZ(10)
    // this.camera.updateMatrixWorld()
    // this.caerma.updateProjectionMatrix()
  }

  createRandomIcosahedron (container) {
    let ico = new Icosahedron({
      size: Utils.random(0.1,0.4),
      position: [Utils.random(-1.5,1.5), this.controls.userHeight+Utils.random(-1,1), Utils.random(0,-3)],
      speed: new THREE.Vector3(0,0,0.0),
      rotspeed: new THREE.Vector3(Utils.random(-0.0005,0.0005),0, Utils.random(-0.0003,0.0003)),
      material: this.material
    });

    this.objectRefs["ico" + Math.random()] = ico;
    container.add(ico.cube);


  }
}
