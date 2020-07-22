import merge from 'deepmerge';
import fileDownload from 'js-file-download';
import React, {
  useReducer,
  useState,
} from 'react';

import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';

import { HorizontalHistogram } from '../../../src';
import Bars from '../../../src/components/Bars/Bars';
import Base from '../../../src/components/Base';
import ChartGrid from '../../../src/components/Grid';
import XAxis from '../../../src/components/XAxis';
import YAxis from '../../../src/components/YAxis';
import Histogram, {
  EGroupedBarLayout,
  IAxes,
  IGrid,
  IHistogramBar,
  IHistogramData,
} from '../../../src/Histogram';
import HistogramReact from '../../../src/HistogramNativeReact';
import Legend from '../../../src/Legend';
import { outputSvg } from '../../../src/utils/outputSvg';
import { DeepPartial } from '../../../src/utils/types';
import { useDomain } from '../../../src/utils/useDomain';
import {
  AxisActions,
  AxisOptionsFactory,
} from '../components/AxisOptions';
import ColorModifierFields from '../components/ColorModifierFields';
import DataGroup from '../components/DataGroup';
import { GridOptionsFactory } from '../components/GridOptions';
import JSXToString from '../components/JSXToString';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TabContainer } from '../components/TabContainer';
import {
  analyticsAxis,
  annotationsData,
  data,
  grid,
  smallAnnotationsData,
  smallData,
  smallData2,
  theme,
} from '../data';

const tipContentFns = [
  (bins, i, d) =>
    bins[i] + '<br />HI There ' + d.toFixed(2),
  (bins, i, d) =>
    bins[i] + '<br />Another tip ' + d.toFixed(2),
];

// const now = new Date();
// data.bins = data.bins.map((d, i) => new Date(new Date().setDate(now.getDate() + i)).toLocaleString());

export interface IInitialState {
  axis: DeepPartial<IAxes>;
  bar: DeepPartial<IHistogramBar>;
  chartType: string;
  data: IHistogramData;
  delay: number;
  duration: number;
  grid: IGrid;
  groupLayout: EGroupedBarLayout;
  width: number | string;
}

const initialSate: IInitialState = {
  axis: analyticsAxis,
  bar: {
    grouped: {
      paddingInner: 0.1,
      paddingOuter: 0,
    },
    paddingInner: 0.1,
    paddingOuter: 0,
    overlayMargin: 5,
    hover: {
      lighten: 0.1,
    },
  },
  chartType: 'Histogram',
  data,
  delay: 0,
  duration: 800,
  grid,
  groupLayout: EGroupedBarLayout.GROUPED,
  width: '600',
};

export type GridActions = { type: 'setGridTicks', ticks: number, axis: 'x' | 'y' }
  | { type: 'setGridStroke', color: string, axis: 'x' | 'y' }
  | { type: 'setGridStrokeOpacity', opacity: number, axis: 'x' | 'y' };

export type Actions = { type: 'setChartType'; chartType: string }
  | { type: 'setData'; data: IHistogramData }
  | { type: 'setDuration'; duration: number }
  | { type: 'setDelay'; delay: number }
  | { type: 'setGroupedBarLayout'; layout: EGroupedBarLayout; }
  | { type: 'setGroupedPaddingInner'; padding: number; }
  | { type: 'setGroupedPaddingOuter'; padding: number; }
  | { type: 'setOverlayMargin'; margin: number; }
  | { type: 'setWidth', width: string; }
  | { type: 'setHoverModifier'; value: number; key: string; index: number; }
  | { type: 'removeHoverModifier'; index: number; }
  | { type: 'setPaddingInner'; padding: number; }
  | { type: 'setPaddingOuter'; padding: number; }
  | GridActions
  | AxisActions
  ;

export function gridReducer<S extends any, A extends any>(state: S, action: A): any {
  switch (action.type) {
    case 'setChartType':
      return { ...state, chartType: action.chartType };
    case 'setData':
      return { ...state, data: action.data };
    case 'setDuration':
      return { ...state, duration: action.duration };
    case 'setDelay':
      return { ...state, delay: action.delay };
    case 'setGridTicks':
      return merge(state, { axis: { [action.axis]: { ticks: action.ticks } } })
    case 'setGridStroke':
      return merge(state, { grid: { [action.axis]: { style: { stroke: action.color } } } });
    case 'setGridStrokeOpacity':
      return merge(state, { grid: { [action.axis]: { style: { 'stroke-opacity': action.opacity } } } });
    default:
      return state;
  }
}

