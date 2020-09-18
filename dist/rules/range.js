"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var optionElement;
    SanatioRule.Rule = {
        name: 'range',
        definition: function (value, params) {
            if (typeof value === 'object') {
                try {
                    optionElement = value[0];
                    return (Number(optionElement.value) >= Number(params[0]) && Number(optionElement.value) <= Number(params[1])) || false;
                }
                catch (e) {
                    return false;
                }
            }
            else if (typeof value === 'string' || typeof value === 'number') {
                return (Number(value) >= Number(params[0]) && Number(value) <= Number(params[1])) || false;
            }
            return false;
        },
        message: 'Please enter a value between {0} and {1}.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=range.js.map