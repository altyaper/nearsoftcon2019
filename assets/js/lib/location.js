import logger from './error_report';

let Location = ((self) => {

  // function setMap(lat, lng) {
  //   logger.logError(lat, lng);
  //   var map;
  //   var selector = document.getElementById('map');
  //   var uluru = { lat, lng };
  //   console.log(lat, lng);
  //   // map = new google.maps.Map(selector, {
  //   //   center: uluru,
  //   //   zoom: 8
  //   // });
  //   // var marker = new google.maps.Marker({position: uluru, map: map});
  // }

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
    setMap(position.coords.latitude, position.coords.longitude);
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
            if (navigator.geolocation.getCurrentPosition) {
              var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              };
              navigator.geolocation.getCurrentPosition((position) => {
                resolve(position)
              }, (error) => {
                reject(error);
              }, options)
            } else {
              reject(false);
            }
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
