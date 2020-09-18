"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'minlength',
        definition: function (value, params) {
            return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length >= params || false;
        },
        message: 'Please enter at least {0} characters.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=minlength.js.map