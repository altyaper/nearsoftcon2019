import circle from './circle';
import Reveal from './lib/reveal';
import logger from './lib/error_report';
import ctype from './circle_type';
import actions from './actions';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/atom-one-light.css';
hljs.initHighlightingOnLoad();
var state = 0;

let reveal = document.getElementsByClassName('reveal');

let e = (socket) => {

  socket.connect()
  let channel = socket.channel("room:joined", {})

  channel.join()
    .receive("ok", resp => {
      logger.logError(JSON.stringify(resp));
      console.log("Joined to channel room:joined");
    })
    .receive("error", resp => {
      logger.logError(JSON.stringify(resp));
      console.error("Error joining room:joined channel room", resp);
    });

  channel.on("user:entered", ({ user_id }) => {
    logger.logError({user_id});
    var c = ctype.gray
    c['id'] = user_id;
    circle.add(c)
    if(reveal.length) {
      state = Reveal.getState();
      channel.push('change:slide', { slide: state})
    }
  });

  channel.on("user:leave", ({ user_id }) => {
    logger.logError(JSON.stringify({leave: 'user leaved', user_id}));
    circle.remove({id: user_id});
  });

  channel.on("new:ping", (user) => {
    console.log(user.body, user.user);
  });

  channel.on('change:slide', ({ slide }) => {
    if(!reveal.length) {
        logger.logError({change_slide: slide});
        actions.actions(slide, socket, channel);
    }
  });

  channel.on('location:api', ({position, user_id}) => {
    circle.updateCircleLocation(user_id, position.position)
  });

  channel.on('battery:api', ({ battery, user_id }) => {
    if(reveal.length) {
      circle.updateCircleBattery(user_id, battery.battery);
    }
  });

  channel.on('orientation:api', ({ orientation, user_id}) => {
    if(reveal.length) {
      circle.updateCircleOrientation(user_id, orientation.orientation);
    }
  })

  channel.on('audiovideo:api', ({ audiovideo, user_id}) => {
    if(reveal.length) {
      circle.updateCircleAudioVideo(user_id, audiovideo.audiovideo);
    }
  });

  channel.on('ambient:api', ({ ambient, user_id}) => {
    if(reveal.length) {
      circle.updateCircleAmbient(user_id, ambient.ambient);
    }
  });


  channel.on('ppt:default', () => {
    if(reveal.length) {
      circle.setDefault();
    }
  })

  channel.on("visibility:change", ({visibility, user_id}) => {
    circle.update(user_id, ctype.gray);
  });

  // Verify is speaker screen is on
  if(reveal.length) {

    Reveal.initialize({
      controls: true,
      hash: true
    });

    Reveal.addEventListener( 'slidechanged', function( event ) {
      state = Reveal.getState();
      channel.push('change:slide', { slide: state})
    });
  }

  return socket;

}

export default e;
