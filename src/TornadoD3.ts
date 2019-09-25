import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
} from 'd3-scale';
import { Selection } from 'd3-selection';
import merge from 'lodash/merge';

import colorScheme from './colors';
import attrs from './d3/attrs';
import {
  drawHorizontalGrid,
  gridHeight,
  gridWidth,
  xAxisHeight,
  yAxisWidth,
} from './grid';
import {
  EGroupedBarLayout,
  IChartAdaptor,
} from './Histogram';
import {
  IGroupData,
  IGroupDataItem,
} from './HistogramD3';
import tips, { makeTip } from './tip';
import {
  ITornadoDataSet,
  ITornadoProps,
} from './Tornado';
import {
  barMargin,
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedMargin,
} from './utils/bars';
import {
  axis as defaultAxis,
  grid as defaultGrid,
} from './utils/defaults';
import {
  appendDomainRange,
  isStacked,
  ticks,
} from './utils/domain';
import {
  onClick,
  onMouseOut,
  onMouseOver,
} from './utils/mouseOver';
import {
  makeGrid,
  makeScales,
  makeSvg,
  sizeSVG,
  TSelection,
} from './utils/svg';
import { DeepPartial } from './utils/types';

export const maxValueCount = (counts: ITornadoDataSet[]): number => {
  return counts.reduce((a: number, b: ITornadoDataSet): number => {
    return b.data.length > a ? b.data.length : a;
  }, 0);
};

