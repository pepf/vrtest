import Text from './text.js'
import Utils from './utils.js'

export default class Widget {

  constructor(options) {
    let wrapper = new THREE.Object3D();

    let textOptions = {
      text: "",
      position: new THREE.Vector3(0,0,0),
      size: 0.5,
      height: 0.2,
      // parent: options.scene
    }
    let widgetText = new Text(textOptions)
    wrapper.add(widgetText.object);

    let labelOptions = {
      text: "PR Value",
      position: new THREE.Vector3(0,0.5,0),
      size: 0.2,
      height: 0.2,
      // parent: options.scene
    }
    let widgetLabel = new Text(labelOptions)
    wrapper.add(widgetLabel.object);

    this.object = wrapper;

    // Initialize realtime data flow
    setInterval(()=> {
      widgetText.text = "€" + Utils.randomInt(0,100).toString() + ",-";
    }, 2000);
  }
}
