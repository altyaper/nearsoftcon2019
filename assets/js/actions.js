import viewer from './viewer';
import logger from './lib/error_report';
import Battery from './lib/battery';
import Location from './lib/location';
import Orientation from './lib/orientation';
import AudioVideo from './lib/audio_video';
import Ambient from './lib/ambient';
import TouchApi from './lib/touch';
import AudioExample from './lib/audio_example';
import Vibration from './lib/vibration';

let actions = (action, socket, channel) => {
  switch (action) {
    case 13:
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
    case 15:
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
    case 18:
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
    case 21:
      if (AudioVideo.isApiSupported()) {
          channel.push('audiovideo:api', { audiovideo: true });
      }
      break;
    case 23:
      if (Ambient.isApiSupported()) {
        channel.push('ambient:api', { audiovideo: true });
      }
      break;
    case 25:
      TouchApi.init(channel);
      break;
    case 29:
      if(AudioExample.isApiSupported()) {
        channel.push('audioexample:api', { audioexample: true });
      }
      break;
    case 30:
      if(Vibration.isApiSupported()) {
        channel.push('vibration:api', {vibration: true })
      }
      break;
    default:
      channel.push("ppt:default");
  }
}

export default {
  actions
}
