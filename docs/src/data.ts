import {
  IAxes,
  IHistogramData,
} from '../../src';
import filterRange from '../../src/colors/filterRange';

export const grid = {
  x: {
    style: {
      'stroke': '#eeAA00',
      'stroke-opacity': 0.4,
    },
    ticks: 5,
  },
  y: {
    height: 20,
    style: {
      'stroke-opacity': 0.4,
    },
    ticks: 5,
  },
};

export const data: IHistogramData = {
  bins: ['Data 1', 'Data 6', 'Data 3', 'Dat 4'],
  counts: [
    {
      data: [1, 2, 3, 4],
      label: 'DataSet 1',
    },
    {
      data: [13, 14, 15, 16],
      label: 'DataSet 2',
    },
  ],
  grid,
};

export const data2 = {
  bins: ['bin 1', 'bin 2', 'bin 3 with a long name', 'bin 4', 'bin 5', 'bin 6', 'bin 7'],
  counts: [
    {
      borderColors: ['red'],
      data: [1, 2, 3, 4, 5, 6, 7],
      label: 'Data 1',
    },
  ],
  title: 'Plot 1',
};

export const data3 = {
  bins: ['bin 1', 'bin 2', 'bin 3'],
  counts: [
    {
      borderColors: ['red'],
      colors: ['red'],
      data: [100, 50, 40],
      label: 'Data 1',
    },
    {
      borderColors: ['red'],
      colors: ['blue'],
      data: [32, 1, 5, 0],
      label: 'Data 2',
    },
  ],
};

export const axis: IAxes = {
  x: {
    height: 20,
    label: 'X Axis',
    margin: 20,
    text: {
      style: {
        'dy': '.35em',
        'text-anchor': 'start',
        'transform': 'rotate(90)',
        'x': 0,
        'y': 0,
      },
    },
    tickSize: 0,
  },
  y: {
    label: 'Y Axis!',
    style: {
      fill: 'none',
      stroke: '#eeAA00',
    },
    text: {
      style: {
        fill: '#eeAA00',
      },
    },
    tickSize: 20,
    ticks: 3,
    width: 50,
  },
};

export const theme = filterRange(['rgba(255, 113, 1, 0.5)', '#fff6ef', 'rgba(0, 169, 123, 0.5)', '#f6fffd',
  '#D7263D', 'rgba(215, 38, 61, 0.05)',
  '#0f2629', '#ededed', 'rgba(86, 180, 191, 0.5)', '#f5fbfb', '#000000', '#0f2629', '#D7263D', '#FBD7D9',
  '#ffebec', '#963540', '#22545a', '#56b4bf', '#56b4bf', '#56b4bf', '#FF7101', '#449098', '#77c3cb', '#d4eef8',
  '#ff7101', '#FF7101', '#cc5a00', '#ff8d33', '#fef9e5', '#7d5d2e', '#00a97b', '#008762', '#33ba95', '#dbf1d6',
  '#227839', '#0f5e7b', '#d4eef8', '#0f5e7b', '#F9C80E', '#007656', '#c5e5e9', '#f9c80e', '#a9a9a9',
  '#dbdbdb', '#cccccc', '#e6e6e6', '#56b4bf', '#449098', '#77c3cb', '#22545a', '#ff7101', '#cdcdcd', '#ffffff',
  '#d7263d', '#00a97b', '#888888', '#e6e6e6', '#f2f2f2', '#f4f4f4']);