"use strict";
exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var elem;
    SanatioRule.Rule = {
        name: 'equalsto',
        definition: function (value, params) {
            elem = document.querySelector('[id=' + params + ']');
            return typeof value === 'string' && typeof params === 'string' && elem && elem.value === value || false;
        },
        message: 'Please enter the same value again.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));
//# sourceMappingURL=equalsto.js.map