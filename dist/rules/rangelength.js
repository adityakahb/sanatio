"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'rangelength',
        definition: function (value, params) {
            return Array.isArray(params)
                && (typeof value === 'string' || Array.isArray(value))
                && value.length >= params[0]
                && value.length <= params[1] || false;
        },
        message: 'Please enter a value between {0} and {1} characters long.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=rangelength.js.map