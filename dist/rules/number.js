"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var regex = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
    SanatioRule.Rule = {
        name: 'number',
        definition: function (value, params) {
            return params
                ? typeof value === 'string' && regex.test(value) || false
                : false;
        },
        message: 'Please enter a valid number.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=number.js.map