import logger from './error_report';

let AudioExample = ((self) => {

  return {
    beep: function(duration, frequency, volume, type, callback) {
      //if you have another AudioContext class use that one, as some browsers have a limit
      var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
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
