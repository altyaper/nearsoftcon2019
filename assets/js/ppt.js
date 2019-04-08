import circle from './circle'
import Reveal from './reveal'
import ctype from './circle_type';
import actions from './actions';

let reveal = document.getElementsByClassName('reveal');

let e = (socket) => {

  if(!reveal.length){
    return;
  }
  socket.connect()
  let channel = socket.channel("room:joined", {})

  channel.join()
    .receive("ok", resp => {
      console.log("Joined to channel room:joined");
    })
    .receive("error", resp => {
      console.error("Error joining room:joined channel room", resp);
    });

  channel.on("user:entered", ({ user_id }) => {
    var c = ctype.green
    c['id'] = user_id;
    circle.add(c)
  });

  channel.on("user:leave", ({ user_id }) => {
    circle.remove({id: user_id})
  });

  channel.on("new:ping", (user) => {
    console.log(user.body, user.user);
  });

  channel.on('change:slide', ({ slide }) => {
    actions.actions(slide, socket, channel);
  });

  channel.on('api:sound', () => {
    // if(!reveal.length) {
      // var context = new AudioContext()
      // var o = context.createOscillator()
      // o.type = "sine"
      // o.connect(context.destination)
      // o.start()
    // }
  });

  channel.on("visibility:change", ({visibility, user_id}) => {
    var c = ctype.green;
    c["id"] = user_id;
    circle.updateCircle(c);
  });

  // Verify is speaker screen is on
  if(reveal.length) {
    Reveal.initialize({
      controls: false,
      hash: true
    });

    Reveal.addEventListener( 'slidechanged', function( event ) {
      var state = Reveal.getState();
      channel.push('change:slide', {slide: state})
    });
  }

  return socket;

}

export default e;
