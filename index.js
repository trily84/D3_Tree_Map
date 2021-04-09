// let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
// let educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"

// let countyData
// let educationData

// colorData = ["#053959", "#164c6e", "#356685", "#57819c", "#7b9aad", "#9cafba", "#a9bcc7"]

// function createMap() { 
    
// }

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
        if (category == "2600") {
            return "#ba776e"
        }
        if (category == "Wii") {
            return "#9bafd4"
        }
        if (category == "NES") {
            return "#c71053"
        }
        if (category == "GB") {
            return "#9e8942"
        }
        if (category == "DS") {
            return "#d18ea7"
        }
        if (category == "X360") {
            return "#79549c"
        }
        if (category == "PS4") {
            return "#a1b8bf"
        }
        if (category == "PS3") {
            return "#769eab"
        }
        if (category == "PS2") {
            return "#457b8c"
        }
        if (category == "PS") {
            return "#1e6175"
        }
        if (category == "SNES") {
            return "#6e6f85"
        }
        if (category == "GBA") {
            return "#cacbde"
        }
        if (category == "3DS") {
            return "#999177"
        }
        if (category == "N64") {
            return "#756a45"
        }
        if (category == "XB") {
            return "#c2a9d9"
        }
        if (category == "PC") {
            return "#856211"
        }
        if (category == "PSP") {
            return "#5f8769"
        }
        if (category == "XOne") {
            return "#76de91"
        }
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


  let legend = d3.selectAll("legend")
    .append('g')
    .selectAll('g')
    .data(root.leaves())
    .enter()
    .append('g')
    
    legend  
    .append("rect")
        .attr('x', 500)
        .attr('y', 500)
        .attr('width', 200)
        .attr('height', 200)
        .style("fill", "black")
 
})


