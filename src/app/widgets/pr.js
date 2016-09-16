import Text from 'text.js'
import Utils from 'utils.js'
import Widget from 'widgets/widget.js'

export default class PRWidget extends Widget {

  constructor(options) {
    super(options);

    let wrapper = new THREE.Object3D();

    let textOptions = {
      text: "",
      position: new THREE.Vector3(0,0,0),
      size: 0.5,
      height: 0.2,
    }
    let widgetText = new Text(textOptions)
    wrapper.add(widgetText.object);

    let labelOptions = {
      text: "PR Value",
      position: new THREE.Vector3(0,0.5,0),
      size: 0.2,
      height: 0.2,
      material: new THREE.MeshStandardMaterial({
        color: 0x00a8ed,
        shading: THREE.FlatShading
      })
    }
    let widgetLabel = new Text(labelOptions)
    wrapper.add(widgetLabel.object);
    this.wrapper = wrapper;

    // Initialize realtime data flow
    setInterval(()=> {
      widgetText.text = "€" + Utils.randomInt(0,100).toString() + ",-";
    }, 2000);
  }

  get object() {
    return this.wrapper;
  }
}
