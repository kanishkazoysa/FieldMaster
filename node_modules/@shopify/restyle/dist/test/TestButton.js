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
exports.Button = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var useRestyle_1 = __importDefault(require("../hooks/useRestyle"));
var restyleFunctions_1 = require("../restyleFunctions");
var createVariant_1 = __importDefault(require("../createVariant"));
var composeRestyleFunctions_1 = __importDefault(require("../composeRestyleFunctions"));
var theme = {
    colors: {},
    spacing: {},
    buttonVariants: {
        defaults: {},
    },
    breakpoints: {
        phone: 0,
        tablet: 376,
    },
    zIndices: {
        phone: 5,
    },
};
var restyleFunctions = [
    restyleFunctions_1.position,
    (0, createVariant_1.default)({ themeKey: 'buttonVariants' }),
];
var composedRestyleFunction = (0, composeRestyleFunctions_1.default)(restyleFunctions);
function Button(_a) {
    var title = _a.title, rest = __rest(_a, ["title"]);
    var props = (0, useRestyle_1.default)(composedRestyleFunction, rest);
    return (react_1.default.createElement(react_native_1.TouchableOpacity, __assign({}, props),
        react_1.default.createElement(react_native_1.Text, null, title)));
}
exports.Button = Button;
