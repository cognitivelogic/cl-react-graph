import { color } from 'd3-color';
import {
  scaleBand,
  scaleLinear,
} from 'd3-scale';
import React, {
  FC,
  useState,
} from 'react';
import {
  animated,
  SpringConfig,
  useSprings,
} from 'react-spring';
import { Tooltip } from 'react-svg-tooltip';

import { IGroupDataItem } from '../../BaseHistogramD3';
import {
  IHistogramBar,
  IHistogramDataSet,
} from '../../Histogram';
import {
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  groupedPaddingOuter,
  paddingInner,
  paddingOuter,
} from '../../utils/bars';
import { EChartDirection } from '../../v3/Histogram';
import {
  TipContent,
  TTipFunc,
} from '../ToolTip';
import { buildBarSprings } from './barHelper';

enum EGroupedBarLayout {
  GROUPED,
  STACKED,
  OVERLAID,
}

interface IProps {
  padding?: IHistogramBar;
  values: IHistogramDataSet[];
  domain: number[]
  height: number;
  width: number;
  left?: number;
  top?: number;
  groupLayout?: EGroupedBarLayout;
  bins: string[]
  colorScheme?: readonly string[],
  hoverColorScheme?: readonly string[];
  config?: SpringConfig;
  visible?: Record<string, boolean>;
  tip?: TTipFunc;
  direction?: EChartDirection;
}

const paddings = {
  grouped: {
    paddingInner: 0.1,
    paddingOuter: 0,
  },
  overlayMargin: 5,
  paddingInner: 0,
  paddingOuter: 0,
};

export type ExtendedGroupItem = IGroupDataItem & {
  datasetIndex: number;
  binIndex: number;
}

const Bars: FC<IProps> = ({
  values,
  domain,
  height,
  width,
  left = 0,
  top = 0,
  groupLayout = EGroupedBarLayout.GROUPED,
  bins,
  config = {
    duration: 250,
  },
  colorScheme = ['#a9a9a9', '#2a5379'],
  hoverColorScheme,
  padding = paddings,
  visible = {},
  tip,
  direction = EChartDirection.horizontal,
}) => {
  if (width === 0) {
    return null;
  }
  if (!hoverColorScheme) {
    hoverColorScheme = colorScheme.map((c) => color(c)?.brighter(0.1).toString()) as readonly string[];
  }
  const dataSets: ExtendedGroupItem[] = [];

  values.forEach((count, datasetIndex) => {
    count.data.forEach((value, i) => {
      dataSets.push({
        groupLabel: count.label,
        datasetIndex,
        label: bins[i],
        binIndex: i,
        value: visible[bins[i]] !== false && visible[count.label] !== false ? value : 0,
      });
    });
  });

  const numericScale = scaleLinear()
    .domain(domain)
    .rangeRound([0, direction === EChartDirection.horizontal ? width : height]);

  // Distribute the bin values across the x axis
  const bandScale = scaleBand().domain(bins);
  bandScale.rangeRound([0, direction === EChartDirection.horizontal ? height : width])
    .paddingInner(paddingInner(padding))
    .paddingOuter(paddingOuter(padding))
    .align(0.5);

  const dataLabels = values.map((c) => c.label);

  // Used to distribute a given bins values 
  const innerScaleBand = scaleBand();
  const innerDomain = groupedBarsUseSameXAxisValue({ groupLayout }) ? ['main'] : dataLabels;
  innerScaleBand
    .domain(innerDomain)
    .rangeRound([0, bandScale.bandwidth()])
    .paddingInner(groupedPaddingInner(padding))
    .paddingOuter(groupedPaddingOuter(padding)) // Center the bar distribution around the middle;

  const transform = `(${left}, ${top})`;

  const [hover, setHover] = useState(-1);
  const springs = useSprings(dataSets.length, buildBarSprings({
    values,
    height,
    width,
    dataSets,
    numericScale,
    bandScale,
    colorScheme,
    innerDomain,
    innerScaleBand,
    hoverColorScheme,
    groupLayout,
    paddings,
    config,
    direction,
  }));

  console.log('Bars 2 -> tip', tip);
  const ThisTip = tip ?? TipContent;
  const refs: any[] = [];
  return (
    <>
      <g className="bars"
        transform={`translate${transform}`}>
        {
          springs.map((props: any, i) => {
            refs[i] = React.createRef<any>();
            return <animated.rect
              ref={refs[i]}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              key={dataSets[i].groupLabel + dataSets[i].label}
              height={props.height}
              fill={hover == i ? props.hoverFill : props.fill}
              width={props.width}
              x={props.x as any}
              y={props.y as any}
            />
          })
        }
      </g>
      <g className="tips">
        {
          springs.map((_, i) => <Tooltip triggerRef={refs[i]}>
            <ThisTip item={dataSets[i]} />
          </Tooltip>)
        }
      </g>
    </>)
}


export default Bars;
