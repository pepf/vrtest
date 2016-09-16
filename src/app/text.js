import THREE from './vreffect.js'

export default class Text {

  constructor(options) {
    /**
     * Options:
     * text: {String} Text to create geometry for
     * material {THREE.Material} Material to assign to the text
     * size: Integer
     * height: Thickness
     *
     * parent: parent to add the object to
     * position: position where to puth the object
     */
    this.options = options;
    this.textVal = this.options.text || "N/A";
    this.wrapper = new THREE.Object3D();
    this.wrapper.position.copy(this.options.position || new THREE.Vector3(0,0,0) );

    this.createText();
  }



  createText() {

    let textObject = this.generateText();

    this.wrapper.add(textObject);

    if(this.options.parent) {
      // throw new Error("it should have a parent to add to")
      this.options.parent.add(this.wrapper);
    }
  }

  generateText() {
    let material;
    if(!this.options.material && !this.material) {
      this.material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
      });
    }

    let textGeo = new THREE.TextGeometry( this.text, {

          font: this.options.font,
          size: this.options.size || 1,
          height: this.options.height || 0.5,
          curveSegments: 4,
          bevelEnabled: false,
          material: 0,
          extrudeMaterial: 1
        });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    let centerXOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
    let centerYOffset = -0.5 * ( textGeo.boundingBox.max.y - textGeo.boundingBox.min.y );

    //Center align text
    let textObject = new THREE.Mesh( textGeo, this.material );
    textObject.position.x = centerXOffset;
    textObject.position.y = centerYOffset;
    textObject.position.z = 0;
    this.currentMesh = textObject;

    return textObject;
  }

  get text() {
    return this.textVal
  }

  // Update geometry of text when text property changes
  set text( text ) {
    this.textVal = text;
    if (this.currentMesh) {
      this.currentMesh.geometry.dispose();
      this.wrapper.remove(this.currentMesh);
    }
    let textObject = this.generateText();
    this.wrapper.add(textObject);
    return
  }

  get object() {
    return this.wrapper;
  }



}
