import logger from './error_report';

let AudioVideo = ((self) => {

  return {
    isApiSupported: function() {
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        return true;
      }
      return false;
    }
  }

})(AudioVideo || {});


export default AudioVideo;
