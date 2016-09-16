import Text from 'text.js'
import Utils from 'utils.js'
import Widget from 'widgets/widget.js'

export default class PRWidget extends Widget {

  constructor(options) {
    super(options);

    let wrapper = this.wrapper;

    var material = new THREE.MeshStandardMaterial({
      color: 0x00a8ed,
      shading: THREE.FlatShading
    });

    this.N = 200;

    this.pointsTo = [];
    this.pointsFrom = [];
    var geometry = new THREE.Geometry();
    for ( var i = 0; i < this.N; i ++ ) {
      geometry.vertices.push( new THREE.Vector3() );
      this.pointsTo.push( new THREE.Vector3() );
      this.pointsFrom.push( new THREE.Vector3() );
    }

    this.mesh = new THREE.Line( geometry, new THREE.LineBasicMaterial( {
      color: 0xffffff,
      linewidth: 5
    } ) );

    this.timer = 0;

    this.updateGeometry();

    wrapper.add(this.mesh);
  }

  updateGeometry() {
    this.timer = 0;
    var positions = [];
    var M = 80;
    var val = Math.random() * 4;
    for ( var i = 0; i < M; i ++ ) {
      positions.push( new THREE.Vector3((i - M / 2) * 0.4, val, 0) );
      val += Math.random() * 2 - 1;
      if (val > 4) val -= 0.1;
      if (val < -1) val += 0.2;
    }

    var curve = new THREE.CatmullRomCurve3( positions );
    curve.type = 'catmullrom';

    for ( var i = 0; i < this.N; i ++ ) {
      var newPoint = curve.getPoint( i /  ( this.N - 1 ) );

      this.pointsFrom[i].copy(this.pointsTo[i]);
      this.pointsTo[i].copy(newPoint);
    }
  }

  update(delta) {
    this.timer += delta;

    var alpha = this.timer / 1000;
    if (alpha >= 1) {
      alpha = 1;
    }

    for ( var i = 0; i < this.N; i ++ ) {
      var p = this.mesh.geometry.vertices[ i ];
      p.lerpVectors(this.pointsFrom[i], this.pointsTo[i], alpha);
    }

    if (alpha >= 1) {
      this.timer = 0;
      this.updateGeometry();
    }

    this.mesh.geometry.verticesNeedUpdate = true;
  }

  get object() {
    return this.wrapper;
  }
}
