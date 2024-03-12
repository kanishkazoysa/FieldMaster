import { Dimensions, PropValue, ResponsiveValue, ResponsiveBaseTheme, StyleTransformFunction } from '../types';
type ValueOf<T> = T[keyof T];
/**
 * Gets actual value for a given `themeKey` based on `breakpoints` and current `dimensions`.
 */
export declare const getResponsiveValue: <TVal extends PropValue, Theme extends ResponsiveBaseTheme, K extends keyof Theme | undefined>(propValue: ResponsiveValue<TVal, Theme["breakpoints"]>, { theme, transform, dimensions, themeKey, }: {
    theme: Theme;
    transform?: StyleTransformFunction<Theme, K, TVal> | undefined;
    dimensions: Dimensions;
    themeKey?: K | undefined;
}) => TVal | (K extends keyof Theme ? ValueOf<Theme[K]> : never) | null | undefined;
export {};
