function logError(text) {
  console.log(text);
  text = JSON.stringify(text);
  var wrapper = document.getElementsByClassName('inner-report')[0];
  if (wrapper) {
    if (wrapper.innerHTML) {
      var currentText = text + '<br>----------------<br>' + wrapper.innerHTML;
      wrapper.innerHTML = currentText;
    } else {
      wrapper.innerHTML = text;
    }
  }
}

module.exports = {
  logError
};
