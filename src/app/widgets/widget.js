
export default class Widget {

  constructor(options) {
    this.wrapper = this.createBoundingBox();
    //reference to widget
    this.wrapper.widget = this;
  }


  createBoundingBox() {
    //Add empty bounding box around widget just for show;
    //Maybe use it for toggling selection boxes on and off when looking around
    let geo = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      wireframeLinewidth: 1,
      visible: false
    });
    this.scale = 1;
    this.scaleFrom = 1;
    this.scaleTo = 1;
    this.timer = 0;
    let boundingBox = new THREE.Mesh(geo, material);
         boundingBox.name = "BoundingBox";
    return boundingBox;
  }

  // what happens when hovering
  setHover() {
    console.log("hovered!")
    this.timer = 0;
    this.scaleFrom = this.scale;
    this.scaleTo = 1.5;
    //this.wrapper.material.visible = true
  }

  // Opposite of setHover
  setBlur() {
    console.log("hovered out!")
    this.timer = 0;
    this.scaleFrom = this.scale;
    this.scaleTo = 1;
    //this.wrapper.material.visible = false

  }

  update(delta) {
    this.timer += delta;
    const x = this.timer / 500;
    this.scale = this.scaleFrom + (this.scaleTo - this.scaleFrom) * Math.min(x * x, 1);
    this.wrapper.scale.set(this.scale, this.scale, this.scale);
  }

  // returns the actual widget wraper object, so that we can use it somewhere else
  get object() {

  }
  get boundingbox() {
    this.boundingBox;
  }
}
