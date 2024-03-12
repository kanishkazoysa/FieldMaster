import { AtLeastOneResponsiveValue, ResponsiveBaseTheme, ResponsiveValue } from '../types';
export declare const isResponsiveObjectValue: <Theme extends ResponsiveBaseTheme, TVal>(val: ResponsiveValue<TVal, Theme["breakpoints"]>, theme: Theme) => val is AtLeastOneResponsiveValue<TVal, Theme["breakpoints"], Theme["breakpoints"] extends infer T extends {
    [key: string]: import("../types").Breakpoint;
} | undefined ? { [Key in keyof T]: { [key in Key]: TVal; }; } : never>;
