import { AtLeastOneResponsiveValue, Breakpoint, Dimensions, ResponsiveBaseTheme } from '../types';
/**
 * Returns actual value for given `responsiveValue`, `breakpoints`, and current `dimensions`.
 */
export declare const getValueForScreenSize: <Theme extends ResponsiveBaseTheme, TVal>({ responsiveValue, breakpoints, dimensions, }: {
    responsiveValue: AtLeastOneResponsiveValue<TVal, Theme["breakpoints"], Theme["breakpoints"] extends infer T extends {
        [key: string]: Breakpoint;
    } | undefined ? { [Key in keyof T]: { [key in Key]: TVal; }; } : never>;
    breakpoints: Theme["breakpoints"];
    dimensions: Dimensions;
}) => TVal | undefined;
