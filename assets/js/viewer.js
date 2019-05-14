import logger from './lib/error_report';

function changeColorGray() {
  var circle = document.getElementById('circle-viewer');
  circle.classList.toggle("gray");
}

function setLocation(location) {
  var circle = document.getElementById('circle-viewer');
  circle.innerHTML = `
    <ul class='location-info'>
      <li>Latitude: ${location.latitude}</li>
      <li>Longitude: ${location.longitude}</li>
    </ul>
  `;
}

function setSlideClass(index) {

  var circle = document.getElementById('circle-viewer');

  var classes = circle.classList.value.split(' ');
  logger.logError('quws')
  classes.filter((clazz) => {
    var regex = new RegExp("slide-[0-10]+");
  })
  circle.classList.add(`slide-${index}`);
}

export default {
  changeColorGray,
  setLocation,
  setSlideClass
}
