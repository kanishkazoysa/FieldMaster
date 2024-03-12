"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boxRestyleFunctions = void 0;
var react_native_1 = require("react-native");
var createRestyleComponent_1 = __importDefault(require("./createRestyleComponent"));
var restyleFunctions_1 = require("./restyleFunctions");
exports.boxRestyleFunctions = [
    restyleFunctions_1.backgroundColor,
    restyleFunctions_1.backgroundColorShorthand,
    restyleFunctions_1.opacity,
    restyleFunctions_1.visible,
    restyleFunctions_1.layout,
    restyleFunctions_1.spacing,
    restyleFunctions_1.spacingShorthand,
    restyleFunctions_1.border,
    restyleFunctions_1.shadow,
    restyleFunctions_1.position,
];
var createBox = function (BaseComponent) {
    if (BaseComponent === void 0) { BaseComponent = react_native_1.View; }
    return (0, createRestyleComponent_1.default)(exports.boxRestyleFunctions, BaseComponent);
};
exports.default = createBox;
