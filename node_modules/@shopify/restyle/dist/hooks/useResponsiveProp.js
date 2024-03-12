"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var utilities_1 = require("../utilities");
var useTheme_1 = __importDefault(require("./useTheme"));
var useResponsiveProp = function (propValue) {
    var theme = (0, useTheme_1.default)();
    var dimensions = (0, react_native_1.useWindowDimensions)();
    return (0, utilities_1.isResponsiveObjectValue)(propValue, theme)
        ? (0, utilities_1.getValueForScreenSize)({
            responsiveValue: propValue,
            breakpoints: theme.breakpoints,
            dimensions: dimensions,
        })
        : propValue;
};
exports.default = useResponsiveProp;
