import logger from './error_report';

var Battery = (function(self) {
  var chargingStateEl = document.getElementById('chargingState');
  var levelEl = document.getElementById('level');
  var batterySlot = document.getElementById('battery-slot');
  var chargingTimeWrapper = document.getElementById('chargingTime')
  var batteryWrapper = document.getElementById('battery-wrapper')
  var battery = null;

  self.updateBatteryUI = function updateBatteryUI(battery) {
    let batteryLevel = battery.level;
    let chargingTime = battery.chargingTime;
    levelEl.textContent = (Math.round(batteryLevel * 100)) + '%';
    batterySlot.setAttribute("style", "width: " + (batteryLevel * 100) + "%");
    var body = document.getElementsByTagName("BODY")[0];
    if (battery.charging === true) {
      chargingStateEl.textContent = 'Cargando';
      body.classList.remove("dark-theme");
      body.classList.add("bright");
    } else if (battery.charging === false) {
      chargingStateEl.textContent = 'Descargando';
      body.classList.remove("bright");
      body.classList.add("dark-theme");
    }
  }

  self.monitorBattery = function monitorBattery(battery) {
    // Update the initial UI.
    self.battery = battery;
    self.updateBatteryUI(battery);

    // Monitor for futher updates.
    battery.addEventListener('levelchange',
      self.updateBatteryUI.bind(null, battery));
    battery.addEventListener('chargingchange',
      self.updateBatteryUI.bind(null, battery));
    battery.addEventListener('dischargingtimechange',
      self.updateBatteryUI.bind(null, battery));
    battery.addEventListener('chargingtimechange',
      self.updateBatteryUI.bind(null, battery));
  }

  return {
    init: function() {
      if ('getBattery' in navigator) {
        navigator.getBattery().then(self.monitorBattery);
      } else {
        batteryWrapper.classList.add('not-supported');
        logger.logError('The Battery Status API is not supported');
      }
    },
    getBattery: function() {
      return new Promise((resolve, reject) => {
        navigator.getBattery().then((battery) => {
          resolve(battery);
        });
      });
    }
  }

})(Battery || {});

export default Battery;
