import { RestyleFunctionContainer, BaseTheme, Dimensions, RNStyle } from './types';
import { AllProps } from './restyleFunctions';
declare const composeRestyleFunctions: <Theme extends BaseTheme, TProps extends AllProps<Theme>>(restyleFunctions: (RestyleFunctionContainer<TProps, Theme, keyof TProps, keyof Theme | undefined> | RestyleFunctionContainer<TProps, Theme, keyof TProps, keyof Theme | undefined>[])[]) => {
    buildStyle: (props: TProps, { theme, dimensions, }: {
        theme: Theme;
        dimensions: Dimensions | null;
    }) => RNStyle;
    properties: (keyof TProps)[];
    propertiesMap: { [key in keyof TProps]: true; };
};
export default composeRestyleFunctions;
