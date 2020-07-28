import { ScaleOrdinal } from 'd3-scale';
import { IGroupDataItem } from '../BaseHistogramD3';
import { EColorManipulations, TipContentFn } from '../Histogram';
interface IProps {
    bins: string[];
    hover?: Partial<Record<EColorManipulations, number>>;
    colors: ScaleOrdinal<string, string>;
    tipContentFn: TipContentFn<string> | undefined;
    tipContent: any;
    tip: any;
    tipContainer: string;
    colourIndex?: string;
}
interface IMouseOutTipProps {
    tip: any;
    tipContainer: any;
}
interface IMouseOutProps extends IMouseOutTipProps {
    colors: ScaleOrdinal<string, string>;
}
export declare const onMouseOverAxis: (props: IProps) => (d: IGroupDataItem | any, i: number, nodes: any) => void;
export declare const onMouseOver: (props: IProps) => (d: IGroupDataItem | any, i: number, nodes: any) => void;
export declare const onMouseOut: (props: IMouseOutProps) => (d: IGroupDataItem | number, i: number, nodes: any) => void;
export declare const onClick: (onClick?: ((v: any) => void) | undefined) => (d: IGroupDataItem | number) => void;
export {};
