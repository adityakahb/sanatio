"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var isoRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/, regex = /Invalid|NaN/;
    SanatioRule.Rule = {
        name: 'dateISO',
        definition: function (value, params) {
            return params
                ? typeof value === 'string' && isoRegex.test(value) && !regex.test(new Date(value).toString()) || false
                : false;
        },
        message: 'Please enter a valid date (ISO).'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=dateISO.js.map