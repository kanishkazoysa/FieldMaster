import React from 'react';
import { TextProps, ViewProps } from 'react-native';
interface DivProps {
    children?: React.ReactNode;
}
export default function Div<T>({ children, ...otherProps }: DivProps & TextProps & ViewProps): JSX.Element | null;
export {};
