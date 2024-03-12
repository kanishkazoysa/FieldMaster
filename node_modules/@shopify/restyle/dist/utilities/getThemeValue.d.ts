import { BaseTheme, PropValue, StyleTransformFunction } from '../types';
/**
 * Returns value from a theme for a given `themeKey`, applying `transform` if defined.
 */
export declare function getThemeValue<TVal extends PropValue, Theme extends BaseTheme, K extends keyof Theme | undefined>(value: TVal | undefined, { theme, transform, themeKey, }: {
    theme: Theme;
    transform?: StyleTransformFunction<Theme, K, TVal>;
    themeKey?: K;
}): any;