// Unclear why but you can't import a reducer in and have it update state???
export function axisReducer<S extends any, A extends any>(state: S, action: A): any {
  switch (action.type) {
    case 'setScale':
      return merge(state, {
        axis: {
          [action.axis]: {
            scale: action.value,
          },
        }
      })
    default:
      return state;
  }
}

function reducer(state: IInitialState, action: Actions): IInitialState {
  state = gridReducer(state, action);
  state = axisReducer(state, action);
  switch (action.type) {
    case 'setChartType':
      return { ...state, chartType: action.chartType };
    case 'setData':
      return { ...state, data: action.data };
    case 'setDuration':
      return { ...state, duration: action.duration };
    case 'setDelay':
      return { ...state, delay: action.delay };
    case 'setWidth':
      return { ...state, width: action.width };
    case 'setGridTicks':
      return merge(state, { grid: { [action.axis]: { ticks: action.ticks } } });
    case 'setGridStroke':
      return merge(state, { grid: { [action.axis]: { style: { stroke: action.color } } } });
    case 'setGridStrokeOpacity':
      return merge(state, { grid: { [action.axis]: { style: { 'stroke-opacity': action.opacity } } } });
    case 'setGroupedBarLayout':
      return { ...state, groupLayout: action.layout };
    case 'setOverlayMargin':
      return {
        ...state,
        bar: {
          ...state.bar,
          overlayMargin: action.margin,
        },
      }
    case 'setGroupedPaddingInner':
      return {
        ...state,
        bar: {
          ...state.bar,
          grouped: {
            ...state.bar.grouped,
            paddingInner: action.padding,
          }
        },
      }
    case 'setGroupedPaddingOuter':
      return {
        ...state,
        bar: {
          ...state.bar,
          grouped: {
            ...state.bar.grouped,
            paddingOuter: action.padding,
          }
        },
      }
    case 'setPaddingInner':
      return {
        ...state,
        bar: {
          ...state.bar,
          paddingInner: action.padding,
        },
      };
    case 'setPaddingOuter':
      return {
        ...state,
        bar: {
          ...state.bar,
          paddingOuter: action.padding,
        },
      };
    case 'setHoverModifier': {
      const hover = { ...state.bar.hover };
      const keys = Object.keys(hover);
      delete hover[''];
      let i: number;
      // When adding an option its initially keyed to '' - remove those
      for (i = keys.length; i >= 0; i--) {
        if (keys[i] === '') {
          delete hover[''];
        }
      }
      const k = Object.keys(hover)[action.index];
      delete hover[k];
      hover[action.key] = action.value;
      return {
        ...state,
        bar: {
          ...state.bar,
          hover,
        }
      }
    }
    case 'removeHoverModifier': {
      const hover = { ...state.bar.hover };
      const k = Object.keys(hover)[action.index];
      delete hover[k];
      return {
        ...state,
        bar: {
          ...state.bar,
          hover,
        }
      }
    }
    default:
      return state;
  }
}

export const dataToSpreadSheet = (datum: IHistogramData): any => {
  const spreadSheetData: any = [];

  datum.bins.forEach((b, i) => {
    if (!spreadSheetData[i]) {
      spreadSheetData[i] = [];
    }
    spreadSheetData[i][0] = { value: b };
  });
  datum.counts.forEach((c, i) => {
    c.data.forEach((d, x) => {
      if (!spreadSheetData[x]) {
        spreadSheetData[x] = [];
      }
      spreadSheetData[x][i + 1] = { value: d };
    });
  });
  return spreadSheetData;
};

const GridOptions = GridOptionsFactory<(action: Actions) => void, IInitialState>();
const AxisOptions = AxisOptionsFactory<(action: Actions) => void, IInitialState>();
const watermarkSvg = require('../../../src/assets/Powered-By-InfoSum_DARK.svg') as string;

