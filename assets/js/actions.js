import viewer from './viewer';
let actions = (action, socket, channel) => {
  switch (action) {
    case 8:
      viewer.changeColorGray()
      break;
    case 9:
      // if(Battery) {
      //   Battery.getStatus((status, error) => {
      //     if(error) {
      //       console.error('Battery status is not supported');
      //       return;
      //     }
      //     console.log(status);
      //   });
      // }
      break;
    case 10:
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      alert(pos)
      var crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      alert(err)
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
      navigator.geolocation.getCurrentPosition(success, error, options);
      break;
    default:

  }
}

export default {
  actions
}
