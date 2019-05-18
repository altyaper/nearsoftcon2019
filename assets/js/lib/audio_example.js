import logger from './error_report';

let AudioExample = ((self) => {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

  return {
    isApiSupported: function() {
      if (audioCtx) return true
      return false
    },
    beep: function(duration, frequency, volume, type, callback) {
      var oscillator = audioCtx.createOscillator();
      var gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (volume){gainNode.gain.value = volume;};
      if (frequency){oscillator.frequency.value = frequency;}
      if (type){oscillator.type = type;}
      if (callback){oscillator.onended = callback;}

      oscillator.start();
      setTimeout(function(){oscillator.stop()}, (duration ? duration : 500));
    }
  }

})(AudioExample || {});


export default AudioExample;
