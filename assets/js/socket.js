import {Socket} from "phoenix"

const w = window.innerWidth
const h = window.innerHeight
let members = [];

const svg = d3.select('.dots')
  .append('svg')
    .attr('width', w)
    .attr('height', h)

let circle = svg.selectAll('circle')

const force = d3.layout.force().size([w,h]).on('tick', () => {
  circle.attr('cx', d => d.x).attr('cy', d => d.y)
});

const render = (members) => {
  circle = circle.data(members, d => d.id)

  circle
    .enter()
      .append('circle')
      .attr('fill', d => d.color)
      .attr('r', 12)
      .call(force.drag)

  circle
    .exit()
      .transition()
      .attr('r', 0)
      .remove()

  force
    .nodes(members)
    .start()
}

const update = (items) => {
  circles = circles.data(items, d => d.id)

  circles
    .enter()
      .append('circle')
      .attr('fill', d => d.color)
      .attr('r', Math.floor(Math.random() * 6) + 1)

  circles
    .exit()
      .transition()
      .attr('r', 0)
      .remove()
}

function add ({ id, color}) {
  members.push({id, color});
  render(members)
}

const removeMember = (member) => {
  members = members.filter(m => m.id != member.id)
  update(members)
}

render([])

let randomColor = () => {
  var random = Math.floor(Math.random() * Math.floor(2));
  return (random == 0) ? '#00FFC5' : '#F2F0F3';
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let socket = new Socket("/socket", {params: {token: window.userToken, user_id: window.userToken}})

socket.connect()

let channel = socket.channel("room:joined", {})

channel.join({id: 1})
  .receive("ok", resp => {
  })
  .receive("error", resp => {
  });

channel.on("user:entered", (userId) => {
  add({id:userId, color: '#F2F0F3'})
});

channel.on("user:leave", (user_id) => {
  removeMember({id: user_id})
});

export default socket
