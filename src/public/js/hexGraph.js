var svg = d3.select("#hexGraph"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var randomX = d3.randomNormal(width / 2, 80),
    randomY = d3.randomNormal(height / 2, 80),
    points = d3.range(2000).map(function() { return [randomX(), randomY()]; });
var color = d3.scaleSequential(d3.interpolateLab("white", "steelblue"))
    .domain([0, 20]);
var hexbin = d3.hexbin()
    .radius(20)
    .extent([[0, 0], [width, height]]);
var x = d3.scaleLinear()
    .domain([0, width])
    .range([0, width]);
var y = d3.scaleLinear()
    .domain([0, height])
    .range([height, 0]);
g.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);
g.append("g")
    .attr("class", "hexagon")
    .attr("clip-path", "url(#clip)")
  .selectAll("path")
  .data(hexbin(points))
  .enter().append("path")
    .attr("d", hexbin.hexagon())
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("fill", function(d) { return color(d.length); });
g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).tickSizeOuter(-width));
g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(-height));
