import css from "../css/app.css";
import "phoenix_html";

import socket from "./socket"

import Reveal from './reveal'

Reveal.initialize({
  controls: false,
  hash: true
});

Reveal.addEventListener( 'slidechanged', function( event ) {
  var state = Reveal.getState();
});
