import Boilerplate from './boilerplate.js'
import THREE from './vreffect.js'
import Cube from './cube.js'
import Icosahedron from './icosahedron.js'
import TagCloudWidget from './tagcloud'
import PRWidget from './widgets/pr.js'
import Utils from './utils.js'
import { wait } from './utils.js'
import PTSans from './assets/PTSans_Regular.json'

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

    //things that we actually want to be able to intersect with
    this.intersectables = [];

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
    let directional2 = new THREE.DirectionalLight( 0xffffff, 1.2 );
    directional2.position.set(-1,1,-1).normalize(); //45 degrees;
    this.scene.add(directional2);


    let hemiLight = new THREE.HemisphereLight( 0xd0d5e8, 0xc2b280, 1.2 );
    hemiLight.position.set( 0, 500, 0 );
    this.scene.add(hemiLight);

    let gridHelper = new THREE.GridHelper( 10, 10);
    gridHelper.rotation.x = Math.PI;
    this.scene.add( gridHelper );

    this.createSelector();

    this.loadObjects().then(_ => this.start());

    this.timer = 0;
  }

  loop( delta ) {

    this.timer += delta;

    this.selector.raycaster.setFromCamera( new THREE.Vector2(0, 0), this.camera );

    var previousHover = this.hover;

    this.hover = null;
    var intersects = this.selector.raycaster.intersectObjects(this.intersectables, false);
    if (intersects.length > 0) {
      intersects.forEach( obj => {
        obj = obj.object;

        if(obj.name === "BoundingBox") {
          this.hover = obj.widget;
        }

      })
    }

    if (this.hover !== previousHover) {
      if (previousHover) {
        previousHover.setBlur();
      }
      if (this.hover) {
        this.hover.setHover();
      }
    }

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
          this.state = 'TAGCLOUD_ANIMATION';
        }

        const from = -20,
              to = -4;

        this.widget1.object.position.x = 0;
        this.widget1.object.position.y = 1.75;
        this.widget1.object.position.z = from + (to - from) * THREE.Math.smoothstep(x, 0, 1)

        break;
      }
      case 'TAGCLOUD_ANIMATION': {
        x = this.timer / 1000;

        if (x > 1) {
          x = 1;
          this.timer = 0;
          this.state = 'SHOW_WIDGET_2';
        }

        this.widget1Start = true;
        break;
      }
      case 'SHOW_WIDGET_2': {
        x = this.timer / 1000;

        if (x > 1) {
          x = 1;
          this.timer = 0;
          this.state = 'SHOW_WIDGET_3';
        }

        const from = new THREE.Vector3(-20, 1.75, -10),
              to = new THREE.Vector3(-2, 1.75, -1),
              alpha = THREE.Math.smoothstep(x, 0, 1);

        this.widget2.object.position.lerpVectors(from, to, alpha);
        this.widget2.object.lookAt(this.camera.position);
        break;
      }
    }

    if (this.widget1Start) this.widget1.transition(delta);

  }

  async loadObjects() {
    this.coostoObject = await this.createCoostoLogo();

    this.scene.add(this.coostoObject);

    this.coostoObject.position.set(0,1.75,-2000)
    this.coostoObject.rotation.set(0.5*Math.PI, 0, 0)
    this.coostoObject.scale.set(0.2,0.2,0.2)

    this.mainFont = await new Promise(resolve => {
      var loader = new THREE.FontLoader();
      loader.load( PTSans, ( response ) => {
        resolve(response);
      } );
    });

    this.widget1 = new TagCloudWidget({
      font: this.mainFont
    })
    this.widget1.object.position.set(1000, 1000, 1000);
    this.scene.add(this.widget1.object);
    this.intersectables.push(this.widget1.object)


    this.widget2 = new PRWidget({
      font: this.mainFont
    })
    this.widget2.object.position.set(1000, 1000, 1000);
    this.widget2.object.rotation.y = Math.PI * 0.25;
    this.scene.add(this.widget2.object);
    this.intersectables.push(this.widget2.object)
  }

  async start() {
    this.state = 'START';
  }

  createSelector() {
    let geometry = new THREE.RingGeometry( 0.8, 1.0, 32 );
    let material = new THREE.MeshBasicMaterial( {
      color: 0xffffff,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    let selector = new THREE.Mesh(geometry, material);
    selector.position.set( 0, 0, -1.5);
    // selector.position.setZ(-0.2);
    var SCALE = 0.1
    selector.scale.set( SCALE, SCALE, SCALE );
    selector.raycaster = new THREE.Raycaster();
    this.camera.add(selector);
    // this.scene.add(selector);
    this.selector = selector;
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

}
