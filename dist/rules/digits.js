"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var regex = /^\d+$/;
    SanatioRule.Rule = {
        name: 'digits',
        definition: function (value, params) {
            return params
                ? typeof value === 'string' && regex.test(value) || false
                : false;
        },
        message: 'Please enter only digits.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=digits.js.map