export const tornadoD3 = ((): IChartAdaptor<ITornadoProps> => {
  let svg: Selection<any, any, any, any>;;
  let tipContainer;
  let tipContent;
  const x = scaleLinear();
  const y = scaleBand();
  const innerScaleBand = scaleBand();
  let container: Selection<SVGElement, any, any, any>;
  let dataSets: IGroupData;
  let gridX: TSelection;
  let gridY: TSelection;
  let yAxisContainer: TSelection;
  let xAxisContainer: TSelection;
  let yAxisLabel: TSelection;
  let xAxisLabel: TSelection;

  const props: ITornadoProps = {
    axis: defaultAxis,
    bar: {
      groupMargin: 0.1,
      margin: 10,
      overlayMargin: 5,
      width: 50,
    },
    className: 'torando-d3',
    colorScheme,
    data: {
      bins: [],
      colorScheme: [],
      counts: [],
    },
    delay: 0,
    domain: {
      max: null,
      min: null,
    },
    duration: 400,
    grid: defaultGrid,
    groupLayout: EGroupedBarLayout.GROUPED,
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

  const TornadoD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: DeepPartial<ITornadoProps> = {}) {
      merge(props, newProps);
      svg = makeSvg(el, svg);
      const { margin, width, height, className } = props;
      sizeSVG(svg, { margin, width, height, className });
      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
      [gridX, gridY] = makeGrid(svg);
      [xAxisContainer, yAxisContainer, xAxisLabel, yAxisLabel] = makeScales(svg);
      container = svg
        .append<SVGElement>('g')
        .attr('class', 'histogram-container');

      this.update(el, newProps);
    },

    /**
    * Draw Axes
    */
    drawAxes() {
      const { bar, data, domain, groupLayout, margin, width, height, axis } = props;
      const valuesCount = maxValueCount(data.counts);
      const w = gridWidth(props);
      const h = gridHeight(props);
      const dataLabels = data.counts.map((c) => c.label);

      console.log('y domain', data.bins);
      y.domain(data.bins)
        .rangeRound([0, h])
        .paddingInner(groupedMargin(bar));

      innerScaleBand
        .domain(groupedBarsUseSameXAxisValue({ groupLayout }) ? ['main'] : dataLabels)
        .rangeRound([0, y.bandwidth()])
        .paddingInner(barMargin(props.bar));

      const xAxis = axisBottom<number>(x);
      const yAxis = axisLeft<string>(y);

      /** Y-Axis (label axis) set up */

      ticks({
        axis: yAxis,
        valuesCount,
        axisLength: h,
        axisConfig: axis.y,
        scaleBand: y,
        limitByValues: true,
      });

      yAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ', ' + margin.top + ' )')
        .call(yAxis);

      /** X-Axis (value axis) set up */
      appendDomainRange({
        data: dataSets,
        domain,
        range: [0, Number(width) - (margin.top * 2) - axis.y.width],
        scale: x,
        stacked: isStacked({ groupLayout })
      })

      const xAxisY = height - xAxisHeight(props.axis) - margin.top;
      xAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
          xAxisY + ')')
        .call(xAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      bins: string[],
      groupData: IGroupData,
    ) {
      const { axis, height, margin, delay, duration, tip, groupLayout } = props;

      const stackedOffset = (d: IGroupDataItem, stackIndex: number) => {
        const thisGroupData = groupData.find((gData) => {
          return gData.find((dx) => dx.label === d.label) !== undefined;
        });
        const oSet = (thisGroupData || [])
          .filter((_, i) => i < stackIndex)
          .reduce((prev, next) => prev + next.value, 0);
        const isItStacked = isStacked({ groupLayout });
        const offset = isItStacked && stackIndex > 0
          ? oSet
          : 0;
        return isItStacked ? x(offset) : 0;
      }

      const colors = scaleOrdinal(props.colorScheme);
      const gWidth = gridWidth(props);

      const g = container
        .selectAll<SVGElement, {}>('g')
        .data(groupData);

      const bars = g.enter()
        .append<SVGElement>('g')
        .merge(g)
        .attr('transform', (d: any[]) => {
          let yd = y(d[0].label);
          if (yd === undefined) {
            yd = 0;
          }
          const x = yAxisWidth(axis) + axis.x.style['stroke-width'];
          return `translate(${x}, ${margin.top + yd})`;
        })

        .selectAll<SVGElement, {}>('rect')
        .data((d) => d);

      bars
        .enter()
        .append<SVGElement>('rect')
        .attr('width', 0)
        .attr('x', stackedOffset)
        .attr('class', 'bar')
        .on('click', onClick(props.onClick))
        .on('mouseover', onMouseOver({ bins, hover: props.bar.hover, colors, tipContentFn: props.tipContentFn, tipContent, tip, tipContainer }))
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
        .merge(bars)
        .attr('y', (d: IGroupDataItem, i: number) => {
          const overlay = (props.groupLayout === EGroupedBarLayout.OVERLAID)
            ? i * props.bar.overlayMargin
            : Number(innerScaleBand(String(d.groupLabel)));
          return overlay;
        })
        .attr('height', (d, i) => getBarWidth(i, props.groupLayout, props.bar, innerScaleBand))
        .attr('fill', (d, i) => colors(String(i)))
        .transition()
        .duration(duration)
        .delay(delay)
        .attr('x', stackedOffset)
        // Hide bar's bottom border
        .attr('stroke-dasharray',
          (d: IGroupDataItem, i): string => {
            const currentHeight = gWidth - (x(d.value));
            const barWidth = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
            return `${barWidth} 0 ${currentHeight} ${barWidth}`;
          })
        .attr('width', (d: IGroupDataItem): number => x(d.value));

      bars.exit().remove();
      g.exit().remove();

      const yText = yAxisLabel
        .selectAll<any, any>('text')
        .data([axis.y.label]);

      yText.enter().append('text')
        .attr('class', 'y-axis-label')
        .merge(yText)
        .attr('transform',
          'translate(' + (Number(height) / 2) + ' ,' +
          ((height - yAxisWidth(props.axis) - (margin.left * 2)) + axis.x.margin) + ')')
        .style('text-anchor', 'middle')
        .text((d) => d);

      const xText = yAxisLabel
        .selectAll<any, any>('text')
        .data([axis.x.label]);

      xText.enter().append('text')
        .attr('class', 'x-axis-label')
        .merge(xText)
        .attr('transform', 'rotate(-90)')
        .attr('y', 0)
        .attr('x', 0 - (gWidth / 2 - (margin.top * 2)))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text((d) => d);
    },

    /**
     * Update chart
     */
    update(el: Element, newProps: DeepPartial<ITornadoProps>) {
      if (!props.data) {
        return;
      }
      merge(props, newProps);
      if (!props.data.bins) {
        return;
      }
      const { margin, width, height, className, data, visible } = props;
      sizeSVG(svg, { margin, width, height, className });
      dataSets = [];

      data.counts.forEach((count) => {
        count.data.forEach((value, i) => {
          if (!dataSets[i]) {
            dataSets[i] = [];
          }
          value.forEach((aValue, index) => {
            dataSets[i].push({
              index,
              groupLabel: count.label,
              label: data.bins[i],
              // TODO value[0] doesn't take into account index 1
              value: visible[data.bins[i]] !== false && visible[count.label] !== false ? aValue : 0,
            });
          })

        });
      });
      console.log('dataSets', dataSets);
      this.drawAxes();
      // @TODO add back in,
      // drawHorizontalGrid<any>({ x, y, gridX, gridY, props, ticks: maxValueCount(data.counts) });
      this.updateChart(data.bins, dataSets);
    },

    /**
     * Any necessary clean up
     */
    destroy(el: Element) {
      svg.selectAll('svg > *').remove();
    },
  };
  return TornadoD3;
});