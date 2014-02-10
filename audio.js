var audio = (function() {
  var AudioContext = window.AudioContext || window.webkitAudioContext || null;
  if(AudioContext === null) {
    document.getElementById("volume").remove();
    document.getElementById("volslider").remove();
    console.log("no audio");
    return undefined;
  }

  var volumeSlider = document.getElementById("volume");
  var context = new AudioContext();
  var buffer;
  var source = context.createBufferSource();
  var loud = context.createGain();
  var panner = context.createPanner();
  var volume = context.createGain();

  var request = new XMLHttpRequest();
  request.open("GET", "rocket.ogg", true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    context.decodeAudioData(request.response, function(buf) {
      buffer = buf;
      source.buffer = buffer;
      source.loop = true;
      source.playbackRate.value = 2.4;
      source.start(0);
    });
  }
  request.send();

  source.connect(loud);
  loud.connect(panner);
  panner.connect(volume);
  volume.connect(context.destination);
  
  loud.gain.value = 0;
  volume.gain.value = parseInt(volumeSlider.value)/100;

  volumeSlider.addEventListener("input", function() {
    volume.gain.value = parseInt(volumeSlider.value)/100;
  });

  return {
    setLoudness: function(loudness) {
      loud.gain.value = loudness;
    },
    set: function(posx, posy, posz, velx, vely, velz) {
      panner.setPosition(posx, posy, posz);
      panner.setVelocity(velx, vely, velz);
    },
    context: context
  }
}());
