let randomColor = () => {
  var random = Math.floor(Math.random() * Math.floor(2));
  return (random == 0) ? '#00FFC5' : '#F2F0F3';
}

const gray = '#E2E2E2';
const green = '#00FFC5';
const greenAlpha = '#E4F9F3';
const red = '#F48383';
const redAlpha = '#F9E4E4';
const blue = '#83CBFF';
const purple = '#BC9CFF';
const yellow = '#FFEF9C';

export default {
    randomColor,
    yellow,
    purple,
    gray,
    blue,
    greenAlpha,
    green,
    red,
    redAlpha,
    greenAlpha
}
