"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueForScreenSize = void 0;
/**
 * Returns actual value for given `responsiveValue`, `breakpoints`, and current `dimensions`.
 */
var getValueForScreenSize = function (_a) {
    var responsiveValue = _a.responsiveValue, breakpoints = _a.breakpoints, dimensions = _a.dimensions;
    var sortedBreakpoints = Object.entries(breakpoints).sort(function (valA, valB) {
        var valAWidth = getWidth(valA[1]);
        var valBWidth = getWidth(valB[1]);
        return valAWidth - valBWidth;
    });
    var width = dimensions.width, height = dimensions.height;
    return sortedBreakpoints.reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        if (typeof value === 'object') {
            if (width >= value.width &&
                height >= value.height &&
                responsiveValue[key] !== undefined) {
                return responsiveValue[key];
            }
        }
        else if (width >= value && responsiveValue[key] !== undefined) {
            return responsiveValue[key];
        }
        return acc;
    }, undefined);
};
exports.getValueForScreenSize = getValueForScreenSize;
function getWidth(value) {
    if (typeof value === 'object') {
        return value.width;
    }
    return value;
}
