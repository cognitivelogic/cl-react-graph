/// <reference path="./interfaces.d.ts" />
import { interpolate } from 'd3-interpolate';
import { scaleOrdinal } from 'd3-scale';
import { select, Selection } from 'd3-selection';
import { arc, pie, PieArcDatum } from 'd3-shape';
import 'd3-transition';
import merge from 'deepmerge';
import { get } from 'lodash';
import * as textWidth from 'text-width';
import colorScheme from './colors';
import { IPieChartProps, IPieDataItem } from './PieChart';
import tips from './tip';

export const pieChartD3 = ((): IChartAdaptor => {

  let svg;
  let tipContainer;
  let tipContent;

  const defaultProps: IPieChartProps = {
    backgroundColor: '#ddd',
    className: 'piechart-d3',
    colorScheme,
    data: {
      bins: [],
      counts: [],
    },
    donutWidth: 0,
    height: 200,
    labels: {
      display: true,
      displayFn: (d, ix) => d.value,
    },
    margin: {
      left: 10,
      top: 10,
    },
    tip: tips,
    tipContainer: 'body',
    tipContentFn: (bins: string[], i: number, d: number, groupLabel): string => {
      return groupLabel + ': ' + bins[i] + '<br />' + d;
    },
    visible: {},
    width: 200,
  };

  const PieChartD3 = {

    create(el: HTMLElement, props: Partial<IPieChartProps> = {}) {
      this.props = merge(defaultProps, { ...props });
      this.previousData = props.data.counts.map((set: IHistogramDataSet, setIndex: number) => {
        return set.data
          .map((count, i) => ({
            count,
            groupLabel: set.label,
            label: props.data.bins[i],
          }));
      });
      this._makeSvg(el);
      this.containers = [];
      this.previousData.forEach((dataSet, i) => {
        this.drawChartBg(this.props.data, i);
      });

      this.update(el, props);
    },

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
      svg = select(el).append('svg')
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
      tipContainer = select(this.props.tipContainer)
        .append('div')
        .attr('class', 'tooltip top pietip')
        .style('opacity', 0);

      tipContainer.append('div')
        .attr('class', 'tooltip-arrow');
      tipContent = tipContainer.append('div')
        .attr('class', 'tooltip-inner');
    },

    update(el: HTMLElement, props: Partial<IPieChartProps>) {
      if (!props.data) {
        return;
      }
      this.props = merge(defaultProps, props);
      if (props.colorScheme) {
        this.props.colorScheme = props.colorScheme;
      }
      // this._makeSvg(el);
      if (!this.props.data.bins) {
        return;
      }

      this.drawCharts();
    },

    outerRadius(setIndex = 0) {
      const { donutWidth = 0, width, height } = this.props;

      const radius = Math.min(width, height) / 2;
      return donutWidth === 0
        ? radius - 10
        : radius - 10 - (setIndex * (donutWidth + 10));
    },

    innerRadius(setIndex = 0) {
      const { donutWidth = 0, width, height } = this.props;
      const radius = Math.min(width, height) / 2;
      return donutWidth === 0
        ? 0
        : radius - 10 - donutWidth - (setIndex * (donutWidth + 10));
    },

    drawCharts() {
      const { data, visible } = this.props;
      this.dataSets = data.counts.map((set: IHistogramDataSet, setIndex: number) => {
        return set.data
          .map((count, i) => ({
            count: visible[data.bins[i]] !== false ? count : 0,
            groupLabel: set.label,
            label: data.bins[i],
          }));
      });

      this.dataSets.forEach((dataSet, i) => {
        const theme = get(data.counts[i], 'colors', this.props.colorScheme);
        this.drawChart(dataSet, i, data.bins, theme);
      });
      this.previousData = this.dataSets;
    },

    drawChartBg(data, i) {
      const { backgroundColor, width, height } = this.props;
      const tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
      const outerRadius = this.outerRadius(i);
      const innerRadius = this.innerRadius(i);
      const bgArc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(tau);
      const container = svg
        .append('g')
        .attr('class', 'pie-bg');
      const background = container.append('path')
        .attr('class', 'pie-background')
        .style('fill', backgroundColor)
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        .attr('d', bgArc);

      if (!this.containers[i]) {
        this.containers[i] = svg
          .append('g')
          .attr('class', 'pie-container');
      }
    },

    drawChart(data, i: number, bins: string[], theme: string[]) {
      const { labels, width, height, tip, tipContentFn } = this.props;
      // Stack multiple charts in concentric circles
      const outerRadius = this.outerRadius(i);
      const innerRadius = this.innerRadius(i);

      // Function to calculate pie chart paths from data
      const thisPie = pie()
        .sort(null)
        .value((d: any) => {
          return d.count;
        });

      // Formated pie chart arcs based on previous current data
      const arcs = thisPie(this.previousData[i]);

      const colors = scaleOrdinal(theme);

      const thisArc = arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

      const path = this.containers[i].selectAll('path')
        .data(thisPie(data));

      const g = path.enter().append('g')
        .attr('class', 'arc')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      g.append('path')
        .attr('stroke', '#FFF')
        .attr('fill', (d, j) => colors(j))
        .attr('d', thisArc)
        .each(function (d, j) { this._current = arcs[j]; }) // store the initial angles
        .on('mouseover', (d: PieArcDatum<IPieDataItem>, ix: number) => {
          tipContent.html(() => tipContentFn(bins, ix, d.data.count, d.data.groupLabel));
          tip.fx.in(tipContainer);
        })
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer));

      path.transition()
        .delay(400)
        .duration(500)
        .attrTween('d', arcTween(thisArc));

      if (labels.display) {
        const lbls = this.containers[i].selectAll('text')
          .data(thisPie(data));
        lbls.enter()
          .append('text')
          .attr('transform', (d) => {
            const centroid = thisArc.centroid(d);
            const x = centroid[0] + (width / 2);
            const y = centroid[1] + (height / 2);
            return 'translate(' + x + ',' + y + ')';
          })
          .merge(lbls)
          .each(function (d, j) {
            // Store current value to work out fx transition opacities
            this._current = d;
          })

          .text((d, ix) => {
            if (d.value === 0) {
              return '';
            }
            return labels.displayFn(d, ix);
          });

        lbls.transition()
          .duration(500)
          .style('opacity', 0)
          .transition()
          .attr('transform', (d) => {
            const centroid = thisArc.centroid(d);
            const x = centroid[0] + (width / 2);
            const y = centroid[1] + (height / 2);
            return 'translate(' + x + ',' + y + ')';

          })
          .transition()
          .duration(500)
          .style('opacity', (d, ix, c) => {
            // Only show if the new value is not 0
            return c[ix]._current.value === 0 ? 0 : 1;
          });

        lbls.merge(lbls);
      }

      path.merge(path);

      path.exit().remove();
    },

    /**
     * Any necessary clean up
     * @param {Element} el To remove
     */
    destroy(el: HTMLElement) {
      svg.selectAll('svg > *').remove();
    },
  };

  return PieChartD3;
});

// Returns a tween for a transition’s "d" attribute, transitioning any selected
// arcs from their current angle to the specified new angle.
function arcTween(thisArc) {
  return function (d) {
    const i = interpolate(this._current, d);
    this._current = i(0);
    return function (t) {
      return thisArc(i(t));
    };
  };
}
