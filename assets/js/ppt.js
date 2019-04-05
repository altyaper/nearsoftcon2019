import circle from './circle'

let e = (socket) => {

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
    circle.add({id: user_id, color: '#F2F0F3'})
  });

  channel.on("user:leave", ({ user_id }) => {
    circle.removeMember({id: user_id})
  });

  return socket;

}

export default e;
