import Text from './text.js'

export default class TagCloudWidget {

  constructor(options) {
    this.object = new THREE.Object3D();

    this.data = {
      'europe': { size: 56, position: new THREE.Vector3(0,0,0) },
      'first hyperledger hackathon': { size: 53, position: new THREE.Vector3(-30,50,0) },
      'data van de kvk': { size: 52, position: new THREE.Vector3(22,-41,0) },
      'slag met data': { size: 51, position: new THREE.Vector3(41,-91,0) },
      'check': { size: 50, position: new THREE.Vector3(-208,1,0) },
      'challenge': { size: 48, position: new THREE.Vector3(-77,97,0) },
      'financiën overheid transparant': { size: 46, position: new THREE.Vector3(51,-141,0) },
      'hack': { size: 45, position: new THREE.Vector3(-220,-50,0) },
      'hackathon voor ouderenzorg': { size: 45, position: new THREE.Vector3(-68,143,0) },
      'amsterdam': { size: 41, position: new THREE.Vector3(216,1,0) },
      'winnaars kvk hackathon': { size: 39, position: new THREE.Vector3(241,95,0) },
      'gemeente den haag': { size: 39, position: new THREE.Vector3(-310,-98,0) },
      'open data': { size: 38, position: new THREE.Vector3(291,-45,0) },
      'uitdaging': { size: 38, position: new THREE.Vector3(-350,-44,0) },
      'meld': { size: 34, position: new THREE.Vector3(254,-82,0) },
      'hackers': { size: 31, position: new THREE.Vector3(-247,90,0) },
      'bad ducks': { size: 30, position: new THREE.Vector3(-352,-4,0) },
      'start': { size: 29, position: new THREE.Vector3(330,38,0) },
      'get': { size: 29, position: new THREE.Vector3(-112,0,0) },
      'winnaars hackathon': { size: 29, position: new THREE.Vector3(361,128,0) },
      'internet': { size: 27, position: new THREE.Vector3(376,-6,0) },
      'nassau': { size: 27, position: new THREE.Vector3(-349,78,0) },
      'aanloop naar prinsjesdag': { size: 25, position: new THREE.Vector3(-89,173,0) },
      'partner': { size: 25, position: new THREE.Vector3(-406,38,0) },
      'data innovation lab': { size: 24, position: new THREE.Vector3(-370,-138,0) },
      'tomorrow cc': { size: 24, position: new THREE.Vector3(385,-84,0) },
      'creatieve ict': { size: 23, position: new THREE.Vector3(424,-108,0) },
      'lily': { size: 23, position: new THREE.Vector3(387,50,0) },
      'welzijn': { size: 22, position: new THREE.Vector3(432,-36,0) },
      'facebook groups': { size: 22, position: new THREE.Vector3(159,179,0) },
      'tickets': { size: 22, position: new THREE.Vector3(450,30,0) },
      'hacking elderly': { size: 21, position: new THREE.Vector3(-355,171,0) },
      'een hackathon': { size: 21, position: new THREE.Vector3(-342,-173,0) },
      'milieu': { size: 19, position: new THREE.Vector3(-26,-180,0) },
      '1st 36hrs': { size: 18, position: new THREE.Vector3(-443,74,0) },
      'details': { size: 18, position: new THREE.Vector3(-462,-20,0) },
      'algemene rekenkamer': { size: 18, position: new THREE.Vector3(239,-182,0) },
      'ams': { size: 18, position: new THREE.Vector3(389,21,0) },
      'infrastructuur': { size: 17, position: new THREE.Vector3(-413,120,0) },
      'winnaar': { size: 17, position: new THREE.Vector3(461,63,0) },
      '2nd annual': { size: 16, position: new THREE.Vector3(299,-119,0) },
      'uitvoering': { size: 15, position: new THREE.Vector3(295,174,0) },
      'je ideeën': { size: 15, position: new THREE.Vector3(-142,-185,0) },
      'probability': { size: 14, position: new THREE.Vector3(408,-138,0) },
      '24hr': { size: 14, position: new THREE.Vector3(217,-113,0) },
      'predict': { size: 14, position: new THREE.Vector3(-448,12,0) },
      'quotes conversion': { size: 14, position: new THREE.Vector3(-435,140,0) },
      'tno': { size: 14, position: new THREE.Vector3(393,-64,0) },
      'decor voor de kvk': { size: 14, position: new THREE.Vector3(424,-159,0) },
      'kick': { size: 14, position: new THREE.Vector3(457,-5,0) },

    };

    this.N = Object.keys(this.data).length;

    for (const word in this.data) {
      const position = this.data[word].position.clone().multiplyScalar(0.01);

      this.data[word].widget = new Text({
        text: word,
        position: position,
        size: this.data[word].size * 0.007,
        height: 0.04,
        font: options.font
      });

      this.data[word].widget.object.position.z = 100;

      this.object.add(this.data[word].widget.object);
    }

    this.clock = 0;
  }

  transition(delta) {
    this.clock += delta;
    var i = 0;
    for (const word in this.data) {
      const xFrom = 0.2 * i / this.N;
      const xTo = xFrom + 1 / this.N;
      const xDiff = xTo - xFrom;
      const xx = THREE.Math.smootherstep((this.clock / 19000 - xFrom) / xDiff, 0, 1);
      const z = 10 - xx * 10;
      this.data[word].widget.object.position.z = -Math.max(0, z) + this.data[word].size * 0.1 - 7 + Math.sin(this.clock / 3000 + i / 3) * 2;
      i += 1;
    }
  }
}
