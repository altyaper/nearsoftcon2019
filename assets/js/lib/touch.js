import logger from './error_report';
import viewer from '../viewer';

let TouchApi = ((self) => {

  return {
    init: function(channel) {
      var obj = document.getElementById('circle-viewer');
      obj.addEventListener('touchstart', function(event) {
        if (event || window.slide == 22) {
          let fingers = event.targetTouches.length;
          channel.push('touch:api', { fingers });
          switch (fingers) {
            case 0:
              viewer.changeColorGray();
              break;
            case 1:
              viewer.changeColorBlue();
              break;
            case 2:
              viewer.changeColorBlue();
              break;
            case 3:
              viewer.changeColorPurple();
              break;
            case 21:
              viewer.changeColorYellow();
              break;
            default:
              viewer.changeColorGreen();
          }
          viewer.changeColorBlue();
        }
      }, false);
      obj.addEventListener('touchmove', function() {
        channel.push('touch:api', { fingers: 21 });
        viewer.changeColorYellow();
      });
      obj.addEventListener('touchend', function(event) {
        channel.push('touch:api', { fingers: 0 });
        viewer.changeColorGray();
      })
    }
  }

})(TouchApi || {});


export default TouchApi;
