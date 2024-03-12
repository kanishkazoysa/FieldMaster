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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.theme = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var useRestyle_1 = __importDefault(require("../hooks/useRestyle"));
var createVariant_1 = __importDefault(require("../createVariant"));
var composeRestyleFunctions_1 = __importDefault(require("../composeRestyleFunctions"));
var restyleFunctions_1 = require("../restyleFunctions");
var palette = {
    purple: '#5A31F4',
    green: '#099C77',
    black: '#101010',
    white: '#FFF',
};
exports.theme = {
    colors: {
        background: palette.purple,
    },
    spacing: {
        none: 0,
        m: 8,
    },
    breakpoints: {
        phone: 320,
        tablet: 768,
    },
    spacingVariant: {
        defaults: {},
        spacingParent: {
            padding: {
                phone: 'none',
                tablet: 'none',
            },
        },
        spacingNested: {
            padding: {
                phone: 'm',
                tablet: 'm',
            },
        },
    },
};
var restyleFunctions = (0, composeRestyleFunctions_1.default)([
    restyleFunctions_1.spacing,
    restyleFunctions_1.backgroundColor,
    (0, createVariant_1.default)({ themeKey: 'spacingVariant' }),
]);
var Container = function (_a) {
    var children = _a.children, rest = __rest(_a, ["children"]);
    var props = (0, useRestyle_1.default)(restyleFunctions, rest);
    return react_1.default.createElement(react_native_1.View, __assign({}, props), children);
};
exports.Container = Container;
