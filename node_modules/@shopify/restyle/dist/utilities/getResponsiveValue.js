"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponsiveValue = void 0;
var getThemeValue_1 = require("./getThemeValue");
var getValueForScreenSize_1 = require("./getValueForScreenSize");
var isResponsiveObjectValue_1 = require("./isResponsiveObjectValue");
/**
 * Gets actual value for a given `themeKey` based on `breakpoints` and current `dimensions`.
 */
var getResponsiveValue = function (propValue, _a) {
    var theme = _a.theme, transform = _a.transform, dimensions = _a.dimensions, themeKey = _a.themeKey;
    var val = (0, isResponsiveObjectValue_1.isResponsiveObjectValue)(propValue, theme)
        ? (0, getValueForScreenSize_1.getValueForScreenSize)({
            responsiveValue: propValue,
            breakpoints: theme.breakpoints,
            dimensions: dimensions,
        })
        : propValue;
    return (0, getThemeValue_1.getThemeValue)(val, { theme: theme, transform: transform, themeKey: themeKey });
};
exports.getResponsiveValue = getResponsiveValue;
