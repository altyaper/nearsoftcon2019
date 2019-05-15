import logger from './error_report';

let Orientation = (function(self) {

  return {
    init: function() {
      if (!window.DeviceOrientationEvent) {
        logger.logError('DeviceOrientation not supported');
      } else {
        logger.logError('DeviceOrientation supported');
        var orientation = window.screen.msOrientation || window.screen.mozOrientation || (window.screen.orientation || {});

        window.addEventListener("orientationchange", function() {
          console.log("the orientation of the device is now " + screen.orientation.angle);
        });
        return orientation;
      }
      if (!window.DeviceMotionEvent) {
        logger.logError('DeviceMotionEvent not supported');
      } else {
        logger.logError('DeviceMotionEvent supported');
        window.addEventListener('devicemotion', function(event) {
          logger.logError(event)
        })
      }
    },
    isApiSupported: function() {
      return (window.DeviceOrientationEvent) ? true : false;
    }
  }

})(Orientation || {});


export default Orientation;
