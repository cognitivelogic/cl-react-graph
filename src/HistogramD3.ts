import { extent } from 'd3-array';
import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import {
  scaleBand,
  scaleLinear,
  ScaleLinear,
  scaleOrdinal,
} from 'd3-scale';
import {
  select,
  Selection,
} from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import merge from 'deepmerge';
import get from 'lodash.get';

import colorScheme from './colors';
import attrs from './d3/attrs';
import {
  drawGrid,
  gridHeight,
  gridWidth,
  xAxisHeight,
  yAxisWidth,
} from './grid';
import {
  IAxis,
  IChartAdaptor,
  IHistogramDataSet,
  IHistogramProps,
} from './Histogram';
import tips, { makeTip } from './tip';
import {
  axis as defaultAxis,
  grid,
} from './utils/defaults';

export const formatTickTime = (axis: IAxis) => (v: string | number) => {
  return timeFormat(axis.dateFormat)(new Date(v));
};

interface IGroupDataItem {
  label: string;
  value: number;
}

type IGroupData = IGroupDataItem[][];

export const histogramD3 = ((): IChartAdaptor<IHistogramProps> => {
  let svg: Selection<any, any, any, any>;;
  let tipContainer;
  let tipContent;
  const y = scaleLinear();
  const x = scaleBand();
  const innerScaleBand = scaleBand();
  let container: any;
  let dataSets: any[];
  let gridX: any;
  let gridY: any;
  let yAxisContainer: any;
  let xAxisContainer: any;
  let xAxisLabel: any;
  let yAxisLabel: any;

  // @TODO make this a prop
  const stacked = false;

  const defaultProps: IHistogramProps = {
    axis: defaultAxis,
    bar: {
      groupMargin: 0.1,
      margin: 0,
      width: 50,
    },
    className: 'histogram-d3',
    colorScheme,
    data: {
      bins: [],
      counts: [],
    },
    delay: 0,
    domain: {
      max: null,
      min: null,
    },
    duration: 400,
    grid,
    height: 200,
    margin: {
      bottom: 0,
      left: 5,
      right: 0,
      top: 5,
    },
    stroke: {
      color: '#005870',
      dasharray: '',
      linecap: 'butt',
      width: 0,
    },
    tip: tips,
    tipContainer: 'body',
    tipContentFn: (bins: string[], i: number, d: number): string =>
      bins[i] + '<br />' + d,
    visible: {},
    width: 200,
  };

  let props: IHistogramProps;

  const HistogramD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: Partial<IHistogramProps> = {}) {
      this.mergeProps(newProps);
      this._makeSvg(el);
      this.makeGrid();
      this.makeScales();
      container = svg
        .append('g')
        .attr('class', 'histogram-container');

      this.update(el, newProps);
    },

    mergeProps(newProps: Partial<IHistogramProps>) {
      props = merge<IHistogramProps>(defaultProps, newProps);
      if (newProps.data) {
        props.data = newProps.data;
      }
      if (newProps.colorScheme) {
        props.colorScheme = newProps.colorScheme;
      }
    },

    /**
     * Make the SVG container element
     * Recreate if it previously existed
     */
    _makeSvg(el: Element) {
      if (svg) {
        svg.selectAll('svg > *').remove();
        svg.remove();
        const childNodes = el.getElementsByTagName('svg');
        if (childNodes.length > 0) {
          el.removeChild(childNodes[0]);
        }
      }
      const { margin, width, height, className } = props;
      const scale = {
        x: 1 - (margin.left / Number(width)),
        y: 1 - (margin.top / height),
      };

      // Reference to svg element containing chart
      svg = select(el).append('svg')
        .attr('class', className)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top}) scale(${scale.x},${scale.y})`);

      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
    },

    valuesCount(counts: IHistogramDataSet[]): number {
      return counts.reduce((a: number, b: IHistogramDataSet): number => {
        return b.data.length > a ? b.data.length : a;
      }, 0);
    },

    /**
     * Update a linear scale with range and domain values taken either from the compiled
     * group data
     */
    appendDomainRange(scale: ScaleLinear<number, number>, data: IGroupData): void {
      const yDomain: number[] = [];
      const { domain, margin, height } = props;
      const allCounts: number[] = data.reduce((prev: number[], next): number[] => {
        return [...prev, ...next.map((n) => n.value)];
      }, [0]);

      const thisExtent = extent<any>(allCounts, (d) => d);
      yDomain[1] = domain && domain.hasOwnProperty('max') && domain.max !== null
        ? domain.max
        : Number(thisExtent[1]);
      yDomain[0] = domain && domain.hasOwnProperty('min') && domain.min !== null
        ? domain.min
        : Number(thisExtent[0]);
      const yRange = [height - (margin.top * 2) - xAxisHeight(props.axis), 0];
      scale.range(yRange)
        .domain(yDomain);
    },

    makeScales() {
      xAxisContainer = svg.append('g').attr('class', 'x-axis');
      yAxisContainer = svg.append('g').attr('class', 'y-axis');

      xAxisLabel = svg.append('g');
      yAxisLabel = svg.append('g');
    },

    /**
     * Draw scales
     */
    _drawScales() {
      const { axis, data, margin, height } = props;
      const valuesCount = this.valuesCount(data.counts);
      const w = gridWidth(props);

      const dataLabels = data.counts.map((c) => c.label);

      x
        .domain(data.bins)
        .rangeRound([0, w])
        .paddingInner(this.groupedMargin());

      if (stacked) {
        innerScaleBand
          .domain(['main'])
          .rangeRound([0, x.bandwidth()])
          .paddingInner(this.barMargin());
      } else {
        innerScaleBand
          .domain(dataLabels)
          .rangeRound([0, x.bandwidth()])
          .paddingInner(this.barMargin());
      }
      const xAxis = axisBottom<string>(x);

      const tickSize = get(axis, 'x.tickSize', undefined);
      if (tickSize !== undefined) {
        xAxis.tickSize(tickSize);
      } else {
        if (w / valuesCount < 10) {
          // Show one in 10 x axis labels
          xAxis.tickValues(x.domain().filter((d, i) => !(i % 10)));
        }
      }
      if (axis.x.scale === 'TIME' && axis.x.dateFormat) {
        xAxis.tickFormat(formatTickTime(axis.x));
      }

      xAxisContainer
        .attr('transform', 'translate(' + (yAxisWidth(axis) + axis.y.style['stroke-width']) + ',' +
          (height - xAxisHeight(props.axis) - (margin.left * 2)) + ')')
        .call(xAxis);

      this.appendDomainRange(y, dataSets);

      const yAxis = axisLeft<number>(y).ticks(axis.y.ticks);

      const yTickSize = get(axis, 'y.tickSize', undefined);
      if (yTickSize !== undefined) {
        yAxis.tickSize(yTickSize);
      }
      if (axis.y.scale === 'TIME' && axis.y.dateFormat) {
        yAxis.tickFormat(formatTickTime(axis.y));
      }
      yAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ', 0)')
        .transition()
        .call(yAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    /**
     * Returns the margin between similar bars in different data sets
     */
    groupedMargin(): number {
      const m = get(props.bar, 'groupMargin', 0.1);
      return m >= 0 && m <= 1
        ? m
        : 0.1;
    },

    barMargin(): number {
      const m = get(props.bar, 'margin', 0);
      return m >= 0 && m <= 1
        ? m
        : 0.1;
    },

    barWidth() {
      return innerScaleBand.bandwidth();
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      bins: string[],
      groupData: IGroupData,
    ) {
      const { axis, height, width, margin, delay, duration, tip } = props;
      const barWidth = this.barWidth();

      // const borderColors = set.borderColors ? d3.scaleOrdinal(set.borderColors) : null;
      const colors = scaleOrdinal(props.colorScheme);
      const gHeight = gridHeight(props);

      const g = container
        .selectAll('g')
        .data(groupData);

      const bars = g.enter()
        .append('g')
        .merge(g)
        .attr('transform', (d: any[]) => {
          let xd = x(d[0].label);
          if (xd === undefined) {
            xd = 0;
          }
          const xdelta = yAxisWidth(axis)
            + axis.y.style['stroke-width']
            + xd;
          return `translate(${xdelta}, 0)`;
        })
        .selectAll('rect')
        .data((d) => d);

      // Don't ask why but we must reference tipContentFn as props.tipContentFn otherwise
      // it doesn't update with props changes
      const onMouseOver = (d: IGroupDataItem, i: number) => {
        const ix = bins.findIndex((b) => b === d.label);
        tipContent.html(() => props.tipContentFn(bins, ix, d.value));
        tip.fx.in(tipContainer);
      };

      bars
        .enter()
        .append('rect')
        .attr('height', 0)
        .attr('y', (d: IGroupDataItem, stackIndex: number): number => {
          const setIndex = bins.findIndex((b) => b === d.label);
          const thisSetData = groupData[setIndex];
          // @TODO stack charts
          // const offset = stackIndex > 0
          //   ? y(10)
          //   : 0;
          const offset = 0;
          return gHeight - offset;
        })
        .attr('class', 'bar')
        .on('mouseover', onMouseOver)
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer))
        .merge(bars)
        .attr('x', (d) => {
          return innerScaleBand(d.groupLabel);
        })
        .attr('width', (d) => barWidth)
        .attr('fill', (d, i) => colors(i))
        .transition()
        .duration(duration)
        .delay(delay)
        .attr('y', (d: IGroupDataItem, stackIndex: number): number => {
          // const setIndex = bins.findIndex((b) => b === d.label);
          // const thisSetData = groupData[setIndex];
          // @TODO stack charts
          // const offset = stackIndex > 0
          //   ? 5
          //   : 0;
          const offset = 0;
          return y(d.value + offset);
        })
        // Hide bar's bottom border
        .attr('stroke-dasharray',
          (d: IGroupDataItem): string => {
            const currentHeight = gHeight - (y(d.value));
            return `${barWidth} 0 ${currentHeight} ${barWidth}`;
          })
        .attr('height', (d: IGroupDataItem): number => gHeight - (y(d.value)));

      bars.exit().remove();
      g.exit().remove();

      const xText = xAxisLabel
        .selectAll('text')
        .data([axis.x.label]);

      xText.enter().append('text')
        .attr('class', 'x-axis-label')
        .merge(xText)
        .attr('transform',
          'translate(' + (Number(width) / 2) + ' ,' +
          ((height - xAxisHeight(props.axis) - (margin.left * 2)) + axis.x.margin) + ')')
        .style('text-anchor', 'middle')
        .text((d) => d);

      const yText = yAxisLabel
        .selectAll('text')
        .data([axis.y.label]);

      yText.enter().append('text')
        .attr('class', 'y-axis-label')
        .merge(yText)
        .attr('transform', 'rotate(-90)')
        .attr('y', 0)
        .attr('x', 0 - (gHeight / 2 - (margin.top * 2)))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text((d) => d);
    },

    makeGrid() {
      gridX = svg.append('g')
        .attr('class', 'grid gridX');
      gridY = svg.append('g')
        .attr('class', 'grid gridY');
    },
    /**
     * Update chart
     */
    update(el: Element, newProps: Partial<IHistogramProps>) {
      if (!newProps.data) {
        return;
      }
      this.mergeProps(newProps);
      if (!props.data.bins) {
        return;
      }

      const { data, visible } = props;
      dataSets = [] as IGroupData;

      data.counts.forEach((count) => {
        count.data.forEach((value, i) => {
          if (!dataSets[i]) {
            dataSets[i] = [];
          }
          dataSets[i].push({
            groupLabel: count.label,
            label: data.bins[i],
            value: visible[data.bins[i]] !== false && visible[count.label] !== false ? value : 0,
          } as IGroupDataItem);
        });
      });

      this._drawScales();
      drawGrid(x, y, gridX, gridY, props, this.valuesCount(data.counts));
      this.updateChart(data.bins, dataSets);
    },

    /**
     * Any necessary clean up
     */
    destroy(el: Element) {
      svg.selectAll('svg > *').remove();
    },
  };
  return HistogramD3;
});
