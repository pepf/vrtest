
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
      wireframeLinewidth: 1
    });
    let boundingBox = new THREE.Mesh(geo, material);
         boundingBox.name = "BoundingBox";
    return boundingBox;
  }

  // what happens when hovering
  setHover() {
    console.log("hovered!")
  }

  // Opposite of setHover
  setBlur() {
    console.log("hovered out!")

  }

  // returns the actual widget wraper object, so that we can use it somewhere else
  get object() {

  }
  get boundingbox() {
    this.boundingBox;
  }
}
