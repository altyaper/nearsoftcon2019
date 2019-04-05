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

  members = circle.data(items, d => d.id)

  members
    .enter()
      .append('circle')
      .attr('fill', d => d.color)
      .attr('r', Math.floor(Math.random() * 6) + 1)

  members
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
  members = members.filter(m => {
    return m.id != member.id
  })
  render(members)
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

window.addEventListener('resize', () => {
  const w = window.innerWidth
  const h = window.innerHeight

  svg
    .attr('width', w)
    .attr('height', h)

  force
    .size([w,h])
    .start()

}, false)

export default {
  add,
  update,
  removeMember
}
