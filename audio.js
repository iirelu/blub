var audio = (function() {
  var AudioContext = AudioContext || webkitAudioContext;
  var context = new AudioContext();
  var volumeSlider = document.getElementById("volume");

  var oscillator = context.createOscillator();
  oscillator.type = "sawtooth";

  var gain = context.createGain();
  gain.gain.value = parseInt(volumeSlider.value)/100;

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(0);

  return {
    changeFrequency: function(freq) {
      oscillator.frequency.value = freq;
      if(freq < 1) {
        gain.gain.value = 0;
      } else {
        gain.gain.value = parseInt(volumeSlider.value)/100;
      }
    }
  }
}())
