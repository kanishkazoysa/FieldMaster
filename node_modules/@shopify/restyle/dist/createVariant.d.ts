import { BaseTheme, ResponsiveValue, RestyleFunctionContainer, SafeVariants } from './types';
import { AllProps } from './restyleFunctions';
declare function createVariant<Theme extends BaseTheme, K extends keyof SafeVariants<Theme> = keyof SafeVariants<Theme>, P extends keyof any = keyof any>(params: {
    property: P;
    themeKey: K;
    defaults?: AllProps<Theme>;
}): RestyleFunctionContainer<VariantProps<Theme, K, P>, Theme, P, K>;
declare function createVariant<Theme extends BaseTheme, K extends keyof SafeVariants<Theme> = keyof SafeVariants<Theme>>(params: {
    themeKey: K;
    defaults?: AllProps<Theme>;
}): RestyleFunctionContainer<VariantProps<Theme, K>, Theme, 'variant', K>;
export type VariantProps<Theme extends BaseTheme, K extends keyof Theme, Property extends keyof any = 'variant'> = {
    [key in Property]?: ResponsiveValue<keyof Omit<Theme[K], 'defaults'>, Theme['breakpoints']>;
};
export default createVariant;
