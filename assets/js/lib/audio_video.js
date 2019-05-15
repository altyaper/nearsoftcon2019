import logger from './error_report';

let AudioVideo = ((self) => {

  return {
    init: function() {

    },
    isApiSupported: function() {
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        return true;
      }
      return false;
    }
  }

})(AudioVideo || {});


export default AudioVideo;
