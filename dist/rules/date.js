"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var regex = /Invalid|NaN/;
    SanatioRule.Rule = {
        name: 'date',
        definition: function (value, params) {
            return params
                ? typeof value === 'string' && !regex.test(new Date(value).toString()) || false
                : false;
        },
        message: 'Please enter a valid date.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=date.js.map