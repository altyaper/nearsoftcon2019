import * as d3 from './lib/d3.v3';
import color from './lib/color';

const w = window.innerWidth
const h = window.innerHeight

const svg = d3.select('.dots')
  .append('svg')
    .attr('width', w)
    .attr('height', h)

let circle = svg.selectAll('circle')

const force = d3.layout.force()
  .size([w,h])
  .on('tick', () =>
    circle
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  )

const render = (members) => {
  circle = circle.data(members, d => d.id)

  circle
    .enter()
      .append('circle')
      .attr('id', d => d.id)
      .attr('fill', d => d.color)
      .attr('r', 12)

  circle
    .exit()
      .transition()
      .attr('r', 0)
      .remove()

  force
    .nodes(members)
    .start()
}


/*
  Next of all - store the data
*/

let members = []

// helpers for adding and removing members
function add ({ id, color, r}) {
  members.push({ id, color});
  render(members)
}

function remove (member) {
  members = members.filter(m => m.id != member.id)
  render(members)
}

function updateCircle (member) {
  remove(member)
  add(member)
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
  remove,
  updateCircle
};
