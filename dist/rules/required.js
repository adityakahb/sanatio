"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'required',
        definition: function (value, params) {
            return params
                ? (typeof value === 'string' || Array.isArray(value)) && value.length > 0
                    ? true
                    : false
                : false;
        },
        message: 'This field is required.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=required.js.map