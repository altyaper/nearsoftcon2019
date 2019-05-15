import viewer from './viewer';
import logger from './lib/error_report';
import Battery from './lib/battery';
import Location from './lib/location.js';
import Orientation from './lib/orientation.js';

let actions = (action, socket, channel) => {
  switch (action) {
    case 9:
      viewer.changeColorGray()
      break;
    case 11:
      Battery.init();
      Battery.getBattery().then((battery) => {
          if(battery) {
            let sharedBattery = {
              charging: battery.charging,
              level: battery.level
            }
            channel.push("battery:api", { battery: sharedBattery });
          }
      });
      break;
    case 13:
      Location.init();
      Location.getlocation().then((position) => {
        if (position.isPositionAvailable) {
          logger.logError(position)
          channel.push("location:api", { position });
        }
      }).catch((error) => {
        logger.logError(error)
      });
      break;
    case 16:
      let orientation = Orientation.init();
      if(Orientation.isApiSupported()) {
        if(orientation.type) {
          logger.logError(orientation.type)
          let usableOrientation = {
            type: orientation.type,
            angle: orientation.angle
          }
          channel.push('orientation:api', { orientation: usableOrientation });
        }
      }
      break;
    default:
      channel.push("ppt:default");
  }
}

export default {
  actions
}
