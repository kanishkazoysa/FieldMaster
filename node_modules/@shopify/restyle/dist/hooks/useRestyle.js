"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var useTheme_1 = __importDefault(require("./useTheme"));
var filterRestyleProps = function (componentProps, omitPropertiesMap) {
    var _a;
    var cleanProps = {};
    var restyleProps = {};
    var serializedRestyleProps = '';
    if (omitPropertiesMap.variant) {
        restyleProps.variant = (_a = componentProps.variant) !== null && _a !== void 0 ? _a : 'defaults';
    }
    for (var key in componentProps) {
        if (omitPropertiesMap[key]) {
            restyleProps[key] = componentProps[key];
            serializedRestyleProps += "".concat(String(key), ":").concat(componentProps[key], ";");
        }
        else {
            cleanProps[key] = componentProps[key];
        }
    }
    var keys = { cleanProps: cleanProps, restyleProps: restyleProps, serializedRestyleProps: serializedRestyleProps };
    return keys;
};
var useRestyle = function (composedRestyleFunction, props) {
    var theme = (0, useTheme_1.default)();
    // Theme should not change between renders, so we can disable rules-of-hooks
    // We want to avoid calling useWindowDimensions if breakpoints are not defined
    // as this hook is called extremely often and incurs some performance hit.
    var dimensions = theme.breakpoints
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
            (0, react_native_1.useWindowDimensions)()
        : null;
    var _a = filterRestyleProps(props, composedRestyleFunction.propertiesMap), cleanProps = _a.cleanProps, restyleProps = _a.restyleProps, serializedRestyleProps = _a.serializedRestyleProps;
    var calculatedStyle = (0, react_1.useMemo)(function () {
        var style = composedRestyleFunction.buildStyle(restyleProps, {
            theme: theme,
            dimensions: dimensions,
        });
        var styleProp = props.style;
        if (typeof styleProp === 'function') {
            return (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return [style, styleProp.apply(void 0, args)].filter(Boolean);
            });
        }
        return [style, styleProp].filter(Boolean);
        // We disable the exhaustive deps rule here in order to trigger the useMemo
        // when the serialized string of restyleProps changes instead of the object
        // reference which will change on every render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        theme,
        dimensions,
        props.style,
        serializedRestyleProps,
        composedRestyleFunction,
    ]);
    cleanProps.style = calculatedStyle;
    return cleanProps;
};
exports.default = useRestyle;
