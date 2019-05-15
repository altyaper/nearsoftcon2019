import logger from './lib/error_report';

var circle = document.getElementById('circle-viewer');

function changeColorGray() {
  circle.classList.remove('circle-yellow');
  circle.classList.remove('circle-blue');
  circle.classList.remove('circle-purple');
  circle.classList.add("circle-gray");
}

function changeColorBlue() {
  circle.classList.remove('circle-gray');
  circle.classList.remove('circle-purple');
  circle.classList.remove('circle-yellow');
  circle.classList.add('circle-blue');
}

function changeColorYellow() {
  circle.classList.remove('circle-gray');
  circle.classList.remove('circle-purple');
  circle.classList.remove('circle-blue');
  circle.classList.add('circle-yellow');
}

function changeColorPurple() {
  circle.classList.remove('circle-gray');
  circle.classList.remove('circle-yellow');
  circle.classList.remove('circle-blue');
  circle.classList.add('circle-purple');
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
  changeColorPurple,
  changeColorBlue,
  changeColorYellow,
  changeColorGray,
  setLocation,
  setSlideClass
}
