import React from 'react';
import { scaleBand, scaleLinear } from 'd3';
import { Header } from 'semantic-ui-react';
import Axes from './Axes.jsx';
import Bars from './Bars.jsx';

const styles = {
  width: 500,
  height: 300,
  padding: 30,
};

const empData = [
  { name: 'Tommy', sales: 21, year: 1984 },
  { name: 'Kim', sales: 81, year: 1985 },
  { name: 'Jason', sales: 25, year: 1987 },
  { name: 'Zach', sales: 26, year: 1986 },
  { name: 'Trini', sales: 11, year: 1987 },
  { name: 'Billy', sales: 10, year: 1990 },
];

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const margins = {
      top: 50,
      right: 20,
      bottom: 100,
      left: 60,
    };

    const svgDimensions = {
      width: 800,
      height: 500,
    };

    // const maxValue = Math.max(...movieData.map(d => d.value));
    const maxValue = Math.max(...empData.map(d => d.sales));
    // scaleBand type
    const xScale = this.xScale
      .padding(0.5)
      .domain(empData.map(d => d.name))
      .range([margins.left, svgDimensions.width - margins.right]);

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top]);

    return (
      <div>
        <Header size="large">Sales By Team Members</Header>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <Axes
            scales={{ xScale, yScale }}
            margins={margins}
            svgDimensions={svgDimensions}
          />
          <Bars
            scales={{ xScale, yScale }}
            margins={margins}
            data={empData}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
          />
        </svg>
      </div>
    );
  }
}
