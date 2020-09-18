"use strict";
exports.__esModule = true;
var SanatioConstants;
(function (SanatioConstants) {
    var val, idx;
    var currentValue, matches, match, parts, count, valueLength;
    var keyCode, shiftKey;
    SanatioConstants._RuleRef = {
        isRuleAvailable: false,
        isRuleApplied: false,
        alertType: '',
        isValid: false,
        message: '',
        params: ''
    };
    SanatioConstants._MethodBook = {};
    SanatioConstants._MessageBook = {};
    SanatioConstants._RuleBook = {};
    SanatioConstants._ElemBook = {
        "if": undefined,
        isCheckable: false,
        isClickable: false,
        isIconApplicable: false,
        isSelect: false,
        isRequired: false,
        cardFormatting: {
            isApplicable: false,
            character: ''
        },
        capslockCheck: {
            isApplicable: false,
            message: ''
        },
        hasContentEditable: false,
        name: '',
        nodes: undefined,
        parent: undefined,
        container: undefined,
        ruleBook: SanatioConstants._RuleBook,
        tagName: '',
        tagType: '',
        keyType: false,
        clickType: false,
        isPartOf: undefined
    };
    SanatioConstants._Instance = {
        _form: undefined,
        _props: {
            formPre: '',
            formPost: '',
            parentS: '',
            parentE: '',
            parentW: '',
            iconS: '',
            iconE: '',
            iconW: '',
            elemS: '',
            elemE: '',
            elemW: '',
            msgS: '',
            msgE: '',
            msgW: '',
            elem: 'div',
            container: null
        },
        _elemGrps: {
            keyTypes: [],
            clickTypes: []
        },
        _submitted: [],
        _eCount: 0,
        _wCount: 0
    };
    SanatioConstants._KeyElem = [
        'text',
        'password',
        'color',
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'range',
        'search',
        'tel',
        'time',
        'url',
        'week',
        'radio',
        'checkbox',
        'file',
        'button',
        'select',
        'textarea',
        'contenteditable'
    ];
    SanatioConstants._MouseElem = ['radio', 'checkbox', 'file', 'select'];
    /* Avoid revalidate the field when pressing one of the following keys
        * Shift       => 16
        * Ctrl        => 17
        * Alt         => 18
        * Caps lock   => 20
        * End         => 35
        * Home        => 36
        * Left arrow  => 37
        * Up arrow    => 38
        * Right arrow => 39
        * Down arrow  => 40
        * Insert      => 45
        * Num lock    => 144
        * AltGr key   => 225
        */
    SanatioConstants._excludedKeys = [
        16,
        17,
        18,
        20,
        35,
        36,
        37,
        38,
        39,
        40,
        45,
        144,
        225
    ];
    SanatioConstants._IconicElem = ['text', 'password'];
    /**
     * Method to detect the capslock key
     *
     * @param {KeyboardEvent} event
     * @returns {boolean}
     */
    SanatioConstants._CapslockFn = function (event) {
        if (event) {
            keyCode = event.keyCode
                ? event.keyCode
                : event.which;
            shiftKey = event.shiftKey
                ? event.shiftKey
                : ((keyCode === 16)
                    ? true
                    : false);
            return !((((keyCode >= 65 && keyCode <= 90) && !shiftKey) || ((keyCode >= 97 && keyCode <= 122) && shiftKey)));
        }
        else {
            return true;
        }
    };
    /**
     * Method to return trimmed string
     *
     * @param {string} str
     * @returns {string}
     */
    SanatioConstants._TrimFn = function (str) {
        return str && (typeof str === 'string' || typeof str === 'number') ? str.toString().replace(/^\s+|\s+$/gm, '') : '';
    };
    /**
     * Add polyfill for Matches function to find the closest element
     */
    SanatioConstants._MatchesPolyfill = function () {
        HTMLElement.prototype.matches = HTMLElement.prototype.matches
            || HTMLElement.prototype.msMatchesSelector
            || HTMLElement.prototype.webkitMatchesSelector;
        if (!HTMLElement.prototype.closest) {
            HTMLElement.prototype.closest = function (selector) {
                var thisElement = this;
                if (!document.documentElement.contains(thisElement)) {
                    return null;
                }
                do {
                    if (thisElement.matches(selector)) {
                        return thisElement;
                    }
                    thisElement = (thisElement.parentElement || thisElement.parentNode);
                } while (thisElement !== null && thisElement.nodeType === 1);
                return null;
            };
        }
    };
    /**
     * Method to find and return the closest element or null based on the selector and current element
     *
     * @param {HTMLElement} elem
     * @param {string} selector
     * @returns {(Element | null)}
     */
    SanatioConstants._NearestParent = function (elem, selector) {
        return elem && elem instanceof HTMLElement && selector && typeof selector === 'string' ? elem.closest(selector) : null;
    };
    /**
     * Method to format the message to be displayed as error or warning
     *
     * @param {string} message
     * @param {*} value
     * @returns {string}
     */
    SanatioConstants._FormatMsg = function (message, value) {
        if (message && value) {
            message = message.toString();
            if (typeof value === 'number' || typeof value === 'string') {
                message = message.replace(new RegExp('\\{0\\}', 'g'), value.toString());
                return message;
            }
            else if (Array.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    message = message.replace(new RegExp('\\{' + i + '\\}', 'g'), value[i].toString());
                }
                return message;
            }
            return message;
        }
        else {
            return '';
        }
    };
    /**
     * Method to parse the collection as an Array
     *
     * @param {*} arr
     * @returns {Array<any>}
     */
    SanatioConstants._ArrayCall = function (arr) {
        return arr && arr.length > 0 ? Array.prototype.slice.call(arr) : [];
    };
    /**
     * Method to find the value of the element
     *
     * @param {SanatioInterfaces.ElementBook} book
     * @returns {(string | boolean | number | Array < number > | undefined)}
     */
    SanatioConstants._ElemValue = function (book) {
        if (book && book.nodes) {
            if (book.isCheckable) {
                return SanatioConstants._ArrayCall(book.nodes).filter(function (el) { return el.checked; });
            }
            if (book.isSelect) {
                return SanatioConstants._ArrayCall(book.nodes[0].options).filter(function (option) {
                    return option.selected && option.value;
                });
            }
            if (book.hasContentEditable) {
                return SanatioConstants._TrimFn((book.nodes[0].innerHTML).toString());
            }
            val = book.nodes[0].value;
            if (book.tagType === 'file') {
                // Modern browser (chrome & safari)
                if (val.substr(0, 12) === 'C:\\fakepath\\') {
                    return SanatioConstants._TrimFn(val.substr(12));
                }
                // Legacy browsers Unix-based path
                idx = val.lastIndexOf('/');
                if (idx >= 0) {
                    return SanatioConstants._TrimFn(val.substr(idx + 1));
                }
                // Windows-based path
                idx = val.lastIndexOf('\\');
                if (idx >= 0) {
                    return SanatioConstants._TrimFn(val.substr(idx + 1));
                }
                // Just the file name
                return SanatioConstants._TrimFn(val);
            }
            return SanatioConstants._TrimFn(val.replace(/\r/g, ''));
        }
        return val;
    };
    /**
     * Method to escape the meta characters
     *
     * @param {string} str
     * @returns {string}
     */
    SanatioConstants._EscCssMeta = function (str) {
        return str && typeof str === 'string' ? str.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, '\\$1') : '';
    };
    /**
     * Method to check if the element has a className attached to it
     *
     * @param {HTMLElement} el
     * @param {string} className
     * @returns {boolean}
     */
    SanatioConstants._HasClass = function (el, className) {
        if (el && el instanceof HTMLElement && className && typeof className === 'string') {
            if (el.classList) {
                return el
                    .classList
                    .contains(className);
            }
            else {
                return !!el
                    .className
                    .match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
            }
        }
        else {
            return false;
        }
    };
    /**
     * Method to add className(s) to an element
     *
     * @param {HTMLElement} el
     * @param {*} className
     */
    SanatioConstants._AddClass = function (el, className) {
        if (el && el instanceof HTMLElement && className && typeof className === 'string') {
            if (SanatioConstants._TrimFn(className).length > 0) {
                className = className.split(' ');
                for (var name_1 in className) {
                    if (el.classList) {
                        el
                            .classList
                            .add(className[name_1]);
                    }
                    else if (!SanatioConstants._HasClass(el, className[name_1])) {
                        el.className += ' ' + className[name_1];
                    }
                }
            }
        }
    };
    /**
     * Method to remove className(s) from an element
     *
     * @param {HTMLElement} el
     * @param {*} className
     */
    SanatioConstants._RemoveClass = function (el, className) {
        if (el && el instanceof HTMLElement && className && typeof className === 'string') {
            if (SanatioConstants._TrimFn(className).length > 0) {
                className = className.split(' ');
                for (var name_2 in className) {
                    if (el.classList) {
                        el
                            .classList
                            .remove(className[name_2]);
                    }
                    else if (SanatioConstants._HasClass(el, className)) {
                        var reg = new RegExp('(\\s|^)' + className[name_2] + '(\\s|$)');
                        el.className = el
                            .className
                            .replace(reg, ' ');
                    }
                }
            }
        }
    };
    /**
     * Method to check if the element is present in supplied collection
     *
     * @param {SanatioInterfaces.ElementBook} book
     * @param {SanatioInterfaces.ElementBook[]} collection
     * @returns {boolean}
     */
    SanatioConstants._IsInCollection = function (book, collection) {
        return book && collection && book.name
            ? SanatioConstants._ArrayCall(collection).some(function (thisBook) {
                return thisBook.name === book.name;
            })
            : false;
    };
    /**
     * Method to format the Bank card value based on the separator passed
     *
     * @param {string} value
     * @param {string} separator
     * @returns {string}
     */
    SanatioConstants._FormatCard = function (value, separator) {
        if (value && typeof value === 'string') {
            currentValue = value
                .replace(/\s+/g, '')
                .replace(/[^0-9]/gi, '');
            matches = currentValue.match(/\d{4,17}/g);
            match = matches && matches[0] || '';
            parts = [];
            separator = separator && typeof separator === 'string' ? separator : '-';
            for (count = 0, valueLength = match.length; count < valueLength; count += 4) {
                parts.push(match.substring(count, count + 4));
            }
            if (parts.length) {
                return parts.join(separator);
            }
            else {
                return value;
            }
        }
        else {
            return '';
        }
    };
})(SanatioConstants = exports.SanatioConstants || (exports.SanatioConstants = {}));
//# sourceMappingURL=Constants.js.map