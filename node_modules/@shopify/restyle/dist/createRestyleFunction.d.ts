import { BaseTheme, RestyleFunction, RNStyleProperty, StyleTransformFunction } from './types';
declare const createRestyleFunction: <Theme extends BaseTheme = BaseTheme, TProps extends {
    [key: string]: any;
} = {
    [key: string]: any;
}, P extends keyof TProps = keyof TProps, K extends keyof Theme | undefined = undefined, S extends RNStyleProperty = RNStyleProperty>({ property, transform, styleProperty, themeKey, }: {
    property: P;
    transform?: StyleTransformFunction<Theme, K, TProps[P]> | undefined;
    styleProperty?: S | undefined;
    themeKey?: K | undefined;
}) => {
    property: P;
    themeKey: K | undefined;
    variant: boolean;
    func: RestyleFunction<TProps, Theme, P | S>;
};
export default createRestyleFunction;
