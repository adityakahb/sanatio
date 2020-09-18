"use strict";
exports.__esModule = true;
var Constants_1 = require("./Constants");
var BankcardRule = require("./rules/bankcard");
var DateRule = require("./rules/date");
var DateISORule = require("./rules/dateISO");
var DigitsRule = require("./rules/digits");
var EmailRule = require("./rules/email");
var EqualsToRule = require("./rules/equalsto");
var MaxRule = require("./rules/max");
var MaxLengthRule = require("./rules/maxlength");
var MaxOptionsRule = require("./rules/maxoptions");
var MinRule = require("./rules/min");
var MinLengthRule = require("./rules/minlength");
var MinOptionsRule = require("./rules/minoptions");
var NumberRule = require("./rules/number");
var NotEqualsTo = require("./rules/notequalsto");
var PatternRule = require("./rules/pattern");
var RangeRule = require("./rules/range");
var RangeLengthRule = require("./rules/rangelength");
var RangeOptionsRule = require("./rules/rangeoptions");
var RequiredRule = require("./rules/required");
var StepRule = require("./rules/step");
var URLRule = require("./rules/url");
var SanatioCore;
(function (SanatioCore) {
    var noOfErrors = 0, noOfWarnings = 0, currentValue;
    var _defaultElementBook = Constants_1.SanatioConstants._ElemBook;
    var _elementsForKeyboardEvents = Constants_1.SanatioConstants._KeyElem;
    var _elementsForMouseEvents = Constants_1.SanatioConstants._MouseElem;
    var _excludedKeys = Constants_1.SanatioConstants._excludedKeys;
    var _elementsSupportingIcons = Constants_1.SanatioConstants._IconicElem;
    var _defaultFormInstance = Constants_1.SanatioConstants._Instance;
    var _CapslockFn = Constants_1.SanatioConstants._CapslockFn;
    var _TrimFn = Constants_1.SanatioConstants._TrimFn;
    var _MatchesPolyfill = Constants_1.SanatioConstants._MatchesPolyfill;
    var _NearestParent = Constants_1.SanatioConstants._NearestParent;
    var _FormatMsg = Constants_1.SanatioConstants._FormatMsg;
    var _ArrayCall = Constants_1.SanatioConstants._ArrayCall;
    var _ElemValue = Constants_1.SanatioConstants._ElemValue;
    var _EscCssMeta = Constants_1.SanatioConstants._EscCssMeta;
    var _FormatCard = Constants_1.SanatioConstants._FormatCard;
    var _AddClass = Constants_1.SanatioConstants._AddClass;
    var _RemoveClass = Constants_1.SanatioConstants._RemoveClass;
    var _IsInCollection = Constants_1.SanatioConstants._IsInCollection;
    var Core = /** @class */ (function () {
        function Core(formElement) {
            var _this = this;
            this._bookCol = {};
            this._submitClosure = undefined;
            this._focusClosure = undefined;
            this._blurClosure = undefined;
            this._keyupClosure = undefined;
            this._keypressClosure = undefined;
            this._clickClosure = undefined;
            this._destroy = function () {
                try {
                    _this._manageMsgs(true);
                    _this._clearCapsMsg();
                    _this._attachSubmit(false);
                    _this._attachEvents(false);
                    _this._submitHandler = _this._defaultSubmitFn;
                    _this._i = JSON.parse(JSON.stringify(_defaultFormInstance));
                    return true;
                }
                catch (e) {
                    console.error('Error while destroying the instance', e);
                    return false;
                }
            };
            this._i = JSON.parse(JSON.stringify(_defaultFormInstance));
            this._i._form = formElement;
            this.globals = {
                getNumberOfErrors: function () {
                    try {
                        return _this._i._eCount;
                    }
                    catch (e) {
                        console.error('Error while fetching the number of errors', e);
                        return -1;
                    }
                },
                getNumberOfWarnings: function () {
                    try {
                        return _this._i._wCount;
                    }
                    catch (e) {
                        console.error('Error while fetching the number of warnings', e);
                        return -1;
                    }
                },
                submitHandler: function (submitHandlerFn) {
                    try {
                        _this._submitHandler = submitHandlerFn;
                        return true;
                    }
                    catch (e) {
                        console.error('Error while adding the custom SubmitHandler', e);
                        return false;
                    }
                }
            };
            this._submitHandler = this._defaultSubmitFn;
            _MatchesPolyfill();
            this._init();
        }
        Core._addRule = function (rule) {
            try {
                if (!rule.name || !rule.definition || !rule.message) {
                    console.error('New Method not defined properly. It must be in format {name, definition, message' +
                        '}.');
                    return;
                }
                if (Core._Methods[rule.name]) {
                    console.error('Rule ' + rule.name + ' already exists.');
                }
                else {
                    Core._Methods[rule.name] = rule.definition;
                    Core._Messages[rule.name] = rule.message && Constants_1.SanatioConstants
                        ._TrimFn(rule.message.toString())
                        .length > 0
                        ? rule.message
                        : 'Undefined message for ' + rule.name;
                    Core._RuleBook[rule.name] = Core._RuleRef;
                }
            }
            catch (e) {
                console.error('Error while adding method', e);
            }
        };
        Core.prototype._defaultSubmitFn = function () {
            if (this._i._form) {
                this
                    ._i
                    ._form
                    .submit();
            }
        };
        Core.prototype._showMsg = function (book, ruleReference) {
            var _this = this;
            var errorElement, iconElement, existingIconElement, parentElement, firstBook;
            if (!book.isPartOf) {
                firstBook = book;
            }
            else {
                firstBook = this._bookCol[book.isPartOf[0]];
            }
            if (this._i._props.container) {
                parentElement = this._i._props.container;
            }
            else if (firstBook.container) {
                parentElement = firstBook.container;
            }
            else {
                parentElement = firstBook.parent;
            }
            if (parentElement) {
                errorElement = parentElement.querySelector('.' + book.name + '.' + ruleReference.alertType);
                if (!errorElement) {
                    errorElement = document.createElement(this._i._props.elem);
                    errorElement.innerHTML = ruleReference.message;
                    errorElement.className = 'sanatio-alert ' + ruleReference.alertType + ' ' + book.name;
                    if (book.nodes) {
                        if (ruleReference.alertType === 'error') {
                            errorElement.className += ' ' + this._i._props.msgE;
                            iconElement = book.isIconApplicable && _TrimFn(this._i._props.iconE).length > 0
                                ? document.createElement('span')
                                : null;
                            if (iconElement) {
                                iconElement.className = 'sanatio-icon error ' + this._i._props.iconE;
                            }
                            _ArrayCall(book.nodes).forEach(function (node) {
                                _AddClass(node, _this._i._props.elemE);
                            });
                            _AddClass(book.parent, this._i._props.parentE);
                        }
                        if (ruleReference.alertType === 'warning') {
                            errorElement.className += ' ' + this._i._props.msgW;
                            iconElement = book.isIconApplicable && _TrimFn(this._i._props.iconW).length > 0
                                ? document.createElement('span')
                                : null;
                            if (iconElement) {
                                iconElement.className = 'sanatio-icon warning ' + this._i._props.iconW;
                            }
                            _ArrayCall(book.nodes).forEach(function (node) {
                                _AddClass(node, _this._i._props.elemW);
                            });
                            _AddClass(book.parent, this._i._props.parentW);
                        }
                    }
                    if (book.parent) {
                        existingIconElement = book.parent.querySelector('.sanatio-icon.error');
                        if (!existingIconElement && iconElement) {
                            book.parent.appendChild(iconElement);
                        }
                    }
                    parentElement.appendChild(errorElement);
                }
            }
            return;
        };
        Core.prototype._clearMsg = function (book, ruleReference) {
            var _this = this;
            var errorElement, iconElement, parentElement, firstBook;
            if (!book.isPartOf) {
                firstBook = book;
            }
            else {
                firstBook = this._bookCol[book.isPartOf[0]];
            }
            if (this._i._props.container) {
                parentElement = this._i._props.container;
            }
            else if (firstBook.container) {
                parentElement = firstBook.container;
            }
            else {
                parentElement = firstBook.parent;
            }
            if (parentElement) {
                errorElement = parentElement.querySelector('.' + book.name + '.' + ruleReference.alertType);
                if (errorElement) {
                    parentElement.removeChild(errorElement);
                    if (book.nodes && book.parent) {
                        if (ruleReference.alertType === 'error') {
                            iconElement = book
                                .parent
                                .querySelector('.sanatio-icon.error');
                            _ArrayCall(book.nodes).forEach(function (node) {
                                _RemoveClass(node, _this._i._props.elemE);
                            });
                            _RemoveClass(book.parent, this._i._props.parentE);
                        }
                        if (ruleReference.alertType === 'warning') {
                            iconElement = book
                                .parent
                                .querySelector('.sanatio-icon.warning');
                            _ArrayCall(book.nodes).forEach(function (node) {
                                _RemoveClass(node, _this._i._props.elemW);
                            });
                            _RemoveClass(book.parent, this._i._props.parentW);
                        }
                        if (iconElement) {
                            book
                                .parent
                                .removeChild(iconElement);
                        }
                    }
                }
            }
            return;
        };
        Core.prototype._showCapsMsg = function (book) {
            if (book.parent) {
                var existingCapsElem = book.parent.querySelector('.sanatio-alert.info');
                if (!existingCapsElem) {
                    var capsElement = document.createElement(this._i._props.elem);
                    capsElement.className = 'sanatio-alert info ' + this._i._props.msgW;
                    capsElement.innerHTML = book.capslockCheck.message;
                    book.parent.appendChild(capsElement);
                }
            }
            return;
        };
        Core.prototype._clearCapsMsg = function (book) {
            var thisForm = this._i._form;
            if (book && book.parent) {
                var capsElement = book.parent.querySelector('.sanatio-alert.info');
                if (capsElement) {
                    book.parent.removeChild(capsElement);
                }
            }
            else if (thisForm) {
                var capsElements = thisForm.querySelectorAll('.sanatio-alert.info'), parentNode = void 0, capsElementsLength = 0;
                if (capsElements) {
                    capsElementsLength = capsElements.length;
                }
                while (capsElementsLength > 0) {
                    parentNode = capsElements[capsElementsLength - 1].parentNode;
                    if (parentNode) {
                        parentNode.removeChild(capsElements[capsElementsLength - 1]);
                    }
                    capsElementsLength--;
                }
            }
            return;
        };
        Core.prototype._manageMsgs = function (shouldClearAllMsgs) {
            var _this = this;
            // TODO: Expensive DOM Manipulation. Need to rethink.
            var thisBook, errorFound = false, warningFound = false;
            if (shouldClearAllMsgs) {
                _ArrayCall(this._i._submitted).forEach(function (book) {
                    if (book.isPartOf) {
                        _ArrayCall(book.isPartOf).forEach(function (name) {
                            thisBook = _this._bookCol[name];
                            for (var rule in thisBook.ruleBook) {
                                if (thisBook.ruleBook.hasOwnProperty(rule) && thisBook.ruleBook[rule].isRuleAvailable) {
                                    _this._clearMsg(thisBook, thisBook.ruleBook[rule]);
                                }
                            }
                        });
                    }
                    else {
                        for (var rule in book.ruleBook) {
                            if (book.ruleBook.hasOwnProperty(rule) && book.ruleBook[rule].isRuleAvailable) {
                                _this._clearMsg(book, book.ruleBook[rule]);
                            }
                        }
                    }
                });
            }
            else {
                _ArrayCall(this._i._submitted).forEach(function (book) {
                    if (book.isPartOf) {
                        if (book.isPartOf.indexOf(book.name) === 0) {
                            console.log('---book', book);
                            _ArrayCall(book.isPartOf).every(function (name) {
                                console.log('---name 1', name);
                                errorFound = false;
                                thisBook = _this._bookCol[name];
                                for (var rule in thisBook.ruleBook) {
                                    if (thisBook.ruleBook.hasOwnProperty(rule) && thisBook.ruleBook[rule].alertType === 'error') {
                                        if (thisBook.ruleBook[rule].isRuleAvailable) {
                                            _this._clearMsg(thisBook, thisBook.ruleBook[rule]);
                                        }
                                        if (thisBook.ruleBook['required'].isRuleAvailable && !thisBook.ruleBook['required'].isValid) {
                                            _this._showMsg(thisBook, thisBook.ruleBook['required']);
                                            errorFound = true;
                                            break;
                                        }
                                        if (rule !== 'required' && thisBook.ruleBook[rule].isRuleAvailable && !thisBook.ruleBook[rule].isValid) {
                                            _this._showMsg(thisBook, thisBook.ruleBook[rule]);
                                            errorFound = true;
                                            break;
                                        }
                                    }
                                }
                                return !errorFound;
                            });
                            _ArrayCall(book.isPartOf).every(function (name) {
                                console.log('---name 2', name);
                                warningFound = false;
                                thisBook = _this._bookCol[name];
                                for (var rule in thisBook.ruleBook) {
                                    if (thisBook.ruleBook.hasOwnProperty(rule) && thisBook.ruleBook[rule].alertType === 'warning') {
                                        if (thisBook.ruleBook[rule].isRuleAvailable) {
                                            _this._clearMsg(thisBook, thisBook.ruleBook[rule]);
                                        }
                                        if (thisBook.ruleBook[rule].isRuleAvailable && !thisBook.ruleBook[rule].isValid) {
                                            _this._showMsg(thisBook, thisBook.ruleBook[rule]);
                                            warningFound = true;
                                            break;
                                        }
                                    }
                                }
                                return !warningFound;
                            });
                        }
                    }
                    else {
                        for (var rule in book.ruleBook) {
                            if (book.ruleBook.hasOwnProperty(rule) && book.ruleBook[rule].alertType === 'error') {
                                if (book.ruleBook[rule].isRuleAvailable) {
                                    _this._clearMsg(book, book.ruleBook[rule]);
                                }
                                if (book.ruleBook['required'].isRuleAvailable && !book.ruleBook['required'].isValid) {
                                    _this._showMsg(book, book.ruleBook['required']);
                                    break;
                                }
                                if (rule !== 'required' && book.ruleBook[rule].isRuleAvailable && !book.ruleBook[rule].isValid) {
                                    _this._showMsg(book, book.ruleBook[rule]);
                                    break;
                                }
                            }
                        }
                    }
                    for (var rule in book.ruleBook) {
                        if (book.ruleBook.hasOwnProperty(rule) && book.ruleBook[rule].alertType === 'warning') {
                            if (book.ruleBook[rule].isRuleAvailable) {
                                _this._clearMsg(book, book.ruleBook[rule]);
                            }
                            if (book.ruleBook[rule].isRuleAvailable && !book.ruleBook[rule].isValid) {
                                _this._showMsg(book, book.ruleBook[rule]);
                                break;
                            }
                        }
                    }
                });
            }
            return;
        };
        Core.prototype._postValidation = function () {
            noOfErrors = 0;
            noOfWarnings = 0;
            _ArrayCall(this._i._submitted).forEach(function (book) {
                for (var rule in book.ruleBook) {
                    if (book.ruleBook.hasOwnProperty(rule)) {
                        if (book.ruleBook[rule].isRuleAvailable && book.ruleBook[rule].alertType === 'error' && !book.ruleBook[rule].isValid) {
                            noOfErrors++;
                        }
                        if (book.ruleBook[rule].isRuleAvailable && book.ruleBook[rule].alertType === 'warning' && !book.ruleBook[rule].isValid) {
                            noOfWarnings++;
                        }
                    }
                }
            });
            this._i._eCount = noOfErrors;
            this._i._wCount = noOfWarnings;
            if (this._i._props.formPost) {
                _AddClass(this._i._form, this._i._props.formPost);
            }
            this._manageMsgs(false);
            return this._i._eCount;
        };
        Core.prototype._validateAgainstRule = function (thisValue, book, rule) {
            return Core._Methods[rule](thisValue, book.ruleBook[rule].params);
        };
        Core.prototype._validateElem = function (book) {
            currentValue = _ElemValue(book);
            for (var rule in book.ruleBook) {
                if (book.ruleBook.hasOwnProperty(rule)) {
                    if (book.ruleBook[rule].isRuleAvailable && book.ruleBook[rule].params) {
                        book.ruleBook[rule].isRuleApplied = true;
                        if (book["if"]) {
                            if (this._validateAgainstRule(_ElemValue(book["if"]), book["if"], 'required')) {
                                book.ruleBook[rule].isValid = this._validateAgainstRule(currentValue, book, rule);
                            }
                            else {
                                book.ruleBook[rule].isValid = true;
                            }
                        }
                        else {
                            book.ruleBook[rule].isValid = this._validateAgainstRule(currentValue, book, rule);
                        }
                        if (!book.ruleBook[rule].isValid && (Array.isArray(currentValue) || typeof currentValue === 'string'
                            ? currentValue.length === 0
                            : currentValue.toString().length === 0) && !book.isRequired) {
                            book.ruleBook[rule].isValid = true;
                        }
                    }
                }
            }
            return;
        };
        Core.prototype._submitEventFn = function (key, mouse, event) {
            var _this = this;
            event.preventDefault();
            _ArrayCall(key).forEach(function (book) {
                if (_this._i._submitted && !_IsInCollection(book, _this._i._submitted)) {
                    _this._i._submitted.push(book);
                }
                if (book.isRequired || _IsInCollection(book, _this._i._submitted)) {
                    if (book.isPartOf) {
                        _ArrayCall(book.isPartOf).forEach(function (name) {
                            _this._validateElem(_this._bookCol[name]);
                        });
                    }
                    else {
                        _this._validateElem(book);
                    }
                }
            });
            _ArrayCall(mouse).forEach(function (book) {
                if (_this._i._submitted && !_IsInCollection(book, _this._i._submitted)) {
                    _this._i._submitted.push(book);
                }
                if (book.isRequired || _IsInCollection(book, _this._i._submitted)) {
                    if (book.isPartOf) {
                        _ArrayCall(book.isPartOf).forEach(function (name) {
                            _this._validateElem(_this._bookCol[name]);
                        });
                    }
                    else {
                        _this._validateElem(book);
                    }
                }
            });
            if (this._postValidation() === 0) {
                this._submitHandler();
            }
            return;
        };
        Core.prototype._focusEventFn = function () {
            return;
        };
        Core.prototype._blurEventFn = function (book, comingFromIf) {
            var _this = this;
            if ((!book.isCheckable && (_IsInCollection(book, this._i._submitted) || book.isRequired)) || comingFromIf) {
                if (book.isPartOf) {
                    _ArrayCall(book.isPartOf).forEach(function (name) {
                        _this._validateElem(_this._bookCol[name]);
                    });
                }
                else {
                    this._validateElem(book);
                }
                this._postValidation();
            }
        };
        Core.prototype._keyupEventFn = function (book, comingFromIf) {
            var _this = this;
            var thisEvent = event;
            var thisKeycode = thisEvent.which || thisEvent.keyCode;
            if (thisKeycode === 9 && _ElemValue(book) === '' || _ArrayCall(_excludedKeys).includes(thisKeycode)) {
                return;
            }
            else if (_IsInCollection(book, this._i._submitted) || comingFromIf) {
                if (book.isPartOf) {
                    _ArrayCall(book.isPartOf).forEach(function (name) {
                        _this._validateElem(_this._bookCol[name]);
                    });
                }
                else {
                    this._validateElem(book);
                }
                this._postValidation();
            }
            if (book.cardFormatting.isApplicable && book.nodes) {
                book.nodes[0].value = _FormatCard(_ElemValue(book), book.cardFormatting.character);
            }
        };
        Core.prototype._keypressEventFn = function (book) {
            var thisEvent = event;
            var isCapsActive = !_CapslockFn(thisEvent);
            if (isCapsActive) {
                this._showCapsMsg(book);
            }
            else {
                this._clearCapsMsg(book);
            }
        };
        Core.prototype._clickEventFn = function (book, comingFromIf) {
            var _this = this;
            if (_IsInCollection(book, this._i._submitted) || comingFromIf) {
                if (book.isPartOf) {
                    _ArrayCall(book.isPartOf).forEach(function (name) {
                        _this._validateElem(_this._bookCol[name]);
                    });
                }
                else {
                    this._validateElem(book);
                }
                this._postValidation();
            }
        };
        Core.prototype._attachSubmit = function (addOrDelete) {
            var keyboardElementBooks, mouseElementBooks;
            if (this._i._form && this._i._elemGrps) {
                keyboardElementBooks = this._i._elemGrps.keyTypes;
                mouseElementBooks = this._i._elemGrps.clickTypes;
                if (addOrDelete) {
                    this._submitClosure = this
                        ._submitEventFn
                        .bind(this, keyboardElementBooks, mouseElementBooks);
                    this
                        ._i
                        ._form
                        .addEventListener('submit', this._submitClosure, false);
                }
                else {
                    this
                        ._i
                        ._form
                        .removeEventListener('submit', this._submitClosure, false);
                    this._submitClosure = undefined;
                }
            }
            return;
        };
        Core.prototype._attachKeyEvents = function (nodes, book, addOrDelete, comingFromIf) {
            var _this = this;
            if (nodes) {
                _ArrayCall(nodes).forEach(function (elem) {
                    if (addOrDelete) {
                        _this._focusClosure = _this
                            ._focusEventFn
                            .bind(_this, event);
                        _this._blurClosure = _this
                            ._blurEventFn
                            .bind(_this, book, comingFromIf, event);
                        _this._keyupClosure = _this
                            ._keyupEventFn
                            .bind(_this, book, comingFromIf, event);
                        _this._keypressClosure = _this
                            ._keypressEventFn
                            .bind(_this, book, event);
                        elem.addEventListener('focus', _this._focusClosure);
                        elem.addEventListener('blur', _this._blurClosure);
                        elem.addEventListener('keyup', _this._keyupClosure);
                        if (book.capslockCheck.isApplicable) {
                            elem.addEventListener('keypress', _this._keypressClosure);
                        }
                    }
                    else {
                        elem.removeEventListener('focus', _this._focusClosure);
                        elem.removeEventListener('blur', _this._blurClosure);
                        elem.removeEventListener('keyup', _this._keyupClosure);
                        if (book.capslockCheck.isApplicable) {
                            elem.removeEventListener('keypress', _this._keypressClosure);
                        }
                    }
                });
            }
        };
        Core.prototype._attachMouseEvents = function (nodes, book, addOrDelete, comingFromIf) {
            var _this = this;
            if (nodes) {
                _ArrayCall(nodes).forEach(function (elem) {
                    if (addOrDelete) {
                        _this._clickClosure = _this
                            ._clickEventFn
                            .bind(_this, book, comingFromIf, event);
                        elem.addEventListener('click', _this._clickClosure);
                    }
                    else {
                        elem.removeEventListener('click', _this._clickClosure);
                    }
                });
            }
        };
        Core.prototype._attachEvents = function (addOrDelete) {
            var _this = this;
            var keyboardElementBooks, mouseElementBooks;
            if (this._i._elemGrps) {
                keyboardElementBooks = this._i._elemGrps.keyTypes;
                mouseElementBooks = this._i._elemGrps.clickTypes;
                _ArrayCall(keyboardElementBooks).forEach(function (book, index) {
                    _this._attachKeyEvents(book.nodes, book, addOrDelete, false);
                    if (book["if"]) {
                        _this._attachKeyEvents(book["if"].nodes, book, addOrDelete, true);
                    }
                    if (!addOrDelete && index === keyboardElementBooks.length - 1) {
                        _this._focusClosure = undefined;
                        _this._blurClosure = undefined;
                        _this._keyupClosure = undefined;
                        _this._keypressClosure = undefined;
                    }
                    return;
                });
                _ArrayCall(mouseElementBooks).forEach(function (book, index) {
                    _this._attachMouseEvents(book.nodes, book, addOrDelete, false);
                    if (book["if"]) {
                        _this._attachMouseEvents(book["if"].nodes, book, addOrDelete, true);
                    }
                    if (!addOrDelete && index === mouseElementBooks.length - 1) {
                        _this._clickClosure = undefined;
                    }
                });
            }
            return;
        };
        Core.prototype._createElementBook = function (name, book, isComingFromIf) {
            var _this = this;
            var rulesJSON, thisElement, thisElementTag, thisElementType, cardFormat, capslockCheck, alertContainer;
            book.name = name;
            if (this._i._form) {
                book.nodes = this
                    ._i
                    ._form
                    .querySelectorAll('[name=' + _EscCssMeta(name) + ']');
                thisElement = book.nodes[book.nodes.length - 1];
                thisElementTag = (thisElement.tagName || '').toLowerCase();
                thisElementType = (thisElement.getAttribute('type') || '').toLowerCase();
                book.tagName = thisElementTag;
                book.tagType = thisElementType;
                book.parent = _NearestParent(thisElement, '[data-sanatioparent]');
                alertContainer = document.querySelector('[data-sanatioalert=' + thisElement.getAttribute('name') + ']');
                if (alertContainer) {
                    book.container = alertContainer;
                }
                cardFormat = thisElement.getAttribute('data-sanatiocardformat') || null;
                if (cardFormat) {
                    book.cardFormatting.isApplicable = true;
                    book.cardFormatting.character = cardFormat;
                }
                capslockCheck = thisElement.getAttribute('data-sanatiocapslock') || null;
                if (capslockCheck) {
                    book.capslockCheck.isApplicable = true;
                    book.capslockCheck.message = capslockCheck;
                }
                book.isCheckable = (thisElementType === 'radio' || thisElementType === 'checkbox')
                    ? true
                    : false;
                book.isClickable = (thisElementType === 'radio' ||
                    thisElementType === 'checkbox' ||
                    thisElementType === 'file' ||
                    thisElementTag === 'select')
                    ? true
                    : false;
                book.isSelect = thisElementTag === 'select'
                    ? true
                    : false;
                book.hasContentEditable = thisElement.getAttribute('contenteditable')
                    ? true
                    : false;
                // TODO: Compatibility check for icons
                book.isIconApplicable = thisElementTag === 'input' && _ArrayCall(_elementsSupportingIcons).includes(thisElementType);
                book.ruleBook = JSON.parse(JSON.stringify(Core._RuleBook));
                rulesJSON = thisElement.getAttribute('data-sanatioelement');
                if (rulesJSON) {
                    rulesJSON = JSON.parse(rulesJSON.replace(/\\/g, '\\\\'));
                    _ArrayCall(rulesJSON).every(function (ruleRef) {
                        if (ruleRef.rule === 'required') {
                            book.isRequired = true;
                            return false;
                        }
                        return true;
                    });
                    _ArrayCall(rulesJSON).forEach(function (ruleRef) {
                        book.ruleBook[ruleRef.rule].isRuleAvailable = true;
                        book.ruleBook[ruleRef.rule].alertType = _TrimFn((ruleRef.alertType || '').toString()).length > 0
                            ? ruleRef.alertType === 'warning'
                                ? 'warning'
                                : 'error'
                            : 'error';
                        book.ruleBook[ruleRef.rule].message = _TrimFn((ruleRef.message || '').toString()).length > 0
                            ? _FormatMsg(ruleRef.message, ruleRef.value)
                            : _FormatMsg(Core._Messages[ruleRef.rule], ruleRef.value);
                        book.ruleBook[ruleRef.rule].params = ruleRef.value;
                        if (ruleRef["if"]) {
                            var ifElementBook = _this._createElementBook(ruleRef["if"], JSON.parse(JSON.stringify(_defaultElementBook)), true);
                            if (ifElementBook) {
                                book["if"] = ifElementBook;
                            }
                        }
                    });
                }
                if (isComingFromIf) {
                    book.ruleBook['required'].params = true;
                }
                if (thisElement.hasAttribute('contenteditable') ||
                    _ArrayCall(_elementsForKeyboardEvents).includes(thisElementTag) ||
                    _ArrayCall(_elementsForKeyboardEvents).includes(thisElementType)) {
                    book.keyType = true;
                }
                if (_ArrayCall(_elementsForMouseEvents).includes(thisElementTag) || _ArrayCall(_elementsForMouseEvents).includes(thisElementType)) {
                    book.clickType = true;
                }
            }
            return book;
        };
        Core.prototype._formElemBooks = function (allElements, allGroups) {
            var _this = this;
            var elementNames = [], keyboardElementBooks = [], mouseElementBooks = [], book, partOfGroup = [];
            _ArrayCall(allElements).forEach(function (element) {
                elementNames.push(element.getAttribute('name') || '');
            });
            elementNames = elementNames
                .sort()
                .filter(function (item, position, array) {
                return !position || item !== array[position - 1];
            });
            _ArrayCall(elementNames).forEach(function (name) {
                book = _this._createElementBook(name, JSON.parse(JSON.stringify(_defaultElementBook)), false);
                _ArrayCall(allGroups).every(function (arr) {
                    if (_ArrayCall(arr).filter(function (thisName) { return thisName === book.name; }).length > 0) {
                        partOfGroup = arr;
                        return false;
                    }
                    return true;
                });
                if (partOfGroup.length > 0) {
                    book.isPartOf = partOfGroup;
                }
                if (book.keyType) {
                    keyboardElementBooks.push(book);
                }
                if (book.clickType) {
                    mouseElementBooks.push(book);
                }
                _this._bookCol[name] = book;
            });
            this._i._elemGrps.keyTypes = keyboardElementBooks;
            this._i._elemGrps.clickTypes = mouseElementBooks;
            return;
        };
        Core.prototype._getElem = function () {
            if (this._i._form) {
                var allElements = this
                    ._i
                    ._form
                    .querySelectorAll('[data-sanatioelement]'), allGroupsDef = this._i._form.querySelectorAll('[data-sanatiogroup]');
                var allGroups_1 = [];
                if (allGroupsDef) {
                    _ArrayCall(allGroupsDef).forEach(function (element) {
                        var groupElemNames = element.getAttribute('data-sanatiogroup');
                        if (groupElemNames) {
                            groupElemNames = JSON.parse(groupElemNames);
                            if (groupElemNames && Array.isArray(groupElemNames)) {
                                allGroups_1.push(groupElemNames);
                            }
                        }
                    });
                }
                this._formElemBooks(allElements, allGroups_1);
                this._attachEvents(true);
                this._attachSubmit(true);
            }
            return;
        };
        Core.prototype._init = function () {
            var customProps, customPropsAttr;
            if (this._i._form) {
                this
                    ._i
                    ._form
                    .setAttribute('novalidate', 'novalidate');
                customPropsAttr = this
                    ._i
                    ._form
                    .getAttribute('data-sanatiocustom');
                if (customPropsAttr && _TrimFn(customPropsAttr).length > 0) {
                    customProps = JSON.parse(customPropsAttr);
                    if (customProps) {
                        this._i._props = {
                            formPre: customProps.formValidationClass || '',
                            formPost: customProps.formPostValidationClass || '',
                            parentS: customProps.parentSuccessClass || '',
                            parentE: customProps.parentErrorClass || '',
                            parentW: customProps.parentWarningClass || '',
                            iconS: customProps.iconSuccessClass || '',
                            iconE: customProps.iconErrorClass || '',
                            iconW: customProps.iconWarningClass || '',
                            elemS: customProps.elementSuccessClass || '',
                            elemE: customProps.elementErrorClass || '',
                            elemW: customProps.elementWarningClass || '',
                            msgS: customProps.messageSuccessClass || '',
                            msgE: customProps.messageErrorClass || '',
                            msgW: customProps.messageWarningClass || '',
                            elem: customProps.alertElement || 'div',
                            container: document.querySelector('#' + customProps.container)
                        };
                    }
                }
                if (customProps && customProps.formValidationClass) {
                    _AddClass(this._i._form, customProps.formValidationClass);
                }
                this._getElem();
            }
            return;
        };
        Core._Methods = Constants_1.SanatioConstants._MethodBook;
        Core._Messages = Constants_1.SanatioConstants._MessageBook;
        Core._RuleBook = Constants_1.SanatioConstants._RuleBook;
        Core._RuleRef = Constants_1.SanatioConstants._RuleRef;
        return Core;
    }());
    SanatioCore.Core = Core;
    Core._addRule(BankcardRule.SanatioRule.Rule);
    Core._addRule(DateRule.SanatioRule.Rule);
    Core._addRule(DateISORule.SanatioRule.Rule);
    Core._addRule(DigitsRule.SanatioRule.Rule);
    Core._addRule(EmailRule.SanatioRule.Rule);
    Core._addRule(EqualsToRule.SanatioRule.Rule);
    Core._addRule(MaxRule.SanatioRule.Rule);
    Core._addRule(MaxLengthRule.SanatioRule.Rule);
    Core._addRule(MaxOptionsRule.SanatioRule.Rule);
    Core._addRule(MinRule.SanatioRule.Rule);
    Core._addRule(MinLengthRule.SanatioRule.Rule);
    Core._addRule(MinOptionsRule.SanatioRule.Rule);
    Core._addRule(NumberRule.SanatioRule.Rule);
    Core._addRule(NotEqualsTo.SanatioRule.Rule);
    Core._addRule(PatternRule.SanatioRule.Rule);
    Core._addRule(RangeRule.SanatioRule.Rule);
    Core._addRule(RangeLengthRule.SanatioRule.Rule);
    Core._addRule(RangeOptionsRule.SanatioRule.Rule);
    Core._addRule(RequiredRule.SanatioRule.Rule);
    Core._addRule(StepRule.SanatioRule.Rule);
    Core._addRule(URLRule.SanatioRule.Rule);
})(SanatioCore = exports.SanatioCore || (exports.SanatioCore = {}));
//# sourceMappingURL=Core.js.map