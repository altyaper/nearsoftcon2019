import logger from './error_report';
import viewer from '../viewer';

let Location = ((self) => {

  function error(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        logger.logError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        logger.logError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        logger.logError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        logger.logError("An unknown error occurred.");
        break;
    }
  }

  function success(position) {
    viewer.setLocation(position);
  }

  return {
    init: function() {
      this.getlocation()
    },
    getlocation: function() {
      return new Promise(function(resolve, reject) {
        if ("geolocation" in navigator) {
          /* geolocation is available */
          if (navigator.geolocation) {
            var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            };
            navigator.geolocation.getCurrentPosition((position) => {
              if (position) {
                let coords = position.coords;
                let curatedPosition = {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  isPositionAvailable: true
                }
                resolve(curatedPosition)
              }
            }, (error) => {

              if(navigator.geolocation) {
                resolve({isPositionAvailable: true})
              } else {
                logger.logError(error.message)
                reject(error);
              }
            }, options)
          } else {
              reject(false);
          }
        } else {
          reject(false);
        }
      });
    }
  }

})(Location || {});


export default Location;
