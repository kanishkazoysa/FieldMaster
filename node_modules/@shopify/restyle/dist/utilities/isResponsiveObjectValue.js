"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResponsiveObjectValue = void 0;
var typeHelpers_1 = require("../typeHelpers");
var isResponsiveObjectValue = function (val, theme) {
    if (!val)
        return false;
    if (typeof val !== 'object')
        return false;
    return (0, typeHelpers_1.getKeys)(val).every(function (key) { return theme.breakpoints[key] !== undefined; });
};
exports.isResponsiveObjectValue = isResponsiveObjectValue;
