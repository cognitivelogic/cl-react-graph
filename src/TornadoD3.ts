import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import { format } from 'd3-format';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  scalePoint,
} from 'd3-scale';
import { Selection } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import cloneDeep from 'lodash/cloneDeep';
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
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  paddingInner,
} from './utils/bars';
import {
  axis as defaultAxis,
  grid as defaultGrid,
} from './utils/defaults';
import {
  applyDomainAffordance,
  shouldFormatTick,
  ticks,
  tickSize,
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

// The height for the x axis labels showing the left/right labels.
const SPLIT_AXIS_HEIGHT = 20;

const calculatePercents = (groupData: IGroupData) => {
  const totals: Array<{ left: number, right: number }> = groupData.reduce((prev, next) => {
    const values = next.reduce((p, n) => {
      const k = n.side!;
      if (!p[k]) {
        p[k] = 0;
      }
      p[k] = p[k] + n.value;
      return p;
    }, { left: 0, right: 0 });
    return prev.concat(values);
  }, [] as Array<{ left: number, right: number }>);

  return groupData.map((data, i) => {
    return data.map((datum) => {
      const total = totals[i][datum.side!];
      return {
        ...datum,
        percent: Math.round(datum.value / total * 100),
      }
    })

  });
}
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
  let xAxisContainer2: TSelection;
  let yAxisLabel: TSelection;
  let xAxisLabel: TSelection;
  let domain: [number, number];

  const props: ITornadoProps = {
    axis: cloneDeep(defaultAxis),
    bar: {
      grouped: {
        paddingInner: 0.1,
        paddingOuter: 0,
      },
      paddingInner: 0.1,
      paddingOuter: 0,
      overlayMargin: 5,
    },
    className: 'torando-d3',
    colorScheme,
    center: true,
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
    splitBins: ['Left', 'Right'],
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

      // Used to display the 2 split bin labels
      xAxisContainer2 = svg.append('g').attr('class', 'xAxisContainer2');
      container = svg
        .append<SVGElement>('g')
        .attr('class', 'histogram-container');

      // Render Axis above bars so that we can see the y axis overlaid
      [xAxisContainer, yAxisContainer, xAxisLabel, yAxisLabel] = makeScales(svg);

      this.update(el, props);
    },

    /**
    * Draw Axes
    */
    drawAxes() {
      const { bar, data, groupLayout, margin, width, height, axis } = props;
      const valuesCount = maxValueCount(data.counts);
      const w = gridWidth(props);
      const h = gridHeight(props) - SPLIT_AXIS_HEIGHT;
      const dataLabels = data.counts.map((c) => c.label);

      y.domain(data.bins)
        .rangeRound([h, 0])
        .paddingInner(groupedPaddingInner(bar));

      innerScaleBand
        .domain(groupedBarsUseSameXAxisValue({ groupLayout }) ? ['main'] : dataLabels)
        .rangeRound([0, y.bandwidth()])
        .paddingInner(paddingInner(props.bar));

      const xAxis = axisBottom<number>(x)
        .tickFormat((v) => {
          const n = v.toString().replace('-', '');

          if (shouldFormatTick(axis.x)) {
            if (axis.x.scale === 'TIME') {
              return timeFormat(axis.x.dateFormat)(new Date(n));
            }
            return isNaN(Number(v)) ? n : format(axis.x.numberFormat)(Number(n))
          }
          return n;
        });

      tickSize({
        axis: xAxis,
        axisLength: w,
        scaleBand: x,
        axisConfig: axis.x,
        limitByValues: false,
        valuesCount: 10,
      });

      this.calculateDomain();

      const x2 = scalePoint<any>();

      const xGroupAxis = axisBottom(x2).tickPadding(SPLIT_AXIS_HEIGHT)
        .tickSize(0)

      console.log('props.splitBins', props.splitBins);
      x2.range([Number(width) / 4, Number(width) * (3 / 4) - (margin.top * 2) - axis.y.width])
        .domain(props.splitBins);

      /** Y-Axis (label axis) set up */
      const yAxis = axisLeft<string>(y);
      ticks({
        axis: yAxis,
        valuesCount,
        axisLength: h,
        axisConfig: axis.y,
        scaleBand: y,
        limitByValues: true,
      });
      // Move the y axis ticks to the left of the chart
      yAxis.tickPadding(x(0) + 10)
      yAxisContainer
        // Place the y axis in the middle of the chart
        .attr('transform', 'translate(' + (yAxisWidth(axis) + x(0)) + ', ' + margin.top + ' )')
        .call(yAxis);

      // @TODO - Stacked? (was using appendDomainRange())
      x.range([0, Number(width) - (margin.top * 2) - axis.y.width])
        .domain(domain)
        .nice();

      console.log('width', width, margin, axis.y);
      console.log('x range', [0, Number(width) - (margin.top * 2) - axis.y.width]);
      console.log('x domain', domain);
      console.log('x(0)', x(0));
      const xAxisY = height - xAxisHeight(props.axis) - margin.top - SPLIT_AXIS_HEIGHT;
      xAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
          xAxisY + ')')
        .call(xAxis);

      xAxisContainer2
        .attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
          (xAxisY) + ')')
        .call(xGroupAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    calculateDomain() {
      const { data, center } = props;
      const leftValues = data.counts.reduce((prev, next) => prev.concat(next.data[0]), [] as number[]);
      const rightValues = data.counts.reduce((prev, next) => prev.concat(next.data[1]), [] as number[]);

      // Use applyDomainAffordance to allow space for percentage labels
      domain = [
        applyDomainAffordance(-Math.max(...leftValues)),
        applyDomainAffordance(Math.max(...rightValues)),
      ];

      // Center the 0 axis value in the middle of the chart
      if (center) {
        const max = Math.max(Math.max(...leftValues), domain[1]);
        domain = [
          applyDomainAffordance(-max),
          applyDomainAffordance(max)];
      }
      return domain;
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      bins: string[],
      groupData: IGroupData,
    ) {
      const { axis, height, margin, delay, duration, tip, groupLayout } = props;

      const percentData = calculatePercents(groupData);

      const stackedOffset = (d: IGroupDataItem, stackIndex: number) => {
        const w = d.side === 'left' ? -d.value : d.value;
        return x(Math.min(0, w));
      }

      const colors = scaleOrdinal(props.colorScheme);
      const gWidth = gridWidth(props);
      console.log('percent data', percentData);
      const g = container
        .selectAll<SVGElement, {}>('g')
        .data(percentData);

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
      console.log('bars enter x', x(0));
      bars
        .enter()
        .append<SVGElement>('rect')
        .attr('width', 0)
        .attr('x', (d) => {
          return x(0);// + w;
        })
        .attr('class', (d) => `bar ${d.side}`)
        .on('click', onClick(props.onClick))
        .on('mouseover', onMouseOver({ bins, hover: props.bar.hover, colors, tipContentFn: props.tipContentFn, tipContent, tip, tipContainer }))
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
        .merge(bars)
        .attr('y', (d: IGroupDataItem, i: number) => {
          const overlay = (props.groupLayout === EGroupedBarLayout.OVERLAID)
            ? Math.floor(i / 2) * props.bar.overlayMargin
            : Number(innerScaleBand(String(d.groupLabel)));
          return overlay;
        })
        .attr('height', (d, i) => getBarWidth(Math.floor(i / 2), props.groupLayout, props.bar, innerScaleBand))
        .attr('fill', (d, i) => colors(String(d.groupLabel)))
        .transition()
        .duration(duration)
        .delay(delay)
        .attr('x', stackedOffset)
        .attr('width', (d: IGroupDataItem): number => {
          const w = d.side === 'left' ? -d.value : d.value;
          return Math.abs(x(w) - x(0));
        });

      const showBinPercentages = true;
      if (showBinPercentages) {

        const percents = g.enter()
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

          .selectAll<SVGElement, {}>('text')
          .data((d) => d);

        percents
          .enter()
          .append<SVGElement>('text')
          .attr('width', 0)
          .attr('x', (d) => {
            const w = d.side === 'left' ? -40 : 40;
            return x(0) + w;
          })
          .attr('class', 'percentage-label')
          .style('text-anchor', 'middle')
          .style('font-size', '0.675rem')
          .text((d, i) => {
            return `${d.percent}%`;
          })
          .merge(percents)
          .attr('y', (d: IGroupDataItem, i: number) => {
            const overlay = (props.groupLayout === EGroupedBarLayout.OVERLAID)
              ? Math.floor(i / 2) * props.bar.overlayMargin
              : Number(innerScaleBand(String(d.groupLabel)));

            const h = getBarWidth(0, props.groupLayout, props.bar, innerScaleBand);
            // const offset = i === 0 || i === 2 ? h / 4 : h - 10;
            const offset = h / 2;
            console.log('d', d, i, h);
            console.log('offset', offset);
            console.log('props.groupLayout', innerScaleBand(String(d.groupLabel)));

            // Ensure that percentage labels don't overlap 
            const verticalOffset = i < 2 ? 0 : 20;
            return offset + verticalOffset; //h / 2;
          })
          .attr('fill', (d, i) => colors(String(d.groupLabel)))
          .transition()
          .duration(duration)
          .delay(delay)
          .attr('x', (d) => {
            const w = d.side === 'left' ? - 20 : 20;
            const v = d.side === 'left' ? -d.value : d.value;
            return x(v) + w;
          })
          .attr('width', (d: IGroupDataItem): number => {
            const w = d.side === 'left' ? -d.value : d.value;
            return Math.abs(x(w) - x(0));
          });
        // const percents = g.enter()
        //   .append<SVGElement>('g')
        //   .merge(g)
        //   .attr('transform', (d: any[]) => {
        //     let xd = x(d[0].label);
        //     if (xd === undefined) {
        //       xd = 0;
        //     }
        //     const xDelta = yAxisWidth(axis)
        //       + axis.y.style['stroke-width']
        //       + xd;
        //     return `translate(${xDelta}, 0)`;
        //   })

        //   .selectAll<SVGElement, {}>('text')
        //   .data((d) => d);

        // bars
        //   .enter()
        //   .append<SVGElement>('text')
        //   .attr('class', 'percentage-label')
        //   .attr('y', (d: IGroupDataItem, i: number) => {
        //     return i * 50;
        //     // const overlay = (props.groupLayout === EGroupedBarLayout.OVERLAID)
        //     //   ? Math.floor(i / 2) * props.bar.overlayMargin
        //     //   : Number(innerScaleBand(String(d.groupLabel)));
        //     // const w = d.side === 'left' ? -d.value : d.value;
        //     // return Math.abs(x(w) - x(0))
        //     // // return overlay;
        //   })
        //   // .data((d) => d)
        //   .merge(bars)
        //   .text((d, i) => {
        //     return `${d.percent}% ${d.value}`;
        //   })
        //   // .style('text-anchor', 'middle')
        //   .style('font-size', '0.675rem')
        //   .attr('fill', (d, i) => colors(String(d.groupLabel)))
        //   .attr('x', (d: IGroupDataItem, stackIndex: number) => {
        //     const w = d.side === 'left' ? -d.value : d.value;
        //     return (x(w) - x(0))
        //     return x(200000);

        //     return x(Math.min(0, w));
        //   });
        // .attr('dy', -2);
        // percents.exit().remove();
      };

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
        count.data.forEach((value, genderIndex) => {
          value.forEach((aValue, rowIndex) => {
            if (!dataSets[rowIndex]) {
              dataSets[rowIndex] = [];
            }
            dataSets[rowIndex].push({
              side: genderIndex === 0 ? 'left' : 'right',
              groupLabel: count.label,
              colorRef: count.label,
              label: data.bins[rowIndex],
              value: visible[data.bins[rowIndex]] !== false && visible[count.label] !== false ? aValue : 0,
            });
          })

        });
      });
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
