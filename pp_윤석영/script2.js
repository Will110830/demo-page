var   w = 1000,
      h =  800,
      circleWidth = 5; 
 

var palette = {
      "lightgray": "#E5E8E8",
      "gray": "#708284",
      "mediumgray": "#536870",
      "blue": "#3B757F"
  }

var colors = d3.scale.category20();

var nodes = [
      { name: "멘탈 케어"},
      { name: "대본집", target: [0], value: 58 },
      { name: "판타지", target: [0, 1], value: 65 },  
      { name: "자기계발", target: [0, 1, 2], value: 52 },
      { name: "드라마/영화 원작", target: [0, 3], value: 48 }, 
      { name: "굿즈", target: [0,3,4], value: 40 }, 
      { name: "토익", target: [0,3,4,5], value: 36 },
      { name: "힐링", target: [0, 1, 2], value: 52 },
      { name: "에세이", target: [0, 1, 2, 8], value: 42 },
      { name: "미라클모닝", target: [0,1,2], value: 35 },
      { name: "저속노화", target: [0,1,2,3,9], value: 67 },
      { name: "로맨스", target: [0,1,2,3,4,5,6,7,8,10], value: 68 },
      { name: "사주", target: [0,1,2,7,8 ], value: 16 },
      { name: "필사", target: [0,1,2,7,8], value: 25 },
      { name: "심리학", target: [0,1,2,3,4,5,6,7,8,9,10,11,12], value: 45 },
      { name: "시집", target: [0,1,2,7,8], value: 27 },
      { name: "스포츠", target: [0,1,2,12], value: 57 },
      { name: "베이킹", target: [0,9,10], value: 20 },
      { name: "각본", target: [0,9,10], value: 37 },
];

var links = [];

for (var i = 0; i < nodes.length; i++){
      if (nodes[i].target !== undefined) { 
            for ( var x = 0; x < nodes[i].target.length; x++ ) 
              links.push({
                  source: nodes[i],
                  target: nodes[nodes[i].target[x]]  
              });
      };
};


var myChart = d3.select('body')
      .append("div")
        .classed("svg-container", true)
      
      .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1000 800")
        .classed("svg-content-responsive", true)


var force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .gravity(0.1)
      .charge(-1000)
      .size([w,h]); 

      var link = myChart.selectAll('line') 
            .data(links).enter().append('line')
            .attr('stroke', palette.lightgray)
            .attr('strokewidth', '1');

      var node =  myChart.selectAll('circle')  
            .data(nodes).enter() 
            .append('g') 
            .call(force.drag); 

     
     node.append('circle')
            .attr('cx', function(d){return d.x; })
            .attr('cy', function(d){return d.y; })
            .attr('r', function(d,i){
                  console.log(d.value);
                  if ( i > 0 ) {
                        return circleWidth + d.value; 
                  } else {
                        return circleWidth + 35; 
                  }
            })
            .attr('fill', function(d,i){
                  if ( i > 0 ) {
                        return colors(i);
                  } else {
                        return '#fff';
                  }
            })
            .attr('strokewidth', function(d,i){
                  if ( i > 0 ) {
                        return '0';
                  } else {
                        return '2';
                  }
            })
            .attr('stroke', function(d,i){
                  if ( i > 0 ) {
                        return '';
                  } else {
                        return 'black';
                  }
            });


      force.on('tick', function(e){ 
            node.attr('transform', function(d, i){
              return 'translate(' + d.x + ','+ d.y + ')'
            })

          link 
              .attr('x1', function(d){ return d.source.x; }) 
              .attr('y1', function(d){ return d.source.y; })
              .attr('x2', function(d){ return d.target.x; })
              .attr('y2', function(d){ return d.target.y; })
      });


      node.append('text')
            .text(function(d){ return d.name; })
            .attr('font-family', 'Raleway', 'Helvetica Neue, Helvetica')
            .attr('fill', function(d, i){
              console.log(d.value);
                  if ( i > 0 && d.value < 10 ) {
                        return palette.mediumgray;
                  } else if ( i > 0 && d.value >10 ) {
                        return palette.lightgray;
                  } else {
                        return palette.blue;
                  }
            })
            .attr('text-anchor', function(d, i) {
                  return 'middle';
            })
            .attr('font-size', function(d, i){
                  if (i > 0) {
                        return '.8em';
                  } else {
                        return '.9em';    
                  }
            }) 

force.start();