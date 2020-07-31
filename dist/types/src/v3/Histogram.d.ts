import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { TTipFunc } from '../components/ToolTip';
import { ELabelOrientation, TAxisLabelFormat } from '../components/YAxis';
import { IGrid, IHistogramData } from '../Histogram';
import { EChartDirection } from './BarChart';
interface IProps {
    animation?: SpringConfig;
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: string[];
    data: IHistogramData;
    direction?: EChartDirection;
    grid?: IGrid;
    height: number;
    tip?: TTipFunc;
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    xAxisLabelOrientation?: ELabelOrientation;
    yAxisWidth?: number;
}
/**
 * A Histogram renders continuous data and thus use a ScaleLinear x & y axis
 */
declare const Histogram: FC<IProps>;
export default Histogram;
