import Boilerplate from './boilerplate.js'
import THREE from './vreffect.js'
import Cube from './cube.js'
import Icosahedron from './icosahedron.js'
import Utils from './utils.js'
import Widget from './widget.js'

// import roadModel from './models/road.json'
import roadModel from './models/road.json'
import coostoLogo from './models/coosto.obj'
import coostoMaterial from './models/coosto.mtl'
// import coostoLogo from './models/coosto.json'

export default class App extends Boilerplate {

  constructor (options) {

    super(options);
  }

  setup() {
    super.setup();

    this.scene.fog = new THREE.FogExp2( this.options.bgColor, 0.2 );

    this.objectRefs = {};

    /**
     * Lightning setup
     */
    let directional = new THREE.DirectionalLight( 0xffffff, 1.2 );
    directional.position.set(0,1,1).normalize(); //45 degrees;
    this.scene.add(directional);


    let hemiLight = new THREE.HemisphereLight( 0xd0d5e8, 0xc2b280, 1.2 );
      hemiLight.position.set( 0, 500, 0 );
      this.scene.add(hemiLight);


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

    let widget = new Widget({scene:this.scene});

    this.createCoostoLogo();

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
      if(key === "coosto") {
        obj.t+=delta;
        obj.position.set(0,1.75,-2 + Math.sin(obj.t*0.0001) );
      }
    }

    this.scene.position.add(new THREE.Vector3(0,0,0.0003));


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

  createCoostoLogo () {
    const mtlLoader = new THREE.MTLLoader()

    let objectRefs = this.objectRefs;

    mtlLoader.load(
      coostoMaterial,
      ( materials ) => {

        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        materials.preload();

        // load a resource from a file
        objLoader.load(
          // resource URL
          coostoLogo,
          // Function when resource is loaded
          ( object ) => {

            this.scene.add( object );
            object.t = 0;
            object.position.set(0,1.75,-2)
            object.rotation.set(0.5*Math.PI, 0, 0)
            object.scale.set(0.2,0.2,0.2)
            objectRefs["coosto"] = object;
          }
        );
      }
    )
  }
}
