/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Core_1 = __webpack_require__(1);
/**
 * Sanatio plugin Namespace
 * @namespace Sanatio
 */
var Sanatio;
(function (Sanatio) {
    var _instances = [];
    /**
     * The main Vaidator Class
     *
     * @export
     * @class Validator
     */
    var Validator = /** @class */ (function () {
        /**
         * Creates an instance of Validator.
         * @memberof Validator
         */
        function Validator() {
            var _this = this;
            /**
             * Public method to initialize the Validator into the formid and return the instance methods
             *
             * @param {string} formId
             * @returns {object}
             * @memberof Validator
             */
            this.init = function (formId) {
                return _this._workOnCoreForm(formId, true);
            };
            this.destroy = function (formId) {
                return _this._workOnCoreForm(formId, false);
            };
            /**
             * Public method to add custom rule to the Global Validator Core
             *
             * @param {object} rule
             * @returns {void}
             * @memberof Validator
             */
            this.addRule = function (rule) {
                Core_1.SanatioCore
                    .Core
                    ._addRule(rule);
                return;
            };
            // this._instances = [];
        }
        /**
         * Method to initialize or destroy the Sanatio Core with the given FormId
         *
         * @private
         * @param {string} formId
         * @param {boolean} initOrDestroy
         * @returns {*}
         * @memberof Validator
         */
        Validator.prototype._workOnCoreForm = function (formId, initOrDestroy) {
            try {
                var isFormAvailable = Array
                    .prototype
                    .slice
                    .call(_instances)
                    .some(function (currentForm) { return currentForm.id === formId; });
                var thisFormElement = void 0, returnObj = void 0;
                if (!isFormAvailable && initOrDestroy) {
                    thisFormElement = document.querySelector('#' + formId);
                    if (thisFormElement) {
                        var sanatioCore = void 0, newInstance = void 0;
                        sanatioCore = new Core_1.SanatioCore.Core(thisFormElement);
                        newInstance = {
                            id: formId,
                            coreElement: sanatioCore
                        };
                        _instances.push(newInstance);
                        returnObj = _instances.filter(function (instance) { return instance.id === formId; })[0].coreElement;
                    }
                    if (returnObj) {
                        return returnObj.globals;
                    }
                    else {
                        throw ReferenceError('Form element is not present.');
                    }
                }
                else if (isFormAvailable && !initOrDestroy) {
                    returnObj = _instances.filter(function (instance) { return instance.id === formId; })[0].coreElement;
                    if (returnObj && returnObj._destroy()) {
                        _instances = _instances.filter(function (instance) { return instance.id !== formId; });
                        return true;
                    }
                }
                return true;
            }
            catch (e) {
                console.error('Sanatio encountered some error.', e);
                return false;
            }
        };
        /**
         * Public Method to get the singleton instance of Validator Class
         *
         * @static
         * @returns {Validator}
         * @memberof Validator
         */
        Validator.getInstance = function () {
            if (!Validator._instance) {
                Validator._instance = new Validator();
            }
            return Validator._instance;
        };
        return Validator;
    }());
    Sanatio.Validator = Validator;
})(Sanatio = exports.Sanatio || (exports.Sanatio = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Constants_1 = __webpack_require__(2);
var BankcardRule = __webpack_require__(3);
var DateRule = __webpack_require__(4);
var DateISORule = __webpack_require__(5);
var DigitsRule = __webpack_require__(6);
var EmailRule = __webpack_require__(7);
var EqualsToRule = __webpack_require__(8);
var MaxRule = __webpack_require__(9);
var MaxLengthRule = __webpack_require__(10);
var MaxOptionsRule = __webpack_require__(11);
var MinRule = __webpack_require__(12);
var MinLengthRule = __webpack_require__(13);
var MinOptionsRule = __webpack_require__(14);
var NumberRule = __webpack_require__(15);
var NotEqualsTo = __webpack_require__(16);
var PatternRule = __webpack_require__(17);
var RangeRule = __webpack_require__(18);
var RangeLengthRule = __webpack_require__(19);
var RangeOptionsRule = __webpack_require__(20);
var RequiredRule = __webpack_require__(21);
var StepRule = __webpack_require__(22);
var URLRule = __webpack_require__(23);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var luhnSum, luhnVal, luhnLen, luhnBit;
    var regex = new RegExp('^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3' +
        '[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{1' +
        '1}))$'), isLuhnCheckValid = function (luhn) {
        luhnSum = 0;
        luhnVal = 1;
        luhnLen = luhn.length;
        while (luhnLen--) {
            luhnBit = parseInt(luhn.charAt(luhnLen), 10) * luhnVal;
            luhnSum += luhnBit - (luhnBit > 9
                ? 1
                : 0) * 9;
            luhnVal ^= 3;
        }
        return (luhnSum % 10 === 0) && (luhnSum > 0);
    };
    SanatioRule.Rule = {
        name: 'bankcard',
        definition: function (value, params) {
            return params
                ? typeof value === 'string' && regex.test(value.replace(/[ -]/g, '')) && isLuhnCheckValid(value.replace(/[ -]/g, '')) || false
                : false;
        },
        message: 'Please enter a valid card number.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var regex = /Invalid|NaN/;
    SanatioRule.Rule = {
        name: 'date',
        definition: function (value, params) {
            return params
                ? typeof value === 'string' && !regex.test(new Date(value).toString()) || false
                : false;
        },
        message: 'Please enter a valid date.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var regex = /^\d+$/;
    SanatioRule.Rule = {
        name: 'digits',
        definition: function (value, params) {
            return params
                ? typeof value === 'string' && regex.test(value) || false
                : false;
        },
        message: 'Please enter only digits.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'maxlength',
        definition: function (value, params) {
            return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length <= params || false;
        },
        message: 'Please enter no more than {0} characters.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'maxoptions',
        definition: function (value, params) {
            return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length <= params || false;
        },
        message: 'Please select no more than {0} option(s).'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var optionElement;
    SanatioRule.Rule = {
        name: 'min',
        definition: function (value, params) {
            if (typeof value === 'object') {
                try {
                    optionElement = value[0];
                    return Number(optionElement.value) >= Number(params) || false;
                }
                catch (e) {
                    return false;
                }
            }
            else if (typeof value === 'string' || typeof value === 'number') {
                return Number(value) >= Number(params) || false;
            }
            return false;
        },
        message: 'Please enter a value greater than or equal to {0}.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'minlength',
        definition: function (value, params) {
            return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length >= params || false;
        },
        message: 'Please enter at least {0} characters.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'minoptions',
        definition: function (value, params) {
            return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length >= params || false;
        },
        message: 'Please select at least {0} option(s).'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    var elem;
    SanatioRule.Rule = {
        name: 'equalsto',
        definition: function (value, params) {
            elem = document.querySelector('[id=' + params + ']');
            return typeof value === 'string' && typeof params === 'string' && elem && elem.value !== value || false;
        },
        message: 'Please enter a different value.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'pattern',
        definition: function (value, params) {
            return typeof value === 'string'
                && typeof params === 'string'
                && new RegExp(params).test(value) || false;
        },
        message: 'Sorry, this doesn\'t match with the expected pattern.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'rangelength',
        definition: function (value, params) {
            return Array.isArray(params)
                && (typeof value === 'string' || Array.isArray(value))
                && value.length >= params[0]
                && value.length <= params[1] || false;
        },
        message: 'Please enter a value between {0} and {1} characters long.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    SanatioRule.Rule = {
        name: 'rangeoptions',
        definition: function (value, params) {
            return Array.isArray(params)
                && (typeof value === 'string' || Array.isArray(value))
                && value.length >= params[0]
                && value.length <= params[1] || false;
        },
        message: 'Please select {0} to {1} options.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SanatioRule;
(function (SanatioRule) {
    // https://gist.github.com/dperini/729294 Author: Diego Perini Updated:
    // 2010/12/05 License: MIT
    //
    // Copyright (c) 2010-2013 Diego Perini (http://www.iport.it)
    var regex = new RegExp('^' +
        // protocol identifier
        '(?:(?:https?|ftp)://)' +
        // user:pass authentication
        '(?:\\S+(?::\\S*)?@)?(?:' +
        // IP address exclusion private & local networks
        '(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!' +
        '172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
        // IP address dotted notation octets excludes loopback network 0.0.0.0 excludes
        // reserved space >= 224.0.0.0 excludes network & broacast addresses (first &
        // last IP address of each class)
        '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
        '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|' +
        // host name
        '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
        // domain name
        '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
        // TLD identifier
        '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
        // TLD may end with dot
        '\\.?)' +
        // port number
        '(?::\\d{2,5})?' +
        // resource path
        '(?:[/?#]\\S*)?$', 'i');
    SanatioRule.Rule = {
        name: 'url',
        definition: function (value, params) {
            // https://gist.github.com/dperini/729294 Author: Diego
            // Perini Updated: 2010/12/05 License: MIT
            //
            // Copyright (c) 2010-2013 Diego Perini (http://www.iport.it)
            return params
                ? typeof value === 'string' && regex.test(value) || false
                : false;
        },
        message: 'Please enter a valid URL.'
    };
})(SanatioRule = exports.SanatioRule || (exports.SanatioRule = {}));


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGM0ZThmMGE5MGMwMTczYTY4OWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NhbmF0aW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvYmFua2NhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2RhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2RhdGVJU08udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2RpZ2l0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvZW1haWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2VxdWFsc3RvLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21heGxlbmd0aC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbWF4b3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbWluLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9taW5sZW5ndGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21pbm9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL251bWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbm90ZXF1YWxzdG8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3BhdHRlcm4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3JhbmdlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9yYW5nZWxlbmd0aC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcmFuZ2VvcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9yZXF1aXJlZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvc3RlcC50cyIsIndlYnBhY2s6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QztBQUNKLENBQUMsRUEzQ2dCLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBMkMzQiIsImZpbGUiOiJzYW5hdGlvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGM0ZThmMGE5MGMwMTczYTY4OWQiLCJpbXBvcnQgeyBTYW5hdGlvQ29yZSB9IGZyb20gJy4vQ29yZSc7XG5pbXBvcnQgeyBTYW5hdGlvSW50ZXJmYWNlcyB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG4vKipcbiAqIFNhbmF0aW8gcGx1Z2luIE5hbWVzcGFjZVxuICogQG5hbWVzcGFjZSBTYW5hdGlvXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpbyB7XG4gIGxldCBfaW5zdGFuY2VzIDogU2FuYXRpb0ludGVyZmFjZXMuU2FuYXRpb0luc3RhbmNlW10gPSBbXTtcblxuICAvKipcbiAgICogVGhlIG1haW4gVmFpZGF0b3IgQ2xhc3NcbiAgICpcbiAgICogQGV4cG9ydFxuICAgKiBAY2xhc3MgVmFsaWRhdG9yXG4gICAqL1xuICBleHBvcnQgY2xhc3MgVmFsaWRhdG9yIHtcblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZSA6IFZhbGlkYXRvcjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVmFsaWRhdG9yLlxuICAgICAqIEBtZW1iZXJvZiBWYWxpZGF0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vIHRoaXMuX2luc3RhbmNlcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBNZXRob2QgdG8gZ2V0IHRoZSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgVmFsaWRhdG9yIENsYXNzXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybnMge1ZhbGlkYXRvcn1cbiAgICAgKiBAbWVtYmVyb2YgVmFsaWRhdG9yXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSA9ICgpIDogVmFsaWRhdG9yID0+IHtcbiAgICAgIGlmICghVmFsaWRhdG9yLl9pbnN0YW5jZSkge1xuICAgICAgICBWYWxpZGF0b3IuX2luc3RhbmNlID0gbmV3IFZhbGlkYXRvcigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFZhbGlkYXRvci5faW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBpbml0aWFsaXplIHRoZSBWYWxpZGF0b3IgaW50byB0aGUgZm9ybWlkIGFuZCByZXR1cm4gdGhlIGluc3RhbmNlIG1ldGhvZHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtSWRcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqIEBtZW1iZXJvZiBWYWxpZGF0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdCA9IChmb3JtSWQgOiBzdHJpbmcpIDogU2FuYXRpb0ludGVyZmFjZXMuR2xvYmFsRnVuY3Rpb25zIHwgYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fd29ya09uQ29yZUZvcm0oZm9ybUlkLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSA9IChmb3JtSWQgOiBzdHJpbmcpIDogU2FuYXRpb0ludGVyZmFjZXMuR2xvYmFsRnVuY3Rpb25zIHwgYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fd29ya09uQ29yZUZvcm0oZm9ybUlkLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBhZGQgY3VzdG9tIHJ1bGUgdG8gdGhlIEdsb2JhbCBWYWxpZGF0b3IgQ29yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJ1bGVcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKiBAbWVtYmVyb2YgVmFsaWRhdG9yXG4gICAgICovXG4gICAgcHVibGljIGFkZFJ1bGUgPSAocnVsZSA6IFNhbmF0aW9JbnRlcmZhY2VzLlJ1bGVTdHJ1Y3R1cmUpIDogdm9pZCA9PiB7XG4gICAgICBTYW5hdGlvQ29yZVxuICAgICAgICAuQ29yZVxuICAgICAgICAuX2FkZFJ1bGUocnVsZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGluaXRpYWxpemUgb3IgZGVzdHJveSB0aGUgU2FuYXRpbyBDb3JlIHdpdGggdGhlIGdpdmVuIEZvcm1JZFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybUlkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpbml0T3JEZXN0cm95XG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICogQG1lbWJlcm9mIFZhbGlkYXRvclxuICAgICAqL1xuICAgIHByaXZhdGUgX3dvcmtPbkNvcmVGb3JtKGZvcm1JZCA6IHN0cmluZywgaW5pdE9yRGVzdHJveSA6IGJvb2xlYW4pIDogU2FuYXRpb0ludGVyZmFjZXMuR2xvYmFsRnVuY3Rpb25zIHwgYm9vbGVhbiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpc0Zvcm1BdmFpbGFibGUgOiBib29sZWFuID0gQXJyYXlcbiAgICAgICAgICAucHJvdG90eXBlXG4gICAgICAgICAgLnNsaWNlXG4gICAgICAgICAgLmNhbGwoX2luc3RhbmNlcylcbiAgICAgICAgICAuc29tZSgoY3VycmVudEZvcm0gOiBTYW5hdGlvSW50ZXJmYWNlcy5TYW5hdGlvSW5zdGFuY2UpID0+IGN1cnJlbnRGb3JtLmlkID09PSBmb3JtSWQpO1xuICAgICAgICBsZXQgdGhpc0Zvcm1FbGVtZW50IDogRWxlbWVudCB8IG51bGwsXG4gICAgICAgICAgcmV0dXJuT2JqIDogU2FuYXRpb0NvcmUuQ29yZSB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoIWlzRm9ybUF2YWlsYWJsZSAmJiBpbml0T3JEZXN0cm95KSB7XG4gICAgICAgICAgdGhpc0Zvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBmb3JtSWQpO1xuICAgICAgICAgIGlmICh0aGlzRm9ybUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBzYW5hdGlvQ29yZSA6IFNhbmF0aW9Db3JlLkNvcmUsXG4gICAgICAgICAgICAgIG5ld0luc3RhbmNlIDogU2FuYXRpb0ludGVyZmFjZXMuU2FuYXRpb0luc3RhbmNlO1xuXG4gICAgICAgICAgICBzYW5hdGlvQ29yZSA9IG5ldyBTYW5hdGlvQ29yZS5Db3JlKHRoaXNGb3JtRWxlbWVudCBhcyBIVE1MRm9ybUVsZW1lbnQpO1xuICAgICAgICAgICAgbmV3SW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgIGlkOiBmb3JtSWQsXG4gICAgICAgICAgICAgIGNvcmVFbGVtZW50OiBzYW5hdGlvQ29yZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF9pbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICByZXR1cm5PYmogPSBfaW5zdGFuY2VzLmZpbHRlcigoaW5zdGFuY2UgOiBTYW5hdGlvSW50ZXJmYWNlcy5TYW5hdGlvSW5zdGFuY2UpID0+IGluc3RhbmNlLmlkID09PSBmb3JtSWQpWzBdLmNvcmVFbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmV0dXJuT2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqLmdsb2JhbHM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IFJlZmVyZW5jZUVycm9yKCdGb3JtIGVsZW1lbnQgaXMgbm90IHByZXNlbnQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzRm9ybUF2YWlsYWJsZSAmJiAhaW5pdE9yRGVzdHJveSkge1xuICAgICAgICAgIHJldHVybk9iaiA9IF9pbnN0YW5jZXMuZmlsdGVyKChpbnN0YW5jZSA6IFNhbmF0aW9JbnRlcmZhY2VzLlNhbmF0aW9JbnN0YW5jZSkgPT4gaW5zdGFuY2UuaWQgPT09IGZvcm1JZClbMF0uY29yZUVsZW1lbnQ7XG4gICAgICAgICAgaWYgKHJldHVybk9iaiAmJiByZXR1cm5PYmouX2Rlc3Ryb3koKSkge1xuICAgICAgICAgICAgX2luc3RhbmNlcyA9IF9pbnN0YW5jZXMuZmlsdGVyKGluc3RhbmNlID0+IGluc3RhbmNlLmlkICE9PSBmb3JtSWQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdTYW5hdGlvIGVuY291bnRlcmVkIHNvbWUgZXJyb3IuJywgZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TYW5hdGlvLnRzIiwiaW1wb3J0IHtTYW5hdGlvSW50ZXJmYWNlc30gZnJvbSAnLi9JbnRlcmZhY2VzJztcclxuaW1wb3J0IHtTYW5hdGlvQ29uc3RhbnRzfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcblxyXG5pbXBvcnQgKiBhcyBCYW5rY2FyZFJ1bGUgZnJvbSAnLi9ydWxlcy9iYW5rY2FyZCc7XHJcbmltcG9ydCAqIGFzIERhdGVSdWxlIGZyb20gJy4vcnVsZXMvZGF0ZSc7XHJcbmltcG9ydCAqIGFzIERhdGVJU09SdWxlIGZyb20gJy4vcnVsZXMvZGF0ZUlTTyc7XHJcbmltcG9ydCAqIGFzIERpZ2l0c1J1bGUgZnJvbSAnLi9ydWxlcy9kaWdpdHMnO1xyXG5pbXBvcnQgKiBhcyBFbWFpbFJ1bGUgZnJvbSAnLi9ydWxlcy9lbWFpbCc7XHJcbmltcG9ydCAqIGFzIEVxdWFsc1RvUnVsZSBmcm9tICcuL3J1bGVzL2VxdWFsc3RvJztcclxuaW1wb3J0ICogYXMgTWF4UnVsZSBmcm9tICcuL3J1bGVzL21heCc7XHJcbmltcG9ydCAqIGFzIE1heExlbmd0aFJ1bGUgZnJvbSAnLi9ydWxlcy9tYXhsZW5ndGgnO1xyXG5pbXBvcnQgKiBhcyBNYXhPcHRpb25zUnVsZSBmcm9tICcuL3J1bGVzL21heG9wdGlvbnMnO1xyXG5pbXBvcnQgKiBhcyBNaW5SdWxlIGZyb20gJy4vcnVsZXMvbWluJztcclxuaW1wb3J0ICogYXMgTWluTGVuZ3RoUnVsZSBmcm9tICcuL3J1bGVzL21pbmxlbmd0aCc7XHJcbmltcG9ydCAqIGFzIE1pbk9wdGlvbnNSdWxlIGZyb20gJy4vcnVsZXMvbWlub3B0aW9ucyc7XHJcbmltcG9ydCAqIGFzIE51bWJlclJ1bGUgZnJvbSAnLi9ydWxlcy9udW1iZXInO1xyXG5pbXBvcnQgKiBhcyBOb3RFcXVhbHNUbyBmcm9tICcuL3J1bGVzL25vdGVxdWFsc3RvJztcclxuaW1wb3J0ICogYXMgUGF0dGVyblJ1bGUgZnJvbSAnLi9ydWxlcy9wYXR0ZXJuJztcclxuaW1wb3J0ICogYXMgUmFuZ2VSdWxlIGZyb20gJy4vcnVsZXMvcmFuZ2UnO1xyXG5pbXBvcnQgKiBhcyBSYW5nZUxlbmd0aFJ1bGUgZnJvbSAnLi9ydWxlcy9yYW5nZWxlbmd0aCc7XHJcbmltcG9ydCAqIGFzIFJhbmdlT3B0aW9uc1J1bGUgZnJvbSAnLi9ydWxlcy9yYW5nZW9wdGlvbnMnO1xyXG5pbXBvcnQgKiBhcyBSZXF1aXJlZFJ1bGUgZnJvbSAnLi9ydWxlcy9yZXF1aXJlZCc7XHJcbmltcG9ydCAqIGFzIFN0ZXBSdWxlIGZyb20gJy4vcnVsZXMvc3RlcCc7XHJcbmltcG9ydCAqIGFzIFVSTFJ1bGUgZnJvbSAnLi9ydWxlcy91cmwnO1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvQ29yZSB7XHJcbiAgbGV0IG5vT2ZFcnJvcnMgPSAwLFxyXG4gICAgbm9PZldhcm5pbmdzID0gMCxcclxuICAgIGN1cnJlbnRWYWx1ZSA6IGJvb2xlYW4gfCBudW1iZXIgfCBBcnJheSA8IG51bWJlciA+IHwgc3RyaW5nO1xyXG4gIGNvbnN0IF9kZWZhdWx0RWxlbWVudEJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vayA9IFNhbmF0aW9Db25zdGFudHMuX0VsZW1Cb29rO1xyXG4gIGNvbnN0IF9lbGVtZW50c0ZvcktleWJvYXJkRXZlbnRzIDogc3RyaW5nW10gPSBTYW5hdGlvQ29uc3RhbnRzLl9LZXlFbGVtO1xyXG4gIGNvbnN0IF9lbGVtZW50c0Zvck1vdXNlRXZlbnRzIDogc3RyaW5nW10gPSBTYW5hdGlvQ29uc3RhbnRzLl9Nb3VzZUVsZW07XHJcbiAgY29uc3QgX2V4Y2x1ZGVkS2V5cyA6IG51bWJlcltdID0gU2FuYXRpb0NvbnN0YW50cy5fZXhjbHVkZWRLZXlzO1xyXG4gIGNvbnN0IF9lbGVtZW50c1N1cHBvcnRpbmdJY29ucyA6IHN0cmluZ1tdID0gU2FuYXRpb0NvbnN0YW50cy5fSWNvbmljRWxlbTtcclxuICBjb25zdCBfZGVmYXVsdEZvcm1JbnN0YW5jZSA6IFNhbmF0aW9JbnRlcmZhY2VzLkZvcm1JbnN0YW5jZSA9IFNhbmF0aW9Db25zdGFudHMuX0luc3RhbmNlO1xyXG4gIGNvbnN0IF9DYXBzbG9ja0ZuIDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9DYXBzbG9ja0ZuO1xyXG4gIGNvbnN0IF9UcmltRm4gOiBGdW5jdGlvbiA9IFNhbmF0aW9Db25zdGFudHMuX1RyaW1GbjtcclxuICBjb25zdCBfTWF0Y2hlc1BvbHlmaWxsIDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9NYXRjaGVzUG9seWZpbGw7XHJcbiAgY29uc3QgX05lYXJlc3RQYXJlbnQgOiBGdW5jdGlvbiA9IFNhbmF0aW9Db25zdGFudHMuX05lYXJlc3RQYXJlbnQ7XHJcbiAgY29uc3QgX0Zvcm1hdE1zZyA6IEZ1bmN0aW9uID0gU2FuYXRpb0NvbnN0YW50cy5fRm9ybWF0TXNnO1xyXG4gIGNvbnN0IF9BcnJheUNhbGwgOiBGdW5jdGlvbiA9IFNhbmF0aW9Db25zdGFudHMuX0FycmF5Q2FsbDtcclxuICBjb25zdCBfRWxlbVZhbHVlIDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9FbGVtVmFsdWU7XHJcbiAgY29uc3QgX0VzY0Nzc01ldGEgOiBGdW5jdGlvbiA9IFNhbmF0aW9Db25zdGFudHMuX0VzY0Nzc01ldGE7XHJcbiAgY29uc3QgX0Zvcm1hdENhcmQgOiBGdW5jdGlvbiA9IFNhbmF0aW9Db25zdGFudHMuX0Zvcm1hdENhcmQ7XHJcblxyXG4gIGNvbnN0IF9BZGRDbGFzcyA6IEZ1bmN0aW9uID0gU2FuYXRpb0NvbnN0YW50cy5fQWRkQ2xhc3M7XHJcbiAgY29uc3QgX1JlbW92ZUNsYXNzIDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9SZW1vdmVDbGFzcztcclxuXHJcbiAgY29uc3QgX0lzSW5Db2xsZWN0aW9uIDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9Jc0luQ29sbGVjdGlvbjtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIENvcmUge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfTWV0aG9kcyA6IFNhbmF0aW9JbnRlcmZhY2VzLk1ldGhvZEJvb2sgPSBTYW5hdGlvQ29uc3RhbnRzLl9NZXRob2RCb29rO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfTWVzc2FnZXMgOiBTYW5hdGlvSW50ZXJmYWNlcy5NZXNzYWdlQm9vayA9IFNhbmF0aW9Db25zdGFudHMuX01lc3NhZ2VCb29rO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfUnVsZUJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5SdWxlQm9vayA9IFNhbmF0aW9Db25zdGFudHMuX1J1bGVCb29rO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfUnVsZVJlZiA6IFNhbmF0aW9JbnRlcmZhY2VzLlJ1bGVSZWZlcmVuY2UgPSBTYW5hdGlvQ29uc3RhbnRzLl9SdWxlUmVmO1xyXG4gICAgcHVibGljIGdsb2JhbHMgOiBTYW5hdGlvSW50ZXJmYWNlcy5HbG9iYWxGdW5jdGlvbnM7XHJcbiAgICBwcml2YXRlIF9pIDogU2FuYXRpb0ludGVyZmFjZXMuRm9ybUluc3RhbmNlO1xyXG4gICAgcHJpdmF0ZSBfc3VibWl0SGFuZGxlciA6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBfYm9va0NvbCA6IFNhbmF0aW9JbnRlcmZhY2VzLkJvb2tDb2xsZWN0aW9uID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBfc3VibWl0Q2xvc3VyZSA6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9mb2N1c0Nsb3N1cmUgOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfYmx1ckNsb3N1cmUgOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfa2V5dXBDbG9zdXJlIDogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2tleXByZXNzQ2xvc3VyZSA6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9jbGlja0Nsb3N1cmUgOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGZvcm1FbGVtZW50IDogSFRNTEZvcm1FbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuX2kgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9kZWZhdWx0Rm9ybUluc3RhbmNlKSk7XHJcbiAgICAgIHRoaXMuX2kuX2Zvcm0gPSBmb3JtRWxlbWVudDtcclxuXHJcbiAgICAgIHRoaXMuZ2xvYmFscyA9IHtcclxuICAgICAgICBnZXROdW1iZXJPZkVycm9yczogKCkgOiBudW1iZXIgPT4ge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2kuX2VDb3VudDtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgZmV0Y2hpbmcgdGhlIG51bWJlciBvZiBlcnJvcnMnLCBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TnVtYmVyT2ZXYXJuaW5nczogKCkgOiBudW1iZXIgPT4ge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2kuX3dDb3VudDtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgZmV0Y2hpbmcgdGhlIG51bWJlciBvZiB3YXJuaW5ncycsIGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWJtaXRIYW5kbGVyOiAoc3VibWl0SGFuZGxlckZuIDogRnVuY3Rpb24pIDogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJtaXRIYW5kbGVyID0gc3VibWl0SGFuZGxlckZuO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgYWRkaW5nIHRoZSBjdXN0b20gU3VibWl0SGFuZGxlcicsIGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLl9zdWJtaXRIYW5kbGVyID0gdGhpcy5fZGVmYXVsdFN1Ym1pdEZuO1xyXG4gICAgICBfTWF0Y2hlc1BvbHlmaWxsKCk7XHJcbiAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIF9hZGRSdWxlKHJ1bGUgOiBTYW5hdGlvSW50ZXJmYWNlcy5SdWxlU3RydWN0dXJlKSA6IHZvaWQge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmICghcnVsZS5uYW1lIHx8ICFydWxlLmRlZmluaXRpb24gfHwgIXJ1bGUubWVzc2FnZSkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignTmV3IE1ldGhvZCBub3QgZGVmaW5lZCBwcm9wZXJseS4gSXQgbXVzdCBiZSBpbiBmb3JtYXQge25hbWUsIGRlZmluaXRpb24sIG1lc3NhZ2UnICtcclxuICAgICAgICAgICAgICAnfS4nKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENvcmUuX01ldGhvZHNbcnVsZS5uYW1lXSkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignUnVsZSAnICsgcnVsZS5uYW1lICsgJyBhbHJlYWR5IGV4aXN0cy4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgQ29yZS5fTWV0aG9kc1tydWxlLm5hbWVdID0gcnVsZS5kZWZpbml0aW9uO1xyXG4gICAgICAgICAgQ29yZS5fTWVzc2FnZXNbcnVsZS5uYW1lXSA9IHJ1bGUubWVzc2FnZSAmJiBTYW5hdGlvQ29uc3RhbnRzXHJcbiAgICAgICAgICAgIC5fVHJpbUZuKHJ1bGUubWVzc2FnZS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICA/IHJ1bGUubWVzc2FnZVxyXG4gICAgICAgICAgICA6ICdVbmRlZmluZWQgbWVzc2FnZSBmb3IgJyArIHJ1bGUubmFtZTtcclxuICAgICAgICAgIENvcmUuX1J1bGVCb29rW3J1bGUubmFtZV0gPSBDb3JlLl9SdWxlUmVmO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIGFkZGluZyBtZXRob2QnLCBlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfZGVzdHJveSA9ICgpIDogYm9vbGVhbiA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5fbWFuYWdlTXNncyh0cnVlKTtcclxuICAgICAgICB0aGlzLl9jbGVhckNhcHNNc2coKTtcclxuICAgICAgICB0aGlzLl9hdHRhY2hTdWJtaXQoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaEV2ZW50cyhmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fc3VibWl0SGFuZGxlciA9IHRoaXMuX2RlZmF1bHRTdWJtaXRGbjtcclxuICAgICAgICB0aGlzLl9pID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfZGVmYXVsdEZvcm1JbnN0YW5jZSkpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgZGVzdHJveWluZyB0aGUgaW5zdGFuY2UnLCBlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kZWZhdWx0U3VibWl0Rm4oKSB7XHJcbiAgICAgIGlmICh0aGlzLl9pLl9mb3JtKSB7XHJcbiAgICAgICAgdGhpc1xyXG4gICAgICAgICAgLl9pXHJcbiAgICAgICAgICAuX2Zvcm1cclxuICAgICAgICAgIC5zdWJtaXQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Nob3dNc2coXHJcbiAgICAgIGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vayxcclxuICAgICAgcnVsZVJlZmVyZW5jZSA6IFNhbmF0aW9JbnRlcmZhY2VzLlJ1bGVSZWZlcmVuY2UpIDogdm9pZCB7XHJcblxyXG4gICAgICBsZXQgZXJyb3JFbGVtZW50LFxyXG4gICAgICAgIGljb25FbGVtZW50LFxyXG4gICAgICAgIGV4aXN0aW5nSWNvbkVsZW1lbnQsXHJcbiAgICAgICAgcGFyZW50RWxlbWVudCxcclxuICAgICAgICBmaXJzdEJvb2s7XHJcblxyXG4gICAgICBpZiAoIWJvb2suaXNQYXJ0T2YpIHtcclxuICAgICAgICBmaXJzdEJvb2sgPSBib29rO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZpcnN0Qm9vayA9IHRoaXMuX2Jvb2tDb2xbYm9vay5pc1BhcnRPZlswXV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLl9pLl9wcm9wcy5jb250YWluZXIpIHtcclxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gdGhpcy5faS5fcHJvcHMuY29udGFpbmVyO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpcnN0Qm9vay5jb250YWluZXIpIHtcclxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gZmlyc3RCb29rLmNvbnRhaW5lcjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gZmlyc3RCb29rLnBhcmVudDtcclxuICAgICAgfVxyXG4gICAgICBpZiAocGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgIGVycm9yRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBib29rLm5hbWUgKyAnLicgKyBydWxlUmVmZXJlbmNlLmFsZXJ0VHlwZSk7XHJcbiAgICAgICAgaWYgKCFlcnJvckVsZW1lbnQpIHtcclxuICAgICAgICAgIGVycm9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5faS5fcHJvcHMuZWxlbSk7XHJcbiAgICAgICAgICBlcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gcnVsZVJlZmVyZW5jZS5tZXNzYWdlO1xyXG4gICAgICAgICAgZXJyb3JFbGVtZW50LmNsYXNzTmFtZSA9ICdzYW5hdGlvLWFsZXJ0ICcgKyBydWxlUmVmZXJlbmNlLmFsZXJ0VHlwZSArICcgJyArIGJvb2submFtZTtcclxuICAgICAgICAgIGlmIChib29rLm5vZGVzKSB7XHJcbiAgICAgICAgICAgIGlmIChydWxlUmVmZXJlbmNlLmFsZXJ0VHlwZSA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgIGVycm9yRWxlbWVudC5jbGFzc05hbWUgKz0gJyAnICsgdGhpcy5faS5fcHJvcHMubXNnRTtcclxuICAgICAgICAgICAgICBpY29uRWxlbWVudCA9IGJvb2suaXNJY29uQXBwbGljYWJsZSAmJiBfVHJpbUZuKHRoaXMuX2kuX3Byb3BzLmljb25FKS5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG4gICAgICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgICAgICAgIGlmIChpY29uRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ3NhbmF0aW8taWNvbiBlcnJvciAnICsgdGhpcy5faS5fcHJvcHMuaWNvbkU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF9BcnJheUNhbGwoYm9vay5ub2RlcykuZm9yRWFjaCgobm9kZSA6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfQWRkQ2xhc3Mobm9kZSwgdGhpcy5faS5fcHJvcHMuZWxlbUUpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIF9BZGRDbGFzcyhib29rLnBhcmVudCBhcyBIVE1MRWxlbWVudCwgdGhpcy5faS5fcHJvcHMucGFyZW50RSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJ1bGVSZWZlcmVuY2UuYWxlcnRUeXBlID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgICBlcnJvckVsZW1lbnQuY2xhc3NOYW1lICs9ICcgJyArIHRoaXMuX2kuX3Byb3BzLm1zZ1c7XHJcbiAgICAgICAgICAgICAgaWNvbkVsZW1lbnQgPSBib29rLmlzSWNvbkFwcGxpY2FibGUgJiYgX1RyaW1Gbih0aGlzLl9pLl9wcm9wcy5pY29uVykubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcclxuICAgICAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICAgICAgICBpZiAoaWNvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZSA9ICdzYW5hdGlvLWljb24gd2FybmluZyAnICsgdGhpcy5faS5fcHJvcHMuaWNvblc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF9BcnJheUNhbGwoYm9vay5ub2RlcykuZm9yRWFjaCgobm9kZSA6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfQWRkQ2xhc3Mobm9kZSwgdGhpcy5faS5fcHJvcHMuZWxlbVcpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIF9BZGRDbGFzcyhib29rLnBhcmVudCBhcyBIVE1MRWxlbWVudCwgdGhpcy5faS5fcHJvcHMucGFyZW50Vyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChib29rLnBhcmVudCkge1xyXG4gICAgICAgICAgICBleGlzdGluZ0ljb25FbGVtZW50ID0gYm9vay5wYXJlbnQucXVlcnlTZWxlY3RvcignLnNhbmF0aW8taWNvbi5lcnJvcicpO1xyXG4gICAgICAgICAgICBpZiAoIWV4aXN0aW5nSWNvbkVsZW1lbnQgJiYgaWNvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICBib29rLnBhcmVudC5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZXJyb3JFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NsZWFyTXNnKFxyXG4gICAgICBib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2ssXHJcbiAgICAgIHJ1bGVSZWZlcmVuY2UgOiBTYW5hdGlvSW50ZXJmYWNlcy5SdWxlUmVmZXJlbmNlKSA6IHZvaWQge1xyXG5cclxuICAgICAgbGV0IGVycm9yRWxlbWVudCxcclxuICAgICAgICBpY29uRWxlbWVudCxcclxuICAgICAgICBwYXJlbnRFbGVtZW50LFxyXG4gICAgICAgIGZpcnN0Qm9vaztcclxuXHJcbiAgICAgIGlmICghYm9vay5pc1BhcnRPZikge1xyXG4gICAgICAgIGZpcnN0Qm9vayA9IGJvb2s7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmlyc3RCb29rID0gdGhpcy5fYm9va0NvbFtib29rLmlzUGFydE9mWzBdXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuX2kuX3Byb3BzLmNvbnRhaW5lcikge1xyXG4gICAgICAgIHBhcmVudEVsZW1lbnQgPSB0aGlzLl9pLl9wcm9wcy5jb250YWluZXI7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlyc3RCb29rLmNvbnRhaW5lcikge1xyXG4gICAgICAgIHBhcmVudEVsZW1lbnQgPSBmaXJzdEJvb2suY29udGFpbmVyO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcmVudEVsZW1lbnQgPSBmaXJzdEJvb2sucGFyZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgIGVycm9yRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBib29rLm5hbWUgKyAnLicgKyBydWxlUmVmZXJlbmNlLmFsZXJ0VHlwZSk7XHJcbiAgICAgICAgaWYgKGVycm9yRWxlbWVudCkge1xyXG4gICAgICAgICAgcGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlcnJvckVsZW1lbnQpO1xyXG4gICAgICAgICAgaWYgKGJvb2subm9kZXMgJiYgYm9vay5wYXJlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHJ1bGVSZWZlcmVuY2UuYWxlcnRUeXBlID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgaWNvbkVsZW1lbnQgPSBib29rXHJcbiAgICAgICAgICAgICAgICAucGFyZW50XHJcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLnNhbmF0aW8taWNvbi5lcnJvcicpO1xyXG4gICAgICAgICAgICAgIF9BcnJheUNhbGwoYm9vay5ub2RlcykuZm9yRWFjaCgobm9kZSA6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfUmVtb3ZlQ2xhc3Mobm9kZSwgdGhpcy5faS5fcHJvcHMuZWxlbUUpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIF9SZW1vdmVDbGFzcyhib29rLnBhcmVudCBhcyBIVE1MRWxlbWVudCwgdGhpcy5faS5fcHJvcHMucGFyZW50RSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJ1bGVSZWZlcmVuY2UuYWxlcnRUeXBlID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgICBpY29uRWxlbWVudCA9IGJvb2tcclxuICAgICAgICAgICAgICAgIC5wYXJlbnRcclxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcuc2FuYXRpby1pY29uLndhcm5pbmcnKTtcclxuICAgICAgICAgICAgICBfQXJyYXlDYWxsKGJvb2subm9kZXMpLmZvckVhY2goKG5vZGUgOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgX1JlbW92ZUNsYXNzKG5vZGUsIHRoaXMuX2kuX3Byb3BzLmVsZW1XKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBfUmVtb3ZlQ2xhc3MoYm9vay5wYXJlbnQgYXMgSFRNTEVsZW1lbnQsIHRoaXMuX2kuX3Byb3BzLnBhcmVudFcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpY29uRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgIGJvb2tcclxuICAgICAgICAgICAgICAgIC5wYXJlbnRcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDaGlsZChpY29uRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Nob3dDYXBzTXNnKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaykgOiB2b2lkIHtcclxuICAgICAgaWYgKGJvb2sucGFyZW50KSB7XHJcbiAgICAgICAgbGV0IGV4aXN0aW5nQ2Fwc0VsZW0gPSBib29rLnBhcmVudC5xdWVyeVNlbGVjdG9yKCcuc2FuYXRpby1hbGVydC5pbmZvJyk7XHJcbiAgICAgICAgaWYgKCFleGlzdGluZ0NhcHNFbGVtKSB7XHJcbiAgICAgICAgICBsZXQgY2Fwc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuX2kuX3Byb3BzLmVsZW0pO1xyXG4gICAgICAgICAgY2Fwc0VsZW1lbnQuY2xhc3NOYW1lID0gJ3NhbmF0aW8tYWxlcnQgaW5mbyAnICsgdGhpcy5faS5fcHJvcHMubXNnVztcclxuICAgICAgICAgIGNhcHNFbGVtZW50LmlubmVySFRNTCA9IGJvb2suY2Fwc2xvY2tDaGVjay5tZXNzYWdlO1xyXG4gICAgICAgICAgYm9vay5wYXJlbnQuYXBwZW5kQ2hpbGQoY2Fwc0VsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY2xlYXJDYXBzTXNnKGJvb2s/IDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2spIDogdm9pZCB7XHJcbiAgICAgIGxldCB0aGlzRm9ybSA9IHRoaXMuX2kuX2Zvcm07XHJcbiAgICAgIGlmIChib29rICYmIGJvb2sucGFyZW50KSB7XHJcbiAgICAgICAgbGV0IGNhcHNFbGVtZW50ID0gYm9vay5wYXJlbnQucXVlcnlTZWxlY3RvcignLnNhbmF0aW8tYWxlcnQuaW5mbycpO1xyXG4gICAgICAgIGlmIChjYXBzRWxlbWVudCkge1xyXG4gICAgICAgICAgYm9vay5wYXJlbnQucmVtb3ZlQ2hpbGQoY2Fwc0VsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzRm9ybSkge1xyXG4gICAgICAgIGxldCBjYXBzRWxlbWVudHMgPSB0aGlzRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuc2FuYXRpby1hbGVydC5pbmZvJyksXHJcbiAgICAgICAgICBwYXJlbnROb2RlLFxyXG4gICAgICAgICAgY2Fwc0VsZW1lbnRzTGVuZ3RoID0gMDtcclxuICAgICAgICBpZiAoY2Fwc0VsZW1lbnRzKSB7XHJcbiAgICAgICAgICBjYXBzRWxlbWVudHNMZW5ndGggPSBjYXBzRWxlbWVudHMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoY2Fwc0VsZW1lbnRzTGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcGFyZW50Tm9kZSA9IGNhcHNFbGVtZW50c1tjYXBzRWxlbWVudHNMZW5ndGggLSAxXS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjYXBzRWxlbWVudHNbY2Fwc0VsZW1lbnRzTGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2Fwc0VsZW1lbnRzTGVuZ3RoLS07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9tYW5hZ2VNc2dzKHNob3VsZENsZWFyQWxsTXNncyA6IGJvb2xlYW4pIDogdm9pZCB7XHJcbiAgICAgIC8vIFRPRE86IEV4cGVuc2l2ZSBET00gTWFuaXB1bGF0aW9uLiBOZWVkIHRvIHJldGhpbmsuXHJcbiAgICAgIGxldCB0aGlzQm9vayxcclxuICAgICAgICBlcnJvckZvdW5kID0gZmFsc2UsXHJcbiAgICAgICAgd2FybmluZ0ZvdW5kID0gZmFsc2U7XHJcbiAgICAgIGlmIChzaG91bGRDbGVhckFsbE1zZ3MpIHtcclxuICAgICAgICBfQXJyYXlDYWxsKHRoaXMuX2kuX3N1Ym1pdHRlZCkuZm9yRWFjaCgoYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rKSA9PiB7XHJcbiAgICAgICAgICBpZiAoYm9vay5pc1BhcnRPZikge1xyXG4gICAgICAgICAgICBfQXJyYXlDYWxsKGJvb2suaXNQYXJ0T2YpLmZvckVhY2goKG5hbWUgOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzQm9vayA9IHRoaXMuX2Jvb2tDb2xbbmFtZV07XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgcnVsZSBpbiB0aGlzQm9vay5ydWxlQm9vaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNCb29rLnJ1bGVCb29rLmhhc093blByb3BlcnR5KHJ1bGUpICYmIHRoaXNCb29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLl9jbGVhck1zZyh0aGlzQm9vaywgdGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBydWxlIGluIGJvb2sucnVsZUJvb2spIHtcclxuICAgICAgICAgICAgICBpZiAoYm9vay5ydWxlQm9vay5oYXNPd25Qcm9wZXJ0eShydWxlKSAmJiBib29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJNc2coYm9vaywgYm9vay5ydWxlQm9va1tydWxlXSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX0FycmF5Q2FsbCh0aGlzLl9pLl9zdWJtaXR0ZWQpLmZvckVhY2goKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaykgPT4ge1xyXG4gICAgICAgICAgaWYgKGJvb2suaXNQYXJ0T2YpIHtcclxuICAgICAgICAgICAgaWYgKGJvb2suaXNQYXJ0T2YuaW5kZXhPZihib29rLm5hbWUpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLWJvb2snLCBib29rKTtcclxuICAgICAgICAgICAgICBfQXJyYXlDYWxsKGJvb2suaXNQYXJ0T2YpLmV2ZXJ5KChuYW1lIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tbmFtZSAxJywgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICBlcnJvckZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzQm9vayA9IHRoaXMuX2Jvb2tDb2xbbmFtZV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBydWxlIGluIHRoaXNCb29rLnJ1bGVCb29rKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzQm9vay5ydWxlQm9vay5oYXNPd25Qcm9wZXJ0eShydWxlKSAmJiB0aGlzQm9vay5ydWxlQm9va1tydWxlXS5hbGVydFR5cGUgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0uaXNSdWxlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbGVhck1zZyh0aGlzQm9vaywgdGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0Jvb2sucnVsZUJvb2tbJ3JlcXVpcmVkJ10uaXNSdWxlQXZhaWxhYmxlICYmICF0aGlzQm9vay5ydWxlQm9va1sncmVxdWlyZWQnXS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TXNnKHRoaXNCb29rLCB0aGlzQm9vay5ydWxlQm9va1sncmVxdWlyZWQnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvckZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZSAhPT0gJ3JlcXVpcmVkJyAmJiB0aGlzQm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBdmFpbGFibGUgJiYgIXRoaXNCb29rLnJ1bGVCb29rW3J1bGVdLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dNc2codGhpc0Jvb2ssIHRoaXNCb29rLnJ1bGVCb29rW3J1bGVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGVycm9yRm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICFlcnJvckZvdW5kO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIF9BcnJheUNhbGwoYm9vay5pc1BhcnRPZikuZXZlcnkoKG5hbWUgOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS1uYW1lIDInLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpc0Jvb2sgPSB0aGlzLl9ib29rQ29sW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcnVsZSBpbiB0aGlzQm9vay5ydWxlQm9vaykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAodGhpc0Jvb2sucnVsZUJvb2suaGFzT3duUHJvcGVydHkocnVsZSkgJiYgdGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0uYWxlcnRUeXBlID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0uaXNSdWxlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbGVhck1zZyh0aGlzQm9vaywgdGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0uaXNSdWxlQXZhaWxhYmxlICYmICF0aGlzQm9vay5ydWxlQm9va1tydWxlXS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TXNnKHRoaXNCb29rLCB0aGlzQm9vay5ydWxlQm9va1tydWxlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3YXJuaW5nRm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICF3YXJuaW5nRm91bmQ7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHJ1bGUgaW4gYm9vay5ydWxlQm9vaykge1xyXG4gICAgICAgICAgICAgIGlmIChib29rLnJ1bGVCb29rLmhhc093blByb3BlcnR5KHJ1bGUpICYmIGJvb2sucnVsZUJvb2tbcnVsZV0uYWxlcnRUeXBlID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJNc2coYm9vaywgYm9vay5ydWxlQm9va1tydWxlXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9vay5ydWxlQm9va1sncmVxdWlyZWQnXS5pc1J1bGVBdmFpbGFibGUgJiYgIWJvb2sucnVsZUJvb2tbJ3JlcXVpcmVkJ10uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TXNnKGJvb2ssIGJvb2sucnVsZUJvb2tbJ3JlcXVpcmVkJ10pO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChydWxlICE9PSAncmVxdWlyZWQnICYmIGJvb2sucnVsZUJvb2tbcnVsZV0uaXNSdWxlQXZhaWxhYmxlICYmICFib29rLnJ1bGVCb29rW3J1bGVdLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd01zZyhib29rLCBib29rLnJ1bGVCb29rW3J1bGVdKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmb3IgKGxldCBydWxlIGluIGJvb2sucnVsZUJvb2spIHtcclxuICAgICAgICAgICAgaWYgKGJvb2sucnVsZUJvb2suaGFzT3duUHJvcGVydHkocnVsZSkgJiYgYm9vay5ydWxlQm9va1tydWxlXS5hbGVydFR5cGUgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICAgIGlmIChib29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJNc2coYm9vaywgYm9vay5ydWxlQm9va1tydWxlXSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChib29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSAmJiAhYm9vay5ydWxlQm9va1tydWxlXS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TXNnKGJvb2ssIGJvb2sucnVsZUJvb2tbcnVsZV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Bvc3RWYWxpZGF0aW9uKCkgOiBudW1iZXIge1xyXG4gICAgICBub09mRXJyb3JzID0gMDtcclxuICAgICAgbm9PZldhcm5pbmdzID0gMDtcclxuXHJcbiAgICAgIF9BcnJheUNhbGwodGhpcy5faS5fc3VibWl0dGVkKS5mb3JFYWNoKChib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2spID0+IHtcclxuICAgICAgICBmb3IgKGxldCBydWxlIGluIGJvb2sucnVsZUJvb2spIHtcclxuICAgICAgICAgIGlmIChib29rLnJ1bGVCb29rLmhhc093blByb3BlcnR5KHJ1bGUpKSB7XHJcbiAgICAgICAgICAgIGlmIChib29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSAmJiBib29rLnJ1bGVCb29rW3J1bGVdLmFsZXJ0VHlwZSA9PT0gJ2Vycm9yJyAmJiAhYm9vay5ydWxlQm9va1tydWxlXS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgbm9PZkVycm9ycysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChib29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSAmJiBib29rLnJ1bGVCb29rW3J1bGVdLmFsZXJ0VHlwZSA9PT0gJ3dhcm5pbmcnICYmICFib29rLnJ1bGVCb29rW3J1bGVdLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICBub09mV2FybmluZ3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2kuX2VDb3VudCA9IG5vT2ZFcnJvcnM7XHJcbiAgICAgIHRoaXMuX2kuX3dDb3VudCA9IG5vT2ZXYXJuaW5ncztcclxuXHJcbiAgICAgIGlmICh0aGlzLl9pLl9wcm9wcy5mb3JtUG9zdCkge1xyXG4gICAgICAgIF9BZGRDbGFzcyh0aGlzLl9pLl9mb3JtIGFzIEhUTUxFbGVtZW50LCB0aGlzLl9pLl9wcm9wcy5mb3JtUG9zdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX21hbmFnZU1zZ3MoZmFsc2UpO1xyXG4gICAgICByZXR1cm4gdGhpcy5faS5fZUNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZhbGlkYXRlQWdhaW5zdFJ1bGUoXHJcbiAgICAgIHRoaXNWYWx1ZSA6IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIgfCBBcnJheSA8IG51bWJlciA+IHwgdW5kZWZpbmVkLFxyXG4gICAgICBib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2ssXHJcbiAgICAgIHJ1bGUgOiBzdHJpbmcpIDogYm9vbGVhbiB7XHJcblxyXG4gICAgICByZXR1cm4gQ29yZS5fTWV0aG9kc1tydWxlIGFzIHN0cmluZ10odGhpc1ZhbHVlLCBib29rLnJ1bGVCb29rW3J1bGVdLnBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsaWRhdGVFbGVtKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaykgOiB2b2lkIHtcclxuICAgICAgY3VycmVudFZhbHVlID0gX0VsZW1WYWx1ZShib29rKTtcclxuICAgICAgZm9yIChsZXQgcnVsZSBpbiBib29rLnJ1bGVCb29rKSB7XHJcbiAgICAgICAgaWYgKGJvb2sucnVsZUJvb2suaGFzT3duUHJvcGVydHkocnVsZSkpIHtcclxuICAgICAgICAgIGlmIChib29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSAmJiBib29rLnJ1bGVCb29rW3J1bGVdLnBhcmFtcykge1xyXG4gICAgICAgICAgICBib29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUFwcGxpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoYm9vay5pZikge1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZUFnYWluc3RSdWxlKF9FbGVtVmFsdWUoYm9vay5pZiksIGJvb2suaWYsICdyZXF1aXJlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBib29rLnJ1bGVCb29rW3J1bGVdLmlzVmFsaWQgPSB0aGlzLl92YWxpZGF0ZUFnYWluc3RSdWxlKGN1cnJlbnRWYWx1ZSwgYm9vaywgcnVsZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJvb2sucnVsZUJvb2tbcnVsZV0uaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGJvb2sucnVsZUJvb2tbcnVsZV0uaXNWYWxpZCA9IHRoaXMuX3ZhbGlkYXRlQWdhaW5zdFJ1bGUoY3VycmVudFZhbHVlLCBib29rLCBydWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWJvb2sucnVsZUJvb2tbcnVsZV0uaXNWYWxpZCAmJiAoQXJyYXkuaXNBcnJheShjdXJyZW50VmFsdWUpIHx8IHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgPyBjdXJyZW50VmFsdWUubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgOiBjdXJyZW50VmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPT09IDApICYmICFib29rLmlzUmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICBib29rLnJ1bGVCb29rW3J1bGVdLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zdWJtaXRFdmVudEZuKGtleSA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rW10sIG1vdXNlIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2tbXSwgZXZlbnQgOiBFdmVudCkgOiB2b2lkIHtcclxuXHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIF9BcnJheUNhbGwoa2V5KS5mb3JFYWNoKChib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2spID0+IHtcclxuICAgICAgICBpZiAodGhpcy5faS5fc3VibWl0dGVkICYmICFfSXNJbkNvbGxlY3Rpb24oYm9vaywgdGhpcy5faS5fc3VibWl0dGVkKSkge1xyXG4gICAgICAgICAgdGhpcy5faS5fc3VibWl0dGVkLnB1c2goYm9vayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29rLmlzUmVxdWlyZWQgfHwgX0lzSW5Db2xsZWN0aW9uKGJvb2ssIHRoaXMuX2kuX3N1Ym1pdHRlZCkpIHtcclxuICAgICAgICAgIGlmIChib29rLmlzUGFydE9mKSB7XHJcbiAgICAgICAgICAgIF9BcnJheUNhbGwoYm9vay5pc1BhcnRPZikuZm9yRWFjaCgobmFtZSA6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlRWxlbSh0aGlzLl9ib29rQ29sW25hbWVdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUVsZW0oYm9vayk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgX0FycmF5Q2FsbChtb3VzZSkuZm9yRWFjaCgoYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2kuX3N1Ym1pdHRlZCAmJiAhX0lzSW5Db2xsZWN0aW9uKGJvb2ssIHRoaXMuX2kuX3N1Ym1pdHRlZCkpIHtcclxuICAgICAgICAgIHRoaXMuX2kuX3N1Ym1pdHRlZC5wdXNoKGJvb2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9vay5pc1JlcXVpcmVkIHx8IF9Jc0luQ29sbGVjdGlvbihib29rLCB0aGlzLl9pLl9zdWJtaXR0ZWQpKSB7XHJcbiAgICAgICAgICBpZiAoYm9vay5pc1BhcnRPZikge1xyXG4gICAgICAgICAgICBfQXJyYXlDYWxsKGJvb2suaXNQYXJ0T2YpLmZvckVhY2goKG5hbWUgOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUVsZW0odGhpcy5fYm9va0NvbFtuYW1lXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVFbGVtKGJvb2spO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmICh0aGlzLl9wb3N0VmFsaWRhdGlvbigpID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fc3VibWl0SGFuZGxlcigpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9mb2N1c0V2ZW50Rm4oKSA6IHZvaWQge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYmx1ckV2ZW50Rm4oYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rLCBjb21pbmdGcm9tSWYgOiBib29sZWFuKSA6IHZvaWQge1xyXG4gICAgICBpZiAoKCFib29rLmlzQ2hlY2thYmxlICYmIChfSXNJbkNvbGxlY3Rpb24oYm9vaywgdGhpcy5faS5fc3VibWl0dGVkKSB8fCBib29rLmlzUmVxdWlyZWQpKSB8fCBjb21pbmdGcm9tSWYpIHtcclxuICAgICAgICBpZiAoYm9vay5pc1BhcnRPZikge1xyXG4gICAgICAgICAgX0FycmF5Q2FsbChib29rLmlzUGFydE9mKS5mb3JFYWNoKChuYW1lIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlRWxlbSh0aGlzLl9ib29rQ29sW25hbWVdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl92YWxpZGF0ZUVsZW0oYm9vayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Bvc3RWYWxpZGF0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9rZXl1cEV2ZW50Rm4oYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rLCBjb21pbmdGcm9tSWYgOiBib29sZWFuKSA6IHZvaWQge1xyXG4gICAgICBjb25zdCB0aGlzRXZlbnQgPSBldmVudCBhcyBLZXlib2FyZEV2ZW50O1xyXG4gICAgICBjb25zdCB0aGlzS2V5Y29kZSA9IHRoaXNFdmVudC53aGljaCB8fCB0aGlzRXZlbnQua2V5Q29kZTtcclxuICAgICAgaWYgKHRoaXNLZXljb2RlID09PSA5ICYmIF9FbGVtVmFsdWUoYm9vaykgPT09ICcnIHx8IF9BcnJheUNhbGwoX2V4Y2x1ZGVkS2V5cykuaW5jbHVkZXModGhpc0tleWNvZGUpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2UgaWYgKF9Jc0luQ29sbGVjdGlvbihib29rLCB0aGlzLl9pLl9zdWJtaXR0ZWQpIHx8IGNvbWluZ0Zyb21JZikge1xyXG4gICAgICAgIGlmIChib29rLmlzUGFydE9mKSB7XHJcbiAgICAgICAgICBfQXJyYXlDYWxsKGJvb2suaXNQYXJ0T2YpLmZvckVhY2goKG5hbWUgOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVFbGVtKHRoaXMuX2Jvb2tDb2xbbmFtZV0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlRWxlbShib29rKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcG9zdFZhbGlkYXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYm9vay5jYXJkRm9ybWF0dGluZy5pc0FwcGxpY2FibGUgJiYgYm9vay5ub2Rlcykge1xyXG4gICAgICAgIChib29rLm5vZGVzWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gX0Zvcm1hdENhcmQoX0VsZW1WYWx1ZShib29rKSwgYm9vay5jYXJkRm9ybWF0dGluZy5jaGFyYWN0ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfa2V5cHJlc3NFdmVudEZuKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaykgOiB2b2lkIHtcclxuICAgICAgY29uc3QgdGhpc0V2ZW50ID0gZXZlbnQgYXMgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgbGV0IGlzQ2Fwc0FjdGl2ZSA9ICFfQ2Fwc2xvY2tGbih0aGlzRXZlbnQpO1xyXG5cclxuICAgICAgaWYgKGlzQ2Fwc0FjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuX3Nob3dDYXBzTXNnKGJvb2spO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2NsZWFyQ2Fwc01zZyhib29rKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NsaWNrRXZlbnRGbihib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2ssIGNvbWluZ0Zyb21JZiA6IGJvb2xlYW4pIDogdm9pZCB7XHJcbiAgICAgIGlmIChfSXNJbkNvbGxlY3Rpb24oYm9vaywgdGhpcy5faS5fc3VibWl0dGVkKSB8fCBjb21pbmdGcm9tSWYpIHtcclxuICAgICAgICBpZiAoYm9vay5pc1BhcnRPZikge1xyXG4gICAgICAgICAgX0FycmF5Q2FsbChib29rLmlzUGFydE9mKS5mb3JFYWNoKChuYW1lIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlRWxlbSh0aGlzLl9ib29rQ29sW25hbWVdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl92YWxpZGF0ZUVsZW0oYm9vayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Bvc3RWYWxpZGF0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hdHRhY2hTdWJtaXQoYWRkT3JEZWxldGUgOiBib29sZWFuKSA6IHZvaWQge1xyXG4gICAgICBsZXQga2V5Ym9hcmRFbGVtZW50Qm9va3MgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9va1tdLFxyXG4gICAgICBtb3VzZUVsZW1lbnRCb29rcyA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rW107XHJcbiAgICAgIGlmICh0aGlzLl9pLl9mb3JtICYmIHRoaXMuX2kuX2VsZW1HcnBzKSB7XHJcbiAgICAgICAga2V5Ym9hcmRFbGVtZW50Qm9va3MgPSB0aGlzLl9pLl9lbGVtR3Jwcy5rZXlUeXBlcztcclxuICAgICAgICBtb3VzZUVsZW1lbnRCb29rcyA9IHRoaXMuX2kuX2VsZW1HcnBzLmNsaWNrVHlwZXM7XHJcbiAgICAgICAgaWYgKGFkZE9yRGVsZXRlKSB7XHJcbiAgICAgICAgICB0aGlzLl9zdWJtaXRDbG9zdXJlID0gdGhpc1xyXG4gICAgICAgICAgICAuX3N1Ym1pdEV2ZW50Rm5cclxuICAgICAgICAgICAgLmJpbmQodGhpcywga2V5Ym9hcmRFbGVtZW50Qm9va3MsIG1vdXNlRWxlbWVudEJvb2tzKTtcclxuICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgLl9pXHJcbiAgICAgICAgICAgIC5fZm9ybVxyXG4gICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5fc3VibWl0Q2xvc3VyZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgLl9pXHJcbiAgICAgICAgICAgIC5fZm9ybVxyXG4gICAgICAgICAgICAucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5fc3VibWl0Q2xvc3VyZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LCBmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLl9zdWJtaXRDbG9zdXJlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYXR0YWNoS2V5RXZlbnRzKFxyXG4gICAgICBub2RlcyA6IE5vZGVMaXN0T2YgPCBFbGVtZW50ID4gfCB1bmRlZmluZWQsXHJcbiAgICAgIGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vayxcclxuICAgICAgYWRkT3JEZWxldGUgOiBib29sZWFuLFxyXG4gICAgICBjb21pbmdGcm9tSWYgOiBib29sZWFuKSA6IHZvaWQge1xyXG5cclxuICAgICAgaWYgKG5vZGVzKSB7XHJcbiAgICAgICAgX0FycmF5Q2FsbChub2RlcykuZm9yRWFjaCgoZWxlbSA6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAoYWRkT3JEZWxldGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZm9jdXNDbG9zdXJlID0gdGhpc1xyXG4gICAgICAgICAgICAgIC5fZm9jdXNFdmVudEZuXHJcbiAgICAgICAgICAgICAgLmJpbmQodGhpcywgZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLl9ibHVyQ2xvc3VyZSA9IHRoaXNcclxuICAgICAgICAgICAgICAuX2JsdXJFdmVudEZuXHJcbiAgICAgICAgICAgICAgLmJpbmQodGhpcywgYm9vaywgY29taW5nRnJvbUlmLCBldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2tleXVwQ2xvc3VyZSA9IHRoaXNcclxuICAgICAgICAgICAgICAuX2tleXVwRXZlbnRGblxyXG4gICAgICAgICAgICAgIC5iaW5kKHRoaXMsIGJvb2ssIGNvbWluZ0Zyb21JZiwgZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLl9rZXlwcmVzc0Nsb3N1cmUgPSB0aGlzXHJcbiAgICAgICAgICAgICAgLl9rZXlwcmVzc0V2ZW50Rm5cclxuICAgICAgICAgICAgICAuYmluZCh0aGlzLCBib29rLCBldmVudCk7XHJcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9mb2N1c0Nsb3N1cmUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCk7XHJcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX2JsdXJDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fa2V5dXBDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgICBpZiAoYm9vay5jYXBzbG9ja0NoZWNrLmlzQXBwbGljYWJsZSkge1xyXG4gICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9rZXlwcmVzc0Nsb3N1cmUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9mb2N1c0Nsb3N1cmUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCk7XHJcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX2JsdXJDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fa2V5dXBDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgICBpZiAoYm9vay5jYXBzbG9ja0NoZWNrLmlzQXBwbGljYWJsZSkge1xyXG4gICAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9rZXlwcmVzc0Nsb3N1cmUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2F0dGFjaE1vdXNlRXZlbnRzKFxyXG4gICAgICBub2RlcyA6IE5vZGVMaXN0T2YgPCBFbGVtZW50ID4gfCB1bmRlZmluZWQsXHJcbiAgICAgIGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vayxcclxuICAgICAgYWRkT3JEZWxldGUgOiBib29sZWFuLFxyXG4gICAgICBjb21pbmdGcm9tSWYgOiBib29sZWFuKSA6IHZvaWQge1xyXG5cclxuICAgICAgaWYgKG5vZGVzKSB7XHJcbiAgICAgICAgX0FycmF5Q2FsbChub2RlcykuZm9yRWFjaCgoZWxlbSA6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAoYWRkT3JEZWxldGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2xpY2tDbG9zdXJlID0gdGhpc1xyXG4gICAgICAgICAgICAgIC5fY2xpY2tFdmVudEZuXHJcbiAgICAgICAgICAgICAgLmJpbmQodGhpcywgYm9vaywgY29taW5nRnJvbUlmLCBldmVudCk7XHJcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja0Nsb3N1cmUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYXR0YWNoRXZlbnRzKGFkZE9yRGVsZXRlIDogYm9vbGVhbikgOiB2b2lkIHtcclxuICAgICAgbGV0IGtleWJvYXJkRWxlbWVudEJvb2tzIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2tbXSxcclxuICAgICAgbW91c2VFbGVtZW50Qm9va3MgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9va1tdO1xyXG4gICAgICBpZiAodGhpcy5faS5fZWxlbUdycHMpIHtcclxuICAgICAgICBrZXlib2FyZEVsZW1lbnRCb29rcyA9IHRoaXMuX2kuX2VsZW1HcnBzLmtleVR5cGVzO1xyXG4gICAgICAgIG1vdXNlRWxlbWVudEJvb2tzID0gdGhpcy5faS5fZWxlbUdycHMuY2xpY2tUeXBlcztcclxuICAgICAgICBfQXJyYXlDYWxsKGtleWJvYXJkRWxlbWVudEJvb2tzKS5mb3JFYWNoKChib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2ssIGluZGV4IDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9hdHRhY2hLZXlFdmVudHMoYm9vay5ub2RlcywgYm9vaywgYWRkT3JEZWxldGUsIGZhbHNlKTtcclxuICAgICAgICAgIGlmIChib29rLmlmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaEtleUV2ZW50cyhib29rLmlmLm5vZGVzLCBib29rLCBhZGRPckRlbGV0ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIWFkZE9yRGVsZXRlICYmIGluZGV4ID09PSBrZXlib2FyZEVsZW1lbnRCb29rcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzQ2xvc3VyZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYmx1ckNsb3N1cmUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2tleXVwQ2xvc3VyZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fa2V5cHJlc3NDbG9zdXJlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF9BcnJheUNhbGwobW91c2VFbGVtZW50Qm9va3MpLmZvckVhY2goKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaywgaW5kZXggOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuX2F0dGFjaE1vdXNlRXZlbnRzKGJvb2subm9kZXMsIGJvb2ssIGFkZE9yRGVsZXRlLCBmYWxzZSk7XHJcbiAgICAgICAgICBpZiAoYm9vay5pZikge1xyXG4gICAgICAgICAgICB0aGlzLl9hdHRhY2hNb3VzZUV2ZW50cyhib29rLmlmLm5vZGVzLCBib29rLCBhZGRPckRlbGV0ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIWFkZE9yRGVsZXRlICYmIGluZGV4ID09PSBtb3VzZUVsZW1lbnRCb29rcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWNrQ2xvc3VyZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9jcmVhdGVFbGVtZW50Qm9vayhcclxuICAgICAgbmFtZSA6IHN0cmluZyxcclxuICAgICAgYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rLFxyXG4gICAgICBpc0NvbWluZ0Zyb21JZiA6IGJvb2xlYW4pIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2sge1xyXG5cclxuICAgICAgbGV0IHJ1bGVzSlNPTiA6IHN0cmluZyB8IG9iamVjdCB8IG51bGwsXHJcbiAgICAgICAgdGhpc0VsZW1lbnQgOiBIVE1MRWxlbWVudCxcclxuICAgICAgICB0aGlzRWxlbWVudFRhZyA6IHN0cmluZyxcclxuICAgICAgICB0aGlzRWxlbWVudFR5cGUgOiBzdHJpbmcsXHJcbiAgICAgICAgY2FyZEZvcm1hdCA6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgY2Fwc2xvY2tDaGVjayA6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgYWxlcnRDb250YWluZXIgOiBFbGVtZW50IHwgbnVsbDtcclxuXHJcbiAgICAgIGJvb2submFtZSA9IG5hbWU7XHJcbiAgICAgIGlmICh0aGlzLl9pLl9mb3JtKSB7XHJcbiAgICAgICAgYm9vay5ub2RlcyA9IHRoaXNcclxuICAgICAgICAgIC5faVxyXG4gICAgICAgICAgLl9mb3JtXHJcbiAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9JyArIF9Fc2NDc3NNZXRhKG5hbWUpICsgJ10nKTtcclxuICAgICAgICB0aGlzRWxlbWVudCA9IChib29rLm5vZGVzW2Jvb2subm9kZXMubGVuZ3RoIC0gMV0gYXMgSFRNTEVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzRWxlbWVudFRhZyA9ICh0aGlzRWxlbWVudC50YWdOYW1lIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHRoaXNFbGVtZW50VHlwZSA9ICh0aGlzRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSB8fCAnJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBib29rLnRhZ05hbWUgPSB0aGlzRWxlbWVudFRhZztcclxuICAgICAgICBib29rLnRhZ1R5cGUgPSB0aGlzRWxlbWVudFR5cGU7XHJcbiAgICAgICAgYm9vay5wYXJlbnQgPSBfTmVhcmVzdFBhcmVudCh0aGlzRWxlbWVudCwgJ1tkYXRhLXNhbmF0aW9wYXJlbnRdJyk7XHJcblxyXG4gICAgICAgIGFsZXJ0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2FuYXRpb2FsZXJ0PScgKyB0aGlzRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSArICddJyk7XHJcbiAgICAgICAgaWYgKGFsZXJ0Q29udGFpbmVyKSB7XHJcbiAgICAgICAgICBib29rLmNvbnRhaW5lciA9IGFsZXJ0Q29udGFpbmVyIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FyZEZvcm1hdCA9IHRoaXNFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zYW5hdGlvY2FyZGZvcm1hdCcpIHx8IG51bGw7XHJcbiAgICAgICAgaWYgKGNhcmRGb3JtYXQpIHtcclxuICAgICAgICAgIGJvb2suY2FyZEZvcm1hdHRpbmcuaXNBcHBsaWNhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIGJvb2suY2FyZEZvcm1hdHRpbmcuY2hhcmFjdGVyID0gY2FyZEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2Fwc2xvY2tDaGVjayA9IHRoaXNFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zYW5hdGlvY2Fwc2xvY2snKSB8fCBudWxsO1xyXG4gICAgICAgIGlmIChjYXBzbG9ja0NoZWNrKSB7XHJcbiAgICAgICAgICBib29rLmNhcHNsb2NrQ2hlY2suaXNBcHBsaWNhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIGJvb2suY2Fwc2xvY2tDaGVjay5tZXNzYWdlID0gY2Fwc2xvY2tDaGVjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJvb2suaXNDaGVja2FibGUgPSAodGhpc0VsZW1lbnRUeXBlID09PSAncmFkaW8nIHx8IHRoaXNFbGVtZW50VHlwZSA9PT0gJ2NoZWNrYm94JylcclxuICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgOiBmYWxzZTtcclxuICAgICAgICBib29rLmlzQ2xpY2thYmxlID0gKFxyXG4gICAgICAgICAgdGhpc0VsZW1lbnRUeXBlID09PSAncmFkaW8nIHx8XHJcbiAgICAgICAgICB0aGlzRWxlbWVudFR5cGUgPT09ICdjaGVja2JveCcgfHxcclxuICAgICAgICAgIHRoaXNFbGVtZW50VHlwZSA9PT0gJ2ZpbGUnIHx8XHJcbiAgICAgICAgICB0aGlzRWxlbWVudFRhZyA9PT0gJ3NlbGVjdCcpXHJcbiAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgIDogZmFsc2U7XHJcbiAgICAgICAgYm9vay5pc1NlbGVjdCA9IHRoaXNFbGVtZW50VGFnID09PSAnc2VsZWN0J1xyXG4gICAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgIGJvb2suaGFzQ29udGVudEVkaXRhYmxlID0gdGhpc0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKVxyXG4gICAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgIC8vIFRPRE86IENvbXBhdGliaWxpdHkgY2hlY2sgZm9yIGljb25zXHJcbiAgICAgICAgYm9vay5pc0ljb25BcHBsaWNhYmxlID0gdGhpc0VsZW1lbnRUYWcgPT09ICdpbnB1dCcgJiYgX0FycmF5Q2FsbChfZWxlbWVudHNTdXBwb3J0aW5nSWNvbnMpLmluY2x1ZGVzKHRoaXNFbGVtZW50VHlwZSk7XHJcblxyXG4gICAgICAgIGJvb2sucnVsZUJvb2sgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KENvcmUuX1J1bGVCb29rKSk7XHJcbiAgICAgICAgcnVsZXNKU09OID0gdGhpc0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNhbmF0aW9lbGVtZW50Jyk7XHJcbiAgICAgICAgaWYgKHJ1bGVzSlNPTikge1xyXG4gICAgICAgICAgcnVsZXNKU09OID0gSlNPTi5wYXJzZShydWxlc0pTT04ucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKSk7XHJcbiAgICAgICAgICBfQXJyYXlDYWxsKHJ1bGVzSlNPTikuZXZlcnkoKHJ1bGVSZWYgOiBTYW5hdGlvSW50ZXJmYWNlcy5DdXN0b21Qcm9wc0VsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJ1bGVSZWYucnVsZSA9PT0gJ3JlcXVpcmVkJykge1xyXG4gICAgICAgICAgICAgIGJvb2suaXNSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBfQXJyYXlDYWxsKHJ1bGVzSlNPTikuZm9yRWFjaCgocnVsZVJlZiA6IFNhbmF0aW9JbnRlcmZhY2VzLkN1c3RvbVByb3BzRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBib29rLnJ1bGVCb29rW3J1bGVSZWYucnVsZV0uaXNSdWxlQXZhaWxhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgYm9vay5ydWxlQm9va1tydWxlUmVmLnJ1bGVdLmFsZXJ0VHlwZSA9IF9UcmltRm4oKHJ1bGVSZWYuYWxlcnRUeXBlIHx8ICcnKS50b1N0cmluZygpKS5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgICAgPyBydWxlUmVmLmFsZXJ0VHlwZSA9PT0gJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgICA/ICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICAgOiAnZXJyb3InXHJcbiAgICAgICAgICAgICAgOiAnZXJyb3InO1xyXG4gICAgICAgICAgICBib29rLnJ1bGVCb29rW3J1bGVSZWYucnVsZV0ubWVzc2FnZSA9IF9UcmltRm4oKHJ1bGVSZWYubWVzc2FnZSB8fCAnJykudG9TdHJpbmcoKSkubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgID8gX0Zvcm1hdE1zZyhydWxlUmVmLm1lc3NhZ2UsIHJ1bGVSZWYudmFsdWUpXHJcbiAgICAgICAgICAgICAgOiBfRm9ybWF0TXNnKENvcmUuX01lc3NhZ2VzW3J1bGVSZWYucnVsZV0sIHJ1bGVSZWYudmFsdWUpO1xyXG4gICAgICAgICAgICBib29rLnJ1bGVCb29rW3J1bGVSZWYucnVsZV0ucGFyYW1zID0gcnVsZVJlZi52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHJ1bGVSZWYuaWYpIHtcclxuICAgICAgICAgICAgICBsZXQgaWZFbGVtZW50Qm9vayA9IHRoaXMuX2NyZWF0ZUVsZW1lbnRCb29rKHJ1bGVSZWYuaWYsIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2RlZmF1bHRFbGVtZW50Qm9vaykpLCB0cnVlKTtcclxuICAgICAgICAgICAgICBpZiAoaWZFbGVtZW50Qm9vaykge1xyXG4gICAgICAgICAgICAgICAgYm9vay5pZiA9IGlmRWxlbWVudEJvb2s7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0NvbWluZ0Zyb21JZikge1xyXG4gICAgICAgICAgYm9vay5ydWxlQm9va1sncmVxdWlyZWQnXS5wYXJhbXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXNFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykgfHxcclxuICAgICAgICAgIF9BcnJheUNhbGwoX2VsZW1lbnRzRm9yS2V5Ym9hcmRFdmVudHMpLmluY2x1ZGVzKHRoaXNFbGVtZW50VGFnKSB8fFxyXG4gICAgICAgICAgX0FycmF5Q2FsbChfZWxlbWVudHNGb3JLZXlib2FyZEV2ZW50cykuaW5jbHVkZXModGhpc0VsZW1lbnRUeXBlKSkge1xyXG5cclxuICAgICAgICAgIGJvb2sua2V5VHlwZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfQXJyYXlDYWxsKF9lbGVtZW50c0Zvck1vdXNlRXZlbnRzKS5pbmNsdWRlcyh0aGlzRWxlbWVudFRhZykgfHwgX0FycmF5Q2FsbChfZWxlbWVudHNGb3JNb3VzZUV2ZW50cykuaW5jbHVkZXModGhpc0VsZW1lbnRUeXBlKSkge1xyXG4gICAgICAgICAgYm9vay5jbGlja1R5cGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYm9vaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9mb3JtRWxlbUJvb2tzKGFsbEVsZW1lbnRzIDogTm9kZUxpc3RPZiA8IEVsZW1lbnQgPiwgYWxsR3JvdXBzIDogQXJyYXkgPEFycmF5IDxzdHJpbmc+PikgOiB2b2lkIHtcclxuICAgICAgbGV0IGVsZW1lbnROYW1lcyA6IHN0cmluZ1tdID0gW10sXHJcbiAgICAgICAga2V5Ym9hcmRFbGVtZW50Qm9va3MgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9va1tdID0gW10sXHJcbiAgICAgICAgbW91c2VFbGVtZW50Qm9va3MgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9va1tdID0gW10sXHJcbiAgICAgICAgYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rLFxyXG4gICAgICAgIHBhcnRPZkdyb3VwIDogQXJyYXkgPHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICAgIF9BcnJheUNhbGwoYWxsRWxlbWVudHMpLmZvckVhY2goKGVsZW1lbnQgOiBFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudE5hbWVzLnB1c2goZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fCAnJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBlbGVtZW50TmFtZXMgPSBlbGVtZW50TmFtZXNcclxuICAgICAgICAuc29ydCgpXHJcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgcG9zaXRpb24sIGFycmF5KSB7XHJcbiAgICAgICAgICByZXR1cm4gIXBvc2l0aW9uIHx8IGl0ZW0gIT09IGFycmF5W3Bvc2l0aW9uIC0gMV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIF9BcnJheUNhbGwoZWxlbWVudE5hbWVzKS5mb3JFYWNoKChuYW1lIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgYm9vayA9IHRoaXMuX2NyZWF0ZUVsZW1lbnRCb29rKG5hbWUsIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2RlZmF1bHRFbGVtZW50Qm9vaykpLCBmYWxzZSk7XHJcbiAgICAgICAgX0FycmF5Q2FsbChhbGxHcm91cHMpLmV2ZXJ5KChhcnIgOiBBcnJheTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICBpZiAoX0FycmF5Q2FsbChhcnIpLmZpbHRlcigodGhpc05hbWUgOiBzdHJpbmcpID0+IHRoaXNOYW1lID09PSBib29rLm5hbWUpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcGFydE9mR3JvdXAgPSBhcnI7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChwYXJ0T2ZHcm91cC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBib29rLmlzUGFydE9mID0gcGFydE9mR3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29rLmtleVR5cGUpIHtcclxuICAgICAgICAgIGtleWJvYXJkRWxlbWVudEJvb2tzLnB1c2goYm9vayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29rLmNsaWNrVHlwZSkge1xyXG4gICAgICAgICAgbW91c2VFbGVtZW50Qm9va3MucHVzaChib29rKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYm9va0NvbFtuYW1lXSA9IGJvb2s7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5faS5fZWxlbUdycHMua2V5VHlwZXMgPSBrZXlib2FyZEVsZW1lbnRCb29rcztcclxuICAgICAgdGhpcy5faS5fZWxlbUdycHMuY2xpY2tUeXBlcyA9IG1vdXNlRWxlbWVudEJvb2tzO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldEVsZW0oKSA6IHZvaWQge1xyXG4gICAgICBpZiAodGhpcy5faS5fZm9ybSkge1xyXG4gICAgICAgIGNvbnN0IGFsbEVsZW1lbnRzIDogTm9kZUxpc3RPZiA8IEVsZW1lbnQgPiA9IHRoaXNcclxuICAgICAgICAgIC5faVxyXG4gICAgICAgICAgLl9mb3JtXHJcbiAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2FuYXRpb2VsZW1lbnRdJyksXHJcbiAgICAgICAgICBhbGxHcm91cHNEZWYgOiBOb2RlTGlzdE9mIDwgRWxlbWVudCA+ID0gdGhpcy5faS5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zYW5hdGlvZ3JvdXBdJyk7XHJcbiAgICAgICAgbGV0IGFsbEdyb3VwcyA6IEFycmF5IDxBcnJheSA8c3RyaW5nPj4gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGFsbEdyb3Vwc0RlZikge1xyXG4gICAgICAgICAgX0FycmF5Q2FsbChhbGxHcm91cHNEZWYpLmZvckVhY2goKGVsZW1lbnQgOiBFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBncm91cEVsZW1OYW1lcyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNhbmF0aW9ncm91cCcpO1xyXG4gICAgICAgICAgICBpZiAoZ3JvdXBFbGVtTmFtZXMpIHtcclxuICAgICAgICAgICAgICBncm91cEVsZW1OYW1lcyA9IEpTT04ucGFyc2UoZ3JvdXBFbGVtTmFtZXMpO1xyXG4gICAgICAgICAgICAgIGlmIChncm91cEVsZW1OYW1lcyAmJiBBcnJheS5pc0FycmF5KGdyb3VwRWxlbU5hbWVzKSkge1xyXG4gICAgICAgICAgICAgICAgYWxsR3JvdXBzLnB1c2goZ3JvdXBFbGVtTmFtZXMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9mb3JtRWxlbUJvb2tzKGFsbEVsZW1lbnRzLCBhbGxHcm91cHMpO1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaEV2ZW50cyh0cnVlKTtcclxuICAgICAgICB0aGlzLl9hdHRhY2hTdWJtaXQodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXQoKSA6IHZvaWQge1xyXG4gICAgICAgIGxldCBjdXN0b21Qcm9wcyA6IFNhbmF0aW9JbnRlcmZhY2VzLkN1c3RvbVByb3BzSFRNTCB8IHVuZGVmaW5lZCxcclxuICAgICAgICBjdXN0b21Qcm9wc0F0dHIgOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICBpZiAodGhpcy5faS5fZm9ybSkge1xyXG4gICAgICAgIHRoaXNcclxuICAgICAgICAgIC5faVxyXG4gICAgICAgICAgLl9mb3JtXHJcbiAgICAgICAgICAuc2V0QXR0cmlidXRlKCdub3ZhbGlkYXRlJywgJ25vdmFsaWRhdGUnKTtcclxuICAgICAgICBjdXN0b21Qcm9wc0F0dHIgPSB0aGlzXHJcbiAgICAgICAgICAuX2lcclxuICAgICAgICAgIC5fZm9ybVxyXG4gICAgICAgICAgLmdldEF0dHJpYnV0ZSgnZGF0YS1zYW5hdGlvY3VzdG9tJyk7XHJcbiAgICAgICAgaWYgKGN1c3RvbVByb3BzQXR0ciAmJiBfVHJpbUZuKGN1c3RvbVByb3BzQXR0cikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY3VzdG9tUHJvcHMgPSBKU09OLnBhcnNlKGN1c3RvbVByb3BzQXR0cik7XHJcbiAgICAgICAgICBpZiAoY3VzdG9tUHJvcHMpIHtcclxuICAgICAgICAgICAgdGhpcy5faS5fcHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgZm9ybVByZTogY3VzdG9tUHJvcHMuZm9ybVZhbGlkYXRpb25DbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBmb3JtUG9zdDogY3VzdG9tUHJvcHMuZm9ybVBvc3RWYWxpZGF0aW9uQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgcGFyZW50UzogY3VzdG9tUHJvcHMucGFyZW50U3VjY2Vzc0NsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICAgIHBhcmVudEU6IGN1c3RvbVByb3BzLnBhcmVudEVycm9yQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgcGFyZW50VzogY3VzdG9tUHJvcHMucGFyZW50V2FybmluZ0NsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICAgIGljb25TOiBjdXN0b21Qcm9wcy5pY29uU3VjY2Vzc0NsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICAgIGljb25FOiBjdXN0b21Qcm9wcy5pY29uRXJyb3JDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBpY29uVzogY3VzdG9tUHJvcHMuaWNvbldhcm5pbmdDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBlbGVtUzogY3VzdG9tUHJvcHMuZWxlbWVudFN1Y2Nlc3NDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBlbGVtRTogY3VzdG9tUHJvcHMuZWxlbWVudEVycm9yQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgZWxlbVc6IGN1c3RvbVByb3BzLmVsZW1lbnRXYXJuaW5nQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgbXNnUzogY3VzdG9tUHJvcHMubWVzc2FnZVN1Y2Nlc3NDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBtc2dFOiBjdXN0b21Qcm9wcy5tZXNzYWdlRXJyb3JDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBtc2dXOiBjdXN0b21Qcm9wcy5tZXNzYWdlV2FybmluZ0NsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICAgIGVsZW06IGN1c3RvbVByb3BzLmFsZXJ0RWxlbWVudCB8fCAnZGl2JyxcclxuICAgICAgICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgY3VzdG9tUHJvcHMuY29udGFpbmVyKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VzdG9tUHJvcHMgJiYgY3VzdG9tUHJvcHMuZm9ybVZhbGlkYXRpb25DbGFzcykge1xyXG4gICAgICAgICAgX0FkZENsYXNzKHRoaXMuX2kuX2Zvcm0gYXMgSFRNTEVsZW1lbnQsIGN1c3RvbVByb3BzLmZvcm1WYWxpZGF0aW9uQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9nZXRFbGVtKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQ29yZS5fYWRkUnVsZShCYW5rY2FyZFJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShEYXRlUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKERhdGVJU09SdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoRGlnaXRzUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKEVtYWlsUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKEVxdWFsc1RvUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKE1heFJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShNYXhMZW5ndGhSdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoTWF4T3B0aW9uc1J1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShNaW5SdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoTWluTGVuZ3RoUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKE1pbk9wdGlvbnNSdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoTnVtYmVyUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKE5vdEVxdWFsc1RvLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoUGF0dGVyblJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShSYW5nZVJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShSYW5nZUxlbmd0aFJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShSYW5nZU9wdGlvbnNSdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoUmVxdWlyZWRSdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoU3RlcFJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShVUkxSdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Db3JlLnRzIiwiaW1wb3J0IHsgU2FuYXRpb0ludGVyZmFjZXMgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xyXG5leHBvcnQgbmFtZXNwYWNlIFNhbmF0aW9Db25zdGFudHMge1xyXG4gIGxldCB2YWwgOiBhbnksXHJcbiAgICBpZHggOiBhbnk7XHJcbiAgbGV0IGN1cnJlbnRWYWx1ZSxcclxuICAgIG1hdGNoZXMsXHJcbiAgICBtYXRjaCxcclxuICAgIHBhcnRzLFxyXG4gICAgY291bnQsXHJcbiAgICB2YWx1ZUxlbmd0aDtcclxuICBsZXQga2V5Q29kZSxcclxuICAgIHNoaWZ0S2V5O1xyXG4gIGV4cG9ydCBjb25zdCBfUnVsZVJlZiA6IFNhbmF0aW9JbnRlcmZhY2VzLlJ1bGVSZWZlcmVuY2UgPSB7XHJcbiAgICBpc1J1bGVBdmFpbGFibGU6IGZhbHNlLFxyXG4gICAgaXNSdWxlQXBwbGllZDogZmFsc2UsXHJcbiAgICBhbGVydFR5cGU6ICcnLFxyXG4gICAgaXNWYWxpZDogZmFsc2UsXHJcbiAgICBtZXNzYWdlOiAnJyxcclxuICAgIHBhcmFtczogJydcclxuICB9O1xyXG4gIGV4cG9ydCBjb25zdCBfTWV0aG9kQm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLk1ldGhvZEJvb2sgPSB7fTtcclxuICBleHBvcnQgY29uc3QgX01lc3NhZ2VCb29rIDogU2FuYXRpb0ludGVyZmFjZXMuTWVzc2FnZUJvb2sgPSB7fTtcclxuICBleHBvcnQgY29uc3QgX1J1bGVCb29rIDogU2FuYXRpb0ludGVyZmFjZXMuUnVsZUJvb2sgPSB7fTtcclxuICBleHBvcnQgY29uc3QgX0VsZW1Cb29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2sgPSB7XHJcbiAgICBpZjogdW5kZWZpbmVkLFxyXG4gICAgaXNDaGVja2FibGU6IGZhbHNlLFxyXG4gICAgaXNDbGlja2FibGU6IGZhbHNlLFxyXG4gICAgaXNJY29uQXBwbGljYWJsZTogZmFsc2UsXHJcbiAgICBpc1NlbGVjdDogZmFsc2UsXHJcbiAgICBpc1JlcXVpcmVkOiBmYWxzZSxcclxuICAgIGNhcmRGb3JtYXR0aW5nOiB7XHJcbiAgICAgIGlzQXBwbGljYWJsZTogZmFsc2UsXHJcbiAgICAgIGNoYXJhY3RlcjogJydcclxuICAgIH0sXHJcbiAgICBjYXBzbG9ja0NoZWNrOiB7XHJcbiAgICAgIGlzQXBwbGljYWJsZTogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2U6ICcnXHJcbiAgICB9LFxyXG4gICAgaGFzQ29udGVudEVkaXRhYmxlOiBmYWxzZSxcclxuICAgIG5hbWU6ICcnLFxyXG4gICAgbm9kZXM6IHVuZGVmaW5lZCxcclxuICAgIHBhcmVudDogdW5kZWZpbmVkLFxyXG4gICAgY29udGFpbmVyOiB1bmRlZmluZWQsXHJcbiAgICBydWxlQm9vazogX1J1bGVCb29rLFxyXG4gICAgdGFnTmFtZTogJycsXHJcbiAgICB0YWdUeXBlOiAnJyxcclxuICAgIGtleVR5cGU6IGZhbHNlLFxyXG4gICAgY2xpY2tUeXBlOiBmYWxzZSxcclxuICAgIGlzUGFydE9mOiB1bmRlZmluZWRcclxuICB9O1xyXG4gIGV4cG9ydCBjb25zdCBfSW5zdGFuY2UgOiBTYW5hdGlvSW50ZXJmYWNlcy5Gb3JtSW5zdGFuY2UgPSB7XHJcbiAgICBfZm9ybTogdW5kZWZpbmVkLFxyXG4gICAgX3Byb3BzOiB7XHJcbiAgICAgIGZvcm1QcmU6ICcnLFxyXG4gICAgICBmb3JtUG9zdDogJycsXHJcbiAgICAgIHBhcmVudFM6ICcnLFxyXG4gICAgICBwYXJlbnRFOiAnJyxcclxuICAgICAgcGFyZW50VzogJycsXHJcbiAgICAgIGljb25TOiAnJyxcclxuICAgICAgaWNvbkU6ICcnLFxyXG4gICAgICBpY29uVzogJycsXHJcbiAgICAgIGVsZW1TOiAnJyxcclxuICAgICAgZWxlbUU6ICcnLFxyXG4gICAgICBlbGVtVzogJycsXHJcbiAgICAgIG1zZ1M6ICcnLFxyXG4gICAgICBtc2dFOiAnJyxcclxuICAgICAgbXNnVzogJycsXHJcbiAgICAgIGVsZW06ICdkaXYnLFxyXG4gICAgICBjb250YWluZXI6IG51bGxcclxuICAgIH0sXHJcbiAgICBfZWxlbUdycHM6IHtcclxuICAgICAga2V5VHlwZXM6IFtdLFxyXG4gICAgICBjbGlja1R5cGVzOiBbXVxyXG4gICAgfSxcclxuICAgIF9zdWJtaXR0ZWQ6IFtdLFxyXG4gICAgX2VDb3VudDogMCxcclxuICAgIF93Q291bnQ6IDBcclxuICB9O1xyXG4gIGV4cG9ydCBjb25zdCBfS2V5RWxlbSA6IHN0cmluZ1tdID0gW1xyXG4gICAgJ3RleHQnLFxyXG4gICAgJ3Bhc3N3b3JkJyxcclxuICAgICdjb2xvcicsXHJcbiAgICAnZGF0ZScsXHJcbiAgICAnZGF0ZXRpbWUtbG9jYWwnLFxyXG4gICAgJ2VtYWlsJyxcclxuICAgICdtb250aCcsXHJcbiAgICAnbnVtYmVyJyxcclxuICAgICdyYW5nZScsXHJcbiAgICAnc2VhcmNoJyxcclxuICAgICd0ZWwnLFxyXG4gICAgJ3RpbWUnLFxyXG4gICAgJ3VybCcsXHJcbiAgICAnd2VlaycsXHJcbiAgICAncmFkaW8nLFxyXG4gICAgJ2NoZWNrYm94JyxcclxuICAgICdmaWxlJyxcclxuICAgICdidXR0b24nLFxyXG4gICAgJ3NlbGVjdCcsXHJcbiAgICAndGV4dGFyZWEnLFxyXG4gICAgJ2NvbnRlbnRlZGl0YWJsZSdcclxuICBdO1xyXG4gIGV4cG9ydCBjb25zdCBfTW91c2VFbGVtIDogc3RyaW5nW10gPSBbJ3JhZGlvJywgJ2NoZWNrYm94JywgJ2ZpbGUnLCAnc2VsZWN0J107XHJcbiAgLyogQXZvaWQgcmV2YWxpZGF0ZSB0aGUgZmllbGQgd2hlbiBwcmVzc2luZyBvbmUgb2YgdGhlIGZvbGxvd2luZyBrZXlzXHJcbiAgICAgICogU2hpZnQgICAgICAgPT4gMTZcclxuICAgICAgKiBDdHJsICAgICAgICA9PiAxN1xyXG4gICAgICAqIEFsdCAgICAgICAgID0+IDE4XHJcbiAgICAgICogQ2FwcyBsb2NrICAgPT4gMjBcclxuICAgICAgKiBFbmQgICAgICAgICA9PiAzNVxyXG4gICAgICAqIEhvbWUgICAgICAgID0+IDM2XHJcbiAgICAgICogTGVmdCBhcnJvdyAgPT4gMzdcclxuICAgICAgKiBVcCBhcnJvdyAgICA9PiAzOFxyXG4gICAgICAqIFJpZ2h0IGFycm93ID0+IDM5XHJcbiAgICAgICogRG93biBhcnJvdyAgPT4gNDBcclxuICAgICAgKiBJbnNlcnQgICAgICA9PiA0NVxyXG4gICAgICAqIE51bSBsb2NrICAgID0+IDE0NFxyXG4gICAgICAqIEFsdEdyIGtleSAgID0+IDIyNVxyXG4gICAgICAqL1xyXG4gIGV4cG9ydCBjb25zdCBfZXhjbHVkZWRLZXlzIDogbnVtYmVyW10gPSBbXHJcbiAgICAxNixcclxuICAgIDE3LFxyXG4gICAgMTgsXHJcbiAgICAyMCxcclxuICAgIDM1LFxyXG4gICAgMzYsXHJcbiAgICAzNyxcclxuICAgIDM4LFxyXG4gICAgMzksXHJcbiAgICA0MCxcclxuICAgIDQ1LFxyXG4gICAgMTQ0LFxyXG4gICAgMjI1XHJcbiAgXTtcclxuICBleHBvcnQgY29uc3QgX0ljb25pY0VsZW0gOiBzdHJpbmdbXSA9IFsndGV4dCcsICdwYXNzd29yZCddO1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gZGV0ZWN0IHRoZSBjYXBzbG9jayBrZXlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnRcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX0NhcHNsb2NrRm4gOiBGdW5jdGlvbiA9IGZ1bmN0aW9uIChldmVudCA6IEtleWJvYXJkRXZlbnQpIDogYm9vbGVhbiB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAga2V5Q29kZSA9IGV2ZW50LmtleUNvZGVcclxuICAgICAgICA/IGV2ZW50LmtleUNvZGVcclxuICAgICAgICA6IGV2ZW50LndoaWNoO1xyXG4gICAgICBzaGlmdEtleSA9IGV2ZW50LnNoaWZ0S2V5XHJcbiAgICAgICAgPyBldmVudC5zaGlmdEtleVxyXG4gICAgICAgIDogKChrZXlDb2RlID09PSAxNilcclxuICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgOiBmYWxzZSk7XHJcbiAgICAgIHJldHVybiAhKCgoKGtleUNvZGUgPj0gNjUgJiYga2V5Q29kZSA8PSA5MCkgJiYgIXNoaWZ0S2V5KSB8fCAoKGtleUNvZGUgPj0gOTcgJiYga2V5Q29kZSA8PSAxMjIpICYmIHNoaWZ0S2V5KSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIHJldHVybiB0cmltbWVkIHN0cmluZ1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgZXhwb3J0IGNvbnN0IF9UcmltRm4gOiBGdW5jdGlvbiA9IGZ1bmN0aW9uIChzdHIgOiBzdHJpbmcpIDogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHIgJiYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzdHIgPT09ICdudW1iZXInKSA/IHN0ci50b1N0cmluZygpLnJlcGxhY2UoL15cXHMrfFxccyskL2dtLCAnJykgOiAnJztcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBBZGQgcG9seWZpbGwgZm9yIE1hdGNoZXMgZnVuY3Rpb24gdG8gZmluZCB0aGUgY2xvc2VzdCBlbGVtZW50XHJcbiAgICovXHJcbiAgZXhwb3J0IGNvbnN0IF9NYXRjaGVzUG9seWZpbGwgOiBGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIDogdm9pZCB7XHJcbiAgICBIVE1MRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEhUTUxFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzXHJcbiAgICAgIHx8IEhUTUxFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvclxyXG4gICAgICB8fCBIVE1MRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xyXG4gICAgaWYgKCFIVE1MRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xyXG4gICAgICBIVE1MRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uIChzZWxlY3RvciA6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB0aGlzRWxlbWVudCA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnModGhpc0VsZW1lbnQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgaWYgKHRoaXNFbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzRWxlbWVudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXNFbGVtZW50ID0gKHRoaXNFbGVtZW50LnBhcmVudEVsZW1lbnQgfHwgdGhpc0VsZW1lbnQucGFyZW50Tm9kZSlhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICB9IHdoaWxlICh0aGlzRWxlbWVudCAhPT0gbnVsbCAmJiB0aGlzRWxlbWVudC5ub2RlVHlwZSA9PT0gMSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGZpbmQgYW5kIHJldHVybiB0aGUgY2xvc2VzdCBlbGVtZW50IG9yIG51bGwgYmFzZWQgb24gdGhlIHNlbGVjdG9yIGFuZCBjdXJyZW50IGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcclxuICAgKiBAcmV0dXJucyB7KEVsZW1lbnQgfCBudWxsKX1cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX05lYXJlc3RQYXJlbnQgOiBGdW5jdGlvbiA9IGZ1bmN0aW9uIChlbGVtIDogSFRNTEVsZW1lbnQsIHNlbGVjdG9yIDogc3RyaW5nKSA6IEVsZW1lbnQgfCBudWxsIHtcclxuICAgIHJldHVybiBlbGVtICYmIGVsZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBzZWxlY3RvciAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnID8gZWxlbS5jbG9zZXN0KHNlbGVjdG9yKSA6IG51bGw7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGZvcm1hdCB0aGUgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQgYXMgZXJyb3Igb3Igd2FybmluZ1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcclxuICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX0Zvcm1hdE1zZyA6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1lc3NhZ2UgOiBzdHJpbmcsIHZhbHVlIDogYW55KSA6IHN0cmluZyB7XHJcbiAgICBpZiAobWVzc2FnZSAmJiB2YWx1ZSkge1xyXG4gICAgICBtZXNzYWdlID0gbWVzc2FnZS50b1N0cmluZygpO1xyXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxcezBcXFxcfScsICdnJyksIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxceycgKyBpICsgJ1xcXFx9JywgJ2cnKSwgdmFsdWVbaV0udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBwYXJzZSB0aGUgY29sbGVjdGlvbiBhcyBhbiBBcnJheVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSBhcnJcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX0FycmF5Q2FsbCA6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKGFyciA6IGFueSkgOiBBcnJheTxhbnk+IHtcclxuICAgIHJldHVybiBhcnIgJiYgYXJyLmxlbmd0aCA+IDAgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpIDogW107XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGZpbmQgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1NhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rfSBib29rXHJcbiAgICogQHJldHVybnMgeyhzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgQXJyYXkgPCBudW1iZXIgPiB8IHVuZGVmaW5lZCl9XHJcbiAgICovXHJcbiAgZXhwb3J0IGNvbnN0IF9FbGVtVmFsdWUgOiBGdW5jdGlvblxyXG4gICAgPSBmdW5jdGlvbiAoYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rKSA6IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIgfCBBcnJheSA8IG51bWJlciA+IHwgdW5kZWZpbmVkIHtcclxuICAgIGlmIChib29rICYmIGJvb2subm9kZXMpIHtcclxuICAgICAgaWYgKGJvb2suaXNDaGVja2FibGUpIHtcclxuICAgICAgICByZXR1cm4gX0FycmF5Q2FsbChib29rLm5vZGVzKS5maWx0ZXIoKGVsIDogYW55KSA9PiBlbC5jaGVja2VkKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYm9vay5pc1NlbGVjdCkge1xyXG4gICAgICAgIHJldHVybiBfQXJyYXlDYWxsKChib29rLm5vZGVzWzBdYXMgSFRNTFNlbGVjdEVsZW1lbnQpLm9wdGlvbnMpLmZpbHRlcigob3B0aW9uIDogSFRNTE9wdGlvbkVsZW1lbnQpID0+IHtcclxuICAgICAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQgJiYgb3B0aW9uLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChib29rLmhhc0NvbnRlbnRFZGl0YWJsZSkge1xyXG4gICAgICAgIHJldHVybiBfVHJpbUZuKCgoYm9vay5ub2Rlc1swXWFzIGFueSkuaW5uZXJIVE1MKS50b1N0cmluZygpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFsID0gKGJvb2subm9kZXNbMF1hcyBhbnkpLnZhbHVlO1xyXG5cclxuICAgICAgaWYgKGJvb2sudGFnVHlwZSA9PT0gJ2ZpbGUnKSB7XHJcbiAgICAgICAgLy8gTW9kZXJuIGJyb3dzZXIgKGNocm9tZSAmIHNhZmFyaSlcclxuICAgICAgICBpZiAodmFsLnN1YnN0cigwLCAxMikgPT09ICdDOlxcXFxmYWtlcGF0aFxcXFwnKSB7XHJcbiAgICAgICAgICByZXR1cm4gX1RyaW1Gbih2YWwuc3Vic3RyKDEyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIExlZ2FjeSBicm93c2VycyBVbml4LWJhc2VkIHBhdGhcclxuICAgICAgICBpZHggPSB2YWwubGFzdEluZGV4T2YoJy8nKTtcclxuICAgICAgICBpZiAoaWR4ID49IDApIHtcclxuICAgICAgICAgIHJldHVybiBfVHJpbUZuKHZhbC5zdWJzdHIoaWR4ICsgMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBXaW5kb3dzLWJhc2VkIHBhdGhcclxuICAgICAgICBpZHggPSB2YWwubGFzdEluZGV4T2YoJ1xcXFwnKTtcclxuICAgICAgICBpZiAoaWR4ID49IDApIHtcclxuICAgICAgICAgIHJldHVybiBfVHJpbUZuKHZhbC5zdWJzdHIoaWR4ICsgMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBKdXN0IHRoZSBmaWxlIG5hbWVcclxuICAgICAgICByZXR1cm4gX1RyaW1Gbih2YWwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gX1RyaW1Gbih2YWwucmVwbGFjZSgvXFxyL2csICcnKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBlc2NhcGUgdGhlIG1ldGEgY2hhcmFjdGVyc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgZXhwb3J0IGNvbnN0IF9Fc2NDc3NNZXRhIDogRnVuY3Rpb24gPSBmdW5jdGlvbiAoc3RyIDogc3RyaW5nKSA6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gc3RyICYmIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyLnJlcGxhY2UoLyhbXFxcXCFcIiMkJSYnKCkqKywuLzo7PD0+P0BcXFtcXF1eYHt8fX5dKS9nLCAnXFxcXCQxJykgOiAnJztcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaGFzIGEgY2xhc3NOYW1lIGF0dGFjaGVkIHRvIGl0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX0hhc0NsYXNzIDogRnVuY3Rpb24gPSBmdW5jdGlvbiAoZWwgOiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lIDogc3RyaW5nKSA6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGVsICYmIGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgY2xhc3NOYW1lICYmIHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICByZXR1cm4gZWxcclxuICAgICAgICAgIC5jbGFzc0xpc3RcclxuICAgICAgICAgIC5jb250YWlucyhjbGFzc05hbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAhIWVsXHJcbiAgICAgICAgICAuY2xhc3NOYW1lXHJcbiAgICAgICAgICAubWF0Y2gobmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNsYXNzTmFtZSArICcoXFxcXHN8JCknKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gYWRkIGNsYXNzTmFtZShzKSB0byBhbiBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gICAqIEBwYXJhbSB7Kn0gY2xhc3NOYW1lXHJcbiAgICovXHJcbiAgZXhwb3J0IGNvbnN0IF9BZGRDbGFzcyA6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKGVsIDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZSA6IGFueSkgOiB2b2lkIHtcclxuICAgIGlmIChlbCAmJiBlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGNsYXNzTmFtZSAmJiB0eXBlb2YgY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xyXG4gICAgICBpZiAoX1RyaW1GbihjbGFzc05hbWUpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICBmb3IgKGxldCBuYW1lIGluIGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgaWYgKGVsLmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICBlbFxyXG4gICAgICAgICAgICAgIC5jbGFzc0xpc3RcclxuICAgICAgICAgICAgICAuYWRkKGNsYXNzTmFtZVtuYW1lXSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKCFfSGFzQ2xhc3MoZWwsIGNsYXNzTmFtZVtuYW1lXSkpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZVtuYW1lXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gcmVtb3ZlIGNsYXNzTmFtZShzKSBmcm9tIGFuIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAgICogQHBhcmFtIHsqfSBjbGFzc05hbWVcclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX1JlbW92ZUNsYXNzIDogRnVuY3Rpb24gPSBmdW5jdGlvbiAoZWwgOiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lIDogYW55KSA6IHZvaWQge1xyXG4gICAgaWYgKGVsICYmIGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgY2xhc3NOYW1lICYmIHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGlmIChfVHJpbUZuKGNsYXNzTmFtZSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG4gICAgICAgIGZvciAobGV0IG5hbWUgaW4gY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIGVsXHJcbiAgICAgICAgICAgICAgLmNsYXNzTGlzdFxyXG4gICAgICAgICAgICAgIC5yZW1vdmUoY2xhc3NOYW1lW25hbWVdKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX0hhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBjbGFzc05hbWVbbmFtZV0gKyAnKFxcXFxzfCQpJyk7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsXHJcbiAgICAgICAgICAgICAgLmNsYXNzTmFtZVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKHJlZywgJyAnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgcHJlc2VudCBpbiBzdXBwbGllZCBjb2xsZWN0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1NhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rfSBib29rXHJcbiAgICogQHBhcmFtIHtTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9va1tdfSBjb2xsZWN0aW9uXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgZXhwb3J0IGNvbnN0IF9Jc0luQ29sbGVjdGlvbiA6IEZ1bmN0aW9uXHJcbiAgICA9IGZ1bmN0aW9uIChib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2ssIGNvbGxlY3Rpb24gOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9va1tdKSA6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGJvb2sgJiYgY29sbGVjdGlvbiAmJiBib29rLm5hbWVcclxuICAgICAgPyBfQXJyYXlDYWxsKGNvbGxlY3Rpb24pLnNvbWUoKHRoaXNCb29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2spID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzQm9vay5uYW1lID09PSBib29rLm5hbWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgOiBmYWxzZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gZm9ybWF0IHRoZSBCYW5rIGNhcmQgdmFsdWUgYmFzZWQgb24gdGhlIHNlcGFyYXRvciBwYXNzZWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZXBhcmF0b3JcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGV4cG9ydCBjb25zdCBfRm9ybWF0Q2FyZCA6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhbHVlIDogc3RyaW5nLCBzZXBhcmF0b3IgOiBzdHJpbmcpIDogc3RyaW5nIHtcclxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGN1cnJlbnRWYWx1ZSA9IHZhbHVlXHJcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcnKVxyXG4gICAgICAucmVwbGFjZSgvW14wLTldL2dpLCAnJyk7XHJcbiAgICAgIG1hdGNoZXMgPSBjdXJyZW50VmFsdWUubWF0Y2goL1xcZHs0LDE3fS9nKTtcclxuICAgICAgbWF0Y2ggPSBtYXRjaGVzICYmIG1hdGNoZXNbMF0gfHwgJyc7XHJcbiAgICAgIHBhcnRzID0gW107XHJcbiAgICAgIHNlcGFyYXRvciA9IHNlcGFyYXRvciAmJiB0eXBlb2Ygc2VwYXJhdG9yID09PSAnc3RyaW5nJyA/IHNlcGFyYXRvciA6ICctJztcclxuICAgICAgZm9yIChjb3VudCA9IDAsIHZhbHVlTGVuZ3RoID0gbWF0Y2gubGVuZ3RoOyBjb3VudCA8IHZhbHVlTGVuZ3RoOyBjb3VudCArPSA0KSB7XHJcbiAgICAgICAgcGFydHMucHVzaChtYXRjaC5zdWJzdHJpbmcoY291bnQsIGNvdW50ICsgNCkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gcGFydHMuam9pbihzZXBhcmF0b3IpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NvbnN0YW50cy50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGxldCBsdWhuU3VtLFxyXG4gICAgbHVoblZhbCxcclxuICAgIGx1aG5MZW4sXHJcbiAgICBsdWhuQml0O1xyXG4gIGNvbnN0IHJlZ2V4IDogUmVnRXhwID0gbmV3IFJlZ0V4cCgnXig/Oig0WzAtOV17MTJ9KD86WzAtOV17M30pPyl8KDVbMS01XVswLTldezE0fSl8KDYoPzowMTF8NVswLTldezJ9KVswLTldezEyfSl8KDMnICtcclxuICAgICAgICAnWzQ3XVswLTldezEzfSl8KDMoPzowWzAtNV18WzY4XVswLTldKVswLTldezExfSl8KCg/OjIxMzF8MTgwMHwzNVswLTldezN9KVswLTldezEnICtcclxuICAgICAgICAnMX0pKSQnKSxcclxuICAgIGlzTHVobkNoZWNrVmFsaWQgPSBmdW5jdGlvbiAobHVobiA6IHN0cmluZykgOiBib29sZWFuIHtcclxuICAgICAgbHVoblN1bSA9IDA7XHJcbiAgICAgIGx1aG5WYWwgPSAxO1xyXG4gICAgICBsdWhuTGVuID0gbHVobi5sZW5ndGg7XHJcbiAgICAgIHdoaWxlIChsdWhuTGVuLS0pIHtcclxuICAgICAgICBsdWhuQml0ID0gcGFyc2VJbnQobHVobi5jaGFyQXQobHVobkxlbiksIDEwKSAqIGx1aG5WYWw7XHJcbiAgICAgICAgbHVoblN1bSArPSBsdWhuQml0IC0gKGx1aG5CaXQgPiA5XHJcbiAgICAgICAgICA/IDFcclxuICAgICAgICAgIDogMCkgKiA5O1xyXG4gICAgICAgIGx1aG5WYWwgXj0gMztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKGx1aG5TdW0gJSAxMCA9PT0gMCkgJiYgKGx1aG5TdW0gPiAwKTtcclxuICAgIH07XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnYmFua2NhcmQnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgICAgID8gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiByZWdleC50ZXN0KHZhbHVlLnJlcGxhY2UoL1sgLV0vZywgJycpKSAmJiBpc0x1aG5DaGVja1ZhbGlkKHZhbHVlLnJlcGxhY2UoL1sgLV0vZywgJycpKSB8fCBmYWxzZVxyXG4gICAgICAgIDogZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGNhcmQgbnVtYmVyLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9iYW5rY2FyZC50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGNvbnN0IHJlZ2V4IDogUmVnRXhwID0gL0ludmFsaWR8TmFOLztcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdkYXRlJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiBwYXJhbXNcclxuICAgICAgICA/IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgIXJlZ2V4LnRlc3QobmV3IERhdGUodmFsdWUpLnRvU3RyaW5nKCkpIHx8IGZhbHNlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZS4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvZGF0ZS50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGNvbnN0IGlzb1JlZ2V4IDogUmVnRXhwID0gL15cXGR7NH1bXFwvXFwtXSgwP1sxLTldfDFbMDEyXSlbXFwvXFwtXSgwP1sxLTldfFsxMl1bMC05XXwzWzAxXSkkLyxcclxuICAgIHJlZ2V4IDogUmVnRXhwID0gL0ludmFsaWR8TmFOLztcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdkYXRlSVNPJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiBwYXJhbXNcclxuICAgICAgICA/IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgaXNvUmVnZXgudGVzdCh2YWx1ZSkgJiYgIXJlZ2V4LnRlc3QobmV3IERhdGUodmFsdWUpLnRvU3RyaW5nKCkpIHx8IGZhbHNlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZSAoSVNPKS4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvZGF0ZUlTTy50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGNvbnN0IHJlZ2V4ID0gL15cXGQrJC87XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnZGlnaXRzJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiBwYXJhbXNcclxuICAgICAgICA/IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVnZXgudGVzdCh2YWx1ZSkgfHwgZmFsc2VcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgb25seSBkaWdpdHMuJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL2RpZ2l0cy50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGNvbnN0IHJlZ2V4IDogUmVnRXhwID0gL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDN9KSskLztcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdlbWFpbCcsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICByZXR1cm4gcGFyYW1zXHJcbiAgICAgICAgPyB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHJlZ2V4LnRlc3QodmFsdWUpIHx8IGZhbHNlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvZW1haWwudHMiLCJleHBvcnQgbmFtZXNwYWNlIFNhbmF0aW9SdWxlIHtcclxuICBsZXQgZWxlbTtcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdlcXVhbHN0bycsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2lkPScgKyBwYXJhbXMgKyAnXScpO1xyXG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJyAmJiBlbGVtICYmIGVsZW0udmFsdWUgPT09IHZhbHVlIHx8IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgdGhlIHNhbWUgdmFsdWUgYWdhaW4uJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL2VxdWFsc3RvLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgbGV0IG9wdGlvbkVsZW1lbnQ7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnbWF4JyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG9wdGlvbkVsZW1lbnQgPSB2YWx1ZVswXSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAgIHJldHVybiBOdW1iZXIob3B0aW9uRWxlbWVudC52YWx1ZSkgPD0gTnVtYmVyKHBhcmFtcykgfHwgZmFsc2U7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKSA8PSBOdW1iZXIocGFyYW1zKSB8fCBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhIHZhbHVlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB7MH0uJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL21heC50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ21heGxlbmd0aCcsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpICYmIHZhbHVlLmxlbmd0aCA8PSBwYXJhbXMgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBubyBtb3JlIHRoYW4gezB9IGNoYXJhY3RlcnMuJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL21heGxlbmd0aC50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ21heG9wdGlvbnMnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInICYmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSAmJiB2YWx1ZS5sZW5ndGggPD0gcGFyYW1zIHx8IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2Ugc2VsZWN0IG5vIG1vcmUgdGhhbiB7MH0gb3B0aW9uKHMpLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9tYXhvcHRpb25zLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgbGV0IG9wdGlvbkVsZW1lbnQ7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnbWluJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG9wdGlvbkVsZW1lbnQgPSB2YWx1ZVswXSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAgIHJldHVybiBOdW1iZXIob3B0aW9uRWxlbWVudC52YWx1ZSkgPj0gTnVtYmVyKHBhcmFtcykgfHwgZmFsc2U7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKSA+PSBOdW1iZXIocGFyYW1zKSB8fCBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB7MH0uJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL21pbi50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ21pbmxlbmd0aCcsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpICYmIHZhbHVlLmxlbmd0aCA+PSBwYXJhbXMgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvbWlubGVuZ3RoLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnbWlub3B0aW9ucycsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpICYmIHZhbHVlLmxlbmd0aCA+PSBwYXJhbXMgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBzZWxlY3QgYXQgbGVhc3QgezB9IG9wdGlvbihzKS4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvbWlub3B0aW9ucy50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGNvbnN0IHJlZ2V4IDogUmVnRXhwID0gL14oPzotP1xcZCt8LT9cXGR7MSwzfSg/OixcXGR7M30pKyk/KD86XFwuXFxkKyk/JC87XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnbnVtYmVyJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiBwYXJhbXNcclxuICAgICAgICA/IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVnZXgudGVzdCh2YWx1ZSkgfHwgZmFsc2VcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBudW1iZXIuJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL251bWJlci50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGxldCBlbGVtO1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ2VxdWFsc3RvJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbaWQ9JyArIHBhcmFtcyArICddJyk7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnICYmIGVsZW0gJiYgZWxlbS52YWx1ZSAhPT0gdmFsdWUgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCB2YWx1ZS4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvbm90ZXF1YWxzdG8udHMiLCJleHBvcnQgbmFtZXNwYWNlIFNhbmF0aW9SdWxlIHtcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdwYXR0ZXJuJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgJiYgdHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZydcclxuICAgICAgICAmJiBuZXcgUmVnRXhwKHBhcmFtcykudGVzdCh2YWx1ZSkgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1NvcnJ5LCB0aGlzIGRvZXNuXFwndCBtYXRjaCB3aXRoIHRoZSBleHBlY3RlZCBwYXR0ZXJuLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9wYXR0ZXJuLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgbGV0IG9wdGlvbkVsZW1lbnQ7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAncmFuZ2UnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3B0aW9uRWxlbWVudCA9IHZhbHVlWzBdIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICAgICAgcmV0dXJuIChOdW1iZXIob3B0aW9uRWxlbWVudC52YWx1ZSkgPj0gTnVtYmVyKHBhcmFtc1swXSkgJiYgTnVtYmVyKG9wdGlvbkVsZW1lbnQudmFsdWUpIDw9IE51bWJlcihwYXJhbXNbMV0pKSB8fCBmYWxzZTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKSA+PSBOdW1iZXIocGFyYW1zWzBdKSAmJiBOdW1iZXIodmFsdWUpIDw9IE51bWJlcihwYXJhbXNbMV0pKSB8fCBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0uJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL3JhbmdlLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAncmFuZ2VsZW5ndGgnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGFyYW1zKVxyXG4gICAgICAgICYmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKVxyXG4gICAgICAgICYmIHZhbHVlLmxlbmd0aCA+PSBwYXJhbXNbMF1cclxuICAgICAgICAmJiB2YWx1ZS5sZW5ndGggPD0gcGFyYW1zWzFdIHx8IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9IGNoYXJhY3RlcnMgbG9uZy4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvcmFuZ2VsZW5ndGgudHMiLCJleHBvcnQgbmFtZXNwYWNlIFNhbmF0aW9SdWxlIHtcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdyYW5nZW9wdGlvbnMnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGFyYW1zKVxyXG4gICAgICAgICYmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKVxyXG4gICAgICAgICYmIHZhbHVlLmxlbmd0aCA+PSBwYXJhbXNbMF1cclxuICAgICAgICAmJiB2YWx1ZS5sZW5ndGggPD0gcGFyYW1zWzFdIHx8IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2Ugc2VsZWN0IHswfSB0byB7MX0gb3B0aW9ucy4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvcmFuZ2VvcHRpb25zLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAncmVxdWlyZWQnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgICAgID8gKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpICYmIHZhbHVlLmxlbmd0aCA+IDBcclxuICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgOiBmYWxzZVxyXG4gICAgICAgIDogZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQuJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL3JlcXVpcmVkLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgbGV0IHN0ZXBEZWNpbWFsUGxhY2VzLFxyXG4gICAgc3RlcEZuTWF0Y2g7XHJcbiAgY29uc3QgZ2V0U3RlcERlY2ltYWxQbGFjZXMgPSBmdW5jdGlvbiAobnVtIDogbnVtYmVyKSB7XHJcbiAgICBzdGVwRm5NYXRjaCA9IG51bGw7XHJcbiAgICBzdGVwRm5NYXRjaCA9ICgnJyArIG51bSkubWF0Y2goLyg/OlxcLihcXGQrKSk/JC8pO1xyXG4gICAgaWYgKCFzdGVwRm5NYXRjaCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBzdGVwRm5NYXRjaFsxXVxyXG4gICAgICA/IHN0ZXBGbk1hdGNoWzFdLmxlbmd0aFxyXG4gICAgICA6IDA7XHJcbiAgfTtcclxuICBjb25zdCBnZXRTdGVwVG9JbnQgPSBmdW5jdGlvbiAobnVtIDogbnVtYmVyLCBkZWNpbWFscyA6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSk7XHJcbiAgfTtcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdzdGVwJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHN0ZXBEZWNpbWFsUGxhY2VzID0gZ2V0U3RlcERlY2ltYWxQbGFjZXMocGFyYW1zKTtcclxuICAgICAgcmV0dXJuICEoZ2V0U3RlcERlY2ltYWxQbGFjZXModmFsdWUpID4gc3RlcERlY2ltYWxQbGFjZXNcclxuICAgICAgICB8fCBnZXRTdGVwVG9JbnQodmFsdWUsIHN0ZXBEZWNpbWFsUGxhY2VzKSAlIGdldFN0ZXBUb0ludCh2YWx1ZSwgc3RlcERlY2ltYWxQbGFjZXMpICE9PSAwKSB8fCBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgbXVsdGlwbGUgb2YgezB9LidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9zdGVwLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZHBlcmluaS83MjkyOTQgQXV0aG9yOiBEaWVnbyBQZXJpbmkgVXBkYXRlZDpcclxuICAvLyAyMDEwLzEyLzA1IExpY2Vuc2U6IE1JVFxyXG4gIC8vXHJcbiAgLy8gQ29weXJpZ2h0IChjKSAyMDEwLTIwMTMgRGllZ28gUGVyaW5pIChodHRwOi8vd3d3Lmlwb3J0Lml0KVxyXG4gIGNvbnN0IHJlZ2V4IDogUmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgK1xyXG4gIC8vIHByb3RvY29sIGlkZW50aWZpZXJcclxuICAnKD86KD86aHR0cHM/fGZ0cCk6Ly8pJyArXHJcbiAgLy8gdXNlcjpwYXNzIGF1dGhlbnRpY2F0aW9uXHJcbiAgJyg/OlxcXFxTKyg/OjpcXFxcUyopP0ApPyg/OicgK1xyXG4gIC8vIElQIGFkZHJlc3MgZXhjbHVzaW9uIHByaXZhdGUgJiBsb2NhbCBuZXR3b3Jrc1xyXG4gICcoPyEoPzoxMHwxMjcpKD86XFxcXC5cXFxcZHsxLDN9KXszfSkoPyEoPzoxNjlcXFxcLjI1NHwxOTJcXFxcLjE2OCkoPzpcXFxcLlxcXFxkezEsM30pezJ9KSg/IScgK1xyXG4gICAgICAnMTcyXFxcXC4oPzoxWzYtOV18MlxcXFxkfDNbMC0xXSkoPzpcXFxcLlxcXFxkezEsM30pezJ9KScgK1xyXG4gIC8vIElQIGFkZHJlc3MgZG90dGVkIG5vdGF0aW9uIG9jdGV0cyBleGNsdWRlcyBsb29wYmFjayBuZXR3b3JrIDAuMC4wLjAgZXhjbHVkZXNcclxuICAvLyByZXNlcnZlZCBzcGFjZSA+PSAyMjQuMC4wLjAgZXhjbHVkZXMgbmV0d29yayAmIGJyb2FjYXN0IGFkZHJlc3NlcyAoZmlyc3QgJlxyXG4gIC8vIGxhc3QgSVAgYWRkcmVzcyBvZiBlYWNoIGNsYXNzKVxyXG4gICcoPzpbMS05XVxcXFxkP3wxXFxcXGRcXFxcZHwyWzAxXVxcXFxkfDIyWzAtM10pKD86XFxcXC4oPzoxP1xcXFxkezEsMn18MlswLTRdXFxcXGR8MjVbMC01XSkpezJ9JyArXHJcbiAgICAgICcoPzpcXFxcLig/OlsxLTldXFxcXGQ/fDFcXFxcZFxcXFxkfDJbMC00XVxcXFxkfDI1WzAtNF0pKXwnICtcclxuICAvLyBob3N0IG5hbWVcclxuICAnKD86KD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldLSopKlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XSspJyArXHJcbiAgLy8gZG9tYWluIG5hbWVcclxuICAnKD86XFxcXC4oPzpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV0tKikqW2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldKykqJyArXHJcbiAgLy8gVExEIGlkZW50aWZpZXJcclxuICAnKD86XFxcXC4oPzpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZl17Mix9KSknICtcclxuICAvLyBUTEQgbWF5IGVuZCB3aXRoIGRvdFxyXG4gICdcXFxcLj8pJyArXHJcbiAgLy8gcG9ydCBudW1iZXJcclxuICAnKD86OlxcXFxkezIsNX0pPycgK1xyXG4gIC8vIHJlc291cmNlIHBhdGhcclxuICAnKD86Wy8/I11cXFxcUyopPyQnLCAnaScpO1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ3VybCcsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9kcGVyaW5pLzcyOTI5NCBBdXRob3I6IERpZWdvXHJcbiAgICAgIC8vIFBlcmluaSBVcGRhdGVkOiAyMDEwLzEyLzA1IExpY2Vuc2U6IE1JVFxyXG4gICAgICAvL1xyXG4gICAgICAvLyBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMyBEaWVnbyBQZXJpbmkgKGh0dHA6Ly93d3cuaXBvcnQuaXQpXHJcbiAgICAgIHJldHVybiBwYXJhbXNcclxuICAgICAgICA/IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVnZXgudGVzdCh2YWx1ZSkgfHwgZmFsc2VcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwuJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL3VybC50cyJdLCJzb3VyY2VSb290IjoiIn0=