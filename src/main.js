let w = 800;
let h = 400;

let dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
                10, 8, 1, 22, 16, 16, 10, 12, 13, 9];

let xScale = d3.scaleBand()
               .domain(d3.range(dataset.length))
               .rangeRound([0, w])
               .paddingInner(0.05);
let yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset)])
               .range([0, h]);
let svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
       return xScale(i);
   })
   .attr("y", function(d) {
       return h - yScale(d);
   })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d) {
       return yScale(d);
   })
   .attr("fill", function(d, i) {
       return "rgb(" + Math.round(i / dataset.length * 250) + ", 0, " + Math.round(d * 10) + ")";
   });
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
       return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
       return xScale(i) + xScale.bandwidth() / 2;
   })
   .attr("y", function(d) {
       return h - yScale(d) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");
d3.select("p")
  .on("click", function() {
      for (let i = 0; i < dataset.length; i++) {
          dataset[i] = Math.floor(1 + Math.random() * 25);
      }
      svg.selectAll("rect")
         .data(dataset)
         .transition()
         .delay(function (d, i) {return i * 100;})
         .duration(600)
         .attr("y", function(d) {
              return h - yScale(d);
          })
          .attr("height", function(d) {
              return yScale(d);
          })
          .attr("fill", function(d, i) {
              return "rgb(" + Math.round(i / dataset.length * 250) + ", 0, " + Math.round(d * 10) + ")";
          });
      svg.selectAll("text")
         .data(dataset)
         .transition()
         .delay(function (d, i) {return i * 100;})
         .duration(600)
         .text(function(d) {
             return d;
         })
         .attr("x", function(d, i) {
             return xScale(i) + xScale.bandwidth() / 2;
         })
         .attr("y", function(d) {
             return h - yScale(d) + 14;
         });
  });
