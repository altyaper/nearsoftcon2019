let randomColor = () => {
  var random = Math.floor(Math.random() * Math.floor(2));
  return (random == 0) ? '#00FFC5' : '#F2F0F3';
}

const gray = '#E2E2E2';
const green = '#00FFC5';

export default {
    randomColor,
    gray,
    green
}
