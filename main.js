var histogram =require("wink-statistics").stats.histogram;
var x=[];
var y =[];
var max = require("wink-statistics").stats.max;
var min = require("wink-statistics").stats.min;

var margin = 50;
var width = 600;
var height = 600;
var padding = 10;
var value;
var y_max;


d3.csv("flower.csv").then(function(data)
{

    var number = +prompt("Press the number for the following histogram"+
                    "\n Press 1 for sepal_length histogram"+
                    "\n Press 2 for sepal_width histogram"+
                    "\n Press 3 for petal_length histogram"+
                    "\n Press 4 for petal_width histogram",);

  

    switch(number)
    {
      case 1:
      value = data.map(function(i)
      {
        return +(i.sepal_length);
      });
      break;

      case 2:
      value = data.map(function(i)
      {
        return +(i.sepal_width);
      });
      break;

      case 3:
      value = data.map(function(i)
      {
        return +(i.petal_length);
      });
      break;

      case 4:
      value = data.map(function(i)
      {
        return +(i.petal_width);
      });
      break;

      default:
      alert("the input you are giving is invalid");
    }

    value.sort();
    value = histogram(value);
    for (key in value.classes)
    {
      //console.log(value.classes[key]);
      x.push(value.classes[key].min+"to"+value.classes[key].max); 
    }
  
    y= value.frequencies;

    y_max = max(y);
    //console.log(x);
    // console.log(y);
    //console.log(y_max);

    var svg = d3.select("body")
            .append("svg")
            .attr("width",width+padding)
            .attr("height",height+padding);

  var y_scale = d3.scaleLinear()
                .domain([0,y_max+3])
                .range([height,0]);

  var barchart = svg.selectAll("rect")
                  .data(y)
                  .enter()
                  .append("rect")
                  .attr("y",function(d)
                  {
                    
                    //console.log(y_scale(d));
                    return  y_scale(d);
                  })
                  .attr("height",function(d)
                  {
                    //console.log(height-y_scale(d));
                    return height-y_scale(d);
                  })
                  .attr("width",margin-padding)
                  .attr("transform",function(d,i)
                  {
                    var translate = [((margin*i)+(3*padding)),0];
                    return "translate("+translate+")";
                  }).
                  attr("fill","blue");


  var text = svg.selectAll("text")
              .data(y)
              .enter()
              .append("text")
              .text(function(d)
              {
                //console.log(d);
                return d;
              })
              .attr("y",function(d,i)
              {
                return y_scale(d)-2;
              })
              .attr("x",function(d,i)
              {
                return (i*margin)+(3*padding);
              })
              .attr("stroke","red");




  svg.selectAll("body")
   .append("text")
   .data(x)
   .enter()
   .append("text")
   .text(function(d)
    {
       //console.log(d);
       return d;
    })
   .attr("x",function(d,i)
    {
      return (i*margin)+(3*padding);
    })
   .attr("y",function(d,i)
    {
      return height-(padding);
    })
   .attr("fill","white");
   

  var y_axis = d3.axisLeft().scale(y_scale);

  svg.append("g")
   .attr("transform","translate(20,0)")
   .call(y_axis);
  
  
 });

