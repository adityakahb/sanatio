"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    SanatioRule.Rule = {
        name: 'email',
        definition: function (value, params) {
            return params
                ? typeof value === 'string' && regex.test(value) || false
                : false;
        },
        message: 'Please enter a valid email address.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=email.js.map