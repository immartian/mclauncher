/*
    This is a demo of the Tuna delay node. See the source at https://github.com/Theodeus/tuna
*/

var delay;
function tunaDemo() {
    //create an instance of Tuna by passing the AudioContext we use
    var tuna = new Tuna(audioContext);
    //create a new Tuna delay instance
    delay = new tuna.Delay({
        feedback: 0.45,
        delayTime: 70, //this will create a short "slap back" delay
        wetLevel: 0.7,
        dryLevel: 1,
        cutoff: 5000,
        bypass: false
    });
    //connect the source to the input property of the Tuna delay
    source.connect(delay.input);
    //connect delay as a standard web audio node to the audio context destination
    delay.connect(audioContext.destination);
    //start playing!
    source.start(audioContext.currentTime);
}

/*
    This is just the boilerplate needed to load an audio file and provide the dry/wet button functionality
*/

var AC = "AudioContext" in window ? AudioContext : "webkitAudioContext" in window ? webkitAudioContext : document.write("Web Audio not supported");
var audioContext = new AC();
var source = audioContext.createBufferSource();
var format = checkAudioFormat();
var xhr = new XMLHttpRequest();

xhr.open("GET", "http://www.oskareriksson.se/shed/assets/gitarrkompet." + format);
xhr.responseType = "arraybuffer";
xhr.onload = function(e) {
    audioContext.decodeAudioData(e.target.response, function(b) {
        source.buffer = b;
        //tunaDemo();
    })
}

xhr.send(null);

/*
    Check file format to use
*/

function checkAudioFormat () {
  var elem = document.createElement('audio');
  if (elem.canPlayType) {
    if (elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
      return "ogg";
    }
    if (elem.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, '')) {
      return "mp3";
    }
  }
  return false;
}
