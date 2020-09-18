"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'minoptions',
        definition: function (value, params) {
            return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length >= params || false;
        },
        message: 'Please select at least {0} option(s).'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=minoptions.js.map