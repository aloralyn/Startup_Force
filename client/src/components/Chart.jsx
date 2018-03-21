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

const movieData = [
  { title: 'Terminator', value: 21, year: 1984 },
  { title: 'Commando', value: 81, year: 1985 },
  { title: 'Predator', value: 25, year: 1987 },
  { title: 'Raw Deal', value: 26, year: 1986 },
  { title: 'The Running Man', value: 11, year: 1987 },
  { title: 'Total Recall', value: 44, year: 1990 },
  { title: 'Terminator 2', value: 0, year: 1991 },
  { title: 'Last Action Hero', value: 22, year: 1993 },
  { title: 'True Lies', value: 51, year: 1994 },
  { title: 'Eraser', value: 29, year: 1996 },
  { title: 'Terminator 3', value: 2, year: 2003 },
];

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
    };
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 };
    const svgDimensions = { width: 800, height: 500 };
    const maxValue = Math.max(...movieData.map(d => d.value));
    // scaleBand type
    const xScale = this.xScale
      .padding(0.5)
      .domain(movieData.map(d => d.title))
      .range([margins.left, svgDimensions.width - margins.right]);

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])
    return (
      <div>
        <Header size="large">Chart</Header>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <Axes
            scales={{ xScale, yScale }}
            margins={margins}
            svgDimensions={svgDimensions}
          />
          <Bars
            scales={{ xScale, yScale }}
            margins={margins}
            data={movieData}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
          />
        </svg>
      </div>
    );
  }
}
