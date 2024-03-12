import { BaseTheme } from './types';
declare const createTheme: <T extends BaseTheme>(themeObject: T) => T;
export default createTheme;
