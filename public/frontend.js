var viewMap = document.getElementById("viewMap");

viewMap.addEventListener('click', function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
                console.log("YES ITS WORKING!!!");
                // console.log(request.responseText);
                // var d3JSON = request.responseText;
                wrapped();
        }
    };
    request.open('GET', '/viewmap', true);
    request.send();

});

    function wrapped(){


      var width = 960,
          height = 500;

      var color = d3.scale.category10();
          console.log(color.range())  ;
      var force = d3.layout.force()
          .charge(-2000)
          .linkDistance(200)
          .size([width, height]);

      var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height);


d3.json("/gitHubUsers.json", function(error, graph) {
    if (error) throw error;

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) {
            return Math.sqrt(d.value);
        });

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        
        .call(force.drag);


    node.append("circle")
        .attr("r", "40")
        .style("fill", function(d) {
          return d.group == 3  ? "green" : d.group ==2 ? "orange" : d.group == 4 ? "red" : "blue";
        })


    node.append('text')
        .attr("class", "nodetext")
        .attr("dx", 40)
        .attr("dy", 40)
        .style("fill", "black")
        .text(function(d) {
            return d.name
        });

    node.append("svg:image")
        .attr("xlink:href", function(d) {
            return d.img;
        })
        .attr("x", function(d) {
            return -25;
        })
        .attr("y", function(d) {
            return -25;
        })
        .attr("height", 50)
        .attr("width", 50)
        .attr("class", "userPics")
        .style("border-radius", "50px")
        .on('mouseenter', function() {
            // select element in current context
            d3.select(this)
                .transition()
                .attr("x", function(d) {
                    return -60;
                })
                .attr("y", function(d) {
                    return -60;
                })
                .attr("height", 100)
                .attr("width", 100);
        })
        .on('mouseleave', function() {
            d3.select(this)
                .transition()
                .attr("x", function(d) {
                    return -25;
                })
                .attr("y", function(d) {
                    return -25;
                })
                .attr("height", 50)
                .attr("width", 50);
        });









    force.on("tick", function() {
        link.attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });

        node.attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            });
        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    });
});
}
