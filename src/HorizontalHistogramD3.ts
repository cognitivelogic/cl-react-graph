import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
} from 'd3-scale';

import {
  BaseHistogramD3,
  IGroupData,
  IGroupDataItem,
} from './BaseHistogramD3';
import attrs from './d3/attrs';
import {
  gridHeight,
  gridWidth,
  xAxisHeight,
  yAxisWidth,
} from './grid';
import {
  EGroupedBarLayout,
  IAxis,
} from './Histogram';
import {
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  groupedPaddingOuter,
  paddingInner,
  paddingOuter,
} from './utils/bars';
import { annotationAxisDefaults } from './utils/defaults';
import {
  appendDomainRange,
  formatTick,
  isStacked,
  maxValueCount,
  shouldFormatTick,
  ticks,
} from './utils/domain';
import {
  onClick,
  onMouseOut,
  onMouseOver,
  onMouseOverAxis,
} from './utils/mouseOver';

export class HorizontalHistogramD3 extends BaseHistogramD3 {
  public x = scaleLinear();
  public y = scaleBand();
  public yAnnotations = scaleBand();

  /**
   * Draw Axes
   */
  public drawAxes() {
    const { props, dataSets, xAxisContainer, svg, innerScaleBand, tipContent,
      y, x, yAxisContainer, tipContainer, yAnnotationAxisContainer, yAnnotations } = this;
    const { annotations, annotationTextSize, bar, data, domain, groupLayout, stacked,
      margin, width, height, axis, tip } = props;
    const valuesCount = maxValueCount(data.counts);
    const h = gridHeight(props);
    const dataLabels = data.counts.map((c) => c.label);
    const annotationsEnabled = annotations && annotations.length === data.bins.length;

    y.domain(data.bins)
      .rangeRound([0, h])
      .paddingInner(paddingInner(bar))
      .paddingOuter(paddingOuter(bar));

    innerScaleBand
      .domain(groupedBarsUseSameXAxisValue({ groupLayout, stacked }) ? ['main'] : dataLabels)
      .rangeRound([0, y.bandwidth()])
      .paddingInner(groupedPaddingInner(bar))
      .paddingOuter(groupedPaddingOuter(bar));

    const xAxis = axisBottom<number>(x);
    const yAxis = axisLeft<string>(y);

    /** Y-Axis (label axis) set up */
    const axisYAnnotationAllowance: IAxis = {
      ...axis.y,
      style: {
        'fill': 'none',
        'stroke': 'none',
        'opacity': 0,
        'shape-rendering': 'none',
        'stroke-opacity': 0,
        'stroke-width': 0,
        'visible': false,
      },
      tickSize: 30,
      visible: false,
    };

    ticks({
      axis: yAxis,
      axisConfig: annotationsEnabled ? axisYAnnotationAllowance : axis.y,
      axisLength: h,
      limitByValues: true,
      scaleBand: y,
      valuesCount,
    });
    yAxisContainer
      ?.attr('transform', 'translate(' + yAxisWidth(axis) + ', ' + margin.top + ' )')
      .call(yAxis);

    // Add a tooltip to the y axis if a custom method has been sent
    const colors = scaleOrdinal(props.colorScheme);
    if (props.axisLabelTipContentFn) {
      yAxisContainer
        ?.selectAll('g.tick')
        .select('text')
        .on('mouseover', (onMouseOverAxis({
          ...props.data, colors,
          tipContentFn: props.axisLabelTipContentFn, tipContent, tip, tipContainer,
        })))
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer));
    }

    /** Y-Axis 2 (bottom axis) for annotations if annotations data sent (and match bin length) */
    if (annotations && annotations.length === data.bins.length) {

      yAxisContainer
        ?.selectAll('line')
        .style('opacity', 0);

      yAnnotations.domain(data.bins)
        .rangeRound([0, h])
        .paddingInner(paddingInner(bar))
        .paddingOuter(paddingOuter(bar));

      const annotationAxis = axisLeft<string>(yAnnotations);

      ticks({
        axis: annotationAxis,
        axisConfig: annotationAxisDefaults,
        axisLength: h,
        limitByValues: true,
        scaleBand: yAnnotations,
        valuesCount: annotations.length,
      });
      // Override the default axis bin labels with the custom annotations
      annotationAxis.tickFormat((d, i) => annotations[i].value);
      yAnnotationAxisContainer
        ?.attr('transform', 'translate(' + Number(yAxisWidth(axis)) + ', ' + margin.top + ' )')
        .call(annotationAxis);

      // Style the annotations with their specific color
      yAnnotationAxisContainer
        ?.selectAll('g.tick')
        .select('text')
        .style('font-size', annotationTextSize ? annotationTextSize : '0.475rem')
        .style('fill', (d, i) => annotations[i].color);

      // Hide the line for the annotations axis
      yAnnotationAxisContainer?.call((g) => g.select('.domain').remove());

    }

    /** X-Axis (value axis) set up */
    appendDomainRange({
      data: dataSets,
      domain,
      range: [0, Number(width) - (margin.top * 2) - axis.y.width],
      scale: x,
      stacked: isStacked({ groupLayout, stacked }),
    });

    const xAxisY = height - xAxisHeight(props.axis) - margin.top;
    // Format number axis if format prop provided
    if (shouldFormatTick(axis.x)) {
      xAxis.tickFormat((v) => {
        const n = v.toString().replace('-', '');
        return String(formatTick(axis.x)(n));
      });
    }
    xAxisContainer
      ?.attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
        xAxisY + ')')
      .call(xAxis);

    attrs(svg?.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
    attrs(svg?.selectAll('.y-axis .tick text'), axis.y.text.style as any);

    attrs(svg?.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
    attrs(svg?.selectAll('.x-axis .tick text'), axis.x.text.style as any);
  }

  /**
   * Draw a single data set into the chart
   */
  public updateChart(
    bins: string[],
    groupData: IGroupData,
  ) {
    const { props, innerScaleBand, container, tipContainer, tipContent, yAxisLabel } = this;
    const { axis, height, margin, delay, duration, tip, groupLayout, showBinPercentages, stacked } = props;

    const stackedOffset = (d: IGroupDataItem, stackIndex: number) => {
      const thisGroupData = groupData.find((gData) => {
        return gData.find((dx) => dx.label === d.label) !== undefined;
      });
      const oSet = (thisGroupData || [])
        .filter((_, i) => i < stackIndex)
        .reduce((prev, next) => prev + next.value, 0);
      const isItStacked = isStacked({ groupLayout, stacked });
      const offset = isItStacked && stackIndex > 0
        ? oSet
        : 0;
      return isItStacked ? this.x(offset) : 0;
    };

    const calculateYPosition = (d: IGroupDataItem, stackIndex: number, offset: number, counts: number): number => {
      const totalWidth = innerScaleBand.bandwidth();
      const barWidth = getBarWidth(stackIndex, props.groupLayout, props.bar, innerScaleBand);
      const overlaidYPos = (totalWidth / 2) - (barWidth / 3) + (stackIndex === 1 ? 1 : 0);
      const finalYPos = (props.groupLayout === EGroupedBarLayout.OVERLAID || counts === 1)
        ? overlaidYPos
        : Number(innerScaleBand(String(d.groupLabel)));
      return offset ? finalYPos + offset : finalYPos;
    };

    const colors = scaleOrdinal(props.colorScheme);
    const gWidth = gridWidth(props);

    const g = container
      ?.selectAll<SVGElement, {}>('g')
      .data(groupData);

    const bars = g?.enter()
      .append<SVGElement>('g')
      .merge(g)
      .attr('transform', (d: any[]) => {
        let yd = this.y(d[0].label);
        if (yd === undefined) {
          yd = 0;
        }
        const x = yAxisWidth(axis) + axis.x.style['stroke-width'];
        return `translate(${x}, ${margin.top + yd})`;
      })

      .selectAll<SVGElement, {}>('rect')
      .data((d) => d);

    bars
      ?.enter()
      .append<SVGElement>('rect')
      .attr('width', 0)
      .attr('x', stackedOffset)
      .attr('class', 'bar')
      .on('click', onClick(props.onClick))
      .on('mouseover', onMouseOver({
        bins,
        colors,
        hover: props.bar.hover,
        tip,
        tipContainer,
        tipContent,
        tipContentFn: props.tipContentFn,
      }))
      .on('mousemove', () => tip.fx.move(tipContainer))
      .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
      .merge(bars)
      .attr('y', (d: IGroupDataItem, i: number) => calculateYPosition(d, i, 0, props.data.counts.length))
      .attr('height', (d, i) => getBarWidth(i, props.groupLayout, props.bar, innerScaleBand))
      .attr('fill', (d, i) => colors(String(i)))
      .transition()
      .duration(duration)
      .delay(delay)
      .attr('x', stackedOffset)
      // Hide bar's bottom border
      .attr('stroke-dasharray',
        (d: IGroupDataItem, i): string => {
          const currentHeight = gWidth - (this.x(d.value));
          const barWidth = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
          return `${barWidth} 0 ${currentHeight} ${barWidth}`;
        })
      .attr('width', (d: IGroupDataItem): number => this.x(d.value));

    // We need to show the bar percentage splits if flag enabled
    if (showBinPercentages) {

      const percents = g?.enter()
        .append<SVGElement>('g')
        .merge(g)
        .attr('transform', (d: any[], index: number) => {
          let yd = this.y(d[0].label);
          if (yd === undefined) {
            yd = 0;
          }
          const x = yAxisWidth(axis) + axis.x.style['stroke-width'];
          return `translate(${x}, ${(margin.top + yd)})`;
        })

        .selectAll<SVGElement, {}>('text')
        .data((d) => d);

      percents
        ?.enter()
        .append<SVGElement>('text')
        .attr('width', 0)
        .attr('x', 0)
        .attr('y', 0)
        .attr('dy', 0)
        .attr('dx', 0)
        .attr('class', 'percentage-label')
        .attr('x', stackedOffset)
        .text((d, i) => {
          // To show the correct percentage split we need to total all the other values in this count set
          const total = groupData.reduce((prev, group) => prev + group[i].value, 0);
          const percentage = d.value === 0 ? 0 : Math.round((d.value / total) * 100);
          return showBinPercentages[i] ? `${percentage}%` : '';
        })
        .data((d) => d)
        .style('text-anchor', 'middle')
        .style('font-size', '0.675rem')
        .attr('fill', (d, i) => colors(String(i)))
        .merge(percents)
        .attr('x', (d: IGroupDataItem): number => this.x(d.value) + 12) // 12 added to space the label away from the bar
        .attr('y', (d: IGroupDataItem, i: number) => {
          const barWidth = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
          const overlaidOffset = props.bar.overlayMargin;
          return calculateYPosition(d, i, ((barWidth + overlaidOffset) / 2), props.data.counts.length);
        });
      percents?.exit().remove();
    }

    bars?.exit().remove();
    g?.exit().remove();

    const yText = yAxisLabel
      ?.selectAll<any, any>('text')
      .data([axis.y.label]);

    yText?.enter().append('text')
      .attr('class', 'y-axis-label')
      .merge(yText)
      .attr('transform',
        'translate(' + (Number(height) / 2) + ' ,' +
        ((height - yAxisWidth(props.axis) - (margin.left * 2)) + axis.x.margin) + ')')
      .style('text-anchor', 'middle')
      .text((d) => d);

    const xText = yAxisLabel
      ?.selectAll<any, any>('text')
      .data([axis.x.label]);

    xText?.enter().append('text')
      .attr('class', 'x-axis-label')
      .merge(xText)
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', 0 - (gWidth / 2 - (margin.top * 2)))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text((d) => d);
  }

}
