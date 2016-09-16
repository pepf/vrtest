import THREE from './vreffect.js'

export default class Cube {

  constructor(options) {
    this.size = options.size;
    this.position = options.position, //[x,y,z]
    this.speed = options.speed || false;
    this.rotspeed = options.rotspeed || false;
    this.material = options.material || new THREE.MeshNormalMaterial();

    console.log(`create cube with ${this.size}, x:${this.position[0]}
      y:${this.position[1]} z:${this.position[2]}`);

    // Create 3D objects.
    this.geometry = this.getGeometry();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Position cube mesh to be right in front of you.
    this.mesh.position.set( this.position[0], this.position[1], this.position[2] );
  }

  getGeometry() {
    return new THREE.BoxGeometry(this.size,this.size,this.size);
  }

  get cube() {
    return this.mesh;
  }

  /**
   * Take speed vector, integrate it with position
   * (Call once per loop)
   */
  integrate( delta ) {
    if (this.speed instanceof THREE.Vector3) {
      let stepSpeed = this.speed.clone();
      stepSpeed.multiplyScalar(delta);
      this.mesh.position.add(stepSpeed);
    }
    if (this.rotspeed instanceof THREE.Vector3) {
      let stepSpeed = this.rotspeed.clone();
      stepSpeed.multiplyScalar(delta);
      let rotation = this.mesh.rotation.toVector3();
      rotation.add(stepSpeed);
      this.mesh.rotation.setFromVector3(rotation, 'XYZ');
    }
  }

  addTo( parent ) {

  }

  /**
   * Remove all references
   */
  remove() {

  }

}
