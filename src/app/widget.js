import Text from './text.js'
import Utils from './utils.js'

export default class Widget {

  constructor(options) {

    let textOptions = {
      text: "blaat",
      position: new THREE.Vector3(0,1,-2),
      size: 0.5,
      height: 0.2,
      parent: options.scene
    }
    let widgetText = new Text(textOptions)

    // Initialize realtime data flow
    setInterval(()=> {
      widgetText.text = "€" + Utils.randomInt(0,100).toString() + ",-";
    }, 2000);
  }
}
