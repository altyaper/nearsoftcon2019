import logger from './error_report';

let Vibration = ((self) => {

  return {
    isApiSupported: function() {
      if (typeof window.navigator.vibrate == 'function') {
        window.navigator.vibrate([120, 120, 120])
        return true;
      }
      return false;
    }
  }

})(Vibration || {});


export default Vibration;
