"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("./utilities");
var getResponsiveValue_1 = require("./utilities/getResponsiveValue");
var getMemoizedMapHashKey = function (dimensions, themeKey, property, value) {
    return "".concat(dimensions === null || dimensions === void 0 ? void 0 : dimensions.height, "x").concat(dimensions === null || dimensions === void 0 ? void 0 : dimensions.width, "-").concat(themeKey, "-").concat(property, "-").concat(value);
};
var memoizedThemes = new WeakMap();
var createRestyleFunction = function (_a) {
    var property = _a.property, transform = _a.transform, styleProperty = _a.styleProperty, themeKey = _a.themeKey;
    var styleProp = styleProperty || property.toString();
    var func = function (props, _a) {
        var _b, _c;
        var theme = _a.theme, dimensions = _a.dimensions;
        if (memoizedThemes.get(theme) == null) {
            memoizedThemes.set(theme, {});
        }
        var memoizedMapHashKey = (function () {
            if (themeKey &&
                property &&
                props[property] &&
                typeof themeKey === 'string' &&
                typeof property === 'string') {
                /*
                The following code is required to ensure all variants that have different breakpoint objects are turned into unique strings. By simply retuning String(props[property]), two different variants with breakpoints will return the same string.
                For example, if we have the following variant:
                  spacingVariant: {
                    defaults: {},
                    noPadding: {
                      phone: 'none',
                      tablet: 'none',
                    },
                    mediumPadding: {
                      phone: 'm',
                      tablet: 'm',
                    }
                  }
                using String(props[property]) will turn both variants into [object Object], making them equivalent and resulting in separate styles being memoized into the same hash key.
                By building the propertyValue string ourselves from the breakpoints, we can format the variants to be "phone:nonetablet:none" and "phone:mtablet:m" respectively, making each memoized hash key unique.
                */
                var propertyValue = '';
                if (typeof props[property] === 'object') {
                    for (var _i = 0, _a = Object.entries(props[property]); _i < _a.length; _i++) {
                        var _b = _a[_i], breakpoint = _b[0], value_1 = _b[1];
                        propertyValue += "".concat(breakpoint, ":").concat(value_1);
                    }
                }
                else {
                    propertyValue = String(props[property]);
                }
                return getMemoizedMapHashKey(dimensions, String(themeKey), String(property), propertyValue);
            }
            else {
                return null;
            }
        })();
        if (memoizedMapHashKey != null) {
            var memoizedValue = memoizedThemes.get(theme)[memoizedMapHashKey];
            if (memoizedValue != null) {
                return memoizedValue;
            }
        }
        var value = (function () {
            if (isResponsiveTheme(theme) && dimensions) {
                return (0, getResponsiveValue_1.getResponsiveValue)(props[property], {
                    theme: theme,
                    dimensions: dimensions,
                    themeKey: themeKey,
                    transform: transform,
                });
            }
            else {
                return (0, utilities_1.getThemeValue)(props[property], { theme: theme, themeKey: themeKey, transform: transform });
            }
        })();
        if (value === undefined)
            return {};
        if (memoizedMapHashKey != null) {
            memoizedThemes.get(theme)[memoizedMapHashKey] = (_b = {},
                _b[styleProp] = value,
                _b);
            return memoizedThemes.get(theme)[memoizedMapHashKey];
        }
        return _c = {},
            _c[styleProp] = value,
            _c;
    };
    return {
        property: property,
        themeKey: themeKey,
        variant: false,
        func: func,
    };
};
function isResponsiveTheme(theme) {
    if (theme.breakpoints !== undefined) {
        return true;
    }
    return false;
}
exports.default = createRestyleFunction;
