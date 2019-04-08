let actions = (action, socket, channel) => {
  switch (action) {
    case 1:
      if (document.visibilityState) {
        window.addEventListener('visibilitychange', () => {
          channel.push('visibility:change', {visibility: document.visibilityState});
        });
      }
      break;
    case 2:
        channel.push('api:sound');
      break;
    case 3:
      console.log('API de geolocalizacion');
      break;
    case 4:
    // window.addEventListener('visibilitychange', () => {
    //   channel.push('visibility:change', {visibility: window.visibilityState});
    // });
      break;
    default:

  }
}

export default {
  actions
}
