import logger from './error_report';

let Ambient = ((self) => {

  return {
    isApiSupported: function() {
      if ('ondevicelight' in window) {
        return true;
      }
      return false;
    }
  }

})(Ambient || {});


export default Ambient;
