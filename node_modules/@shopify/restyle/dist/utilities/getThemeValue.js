"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemeValue = void 0;
/**
 * Returns value from a theme for a given `themeKey`, applying `transform` if defined.
 */
function getThemeValue(value, _a) {
    var theme = _a.theme, transform = _a.transform, themeKey = _a.themeKey;
    if (transform)
        return transform({ value: value, theme: theme, themeKey: themeKey });
    if (isThemeKey(theme, themeKey)) {
        if (value && theme[themeKey][value] === undefined)
            throw new Error("Value '".concat(value, "' does not exist in theme['").concat(String(themeKey), "']"));
        return value ? theme[themeKey][value] : value;
    }
    return value;
}
exports.getThemeValue = getThemeValue;
function isThemeKey(theme, K) {
    return theme[K];
}
