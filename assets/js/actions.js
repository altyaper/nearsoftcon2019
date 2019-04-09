import viewer from './viewer';

let actions = (action, socket, channel) => {
  viewer.setSlideClass(action);
  switch (action) {
    case 8:
      viewer.changeColorGray()
      break;
    case 9:

      break;
    case 10:

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;
      viewer.setLocation(crd);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function handlePermission() {
      navigator.permissions.query({name:'geolocation'}).then((result) => {
        if (result.state == 'granted') {
          report(result.state);
          navigator.geolocation.getCurrentPosition(success, error, options);
        } else if (result.state == 'prompt') {
          report(result.state);
          navigator.geolocation.getCurrentPosition(success, error, options);
        } else if (result.state == 'denied') {
          report(result.state);
        }
        result.onchange = () => {
          report(result.state);
        }
      });
    }

    function report(state) {
      console.log('Permission ' + state);
    }

    handlePermission();
      break;
    default:

  }
}

export default {
  actions
}
