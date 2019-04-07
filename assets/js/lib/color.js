let randomColor = () => {
  var random = Math.floor(Math.random() * Math.floor(2));
  return (random == 0) ? '#00FFC5' : '#F2F0F3';
}

const gray = '#F2F0F3';

export default {
    randomColor,
    gray
}
