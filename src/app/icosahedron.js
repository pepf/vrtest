import THREE from './vreffect.js'
import Cube from './cube.js'

export default class Icosahedron extends Cube {

  getGeometry() {
    return new THREE.IcosahedronGeometry(this.size, 0);
  }

}
