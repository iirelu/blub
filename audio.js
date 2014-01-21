var audio = (function() {
  var AudioContext = AudioContext || webkitAudioContext;
  var context = new AudioContext();

  var oscillator = context.createOscillator();
  oscillator.type = "sawtooth";

  var gain = context.createGain();
  gain.gain.value = 0.1;

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(0);

  return {
    changeFrequency: function(freq) {
      oscillator.frequency.value = freq;
    }
  }
}())
