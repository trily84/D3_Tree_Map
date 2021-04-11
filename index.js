color = [
  ["2600", "#ba776e"],
  ["Wii", "#9bafd4"],
  ["NES", "#c71053"],
  ["GB", "#9e8942"],
  ["DS", "#d18ea7"],
  ["X360", "#79549c"],
  ["PS4", "#a1b8bf"],
  ["PS3", "#769eab"],
  ["PS2", "#457b8c"],
  ["PS", "#1e6175"],
  ["SNES", "#6e6f85"],
  ["GBA", "#cacbde"],
  ["3DS", "#999177"],
  ["N64", "#756a45"],
  ["XB", "#c2a9d9"],
  ["PC","#856211"],
  ["PSP", "#5f8769"],
  ["XOne", "#76de91"]
  ]

let margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 900
  height = 600

// append the svg object to the body of the page
let svg = d3.select("#graph")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// read json data
d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json", function(data) {

  // Give the data to this cluster layout:
  var root = d3.hierarchy(data).sum(function(d){return d.value}) // Here the size of each leave is given in the 'value' field in input data

  // Then d3.treemap computes the position of each element of the hierarchy
  d3.treemap()
    .size([width, height])
    (root)

  var tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style('opacity', 0);

  // add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function(d) {return d.x0})
      .attr('y', function(d) {return d.y0})
      .attr('width', function(d) {return d.x1 - d.x0})
      .attr('height', function(d) {return d.y1 - d.y0})
      .style("fill", function(d) {
        // console.log(d.data.category)  
        var category = d.data.category     
        found = color.find(element => element[0] == category)
        return found[1]
      })
      .on("mouseover", function(event, d) {
        // console.log(event.data.name)
        tooltip.style("opacity", .8)
        tooltip.html(event.data.name + "<br>" + " Category: " + event.data.category + "<br>" + " Value: " + event.data.value + " billions")
        tooltip.style("left", d3.event.pageX + 40 + "px")
        tooltip.style("top", d3.event.pageY + 10 + "px")
        tooltip.style("color", "black")
      })
      .on("mouseout", function(event, d) {
        tooltip.style("opacity", 0)
      })

  // add the text labels
  let g = svg
    .selectAll('g') 
    .data(root.leaves())
    .enter()
    .append('g')
    .attr('transform', d => 'translate(' + d.x0 + ',' + d.y0 + ')')
  
  g
    .append('text')
    .selectAll('tspan')
    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter()
    .append('tspan')
    .attr('x', 4)
    .attr('y', (d, i) => 13 + i * 10)
    .text(d => d)   
 
})

  let legend = document.getElementById("legend")

  rect = color.map(i => {
    return '<div' + " " + 'style=background-color:' + i[1] + '>' + i[0] + '</div>'
  }).join('')

  legend.innerHTML = rect




