import { Selection } from 'd3-selection';
import { IMargin } from '../Histogram';
export declare type TSelection = Selection<any, any, any, any>;
export declare type TTextSelection = Selection<SVGTextElement, any, any, any>;
interface ISizeProps {
    margin: IMargin;
    width: number | string;
    height: number | string;
    className: string;
}
export declare const makeSvg: (el: Element, svg: TSelection, svgId?: string | undefined) => TSelection;
export declare const sizeSVG: (svg: TSelection, props: ISizeProps) => void;
export declare const makeGrid: (svg: TSelection) => [TSelection, TSelection];
export declare const makeScales: (svg: TSelection) => [TSelection, TSelection, TSelection, TSelection, TSelection, TSelection];
export {};
