"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var stepDecimalPlaces, stepFnMatch;
    var getStepDecimalPlaces = function (num) {
        stepFnMatch = null;
        stepFnMatch = ('' + num).match(/(?:\.(\d+))?$/);
        if (!stepFnMatch) {
            return 0;
        }
        return stepFnMatch[1]
            ? stepFnMatch[1].length
            : 0;
    };
    var getStepToInt = function (num, decimals) {
        return Math.round(num * Math.pow(10, decimals));
    };
    SanatioRule.Rule = {
        name: 'step',
        definition: function (value, params) {
            stepDecimalPlaces = getStepDecimalPlaces(params);
            return !(getStepDecimalPlaces(value) > stepDecimalPlaces
                || getStepToInt(value, stepDecimalPlaces) % getStepToInt(value, stepDecimalPlaces) !== 0) || false;
        },
        message: 'Please enter a multiple of {0}.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=step.js.map