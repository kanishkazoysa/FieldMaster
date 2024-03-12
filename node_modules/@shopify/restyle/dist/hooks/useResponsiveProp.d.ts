import { PropValue, ResponsiveBaseTheme, ResponsiveValue } from '../types';
declare const useResponsiveProp: <Theme extends ResponsiveBaseTheme, TVal extends PropValue>(propValue: ResponsiveValue<TVal, Theme["breakpoints"]>) => TVal | undefined;
export default useResponsiveProp;
