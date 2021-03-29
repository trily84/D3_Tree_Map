let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
let educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"

let countyData
let educationData

colorData = ["#053959", "#164c6e", "#356685", "#57819c", "#7b9aad", "#9cafba", "#a9bcc7"]

function createMap() { 

    var w = 900
    var h = 650

    var tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style("opacity", 1)

    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

    svg.selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    .attr("fill", (d) => {
        let educationLevel = educationData.find(element => element.fips === d.id).bachelorsOrHigher
        if (educationLevel >= 40) {return colorData[0]}
        if (educationLevel < 40 && educationLevel >= 30) {return colorData[1]}
        if (educationLevel < 30 && educationLevel >= 20) {return colorData[2]}
        if (educationLevel < 20 && educationLevel >= 15) {return colorData[3]}
        if (educationLevel < 15 && educationLevel >= 10) {return colorData[4]}
        if (educationLevel < 10 && educationLevel >= 10) {return colorData[5]}
        if (educationLevel < 10) {return colorData[6]}

    })
    .attr("d", d3.geoPath())
    .on("mouseover", function(event, d) {
        var windowWidth = window.innerWidth;
        // console.log(windowWidth)
        // console.log(d.id)
        // console.log(educationData)
        let found = educationData.find(element => element.fips === d.id);
        // console.log(found)
        tooltip.style("opacity", 1)
        tooltip.html(found.area_name + ", " + found.state + " " + found.bachelorsOrHigher + "%")
        tooltip.style("left", event.clientX - windowWidth/4 + 385 + "px")
        tooltip.style("top", event.clientY - 30 + "px")
        tooltip.style("color", "black")
    })
    .on("mouseout", function(event, d) {
        tooltip.style("opacity", 0)
      })
}    

// convert json at URL to js object as topojson format 
d3.json(countyURL).then((data, error) => {
    if (error) {
        console.log(log)
    }
    else {
        // topojson.feature is a method to convert topojson format (more advanced)
        // to geodata format (less advanced) so d3 can draw path from it
        countyData = topojson.feature(data, data.objects.counties).features
        // console.log(countyData)
    }   
    
    d3.json(educationURL).then((data, error) => {
        if (error) {
            console.log(log)
        }
        else {
            // topojson.feature is a method to convert topojson format (more advanced)
            // to geodata format (less advanced) so d3 can draw path from it
            educationData = data
            // console.log(educationData)
            createLegend() 
            createMap() 
        }   
    })    
}
)

function createLegend() { 

    let b0 = document.querySelector("#b0"); 
    let b1 = document.querySelector("#b1"); 
    let b2 = document.querySelector("#b2"); 
    let b3 = document.querySelector("#b3"); 
    let b4 = document.querySelector("#b4"); 
    let b5 = document.querySelector("#b5"); 
    let b6 = document.querySelector("#b6"); 
      
    b0.style.backgroundColor = colorData[6] 
    b1.style.backgroundColor = colorData[5]
    b2.style.backgroundColor = colorData[4]
    b3.style.backgroundColor = colorData[3]
    b4.style.backgroundColor = colorData[2]
    b5.style.backgroundColor = colorData[1]
    b6.style.backgroundColor = colorData[0]

    // study this code below to make legend bars colors
    // var x = d3.scaleLinear().domain([2.6, 50]).rangeRound([500, 760]);

    // var color = d3
    //     .scaleThreshold()
    //     .domain(d3.range(0, 50, (50 - 2.6) / 6))
    //     .range(d3.schemeBlues[7]);            

    // var g = d3.select("body")
    //     .append("svg")
    //     .attr("width", 900)
    //     .attr("height", 50)
    //     .attr('transform', 'translate(0, 50)');

    // g.selectAll('rect')
    // .data(
    //     color.range().map(function (d) {
    //     d = color.invertExtent(d);
    //     if (d[0] === null) {
    //         d[0] = x.domain()[0];
    //     }
    //     if (d[1] === null) {
    //         d[1] = x.domain()[1];
    //     }
    //     return d;
    //     })
    // )
    // .enter()
    // .append('rect')
    // .attr('height', 10)
    // .attr('x', function (d) {
    //     return x(d[0]);
    // })
    // // .attr('y', 40)
    // .attr('width', function (d) {
    //     return x(d[1]) - x(d[0]);
    // })
    // .attr('fill', function (d) {
    //     return color(d[0]);
    // });
    
    // g.call(
    // d3.axisBottom(x)
    // .tickSize(13)
    // .tickFormat(function (x) {
    // return Math.round(x) + '%';
    // })
    // .tickValues(color.domain())
    // )
    // .select('.domain')
    // .remove();  
}