const HistogramExample = () => {
  const [tab, setTab] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialSate);
  const [visible, setVisible] = useState({});
  const spreadSheetData = dataToSpreadSheet(state.data);
  const dataLegendData = {
    bins: data.counts.map((c) => c.label),
    counts: [{
      data: data.counts.map((c) => c.data.reduce((p, n) => p + n, 0)),
      label: '',
    }],
  };
  const Chart = state.chartType === 'Histogram' ? Histogram : HorizontalHistogram;
  const chart = <Chart data={state.data}
    axis={state.axis}
    bar={state.bar}
    grid={state.grid}
    width={state.width}
    annotations={annotationsData}
    annotationTextSize={'0.5rem'}
    showBinPercentages={[true, true]}
    onClick={(d) => console.log(d)}
    height={420}
    delay={state.delay}
    duration={state.duration}
    visible={visible}
    colorScheme={['#a9a9a9', '#2a5379']}
    groupLayout={state.groupLayout}
    id="bigHistogram"
    tipContentFn={(bin, i, d) => {
      return 'ABC12345' + '<br />' + d.toFixed(2);
    }}
    axisLabelTipContentFn={(bin, i, d) => {
      const binPos = bin.findIndex((b) => b === d);
      return bin[binPos];
    }}
  />;
  const [dataIndex, setDataIndex] = useState(0);
  const d = dataIndex === 0 ? smallData : data;
  const domain = useDomain({
    groupLayout: state.groupLayout,
    bins: d.bins,
    dataSets: [],
    values: d.counts
  });

  return (
    <Layout>
      <SEO title="Histogram" description="" />
      <Typography variant="h2">
        Histogram
      </Typography>
      <div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h1>React only</h1>
                {/* <HistogramReact
                  data={d}
                /> */}

                <Button onClick={() => setDataIndex(dataIndex === 1 ? 0 : 1)}>
                  toggle data
                </Button>

                <Base
                  width={800}
                  height={400}>

                  <ChartGrid
                    left={100}
                    height={300}
                    svgProps={{ opacity: 0.2 }}
                    lines={{
                      vertical: 4,
                      horizontal: 4,
                    }}
                    width={400} />

                  <Bars
                    left={100}
                    height={300}
                    width={400}

                    groupLayout={state.groupLayout}
                    values={d.counts}
                    bins={d.bins}
                    domain={domain}
                  />
                  <YAxis
                    width={100}
                    height={300}
                    values={[0, 45000, 90000]}
                    domain={domain}
                  />
                  <XAxis
                    width={400}
                    height={40}
                    top={300}
                    left={100}
                    values={d.bins} />

                </Base>

                <h1>d3</h1>
                <Button size="small" color="primary" variant="contained" style={{ marginBottom: '1rem' }} onClick={(e) => {
                  e.preventDefault();
                  outputSvg('bigHistogram', 420, 420, (blobData) => {
                    fileDownload(blobData, 'big_chart.png');
                  },
                    {
                      svg: watermarkSvg,
                      width: 200,
                      height: 62,
                    },
                    'blob',
                  )
                }}>Download</Button>
                {chart}
                <Button size="small" color="primary" variant="contained" style={{ marginBottom: '1rem' }} onClick={(e) => {
                  e.preventDefault();
                  outputSvg('smallHistogram', 420, 420, (blobData) => {
                    fileDownload(blobData, 'small_chart.png');
                  },
                    {
                      svg: watermarkSvg,
                      width: 120,
                      height: 37,
                    },
                    'blob',
                  )
                }}>Download</Button>
                <Chart data={dataIndex === 0 ? smallData : data}
                  axis={state.axis}
                  bar={state.bar}
                  grid={state.grid}
                  width="100%"
                  annotations={smallAnnotationsData}
                  showBinPercentages={[true, true]}
                  onClick={(d) => console.log(d)}
                  height={420}
                  delay={state.delay}
                  duration={state.duration}
                  visible={visible}
                  colorScheme={dataIndex === 0 ? ['#a9a9a9', '#2a5379'] : ['#afeeff', 'afbb44']}
                  groupLayout={state.groupLayout}
                  tipContentFn={tipContentFns[0]}
                  id="smallHistogram"
                />

                <Legend
                  theme={theme}
                  data={dataLegendData}
                  onSelect={(key) => {
                    setVisible({ ...visible, [key]: visible.hasOwnProperty(key) ? !visible[key] : false });
                  }}
                  visible={visible}
                />
              </CardContent>
            </Card>
            <br />
            <Card>
              <CardContent>
                <JSXToString component={chart} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                  <Tab label="Data" />
                  <Tab label="Styling" />
                  <Tab label="Animation" />
                  <Tab label="Grid" />
                  <Tab label="Axes" />
                </Tabs>
                {
                  tab === 0 && <TabContainer>
                    <Grid container spacing={10}>
                      <Grid item xs={6}>
                        <TextField
                          select
                          label="Chart direction"
                          value={state.chartType}
                          onChange={(e) => {
                            dispatch({ type: 'setChartType', chartType: e.target.value });
                          }}
                        >
                          <MenuItem value="Histogram">
                            Histogram
                          </MenuItem>
                          <MenuItem value="HorizontalHistogram">
                            HorizontalHistogram
                          </MenuItem>

                        </TextField>
                      </Grid>
                    </Grid>
                    <DataGroup<Actions, IInitialState>
                      dispatch={dispatch}
                      state={state}
                      headings={state.data.counts.map((count, i) => count.label)}
                      spreadSheetData={spreadSheetData}
                      onDeleteData={(i) => {
                        const newData = { ...state.data };
                        newData.counts = newData.counts.filter((_, k) => k !== i);
                        if (newData.counts.length > 0) {
                          dispatch({ type: 'setData', data: newData } as any);
                        }
                      }}
                      onAddData={() => {
                        const newData = { ...state.data };
                        const newDataset = {
                          label: 'dataset ' + (newData.counts.length + 1),
                          data: new Array(state.data.counts[0].data.length).fill(0),
                        };
                        newData.counts.push(newDataset);
                        dispatch({ type: 'setData', data: newData } as any);
                      }}
                    />
                  </TabContainer>
                }
                {
                  tab === 1 && <TabContainer>
                    <Grid container spacing={10}>
                      <Grid item xs={6}>
                        <TextField
                          select
                          label="Group Layout"
                          value={state.groupLayout}
                          onChange={(e) => {
                            dispatch({ type: 'setGroupedBarLayout', layout: Number(e.target.value) })
                          }}>
                          <MenuItem value={EGroupedBarLayout.GROUPED}>Grouped</MenuItem>
                          <MenuItem value={EGroupedBarLayout.OVERLAID}>Overlaid</MenuItem>
                          <MenuItem value={EGroupedBarLayout.STACKED}>Stacked</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Chart width"
                          value={state.width}
                          onChange={(e) => {
                            dispatch(({ type: 'setWidth', width: e.target.value }))
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <label>
                          Grouped padding inner (0 - 1)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={1}
                          step={0.1}
                          value={state.bar.grouped.paddingInner.toString()}
                          onChange={(e: any) => {
                            dispatch(({ type: 'setGroupedPaddingInner', padding: parseFloat(e.target.value) }))
                          }}
                        />
                        <div><small>
                          When rendered as grouped, this is the relative spacing between each bar in the group
                        </small>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <label>
                          Grouped padding outer (0 - 1)
                        </label>
                        <input
                          type="number"
                          min={0}
                          step={0.1}
                          max={1}
                          value={state.bar.grouped.paddingOuter.toString()}
                          onChange={(e: any) => {
                            dispatch(({ type: 'setGroupedPaddingOuter', padding: parseFloat(e.target.value) }))
                          }}
                        />
                        <div>
                          <small>
                            When rendered as grouped, this is the relative spacing at the start  and end of the group's bars
                        </small>
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <label>
                          Padding inner (0 - 1)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={1}
                          step={0.1}
                          value={state.bar.paddingInner.toString()}
                          onChange={(e: any) => {
                            dispatch(({ type: 'setPaddingInner', padding: parseFloat(e.target.value) }))
                          }}
                        />
                        <div>
                          <small>
                            This is the relative padding for the inside of grouped datasets or single datasets
                        </small>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <label>
                          Padding outer (0 - 1)
                        </label>
                        <input
                          type="number"
                          min={0}
                          step={0.1}
                          max={1}
                          value={state.bar.paddingOuter.toString()}
                          onChange={(e: any) => {
                            dispatch(({ type: 'setPaddingOuter', padding: parseFloat(e.target.value) }))
                          }}
                        />
                        <small>
                          This is the relative padding for the outside of grouped datasets or single datasets
                        </small>
                      </Grid>

                      {
                        state.groupLayout === EGroupedBarLayout.OVERLAID &&
                        <Grid item xs={6}>
                          <TextField
                            helperText="When rendered as overlaid, this is the space between the overlaid bars"
                            label="Overlay margin (px)"
                            value={state.bar.overlayMargin}
                            onChange={(e) => {
                              dispatch(({ type: 'setOverlayMargin', margin: Number(e.target.value) }))
                            }}
                          />
                        </Grid>
                      }
                      <ColorModifierFields
                        values={state.bar.hover}
                        dispatch={dispatch} />
                    </Grid>
                  </TabContainer>
                }
                {
                  tab === 2 && <TabContainer>
                    <Grid container spacing={10}>
                      <Grid item xs={6}>
                        <TextField
                          id="animationDuration"
                          value={state.duration}
                          label="Duration"
                          onChange={(e) => dispatch({ type: 'setDuration', duration: Number(e.target.value) })}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="animationDelay"
                          value={state.delay}
                          label="Delay"
                          onChange={(e) => dispatch({ type: 'setDelay', delay: Number(e.target.value) })}
                        />
                      </Grid>
                    </Grid>
                  </TabContainer>
                }
                {
                  tab === 3 && <TabContainer>
                    <GridOptions
                      dispatch={dispatch}
                      state={state} />
                  </TabContainer>
                }
                {
                  tab === 4 && <TabContainer>
                    <AxisOptions
                      dispatch={dispatch}
                      state={state} />
                  </TabContainer>
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default HistogramExample;
