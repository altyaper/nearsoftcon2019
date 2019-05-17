import logger from './lib/error_report';

var circle = document.getElementById('circle-viewer');

function reset() {
  circle.className = '';
  circle.classList.add('circle-control');
}

function changeColorRed() {
  reset();
  circle.classList.add("circle-red");
}

function changeColorGray() {
  reset();
  circle.classList.add("circle-gray");
}

function changeColorBlue() {
  reset();
  circle.classList.add('circle-blue');
}

function changeColorYellow() {
  reset();
  circle.classList.add('circle-yellow');
}

function changeColorPurple() {
  reset();
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
  changeColorRed,
  changeColorPurple,
  changeColorBlue,
  changeColorYellow,
  changeColorGray,
  setLocation,
  setSlideClass
}
