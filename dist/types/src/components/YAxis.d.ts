import { FC, SVGAttributes } from 'react';
import { IHistogramBar } from '../Histogram';
export declare type TAxisValue = string | number;
export interface IAxis {
    stroke?: string;
    height: number;
    width: number;
    values?: string[] | number[];
    tickSize?: number;
    path?: SVGAttributes<SVGPathElement>;
    scale?: 'linear' | 'band';
    top?: number;
    domain?: TAxisValue[];
    left?: number;
    padding?: IHistogramBar;
}
export declare const defaultPath: SVGAttributes<SVGPathElement>;
declare const YAxis: FC<IAxis>;
export default YAxis;