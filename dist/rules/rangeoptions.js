"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'rangeoptions',
        definition: function (value, params) {
            return Array.isArray(params)
                && (typeof value === 'string' || Array.isArray(value))
                && value.length >= params[0]
                && value.length <= params[1] || false;
        },
        message: 'Please select {0} to {1} options.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=rangeoptions.js.map