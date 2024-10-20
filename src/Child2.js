import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    this.renderBar();
  }

  componentDidUpdate() {
    this.renderBar();
  }

  renderBar() {
    var data = this.props.data2;

    console.log(data)
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left + margin.right,
      h = 300 - margin.top + margin.bottom;

    const container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var xData = data.map((item) => item.day);
    const xScale = d3.scaleBand().domain(xData).range([0, w]).padding(0.2);
    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(xScale));

    var yData = data.map((item) => item.tip);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(yData)])
      .range([h, 0]);
    container
      .selectAll(".y_axis_g")
      .data([0])
      .join('g')
      .attr("class", "y_axis_g")
      .attr("transform",`translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    container
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => xScale(d.day))
      .attr("y", (d) => yScale(d.tip))
      .attr("width", xScale.bandwidth())
      .attr("fill", "#69b3a2")
      .attr("height",(d)=> h- yScale(d.tip))
  }

  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
