"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var useTheme = function () {
    return (0, react_1.useContext)(context_1.ThemeContext);
};
exports.default = useTheme;
