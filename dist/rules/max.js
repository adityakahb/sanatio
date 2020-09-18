"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var optionElement;
    SanatioRule.Rule = {
        name: 'max',
        definition: function (value, params) {
            if (typeof value === 'object') {
                try {
                    optionElement = value[0];
                    return Number(optionElement.value) <= Number(params) || false;
                }
                catch (e) {
                    return false;
                }
            }
            else if (typeof value === 'string' || typeof value === 'number') {
                return Number(value) <= Number(params) || false;
            }
            return false;
        },
        message: 'Please enter a value less than or equal to {0}.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=max.js.map