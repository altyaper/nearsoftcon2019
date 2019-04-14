import viewer from './viewer';
import logger from './lib/error_report';
import Battery from './lib/battery';

let actions = (action, socket, channel) => {
  // viewer.setSlideClass(action);
  switch (action) {
    case 8:
      viewer.changeColorGray()
      break;
    case 10:
      Battery.init();
      Battery.getBattery().then((battery) => {
          if(battery) {
            channel.push("battery:api", { battery });
          }
      });
      break;
    default:

  }
}

export default {
  actions
}
