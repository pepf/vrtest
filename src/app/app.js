import Boilerplate from './boilerplate.js'
import THREE from './vreffect.js'
import Cube from './cube.js'
import Icosahedron from './icosahedron.js'
import PRWidget from './widgets/pr.js'
import Utils from './utils.js'
import { wait } from './utils.js'

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

    this.reference = new THREE.Object3D;
    this.reference.add(this.camera);

    this.scene.add(this.reference);

    this.scene.fog = new THREE.FogExp2( this.options.bgColor, 0.2 );

    /**
     * Lightning setup
     */
    let directional = new THREE.DirectionalLight( 0xffffff, 1.2 );
    directional.position.set(0,1,1).normalize(); //45 degrees;
    this.scene.add(directional);


    let hemiLight = new THREE.HemisphereLight( 0xd0d5e8, 0xc2b280, 1.2 );
    hemiLight.position.set( 0, 500, 0 );
    this.scene.add(hemiLight);

    let gridHelper = new THREE.GridHelper( 10, 10);
    gridHelper.rotation.x = Math.PI;
    this.scene.add( gridHelper );

    this.loadObjects().then(_ => this.start());

    this.timer = 0;
  }

  loop( delta ) {

    this.timer += delta;

    let x;
    switch (this.state) {
      case 'START': {
        x = this.timer / 2000;

        if (x > 1) {
          x = 1;
          this.timer = 0;
          this.state = 'REMOVE_LOGO';
        }

        const from = -20,
              to = -2;

        this.coostoObject.position.z = from + (to - from) * THREE.Math.smoothstep(x, 0, 1);
        break;
      }
      case 'REMOVE_LOGO': {
        x = this.timer / 500;

        if (x > 1) {
          x = 1;
          this.timer = 0;
          this.state = 'SHOW_WIDGET_1';
        }

        this.coostoObject.children[0].material.opacity = 1 - x;
        this.coostoObject.children[1].material.opacity = 0.75 * (1 - x);
        break;
      }
      case 'SHOW_WIDGET_1': {
        x = this.timer / 500;

        if (x > 1) {
          x = 1;
          this.timer = 0;
          this.state = 'SHOW_WIDGET_2';
        }

        const from = -20,
              to = -2;

        this.widget1.position.x = 0;
        this.widget1.position.y = 1.75;
        this.widget1.position.z = from + (to - from) * THREE.Math.smoothstep(x, 0, 1)

        break;
      }
    }

  }

  async loadObjects() {
    this.coostoObject = await this.createCoostoLogo();

    this.scene.add(this.coostoObject);

    this.coostoObject.position.set(0,1.75,-2000)
    this.coostoObject.rotation.set(0.5*Math.PI, 0, 0)
    this.coostoObject.scale.set(0.2,0.2,0.2)

    this.widget1 = await this.createWidget();
    this.widget1.position.set(1000, 1000, 1000);
    this.scene.add(this.widget1);
  }

  async start() {
    this.state = 'START';
  }

  createCoostoLogo () {
    return new Promise((resolve, reject) => {
      const mtlLoader = new THREE.MTLLoader()

      mtlLoader.load(
        coostoMaterial,
        ( materials ) => {
          let objLoader = new THREE.OBJLoader();
          objLoader.setMaterials( materials );
          materials.preload();

          // Force material to be transparent
          for (const materialName in materials.materials) {
            materials.materials[materialName].transparent = true;
          }

          // load a resource from a file
          objLoader.load(
            // resource URL
            coostoLogo,
            // Function when resource is loaded
            resolve
          );
        }
      )
    });
  }

  createWidget() {
    // const geometry = new THREE.PlaneGeometry( 5, 20, 32 );
    // const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    // const plane = new THREE.Mesh( geometry, material );
    let widget = (new PRWidget()).object;
    return widget;
  }
}
