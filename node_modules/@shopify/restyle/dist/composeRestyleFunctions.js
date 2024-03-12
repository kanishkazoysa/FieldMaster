"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var composeRestyleFunctions = function (restyleFunctions) {
    var flattenedRestyleFunctions = restyleFunctions.reduce(function (acc, item) {
        return acc.concat(item);
    }, []);
    var properties = flattenedRestyleFunctions.map(function (styleFunc) {
        return styleFunc.property;
    });
    var propertiesMap = properties.reduce(function (acc, prop) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[prop] = true, _a)));
    }, {});
    var funcsMap = flattenedRestyleFunctions.reduce(function (acc, each) {
        var _a;
        return (__assign((_a = {}, _a[each.property] = each.func, _a), acc));
    }, {});
    // TInputProps is a superset of TProps since TProps are only the Restyle Props
    var buildStyle = function (props, _a) {
        var theme = _a.theme, dimensions = _a.dimensions;
        var styles = {};
        var options = { theme: theme, dimensions: dimensions };
        // We make the assumption that the props object won't have extra prototype keys.
        // eslint-disable-next-line guard-for-in
        for (var key in props) {
            var mappedProps = funcsMap[key](props, options);
            // eslint-disable-next-line guard-for-in
            for (var mappedKey in mappedProps) {
                styles[mappedKey] = mappedProps[mappedKey];
            }
        }
        var stylesheet = react_native_1.StyleSheet.create({ stylesheet: styles }).stylesheet;
        return stylesheet;
    };
    return {
        buildStyle: buildStyle,
        properties: properties,
        propertiesMap: propertiesMap,
    };
};
exports.default = composeRestyleFunctions;
