import Boilerplate from './boilerplate.js'
import THREE from './vreffect.js'
import Cube from './cube.js'
import Icosahedron from './icosahedron.js'

export default class App extends Boilerplate {

  constructor (options) {
    super(options);
  }

  setup() {
    super.setup();
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

    this.objectRefs.ico = new Icosahedron({
      size:0.4,
      position: [0.5, this.controls.userHeight, -1],
      speed: 0,
      material: new THREE.MeshStandardMaterial({
        color: '#21ce2b',
        shading: THREE.FlatShading
      })
    });
    wrapper.add(this.objectRefs.ico.cube);

    let gridHelper = new THREE.GridHelper( 10, 10);
    gridHelper.rotation.x = Math.PI;
    wrapper.add( gridHelper );
  }

  loop( delta ) {
    // Apply rotation to cube mesh
    this.objectRefs.ico.cube.rotation.y += delta * 0.0006;

    //Move all objects slowly towards viewer
    this.objectRefs.wrapper.position.z += delta * 0.0001;
  }
}
