var audio = (function() {
  var AudioContext = AudioContext || webkitAudioContext;
  var context = new AudioContext();
  var volumeSlider = document.getElementById("volume");

  var oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 114;

  var loudness = context.createGain();
  loudness.gain.value = 1;
  console.log(loudness);

  var volslider = context.createGain();
  volslider.gain.value = parseInt(volumeSlider.value)/100;

  oscillator.connect(loudness);
  loudness.connect(volslider);
  volslider.connect(context.destination);

  oscillator.start(0);

  return {
    changeLoudness: function(loud) {
      loudness.gain.value = loud;
      volslider.gain.value = parseInt(volumeSlider.value)/100;
    }
  }
}())
