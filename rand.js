//appending div
// 


    /////////////////////
    // dot mouseover events - prettier than what's present
    // const infoWindow = d3.select("g")
    //   .append("div")
    //   .attr("class", "window")
    //   .style("background-color", "black")
    //   .style("padding", "2rem")
    //   .style("color", "black")

    // const showInfo = (e, d) => {
    //   // console.log(d) //mouseover data info
    //   const info =
    //     `Year: ${d.year} <br>
    //   PM25: ${d.pm25} <br>`

    //   // infoWindow.transition()
    //   // .duration(2)
    //   infoWindow.style("opacity", 1)
    //     .html(infoWindow)
    //     // .style("left", (d3.e.pageX) + "px")
    //     // .style("top", (d3.e.pageY) + "px")
    //     .style("display", "inline-block")
    // };

    // const hideWindow = () => {
    //   infoWindow
    //     // .transition()
    //     // .duration(200)
    //     .style("opacity", 0)
    // }
  /////////////////








//v4 useless notes

// d3.csv("https://raw.githubusercontent.com/cowfish813/D3.js/master/csv%20files/san-francisco%2C%20california%2C%20usa-air-quality.csv").then(function(d, error) {
//   // if (error) throw error,
//   // console.log(d),
//   // function (d) {
//   //   // console.log(d3.timeParse("%Y/%m/%d")(d.date))
//   //   return { date: d3.timeParse("%Y/%m/%d")(d.date), pm25: d[" pm25"] } //in brackets because it's a string
//   // },
//   (d) => {
//     return { date: d3.timeParse("2018/%m/%d")(d.date), pm25: d[" pm25"] } //change year
//   },

//   // Now I can use this dataset:
//   (data) => {
//     // console.log(data)
//     // Add X axis --> it is a date format


//     svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));
//     // Add Y axis


//     svg.append("g")
//       .call(d3.axisLeft(y));

//     // Add the line
//     svg
//       .append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "#69b3a2")
//       .attr("stroke-width", 1.5)
//       .attr("d", d3.line()
//         .x((d) => { return x(d.date) })
//         .y((d) => { return y(d.pm25) })
//       )
//     // Add the points
//     svg
//       .append("g")
//       .selectAll("dot")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", (d) => { return x(d.date) })
//       .attr("cy", (d) => { return y(d.pm25) })
//       .attr("r", 5)
//       .attr("fill", "#69b3a2")
//   }});




// d3.csv("https://raw.githubusercontent.com/cowfish813/D3.js/master/csv%20files/san-francisco%2C%20california%2C%20usa-air-quality.csv",

//   (d) => {
//     return { date: d3.timeParse("2019/%m/%d")(d.date), pm25: d[" pm25"] } //change year
//   },

//   // Now I can use this dataset:
//   function (data) {
//     // console.log(data)
//     // Add X axis --> it is a date format
//     var x = d3.scaleTime()
//       .domain(d3.extent(data, function (d) { return d.date; }))
//       .range([0, width]);
//     svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));
//     // Add Y axis
//     var y = d3.scaleLinear()
//       .domain([0, 240]) //use a Math.max(data.)something instead of 2nd arg
//       .range([height, 0]);
//     svg.append("g")
//       .call(d3.axisLeft(y));
//     // Add the line
//     svg.append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "#ff0000")
//       .attr("stroke-width", 1.5)
//       .attr("d", d3.line()
//         .x(function (d) { return x(d.date) })
//         .y(function (d) { return y(d.pm25) })
//       )
//     // Add the points
//     svg
//       .append("g")
//       .selectAll("dot")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", function (d) { return x(d.date) })
//       .attr("cy", function (d) { return y(d.pm25) })
//       .attr("r", 5)
//       .attr("fill", "#ff0000")
//   });




//   d3.csv("https://raw.githubusercontent.com/cowfish813/D3.js/master/csv%20files/san-francisco%2C%20california%2C%20usa-air-quality.csv",

//   (d) => {
//     return { date: d3.timeParse("2015/%m/%d")(d.date), pm25: d[" pm25"] } //change year
//   },

//   // Now I can use this dataset:
//   function (data) {
//     // console.log(data)
//     // Add X axis --> it is a date format
//     var x = d3.scaleTime()
//       .domain(d3.extent(data, function (d) { return d.date; }))
//       .range([0, width]);
//     svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));
//     // Add Y axis
//     var y = d3.scaleLinear()
//       .domain([0, 240]) //use a Math.max(data.)something instead of 2nd arg
//       .range([height, 0]);
//     svg.append("g")
//       .call(d3.axisLeft(y));
//     // Add the line
//     svg.append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "#0000ff")
//       .attr("stroke-width", 1.5)
//       .attr("d", d3.line()
//         .x(function (d) { return x(d.date) })
//         .y(function (d) { return y(d.pm25) })
//       )
//     // Add the points
//     svg
//       .append("g")
//       .selectAll("dot")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", function (d) { return x(d.date) })
//       .attr("cy", function (d) { return y(d.pm25) })
//       .attr("r", 5)
//       .attr("fill", "#0000ff")
//   });
