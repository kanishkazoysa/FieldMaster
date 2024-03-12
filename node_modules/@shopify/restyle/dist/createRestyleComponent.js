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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var composeRestyleFunctions_1 = __importDefault(require("./composeRestyleFunctions"));
var useRestyle_1 = __importDefault(require("./hooks/useRestyle"));
var createRestyleComponent = function (restyleFunctions, BaseComponent) {
    if (BaseComponent === void 0) { BaseComponent = react_native_1.View; }
    var composedRestyleFunction = (0, composeRestyleFunctions_1.default)(restyleFunctions);
    var RestyleComponent = react_1.default.forwardRef(function (props, ref) {
        var passedProps = (0, useRestyle_1.default)(composedRestyleFunction, props);
        return react_1.default.createElement(BaseComponent, __assign({ ref: ref }, passedProps));
    });
    return RestyleComponent;
};
exports.default = createRestyleComponent;
