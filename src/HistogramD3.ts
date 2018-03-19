/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';
import { ScaleLinear } from 'd3';
import merge from 'deepmerge';
import colorScheme from './colors';
import attrs from './d3/attrs';

export const histogramD3 = ((): IChartAdaptor => {
  let svg;
  let tipContainer;
  let tipContent;
  const y = d3.scaleLinear();
  const x = d3.scaleBand();

  // Gridlines in x axis function
  function make_x_gridlines(ticks: number = 5) {
    return d3.axisBottom(x)
      .ticks(ticks);
  }

  // Gridlines in y axis function
  function make_y_gridlines(ticks: number = 5) {
    return d3.axisLeft(y)
      .ticks(ticks);
  }

  const defaultProps = {
    axis: {
      x: {
        height: 20,
        label: '',
        style: {
          'fill': 'none',
          'shape-rendering': 'crispEdges',
          'stroke': '#666',
          'stroke-opacity': 1,
          'stroke-width': 1,
        },
        text: {
          style: {
            fill: '#666',
          },
        },
      },
      y: {
        label: '',
        style: {
          'fill': 'none',
          'shape-rendering': 'crispEdges',
          'stroke': '#666',
          'stroke-opacity': 1,
          'stroke-width': 1,
        },
        text: {
          style: {
            fill: '#666',
          },
        },
        ticks: 10,
        width: 25,
      },
    },
    bar: {
      margin: 10,
      width: 50,
    },
    className: 'histogram-d3',
    colorScheme,
    data: [],
    delay: 0,
    domain: {
      max: null,
      min: null,
    },
    duration: 400,
    grid: {
      x: {
        style: {
          'fill': 'none',
          'stroke': '#bbb',
          'stroke-opacity': 0.7,
          'stroke-width': 1,
        },
        ticks: 5,
        visible: true,
      },
      y: {
        style: {
          'fill': 'none',
          'stroke': '#bbb',
          'stroke-opacity': 0.7,
          'stroke-width': 1,
        },
        ticks: 5,
        visible: true,
      },
    },
    height: 200,
    margin: {
      left: 5,
      top: 5,
    },
    stroke: {
      color: '#005870',
      dasharray: '',
      linecap: 'butt',
      width: 0,
    },
    tip: {
      fx: {
        in: (container) => {
          container.style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 55) + 'px');
          container.transition()
            .duration(200)
            .style('opacity', 0.9);
        },
        move: (container) => {
          container.style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 55) + 'px');
        },
        out: (container) => {
          container.transition()
            .duration(500)
            .style('opacity', 0);
        },
      },
    },
    tipContainer: 'body',
    tipContentFn: (bins: string[], i: number, d: number): string =>
      bins[i] + '<br />' + d,
    width: 200,
  };

  const HistogramD3 = {
    /**
     * Initialization
     * @param {Node} el Target DOM node
     * @param {Object} props Chart properties
     */
    create(el: HTMLElement, props = {}) {
      this.props = merge(defaultProps, props);
      this.update(el, props);
    },

    /**
     * Make the SVG container element
     * Recreate if it previously existed
     * @param {Dom} el Dom container node
     */
    _makeSvg(el) {
      if (svg) {
        svg.selectAll('svg > *').remove();
        svg.remove();
        const childNodes = el.getElementsByTagName('svg');
        if (childNodes.length > 0) {
          el.removeChild(childNodes[0]);
        }
      }
      const { margin, width, height, className } = this.props;

      // Reference to svg element containing chart
      svg = d3.select(el).append('svg')
        .attr('class', className)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');
      this._makeTip();
    },

    /**
     * Create a bootstrap tip
     */
    _makeTip() {
      if (tipContainer) {
        // Chart could be rebuilt - remove old tip
        tipContainer.remove();
      }
      tipContainer = d3.select(this.props.tipContainer).append('div')
        .attr('class', 'tooltip top')
        .style('opacity', 0);

      tipContainer.append('div')
        .attr('class', 'tooltip-arrow');
      tipContent = tipContainer.append('div')
        .attr('class', 'tooltip-inner');
    },

    /**
     * Get a max count of values in each data set
     * @param {Object} counts Histogram data set values
     * @return {Number} count
     */
    valuesCount(counts: IHistogramDataSet[]): number {
      return counts.reduce((a: number, b: IHistogramDataSet): number => {
        return b.data.length > a ? b.data.length : a;
      }, 0);
    },

    /**
     * Update a linear scale with range and domain values taken either from the data set
     * or from props.
     */
    appendDomainRange(scale: ScaleLinear<number, number>, data: IHistogramData): void {
      const yDomain: number[] = [];
      const { axis, domain, margin, height } = this.props;
      const allCounts = data.counts.reduce((a: number[], b: IHistogramDataSet): number[] => {
        return [...a, ...b.data];
      }, []);
      const extent = d3.extent(allCounts, (d) => d);
      yDomain[1] = domain && domain.hasOwnProperty('max')
        ? domain.max
        : extent[1];
      yDomain[0] = domain && domain.hasOwnProperty('min')
        ? domain.min
        : extent[0];
      const yRange = [height - (margin.top * 2) - this.xAxisHeight(), 0];
      scale.range(yRange)
        .domain(yDomain);
    },

    yAxisWidth() {
      const { axis } = this.props;
      return axis.y.label === ''
        ? axis.y.width
        : axis.y.width + 30;
    },

    xAxisHeight() {
      const { axis } = this.props;
      return axis.x.label === ''
        ? axis.x.height
        : axis.x.height + 30;
    },

    /**
     * Draw scales
     * @param {Object} data Chart data
     */
    _drawScales(data: IHistogramData) {
      const { domain, margin, width, height, axis } = this.props;
      const valuesCount = this.valuesCount(data.counts);

      svg.selectAll('.y-axis').remove();
      svg.selectAll('.x-axis').remove();

      const w = this.gridWidth();

      let xAxis;
      let yAxis;

      x.domain(data.bins)
        .rangeRound([0, w]);

      xAxis = d3.axisBottom(x);

      if (w / valuesCount < 10) {
        // Show one in 10 x axis labels
        xAxis.tickValues(x.domain().filter((d, i) => !(i % 10)));
      }
      svg.append('g').attr('class', 'x-axis')
        .attr('transform', 'translate(' + this.yAxisWidth() + ',' +
        (height - this.xAxisHeight() - (margin.left * 2)) + ')')
        .call(xAxis);

      if (axis.x.label !== '') {
        svg.append('text')
          .attr('class', 'x-axis-label')
          .attr('transform',
          'translate(' + (width / 2) + ' ,' +
          ((height - this.xAxisHeight() - (margin.left * 2)) + 25) + ')')
          .style('text-anchor', 'middle')
          .text(axis.x.label);
      }

      this.appendDomainRange(y, data);

      yAxis = d3.axisLeft(y).ticks(axis.y.ticks);

      svg.append('g').attr('class', 'y-axis')
        .attr('transform', 'translate(' + this.yAxisWidth() + ', 0)')
        .call(yAxis);

      if (axis.y.label !== '') {
        svg.append('text')
          .attr('class', 'y-axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('y', 0 - margin.left)
          .attr('x', 0 - (height / 2 - (margin.top * 2)))
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text(axis.y.label);
      }

      const { transform, x: xx, y: yy, ...xLabelStyle } = axis.x.text.style;
      const { transform: yt, x: xxx, y: yyy, ...yLabelStyle } = axis.y.text.style;
      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style);
      attrs(svg.selectAll('.y-axis-label'), yLabelStyle);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style);
      attrs(svg.selectAll('.x-axis-label'), xLabelStyle);
    },

    /**
     * Draw the bars
     * @param {Object} info Bar data etc
     */
    _drawBars(info: IHistogramData) {
      const valuesCount = this.valuesCount(info.counts);
      info.counts.forEach((set: IHistogramDataSet, setIndex: number) => {
        this.drawDataSet(info.bins, set, setIndex, info.counts.length);
      });
    },

    /**
     * Calculate the width of the area used to display the
     * chart bars. Removes chart margins and Y axis from
     * chart total width.
     * @return {number} width
     */
    gridWidth(): number {
      const { axis, width, margin } = this.props;
      return width - (margin.left * 2) - this.yAxisWidth();
    },

    /**
     * Calculate the height of the area used to display the
     * chart bars. Removes chart margins and X axis from
     * chart total height.
     * @return {number} width
     */
    gridHeight(): number {
      const { height, margin, axis } = this.props;
      return height - (margin.top * 2) - this.xAxisHeight();
    },

    /**
     * Returns the margin between similar bars in different data sets
     * @return {Number} Margin
     */
    groupedMargin(): number {
      const { data } = this.props;
      return ((data.counts.length - 1) * 3);
    },

    /**
     * Calculate the bar width
     * @return {number} bar width
     */
    barWidth() {
      const { axis, width, margin, data, bar, stroke } = this.props;
      const w = this.gridWidth();
      const valuesCount = this.valuesCount(data.counts);
      const setCount = data.counts.length;
      let barWidth = (w / valuesCount) - (bar.margin * 2) - this.groupedMargin();

      // Small bars - reduce margin and re-calcualate bar width
      if (barWidth < 5) {
        bar.margin = 1;
        barWidth = Math.max(1, (w - (valuesCount + 1) * bar.margin) /
          valuesCount);
      }

      // show data sets next to each other...
      return barWidth / setCount;
    },

    /**
     * Draw a single data set into the chart
     * @param {Array} bins Data set labels
     * @param {Object} set HistogramDataSet
     * @param {number} setIndex Data set index
     * @param {number} setCount Total number of data sets
     */
    drawDataSet(
      bins: string[], set: IHistogramDataSet,
      setIndex: number, setCount: number,
    ) {
      const { height, width, margin, bar, delay, duration,
        axis, stroke, tip, tipContentFn } = this.props;
      let barItem;
      const barWidth = this.barWidth();
      const colors = d3.scaleOrdinal(set.colors || this.props.colorScheme);
      const borderColors = set.borderColors ? d3.scaleOrdinal(set.borderColors) : null;

      const selector = '.bar-' + setIndex;
      const multiLineOffset = (index) => setCount === 1
        ? 0
        : ((index + setIndex) * (barWidth + this.groupedMargin()));

      svg.selectAll(selector).remove();
      barItem = svg.selectAll(selector)
        .data(set.data)
        .enter()
        .append('rect')
        .attr('class', 'bar ' + selector)
        .attr('x', (d, index, all) => {
          return this.yAxisWidth()
            + axis.y.style['stroke-width']
            + bar.margin
            + (barWidth + (bar.margin * 2)) * (index)
            + multiLineOffset(index);
        })
        .attr('width', (d) => barWidth)
        .attr('fill', (d, i) => colors(i))
        .on('mouseover', (d: number, i: number) => {
          tipContent.html(() => tipContentFn(bins, i, d));
          tip.fx.in(tipContainer);
        })
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer))
        .attr('y', (d: number): number => this.gridHeight())
        .attr('height', 0);

      barItem.attr('stroke', (d, i) => {
        if (borderColors) {
          return borderColors(i);
        }
        return typeof stroke.color === 'function'
          ? stroke.color(d, i, colors)
          : stroke.color;
      })
        .attr('shape-rendering', 'crispEdges')
        .attr('stroke-width', stroke.width)
        .attr('stroke-linecap', stroke.linecap);

      if (stroke.dasharray !== '') {
        barItem.attr('stroke-dasharray', stroke.dasharray);
      }

      barItem
        .transition()
        .duration(duration)
        .delay(delay)
        .attr('y', (d: number): number => {
          return y(d);
        })
        // Hide bar's bottom border
        .attr('stroke-dasharray',
        (d: number): string => {
          const currentHeight = this.gridHeight() - (y(d));
          return `${barWidth} 0 ${currentHeight} ${barWidth}`;
        })
        .attr('height',
        (d: number): number => {
          return this.gridHeight() - (y(d));
        });

      barItem.exit().remove();
    },

    /**
     * Draw a grid onto the chart background
     * @param {Object} props Props
     */
    _drawGrid(props: IHistogramChartState) {
      const { data, height, width, axis, grid, margin, bar } = props;
      const ticks = this.valuesCount(data.counts);
      const setCount = data.counts.length;
      const axisWidth = axis.y.style['stroke-width'];

      const offset = {
        x: this.yAxisWidth() + ((this.barWidth() * setCount) / 2) + bar.margin + this.groupedMargin() / 2,
        y: this.gridHeight(),
      };
      let g;
      let gy;

      if (grid.x.visible) {
        // Add the X gridlines
        g = svg.append('g')
          .attr('class', 'grid gridX')
          .attr('transform', `translate(${offset.x}, ${offset.y})`);

        g.call(make_x_gridlines(grid.x.ticks || ticks)
          .tickSize(-height + this.xAxisHeight() + (margin.top * 2))
          .tickFormat(() => ''));

        attrs(g.selectAll('.tick line'), grid.x.style);
        attrs(g.selectAll('.domain'), { stroke: 'transparent' });
      }

      if (grid.y.visible) {
        // add the Y gridlines
        gy = svg.append('g')
          .attr('class', 'grid gridY')
          .attr('transform', 'translate(' + (this.yAxisWidth() + axisWidth) + ', 0)')
          .call(make_y_gridlines(grid.y.ticks || ticks)
            .tickSize(-width + (margin.left * 2) + this.yAxisWidth())
            .tickFormat(() => ''),
        );
        attrs(gy.selectAll('.tick line'), grid.y.style);

        // Hide the first horizontal grid line to show axis
        gy.selectAll('.gridY .tick line').filter((d, i) => i === 0)
          .attr('display', 'none');

        attrs(gy.selectAll('.domain'), { stroke: 'transparent' });
      }
    },

    /**
     * Update chart
     * @param {HTMLElement} el Chart element
     * @param {Object} props Chart props
     */
    update(el: HTMLElement, props: IHistogramChartState) {
      if (!props.data) {
        return;
      }
      this.props = merge(defaultProps, props);
      this._makeSvg(el);
      if (!this.props.data.bins) {
        return;
      }

      this._drawScales(this.props.data);
      this._drawGrid(this.props);
      this._drawBars(this.props.data);
    },

    /**
     * Any necessary clean up
     * @param {Element} el To remove
     */
    destroy(el: HTMLElement) {
      svg.selectAll('svg > *').remove();
    },
  };
  return HistogramD3;
});