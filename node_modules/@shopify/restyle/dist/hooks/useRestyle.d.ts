import { StyleProp } from 'react-native';
import { BaseTheme, RNStyle, Dimensions } from '../types';
declare const useRestyle: <Theme extends BaseTheme, TRestyleProps extends {
    [key: string]: any;
}, TProps extends TRestyleProps & {
    style?: StyleProp<RNStyle>;
}>(composedRestyleFunction: {
    buildStyle: <TInputProps extends TProps>(props: TInputProps, { theme, dimensions, }: {
        theme: Theme;
        dimensions: Dimensions | null;
    }) => RNStyle;
    properties: (keyof TProps)[];
    propertiesMap: { [key in keyof TProps]: boolean; };
}, props: TProps) => TProps;
export default useRestyle;
