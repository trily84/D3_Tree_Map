// fetch data from json file
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
	.then(response => response.json())
	.then(response => {
        const baseTemp = response.baseTemperature
        const data = response.monthlyVariance
        createBar(data, baseTemp)
    })


function createBar(data, baseTemp) { 

    // create title using base temperature provided in JSON
    document.getElementById("baseTemp").innerHTML = "1753 - 2015 Base Temperature: " + baseTemp + "&#176; " + "C"

    var w = 900
    var h = 600
    var padding = 100

    // console.log(data)

    // create svg element to contain everything relate to the heat bars
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

    var valueX = data.map(x => x.year)
    maxX = Math.max(...valueX)
    minX = Math.min(...valueX)

    const valueY = data.map(x => x.month)
    maxY = Math.max(...valueY)
    minY = Math.min(...valueY)

    const xScale = d3.scaleLinear()
    .domain([minX, maxX])
    .range([0, w - padding*2])

    const yScale = d3.scaleLinear()
    .domain([maxY, 0])
    .range([h, padding*2])

    var barWidth = [(w - (padding*2)) / (valueX.length / 12)]
    var barHeight = (h - (padding*2)) / 12

    var tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style('opacity', 0);

    //create heat bars
    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => ((Math.floor(i / 12) + 1) * barWidth) + padding)
    .attr("y", (d, i) => ((i % 12) * barHeight) + padding)
    .attr("width", barWidth)
    .attr("height", barHeight)
    .attr("fill", (d) => {
        if (d.variance < -5)
        return "#751CF1"
        if (d.variance > -5 && d.variance < -4)
        return "#301CF1"
        if (d.variance > -4 && d.variance < -3)
        return "#1C4AF1"
        if (d.variance > -3 && d.variance < -2)
        return "#1C98F1"
        if (d.variance > -2 && d.variance < -1)
        return "#1CE9F1"
        if (d.variance > -1 && d.variance < 0)
        return "#F1E71C"
        if (d.variance > 0 && d.variance < 1)
        return "#F1AF1C"
        if (d.variance > 1 && d.variance < 2)
        return "#F1801C"
        if (d.variance > 2 && d.variance < 3)
        return "#F1411C"
        if (d.variance > 3 && d.variance < 4)
        return "#581845"
        else return "#c23700"
    })
    .on("mouseover", function(event, d) {
        // console.log(d)
        tooltip.style("opacity", .75)
        tooltip.html(d.year + " "
        + "(" + d.month + ")" + "<br>" 
        + "Temp:" + " " + (d.variance + 8).toFixed(2) + "&#176; " + "C" + " " + "<br>" 
        + "Variance: " + d.variance)
        tooltip.style("left", xScale(d.year) - 250 + "px")
        tooltip.style("top", yScale(d.month) - 750 + "px")
        tooltip.style("color", "black")
    })
    .on("mouseout", function(event, d) {
        tooltip.style("opacity", 0)
      })

    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // create x axis // tickFormat used for tick display along axis
    const xAxis = d3.axis(xScale).tickFormat(d3.format("d"));
    svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(100 , 500)")
    .call(xAxis);

    // create y axis
    const yAxis = d3.axisLeft(yScale).tickFormat((d, i) => month[month.length - i])
    svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(100, -100)")
    .call(yAxis);

}