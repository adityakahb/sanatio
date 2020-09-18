"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'pattern',
        definition: function (value, params) {
            return typeof value === 'string'
                && typeof params === 'string'
                && new RegExp(params).test(value) || false;
        },
        message: 'Sorry, this doesn\'t match with the expected pattern.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=pattern.js.map