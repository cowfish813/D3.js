// require('dotenv').config()
const csvSF = "https://raw.githubusercontent.com/cowfish813/D3.js/master/csv%20files/san-francisco-arkansas%20street%2C%20san%20francisco%2C%20california-air-quality.csv";
let sensorSite = "california/san-francisco/san-francisco-arkansas-street"; //change data here to change code
const data = {};
const test = "https://raw.githubusercontent.com/cowfish813/D3.js/master/csv%20files/san-francisco%2C%20california%2C%20usa-air-quality.csv";
const token = "9c249e12bd6b8b2edc5681e555d3f5454a6488b3"; //how to without jquery/react?

const widget = () => (fetch(`https://api.waqi.info/feed/${sensorSite}/?token=${token}`)
  .then(res => (res.json()))
  .then(res => {
    if (res) {
      for (let key in res) {
        data[key] = res[key];
      };
      const aqi = data.data.aqi;
      let status = "";
      let color = "";
      if (aqi > 300) {
          status = "Hazardous";
          color ="brown";
        } else if (aqi > 200) {
          status = "Very Unhealthy";
          color ="puple";
        } else if (aqi > 151) {
          status = "Unhealthy";
          color = "red";
        } else if (aqi > 100) {
          status = "USG";
          color = "orange";
        } else if (aqi > 50) {
          status = "Moderate";
          color = "yellow";
        } else {
          status = "Good";
          color = "greenyellow";
        };
        //assembles widget without jank or preloaded elements
            //appends HTML elements to the DOM for efficient loading
        document.getElementById("aqi_widget").style.backgroundColor = color;
        document.getElementById("aqi_widget").style.border = "1px black solid";
        document.getElementById("title_conditions").innerHTML = "Conditions Today";
        document.getElementById("status").innerHTML = status;
        document.getElementById("aqi").innerHTML = aqi;
        document.getElementById("sensor_site").innerHTML = "Sensor Location:";
        document.getElementById("city").innerHTML = data.data.city.name;
    } else {
      //hide that damned key
      console.log("API limit exhausted");
    };
  })
  .catch(err => {
    console.log(err);
  }));
//makes the initial function call, setInterval re-calls function as a cb
widget();
setInterval(widget, 50000);

const margin = {top: 10, right: 30, bottom: 30, left: 50},
  width = 1080 - margin.left - margin.right
  height = 500 - margin.top - margin.bottom

const svg = d3.select('#my_dataviz')
    .append("svg") //adds svg ele
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
const parseTime = d3.timeParse(`%m/%d`);
const y = d3.scaleLinear().range([height, 0]);
const x = d3.scaleTime().range([0, width]);
const compare = {};

d3.csv(test)
  .then((data) => {
    data.forEach(d => {
      d.date = parseTime(d.date);
      d.pm25 = d[" pm25"];
      d.year = d[" year"];
  });

  //use a Math.max(data.)+ some num to round it something instead of 2nd arg
    x.domain(d3.extent(data, (d) => { 
      return d.date;
    }));

    y.domain([0, 240]); 
  
  const xaxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b"))) 
    //tickformat debugs calendar
    //sets x axis
  
  const yaxis = svg.append("g")
  .call(d3.axisLeft(y));
  // sets y axis

  const aData = d3.nest()
    .key( d => { return d.year.trim() }) //trims empty space
    .entries(data.sort((a ,b) => (a.date - b.date)));
    // groups data into years by issuing a key
  const years = aData.map(d => d.key); //array of years
  
  const colors = d3.scaleOrdinal()
    .domain(years)
    .range(d3.schemeSet2);

  const line = d3.line()
    .x(d => { return x(d.date)})
    .y(d => { return y(d.pm25)});

  const labels = svg
    .selectAll("labels")
    .data(aData)
    .enter()
    .append("g")
    .append("text")
    // .datum(d => {
    //   return ({
    //   year: d.key,
    //   value: d.values[d.values.length - 1] 
    //   })
    // })

  const showCompare = (e, d) => {
    const year = d.year.trim()
    if (compare[year]) {
      compare[year] = false;
    } else {
      compare[year] = d;
    };

    lines.attr("d", d => {

    })
      .attr("stroke", d => { return colors(compare.year) })
      .attr("stroke-width", 3)
      .attr("fill", "none");
  }; //fxn loads an object for better efficiency


  const showLine = (e, selectedLine) => {
    const hoveredYear = selectedLine.year.trim();
    const pm25 = selectedLine.pm25;

    lines.attr("d", d => {
      // console.log(d)
      if (hoveredYear === d.key) {
        labels.attr("x", 12)
          .text(d => { return (`Year: ${hoveredYear}`) })
          // .style("fill", d => { return (colors(d.year)) })
          .style("font-family", "Helvetica Neue, Helvetica, sans-serif")
          .style("font-size", 15)
          .attr('opacity', '.95')
          // .style("opacity", "1")
          .attr("transform",
            ("translate(" + x(selectedLine.date) + "," + y(selectedLine.pm25) + ")")
          );
        return line(d.values);
      }
  })
    .attr("stroke", d => { return colors(d.key) })
    .attr("stroke-width", 3)
    .attr("fill", "none");
  };

  const lines = svg.selectAll("lines")
    .data(aData, d => {
    return {
      year: d.key,
      value: d.values
    }})
    .enter()
    .append("path")
    .attr('opacity', '1')
      
  const dots = svg.append("g")
    .selectAll("dot")
    .data(data, d => {
      return {
        date: d.date,
      }
    })
    .enter()
    .append("circle")
      .attr("r", 4) //radius
      .attr("cx", d => (x(d.date)))
      .attr("cy", d => (y(d.pm25)))
      .attr('opacity', '.35')
      .style("fill", d => (colors(d.year)))
      .on("mouseover", showLine)
      .on("click", showCompare)

    /////////////////////
    // dot mouseover events - prettier than what's present
    const infoWindow = d3.select("g")
      .append("div")
      .attr("class", "window")
      .style("background-color", "black")
      .style("padding", "2rem")
      .style("color", "black")

    const showInfo = (e, d) => {
      // console.log(d) //mouseover data info
      const info =
        `Year: ${d.year} <br>
      PM25: ${d.pm25} <br>`

      // infoWindow.transition()
      // .duration(2)
      infoWindow.style("opacity", 1)
        .html(infoWindow)
        // .style("left", (d3.e.pageX) + "px")
        // .style("top", (d3.e.pageY) + "px")
        .style("display", "inline-block")
    };

    const hideWindow = () => {
      infoWindow
        // .transition()
        // .duration(200)
        .style("opacity", 0)
    }
  /////////////////

});

