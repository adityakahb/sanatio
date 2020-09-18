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
var Sanatio = __webpack_require__(1);
var sanatioValidate1;
var sanatioValidate2;
var sanatioValidate3;
if (document.querySelector('#simple_signup')) {
    sanatioValidate1 = Sanatio
        .Sanatio
        .Validator
        .getInstance()
        .init('simple_signup');
    sanatioValidate1.submitHandler(function () {
        alert('Form Submitted');
    });
    console.log('===sanatioValidate1', sanatioValidate1);
}
if (document.querySelector('#bootstrap1')) {
    sanatioValidate2 = Sanatio
        .Sanatio
        .Validator
        .getInstance();
    sanatioValidate2.addRule({
        name: 'datepattern',
        definition: function (value, params) {
            var check = value.match(new RegExp(params)), date;
            if (check) {
                date = new Date(parseInt(check[3], 10), parseInt(check[2], 10) - 1, parseInt(check[1], 10));
            }
            return check ? date ? true : false : false;
        },
        message: 'Date of Birth must be in DD-MM-YYYY format'
    });
    var globals = sanatioValidate2.init('bootstrap1');
    globals.submitHandler(function () {
        alert('Form Submitted');
    });
    console.log('===sanatioValidate2', sanatioValidate2);
}
if (document.querySelector('#init_destroy_setup')) {
    sanatioValidate3 = Sanatio
        .Sanatio
        .Validator
        .getInstance();
    var initBtn = document.getElementById('init_btn');
    var destroyBtn = document.getElementById('destroy_btn');
    var initFn = function (event) {
        event.preventDefault();
        var globals = sanatioValidate3.init('init_destroy_setup');
        globals.submitHandler(function () {
            alert('Form validated and Submitted');
        });
    };
    var destroyFn = function (event) {
        event.preventDefault();
        sanatioValidate3.destroy('init_destroy_setup');
    };
    if (initBtn && destroyBtn) {
        initBtn.addEventListener('click', initFn);
        destroyBtn.addEventListener('click', destroyFn);
    }
    console.log('===sanatioValidate3', sanatioValidate3);
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Core_1 = __webpack_require__(2);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Constants_1 = __webpack_require__(3);
var BankcardRule = __webpack_require__(4);
var DateRule = __webpack_require__(5);
var DateISORule = __webpack_require__(6);
var DigitsRule = __webpack_require__(7);
var EmailRule = __webpack_require__(8);
var EqualsToRule = __webpack_require__(9);
var MaxRule = __webpack_require__(10);
var MaxLengthRule = __webpack_require__(11);
var MaxOptionsRule = __webpack_require__(12);
var MinRule = __webpack_require__(13);
var MinLengthRule = __webpack_require__(14);
var MinOptionsRule = __webpack_require__(15);
var NumberRule = __webpack_require__(16);
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
    Core._addRule(PatternRule.SanatioRule.Rule);
    Core._addRule(RangeRule.SanatioRule.Rule);
    Core._addRule(RangeLengthRule.SanatioRule.Rule);
    Core._addRule(RangeOptionsRule.SanatioRule.Rule);
    Core._addRule(RequiredRule.SanatioRule.Rule);
    Core._addRule(StepRule.SanatioRule.Rule);
    Core._addRule(URLRule.SanatioRule.Rule);
})(SanatioCore = exports.SanatioCore || (exports.SanatioCore = {}));


/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGMxMjg1ODM2MTMyNTM4NjExMDEiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvZXhhbXBsZXMtaW5pdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2FuYXRpby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9iYW5rY2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvZGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvZGF0ZUlTTy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvZGlnaXRzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9lbWFpbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvZXF1YWxzdG8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21heC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbWF4bGVuZ3RoLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYXhvcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9taW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21pbmxlbmd0aC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbWlub3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbnVtYmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9wYXR0ZXJuLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9yYW5nZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcmFuZ2VsZW5ndGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3Jhbmdlb3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcmVxdWlyZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3N0ZXAudHMiLCJ3ZWJwYWNr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QUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELElBQUksQ0FBQyxR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QUFDO1FBQ1osQ0FBQztRQUNELE9BQU8sRUFBRSwyQkFBMkI7S0FDckMsQ0FBQztBQUNKLENBQUMsRUEzQ2dCLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBMkMzQiIsImZpbGUiOiJleGFtcGxlcy1pbml0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGMxMjg1ODM2MTMyNTM4NjExMDEiLCJpbXBvcnQgKiBhcyBTYW5hdGlvIGZyb20gJy4vLi4vc3JjL1NhbmF0aW8nO1xyXG5sZXQgc2FuYXRpb1ZhbGlkYXRlMSA6IGFueTtcclxubGV0IHNhbmF0aW9WYWxpZGF0ZTIgOiBhbnk7XHJcbmxldCBzYW5hdGlvVmFsaWRhdGUzIDogYW55O1xyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpbXBsZV9zaWdudXAnKSkge1xyXG4gIHNhbmF0aW9WYWxpZGF0ZTEgPSBTYW5hdGlvXHJcbiAgICAuU2FuYXRpb1xyXG4gICAgLlZhbGlkYXRvclxyXG4gICAgLmdldEluc3RhbmNlKClcclxuICAgIC5pbml0KCdzaW1wbGVfc2lnbnVwJyk7XHJcbiAgKHNhbmF0aW9WYWxpZGF0ZTEgYXMgYW55KS5zdWJtaXRIYW5kbGVyKGZ1bmN0aW9uICgpIHtcclxuICAgIGFsZXJ0KCdGb3JtIFN1Ym1pdHRlZCcpO1xyXG4gIH0pO1xyXG4gIGNvbnNvbGUubG9nKCc9PT1zYW5hdGlvVmFsaWRhdGUxJywgc2FuYXRpb1ZhbGlkYXRlMSk7XHJcbn1cclxuXHJcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYm9vdHN0cmFwMScpKSB7XHJcbiAgc2FuYXRpb1ZhbGlkYXRlMiA9IFNhbmF0aW9cclxuICAgIC5TYW5hdGlvXHJcbiAgICAuVmFsaWRhdG9yXHJcbiAgICAuZ2V0SW5zdGFuY2UoKTtcclxuICBzYW5hdGlvVmFsaWRhdGUyLmFkZFJ1bGUoe1xyXG4gICAgbmFtZTogJ2RhdGVwYXR0ZXJuJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IHN0cmluZywgcGFyYW1zIDogc3RyaW5nKSB7XHJcbiAgICAgIGxldCBjaGVjayA9IHZhbHVlLm1hdGNoKG5ldyBSZWdFeHAocGFyYW1zKSksXHJcbiAgICAgICAgZGF0ZTtcclxuICAgICAgaWYgKGNoZWNrKSB7XHJcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCBwYXJzZUludChjaGVja1szXSwgMTApLCBwYXJzZUludChjaGVja1syXSwgMTApIC0gMSwgcGFyc2VJbnQoY2hlY2tbMV0sIDEwKSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNoZWNrID8gZGF0ZSA/IHRydWUgOiBmYWxzZSA6IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdEYXRlIG9mIEJpcnRoIG11c3QgYmUgaW4gREQtTU0tWVlZWSBmb3JtYXQnXHJcbiAgfSk7XHJcbiAgbGV0IGdsb2JhbHMgPSBzYW5hdGlvVmFsaWRhdGUyLmluaXQoJ2Jvb3RzdHJhcDEnKTtcclxuICAoZ2xvYmFscyBhcyBhbnkpLnN1Ym1pdEhhbmRsZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgYWxlcnQoJ0Zvcm0gU3VibWl0dGVkJyk7XHJcbiAgfSk7XHJcbiAgY29uc29sZS5sb2coJz09PXNhbmF0aW9WYWxpZGF0ZTInLCBzYW5hdGlvVmFsaWRhdGUyKTtcclxufVxyXG5cclxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbml0X2Rlc3Ryb3lfc2V0dXAnKSkge1xyXG4gIHNhbmF0aW9WYWxpZGF0ZTMgPSBTYW5hdGlvXHJcbiAgICAuU2FuYXRpb1xyXG4gICAgLlZhbGlkYXRvclxyXG4gICAgLmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGluaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5pdF9idG4nKTtcclxuICBsZXQgZGVzdHJveUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXN0cm95X2J0bicpO1xyXG4gIGxldCBpbml0Rm4gOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0ID0gZnVuY3Rpb24gKGV2ZW50IDogRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgZ2xvYmFscyA9IHNhbmF0aW9WYWxpZGF0ZTMuaW5pdCgnaW5pdF9kZXN0cm95X3NldHVwJyk7XHJcbiAgICAoZ2xvYmFscyBhcyBhbnkpLnN1Ym1pdEhhbmRsZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICBhbGVydCgnRm9ybSB2YWxpZGF0ZWQgYW5kIFN1Ym1pdHRlZCcpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBsZXQgZGVzdHJveUZuIDogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCA9IGZ1bmN0aW9uIChldmVudCA6IEV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgc2FuYXRpb1ZhbGlkYXRlMy5kZXN0cm95KCdpbml0X2Rlc3Ryb3lfc2V0dXAnKTtcclxuICB9O1xyXG4gIGlmIChpbml0QnRuICYmIGRlc3Ryb3lCdG4pIHtcclxuICAgIGluaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbml0Rm4pO1xyXG4gICAgZGVzdHJveUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlc3Ryb3lGbik7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKCc9PT1zYW5hdGlvVmFsaWRhdGUzJywgc2FuYXRpb1ZhbGlkYXRlMyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZXhhbXBsZXMvZXhhbXBsZXMtaW5pdC50cyIsImltcG9ydCB7IFNhbmF0aW9Db3JlIH0gZnJvbSAnLi9Db3JlJztcbmltcG9ydCB7IFNhbmF0aW9JbnRlcmZhY2VzIH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcbi8qKlxuICogU2FuYXRpbyBwbHVnaW4gTmFtZXNwYWNlXG4gKiBAbmFtZXNwYWNlIFNhbmF0aW9cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvIHtcbiAgbGV0IF9pbnN0YW5jZXMgOiBTYW5hdGlvSW50ZXJmYWNlcy5TYW5hdGlvSW5zdGFuY2VbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgbWFpbiBWYWlkYXRvciBDbGFzc1xuICAgKlxuICAgKiBAZXhwb3J0XG4gICAqIEBjbGFzcyBWYWxpZGF0b3JcbiAgICovXG4gIGV4cG9ydCBjbGFzcyBWYWxpZGF0b3Ige1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlIDogVmFsaWRhdG9yO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBWYWxpZGF0b3IuXG4gICAgICogQG1lbWJlcm9mIFZhbGlkYXRvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgLy8gdGhpcy5faW5zdGFuY2VzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIE1ldGhvZCB0byBnZXQgdGhlIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBWYWxpZGF0b3IgQ2xhc3NcbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmV0dXJucyB7VmFsaWRhdG9yfVxuICAgICAqIEBtZW1iZXJvZiBWYWxpZGF0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlID0gKCkgOiBWYWxpZGF0b3IgPT4ge1xuICAgICAgaWYgKCFWYWxpZGF0b3IuX2luc3RhbmNlKSB7XG4gICAgICAgIFZhbGlkYXRvci5faW5zdGFuY2UgPSBuZXcgVmFsaWRhdG9yKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gVmFsaWRhdG9yLl9pbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGluaXRpYWxpemUgdGhlIFZhbGlkYXRvciBpbnRvIHRoZSBmb3JtaWQgYW5kIHJldHVybiB0aGUgaW5zdGFuY2UgbWV0aG9kc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1JZFxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICogQG1lbWJlcm9mIFZhbGlkYXRvclxuICAgICAqL1xuICAgIHB1YmxpYyBpbml0ID0gKGZvcm1JZCA6IHN0cmluZykgOiBTYW5hdGlvSW50ZXJmYWNlcy5HbG9iYWxGdW5jdGlvbnMgfCBib29sZWFuID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl93b3JrT25Db3JlRm9ybShmb3JtSWQsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95ID0gKGZvcm1JZCA6IHN0cmluZykgOiBTYW5hdGlvSW50ZXJmYWNlcy5HbG9iYWxGdW5jdGlvbnMgfCBib29sZWFuID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl93b3JrT25Db3JlRm9ybShmb3JtSWQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGFkZCBjdXN0b20gcnVsZSB0byB0aGUgR2xvYmFsIFZhbGlkYXRvciBDb3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcnVsZVxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqIEBtZW1iZXJvZiBWYWxpZGF0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkUnVsZSA9IChydWxlIDogU2FuYXRpb0ludGVyZmFjZXMuUnVsZVN0cnVjdHVyZSkgOiB2b2lkID0+IHtcbiAgICAgIFNhbmF0aW9Db3JlXG4gICAgICAgIC5Db3JlXG4gICAgICAgIC5fYWRkUnVsZShydWxlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gaW5pdGlhbGl6ZSBvciBkZXN0cm95IHRoZSBTYW5hdGlvIENvcmUgd2l0aCB0aGUgZ2l2ZW4gRm9ybUlkXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtSWRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluaXRPckRlc3Ryb3lcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKiBAbWVtYmVyb2YgVmFsaWRhdG9yXG4gICAgICovXG4gICAgcHJpdmF0ZSBfd29ya09uQ29yZUZvcm0oZm9ybUlkIDogc3RyaW5nLCBpbml0T3JEZXN0cm95IDogYm9vbGVhbikgOiBTYW5hdGlvSW50ZXJmYWNlcy5HbG9iYWxGdW5jdGlvbnMgfCBib29sZWFuIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGlzRm9ybUF2YWlsYWJsZSA6IGJvb2xlYW4gPSBBcnJheVxuICAgICAgICAgIC5wcm90b3R5cGVcbiAgICAgICAgICAuc2xpY2VcbiAgICAgICAgICAuY2FsbChfaW5zdGFuY2VzKVxuICAgICAgICAgIC5zb21lKChjdXJyZW50Rm9ybSA6IFNhbmF0aW9JbnRlcmZhY2VzLlNhbmF0aW9JbnN0YW5jZSkgPT4gY3VycmVudEZvcm0uaWQgPT09IGZvcm1JZCk7XG4gICAgICAgIGxldCB0aGlzRm9ybUVsZW1lbnQgOiBFbGVtZW50IHwgbnVsbCxcbiAgICAgICAgICByZXR1cm5PYmogOiBTYW5hdGlvQ29yZS5Db3JlIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICghaXNGb3JtQXZhaWxhYmxlICYmIGluaXRPckRlc3Ryb3kpIHtcbiAgICAgICAgICB0aGlzRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGZvcm1JZCk7XG4gICAgICAgICAgaWYgKHRoaXNGb3JtRWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IHNhbmF0aW9Db3JlIDogU2FuYXRpb0NvcmUuQ29yZSxcbiAgICAgICAgICAgICAgbmV3SW5zdGFuY2UgOiBTYW5hdGlvSW50ZXJmYWNlcy5TYW5hdGlvSW5zdGFuY2U7XG5cbiAgICAgICAgICAgIHNhbmF0aW9Db3JlID0gbmV3IFNhbmF0aW9Db3JlLkNvcmUodGhpc0Zvcm1FbGVtZW50IGFzIEhUTUxGb3JtRWxlbWVudCk7XG4gICAgICAgICAgICBuZXdJbnN0YW5jZSA9IHtcbiAgICAgICAgICAgICAgaWQ6IGZvcm1JZCxcbiAgICAgICAgICAgICAgY29yZUVsZW1lbnQ6IHNhbmF0aW9Db3JlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX2luc3RhbmNlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgICAgIHJldHVybk9iaiA9IF9pbnN0YW5jZXMuZmlsdGVyKChpbnN0YW5jZSA6IFNhbmF0aW9JbnRlcmZhY2VzLlNhbmF0aW9JbnN0YW5jZSkgPT4gaW5zdGFuY2UuaWQgPT09IGZvcm1JZClbMF0uY29yZUVsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXR1cm5PYmopIHtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmouZ2xvYmFscztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgUmVmZXJlbmNlRXJyb3IoJ0Zvcm0gZWxlbWVudCBpcyBub3QgcHJlc2VudC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNGb3JtQXZhaWxhYmxlICYmICFpbml0T3JEZXN0cm95KSB7XG4gICAgICAgICAgcmV0dXJuT2JqID0gX2luc3RhbmNlcy5maWx0ZXIoKGluc3RhbmNlIDogU2FuYXRpb0ludGVyZmFjZXMuU2FuYXRpb0luc3RhbmNlKSA9PiBpbnN0YW5jZS5pZCA9PT0gZm9ybUlkKVswXS5jb3JlRWxlbWVudDtcbiAgICAgICAgICBpZiAocmV0dXJuT2JqICYmIHJldHVybk9iai5fZGVzdHJveSgpKSB7XG4gICAgICAgICAgICBfaW5zdGFuY2VzID0gX2luc3RhbmNlcy5maWx0ZXIoaW5zdGFuY2UgPT4gaW5zdGFuY2UuaWQgIT09IGZvcm1JZCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NhbmF0aW8gZW5jb3VudGVyZWQgc29tZSBlcnJvci4nLCBlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NhbmF0aW8udHMiLCJpbXBvcnQge1NhbmF0aW9JbnRlcmZhY2VzfSBmcm9tICcuL0ludGVyZmFjZXMnO1xyXG5pbXBvcnQge1NhbmF0aW9Db25zdGFudHN9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuXHJcbmltcG9ydCAqIGFzIEJhbmtjYXJkUnVsZSBmcm9tICcuL3J1bGVzL2JhbmtjYXJkJztcclxuaW1wb3J0ICogYXMgRGF0ZVJ1bGUgZnJvbSAnLi9ydWxlcy9kYXRlJztcclxuaW1wb3J0ICogYXMgRGF0ZUlTT1J1bGUgZnJvbSAnLi9ydWxlcy9kYXRlSVNPJztcclxuaW1wb3J0ICogYXMgRGlnaXRzUnVsZSBmcm9tICcuL3J1bGVzL2RpZ2l0cyc7XHJcbmltcG9ydCAqIGFzIEVtYWlsUnVsZSBmcm9tICcuL3J1bGVzL2VtYWlsJztcclxuaW1wb3J0ICogYXMgRXF1YWxzVG9SdWxlIGZyb20gJy4vcnVsZXMvZXF1YWxzdG8nO1xyXG5pbXBvcnQgKiBhcyBNYXhSdWxlIGZyb20gJy4vcnVsZXMvbWF4JztcclxuaW1wb3J0ICogYXMgTWF4TGVuZ3RoUnVsZSBmcm9tICcuL3J1bGVzL21heGxlbmd0aCc7XHJcbmltcG9ydCAqIGFzIE1heE9wdGlvbnNSdWxlIGZyb20gJy4vcnVsZXMvbWF4b3B0aW9ucyc7XHJcbmltcG9ydCAqIGFzIE1pblJ1bGUgZnJvbSAnLi9ydWxlcy9taW4nO1xyXG5pbXBvcnQgKiBhcyBNaW5MZW5ndGhSdWxlIGZyb20gJy4vcnVsZXMvbWlubGVuZ3RoJztcclxuaW1wb3J0ICogYXMgTWluT3B0aW9uc1J1bGUgZnJvbSAnLi9ydWxlcy9taW5vcHRpb25zJztcclxuaW1wb3J0ICogYXMgTnVtYmVyUnVsZSBmcm9tICcuL3J1bGVzL251bWJlcic7XHJcbmltcG9ydCAqIGFzIFBhdHRlcm5SdWxlIGZyb20gJy4vcnVsZXMvcGF0dGVybic7XHJcbmltcG9ydCAqIGFzIFJhbmdlUnVsZSBmcm9tICcuL3J1bGVzL3JhbmdlJztcclxuaW1wb3J0ICogYXMgUmFuZ2VMZW5ndGhSdWxlIGZyb20gJy4vcnVsZXMvcmFuZ2VsZW5ndGgnO1xyXG5pbXBvcnQgKiBhcyBSYW5nZU9wdGlvbnNSdWxlIGZyb20gJy4vcnVsZXMvcmFuZ2VvcHRpb25zJztcclxuaW1wb3J0ICogYXMgUmVxdWlyZWRSdWxlIGZyb20gJy4vcnVsZXMvcmVxdWlyZWQnO1xyXG5pbXBvcnQgKiBhcyBTdGVwUnVsZSBmcm9tICcuL3J1bGVzL3N0ZXAnO1xyXG5pbXBvcnQgKiBhcyBVUkxSdWxlIGZyb20gJy4vcnVsZXMvdXJsJztcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb0NvcmUge1xyXG4gIGxldCBub09mRXJyb3JzID0gMCxcclxuICAgIG5vT2ZXYXJuaW5ncyA9IDAsXHJcbiAgICBjdXJyZW50VmFsdWUgOiBib29sZWFuIHwgbnVtYmVyIHwgQXJyYXkgPCBudW1iZXIgPiB8IHN0cmluZztcclxuICBjb25zdCBfZGVmYXVsdEVsZW1lbnRCb29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2sgPSBTYW5hdGlvQ29uc3RhbnRzLl9FbGVtQm9vaztcclxuICBjb25zdCBfZWxlbWVudHNGb3JLZXlib2FyZEV2ZW50cyA6IHN0cmluZ1tdID0gU2FuYXRpb0NvbnN0YW50cy5fS2V5RWxlbTtcclxuICBjb25zdCBfZWxlbWVudHNGb3JNb3VzZUV2ZW50cyA6IHN0cmluZ1tdID0gU2FuYXRpb0NvbnN0YW50cy5fTW91c2VFbGVtO1xyXG4gIGNvbnN0IF9leGNsdWRlZEtleXMgOiBudW1iZXJbXSA9IFNhbmF0aW9Db25zdGFudHMuX2V4Y2x1ZGVkS2V5cztcclxuICBjb25zdCBfZWxlbWVudHNTdXBwb3J0aW5nSWNvbnMgOiBzdHJpbmdbXSA9IFNhbmF0aW9Db25zdGFudHMuX0ljb25pY0VsZW07XHJcbiAgY29uc3QgX2RlZmF1bHRGb3JtSW5zdGFuY2UgOiBTYW5hdGlvSW50ZXJmYWNlcy5Gb3JtSW5zdGFuY2UgPSBTYW5hdGlvQ29uc3RhbnRzLl9JbnN0YW5jZTtcclxuICBjb25zdCBfQ2Fwc2xvY2tGbiA6IEZ1bmN0aW9uID0gU2FuYXRpb0NvbnN0YW50cy5fQ2Fwc2xvY2tGbjtcclxuICBjb25zdCBfVHJpbUZuIDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9UcmltRm47XHJcbiAgY29uc3QgX01hdGNoZXNQb2x5ZmlsbCA6IEZ1bmN0aW9uID0gU2FuYXRpb0NvbnN0YW50cy5fTWF0Y2hlc1BvbHlmaWxsO1xyXG4gIGNvbnN0IF9OZWFyZXN0UGFyZW50IDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9OZWFyZXN0UGFyZW50O1xyXG4gIGNvbnN0IF9Gb3JtYXRNc2cgOiBGdW5jdGlvbiA9IFNhbmF0aW9Db25zdGFudHMuX0Zvcm1hdE1zZztcclxuICBjb25zdCBfQXJyYXlDYWxsIDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9BcnJheUNhbGw7XHJcbiAgY29uc3QgX0VsZW1WYWx1ZSA6IEZ1bmN0aW9uID0gU2FuYXRpb0NvbnN0YW50cy5fRWxlbVZhbHVlO1xyXG4gIGNvbnN0IF9Fc2NDc3NNZXRhIDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9Fc2NDc3NNZXRhO1xyXG4gIGNvbnN0IF9Gb3JtYXRDYXJkIDogRnVuY3Rpb24gPSBTYW5hdGlvQ29uc3RhbnRzLl9Gb3JtYXRDYXJkO1xyXG5cclxuICBjb25zdCBfQWRkQ2xhc3MgOiBGdW5jdGlvbiA9IFNhbmF0aW9Db25zdGFudHMuX0FkZENsYXNzO1xyXG4gIGNvbnN0IF9SZW1vdmVDbGFzcyA6IEZ1bmN0aW9uID0gU2FuYXRpb0NvbnN0YW50cy5fUmVtb3ZlQ2xhc3M7XHJcblxyXG4gIGNvbnN0IF9Jc0luQ29sbGVjdGlvbiA6IEZ1bmN0aW9uID0gU2FuYXRpb0NvbnN0YW50cy5fSXNJbkNvbGxlY3Rpb247XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBDb3JlIHtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX01ldGhvZHMgOiBTYW5hdGlvSW50ZXJmYWNlcy5NZXRob2RCb29rID0gU2FuYXRpb0NvbnN0YW50cy5fTWV0aG9kQm9vaztcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX01lc3NhZ2VzIDogU2FuYXRpb0ludGVyZmFjZXMuTWVzc2FnZUJvb2sgPSBTYW5hdGlvQ29uc3RhbnRzLl9NZXNzYWdlQm9vaztcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX1J1bGVCb29rIDogU2FuYXRpb0ludGVyZmFjZXMuUnVsZUJvb2sgPSBTYW5hdGlvQ29uc3RhbnRzLl9SdWxlQm9vaztcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX1J1bGVSZWYgOiBTYW5hdGlvSW50ZXJmYWNlcy5SdWxlUmVmZXJlbmNlID0gU2FuYXRpb0NvbnN0YW50cy5fUnVsZVJlZjtcclxuICAgIHB1YmxpYyBnbG9iYWxzIDogU2FuYXRpb0ludGVyZmFjZXMuR2xvYmFsRnVuY3Rpb25zO1xyXG4gICAgcHJpdmF0ZSBfaSA6IFNhbmF0aW9JbnRlcmZhY2VzLkZvcm1JbnN0YW5jZTtcclxuICAgIHByaXZhdGUgX3N1Ym1pdEhhbmRsZXIgOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgX2Jvb2tDb2wgOiBTYW5hdGlvSW50ZXJmYWNlcy5Cb29rQ29sbGVjdGlvbiA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgX3N1Ym1pdENsb3N1cmUgOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfZm9jdXNDbG9zdXJlIDogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2JsdXJDbG9zdXJlIDogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2tleXVwQ2xvc3VyZSA6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9rZXlwcmVzc0Nsb3N1cmUgOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY2xpY2tDbG9zdXJlIDogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihmb3JtRWxlbWVudCA6IEhUTUxGb3JtRWxlbWVudCkge1xyXG4gICAgICB0aGlzLl9pID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfZGVmYXVsdEZvcm1JbnN0YW5jZSkpO1xyXG4gICAgICB0aGlzLl9pLl9mb3JtID0gZm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgICB0aGlzLmdsb2JhbHMgPSB7XHJcbiAgICAgICAgZ2V0TnVtYmVyT2ZFcnJvcnM6ICgpIDogbnVtYmVyID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pLl9lQ291bnQ7XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIGZldGNoaW5nIHRoZSBudW1iZXIgb2YgZXJyb3JzJywgZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE51bWJlck9mV2FybmluZ3M6ICgpIDogbnVtYmVyID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pLl93Q291bnQ7XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIGZldGNoaW5nIHRoZSBudW1iZXIgb2Ygd2FybmluZ3MnLCBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VibWl0SGFuZGxlcjogKHN1Ym1pdEhhbmRsZXJGbiA6IEZ1bmN0aW9uKSA6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5fc3VibWl0SGFuZGxlciA9IHN1Ym1pdEhhbmRsZXJGbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIGFkZGluZyB0aGUgY3VzdG9tIFN1Ym1pdEhhbmRsZXInLCBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgdGhpcy5fc3VibWl0SGFuZGxlciA9IHRoaXMuX2RlZmF1bHRTdWJtaXRGbjtcclxuICAgICAgX01hdGNoZXNQb2x5ZmlsbCgpO1xyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBfYWRkUnVsZShydWxlIDogU2FuYXRpb0ludGVyZmFjZXMuUnVsZVN0cnVjdHVyZSkgOiB2b2lkIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAoIXJ1bGUubmFtZSB8fCAhcnVsZS5kZWZpbml0aW9uIHx8ICFydWxlLm1lc3NhZ2UpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05ldyBNZXRob2Qgbm90IGRlZmluZWQgcHJvcGVybHkuIEl0IG11c3QgYmUgaW4gZm9ybWF0IHtuYW1lLCBkZWZpbml0aW9uLCBtZXNzYWdlJyArXHJcbiAgICAgICAgICAgICAgJ30uJyk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChDb3JlLl9NZXRob2RzW3J1bGUubmFtZV0pIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1J1bGUgJyArIHJ1bGUubmFtZSArICcgYWxyZWFkeSBleGlzdHMuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIENvcmUuX01ldGhvZHNbcnVsZS5uYW1lXSA9IHJ1bGUuZGVmaW5pdGlvbjtcclxuICAgICAgICAgIENvcmUuX01lc3NhZ2VzW3J1bGUubmFtZV0gPSBydWxlLm1lc3NhZ2UgJiYgU2FuYXRpb0NvbnN0YW50c1xyXG4gICAgICAgICAgICAuX1RyaW1GbihydWxlLm1lc3NhZ2UudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgPyBydWxlLm1lc3NhZ2VcclxuICAgICAgICAgICAgOiAnVW5kZWZpbmVkIG1lc3NhZ2UgZm9yICcgKyBydWxlLm5hbWU7XHJcbiAgICAgICAgICBDb3JlLl9SdWxlQm9va1tydWxlLm5hbWVdID0gQ29yZS5fUnVsZVJlZjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3aGlsZSBhZGRpbmcgbWV0aG9kJywgZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX2Rlc3Ryb3kgPSAoKSA6IGJvb2xlYW4gPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMuX21hbmFnZU1zZ3ModHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJDYXBzTXNnKCk7XHJcbiAgICAgICAgdGhpcy5fYXR0YWNoU3VibWl0KGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9hdHRhY2hFdmVudHMoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3N1Ym1pdEhhbmRsZXIgPSB0aGlzLl9kZWZhdWx0U3VibWl0Rm47XHJcbiAgICAgICAgdGhpcy5faSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2RlZmF1bHRGb3JtSW5zdGFuY2UpKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIGRlc3Ryb3lpbmcgdGhlIGluc3RhbmNlJywgZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFN1Ym1pdEZuKCkge1xyXG4gICAgICBpZiAodGhpcy5faS5fZm9ybSkge1xyXG4gICAgICAgIHRoaXNcclxuICAgICAgICAgIC5faVxyXG4gICAgICAgICAgLl9mb3JtXHJcbiAgICAgICAgICAuc3VibWl0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zaG93TXNnKFxyXG4gICAgICBib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2ssXHJcbiAgICAgIHJ1bGVSZWZlcmVuY2UgOiBTYW5hdGlvSW50ZXJmYWNlcy5SdWxlUmVmZXJlbmNlKSA6IHZvaWQge1xyXG5cclxuICAgICAgbGV0IGVycm9yRWxlbWVudCxcclxuICAgICAgICBpY29uRWxlbWVudCxcclxuICAgICAgICBleGlzdGluZ0ljb25FbGVtZW50LFxyXG4gICAgICAgIHBhcmVudEVsZW1lbnQsXHJcbiAgICAgICAgZmlyc3RCb29rO1xyXG5cclxuICAgICAgaWYgKCFib29rLmlzUGFydE9mKSB7XHJcbiAgICAgICAgZmlyc3RCb29rID0gYm9vaztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmaXJzdEJvb2sgPSB0aGlzLl9ib29rQ29sW2Jvb2suaXNQYXJ0T2ZbMF1dO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5faS5fcHJvcHMuY29udGFpbmVyKSB7XHJcbiAgICAgICAgcGFyZW50RWxlbWVudCA9IHRoaXMuX2kuX3Byb3BzLmNvbnRhaW5lcjtcclxuICAgICAgfSBlbHNlIGlmIChmaXJzdEJvb2suY29udGFpbmVyKSB7XHJcbiAgICAgICAgcGFyZW50RWxlbWVudCA9IGZpcnN0Qm9vay5jb250YWluZXI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFyZW50RWxlbWVudCA9IGZpcnN0Qm9vay5wYXJlbnQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICBlcnJvckVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYm9vay5uYW1lICsgJy4nICsgcnVsZVJlZmVyZW5jZS5hbGVydFR5cGUpO1xyXG4gICAgICAgIGlmICghZXJyb3JFbGVtZW50KSB7XHJcbiAgICAgICAgICBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuX2kuX3Byb3BzLmVsZW0pO1xyXG4gICAgICAgICAgZXJyb3JFbGVtZW50LmlubmVySFRNTCA9IHJ1bGVSZWZlcmVuY2UubWVzc2FnZTtcclxuICAgICAgICAgIGVycm9yRWxlbWVudC5jbGFzc05hbWUgPSAnc2FuYXRpby1hbGVydCAnICsgcnVsZVJlZmVyZW5jZS5hbGVydFR5cGUgKyAnICcgKyBib29rLm5hbWU7XHJcbiAgICAgICAgICBpZiAoYm9vay5ub2Rlcykge1xyXG4gICAgICAgICAgICBpZiAocnVsZVJlZmVyZW5jZS5hbGVydFR5cGUgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICBlcnJvckVsZW1lbnQuY2xhc3NOYW1lICs9ICcgJyArIHRoaXMuX2kuX3Byb3BzLm1zZ0U7XHJcbiAgICAgICAgICAgICAgaWNvbkVsZW1lbnQgPSBib29rLmlzSWNvbkFwcGxpY2FibGUgJiYgX1RyaW1Gbih0aGlzLl9pLl9wcm9wcy5pY29uRSkubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcclxuICAgICAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICAgICAgICBpZiAoaWNvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZSA9ICdzYW5hdGlvLWljb24gZXJyb3IgJyArIHRoaXMuX2kuX3Byb3BzLmljb25FO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBfQXJyYXlDYWxsKGJvb2subm9kZXMpLmZvckVhY2goKG5vZGUgOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgX0FkZENsYXNzKG5vZGUsIHRoaXMuX2kuX3Byb3BzLmVsZW1FKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBfQWRkQ2xhc3MoYm9vay5wYXJlbnQgYXMgSFRNTEVsZW1lbnQsIHRoaXMuX2kuX3Byb3BzLnBhcmVudEUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChydWxlUmVmZXJlbmNlLmFsZXJ0VHlwZSA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgICAgZXJyb3JFbGVtZW50LmNsYXNzTmFtZSArPSAnICcgKyB0aGlzLl9pLl9wcm9wcy5tc2dXO1xyXG4gICAgICAgICAgICAgIGljb25FbGVtZW50ID0gYm9vay5pc0ljb25BcHBsaWNhYmxlICYmIF9UcmltRm4odGhpcy5faS5fcHJvcHMuaWNvblcpLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcbiAgICAgICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgICAgICAgaWYgKGljb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSAnc2FuYXRpby1pY29uIHdhcm5pbmcgJyArIHRoaXMuX2kuX3Byb3BzLmljb25XO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBfQXJyYXlDYWxsKGJvb2subm9kZXMpLmZvckVhY2goKG5vZGUgOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgX0FkZENsYXNzKG5vZGUsIHRoaXMuX2kuX3Byb3BzLmVsZW1XKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBfQWRkQ2xhc3MoYm9vay5wYXJlbnQgYXMgSFRNTEVsZW1lbnQsIHRoaXMuX2kuX3Byb3BzLnBhcmVudFcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoYm9vay5wYXJlbnQpIHtcclxuICAgICAgICAgICAgZXhpc3RpbmdJY29uRWxlbWVudCA9IGJvb2sucGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5zYW5hdGlvLWljb24uZXJyb3InKTtcclxuICAgICAgICAgICAgaWYgKCFleGlzdGluZ0ljb25FbGVtZW50ICYmIGljb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgYm9vay5wYXJlbnQuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGVycm9yRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jbGVhck1zZyhcclxuICAgICAgYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rLFxyXG4gICAgICBydWxlUmVmZXJlbmNlIDogU2FuYXRpb0ludGVyZmFjZXMuUnVsZVJlZmVyZW5jZSkgOiB2b2lkIHtcclxuXHJcbiAgICAgIGxldCBlcnJvckVsZW1lbnQsXHJcbiAgICAgICAgaWNvbkVsZW1lbnQsXHJcbiAgICAgICAgcGFyZW50RWxlbWVudCxcclxuICAgICAgICBmaXJzdEJvb2s7XHJcblxyXG4gICAgICBpZiAoIWJvb2suaXNQYXJ0T2YpIHtcclxuICAgICAgICBmaXJzdEJvb2sgPSBib29rO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZpcnN0Qm9vayA9IHRoaXMuX2Jvb2tDb2xbYm9vay5pc1BhcnRPZlswXV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLl9pLl9wcm9wcy5jb250YWluZXIpIHtcclxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gdGhpcy5faS5fcHJvcHMuY29udGFpbmVyO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpcnN0Qm9vay5jb250YWluZXIpIHtcclxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gZmlyc3RCb29rLmNvbnRhaW5lcjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gZmlyc3RCb29rLnBhcmVudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICBlcnJvckVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYm9vay5uYW1lICsgJy4nICsgcnVsZVJlZmVyZW5jZS5hbGVydFR5cGUpO1xyXG4gICAgICAgIGlmIChlcnJvckVsZW1lbnQpIHtcclxuICAgICAgICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXJyb3JFbGVtZW50KTtcclxuICAgICAgICAgIGlmIChib29rLm5vZGVzICYmIGJvb2sucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChydWxlUmVmZXJlbmNlLmFsZXJ0VHlwZSA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgIGljb25FbGVtZW50ID0gYm9va1xyXG4gICAgICAgICAgICAgICAgLnBhcmVudFxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5zYW5hdGlvLWljb24uZXJyb3InKTtcclxuICAgICAgICAgICAgICBfQXJyYXlDYWxsKGJvb2subm9kZXMpLmZvckVhY2goKG5vZGUgOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgX1JlbW92ZUNsYXNzKG5vZGUsIHRoaXMuX2kuX3Byb3BzLmVsZW1FKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBfUmVtb3ZlQ2xhc3MoYm9vay5wYXJlbnQgYXMgSFRNTEVsZW1lbnQsIHRoaXMuX2kuX3Byb3BzLnBhcmVudEUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChydWxlUmVmZXJlbmNlLmFsZXJ0VHlwZSA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgICAgaWNvbkVsZW1lbnQgPSBib29rXHJcbiAgICAgICAgICAgICAgICAucGFyZW50XHJcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLnNhbmF0aW8taWNvbi53YXJuaW5nJyk7XHJcbiAgICAgICAgICAgICAgX0FycmF5Q2FsbChib29rLm5vZGVzKS5mb3JFYWNoKChub2RlIDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIF9SZW1vdmVDbGFzcyhub2RlLCB0aGlzLl9pLl9wcm9wcy5lbGVtVyk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgX1JlbW92ZUNsYXNzKGJvb2sucGFyZW50IGFzIEhUTUxFbGVtZW50LCB0aGlzLl9pLl9wcm9wcy5wYXJlbnRXKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWNvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICBib29rXHJcbiAgICAgICAgICAgICAgICAucGFyZW50XHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zaG93Q2Fwc01zZyhib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2spIDogdm9pZCB7XHJcbiAgICAgIGlmIChib29rLnBhcmVudCkge1xyXG4gICAgICAgIGxldCBleGlzdGluZ0NhcHNFbGVtID0gYm9vay5wYXJlbnQucXVlcnlTZWxlY3RvcignLnNhbmF0aW8tYWxlcnQuaW5mbycpO1xyXG4gICAgICAgIGlmICghZXhpc3RpbmdDYXBzRWxlbSkge1xyXG4gICAgICAgICAgbGV0IGNhcHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLl9pLl9wcm9wcy5lbGVtKTtcclxuICAgICAgICAgIGNhcHNFbGVtZW50LmNsYXNzTmFtZSA9ICdzYW5hdGlvLWFsZXJ0IGluZm8gJyArIHRoaXMuX2kuX3Byb3BzLm1zZ1c7XHJcbiAgICAgICAgICBjYXBzRWxlbWVudC5pbm5lckhUTUwgPSBib29rLmNhcHNsb2NrQ2hlY2subWVzc2FnZTtcclxuICAgICAgICAgIGJvb2sucGFyZW50LmFwcGVuZENoaWxkKGNhcHNFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NsZWFyQ2Fwc01zZyhib29rPyA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rKSA6IHZvaWQge1xyXG4gICAgICBsZXQgdGhpc0Zvcm0gPSB0aGlzLl9pLl9mb3JtO1xyXG4gICAgICBpZiAoYm9vayAmJiBib29rLnBhcmVudCkge1xyXG4gICAgICAgIGxldCBjYXBzRWxlbWVudCA9IGJvb2sucGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5zYW5hdGlvLWFsZXJ0LmluZm8nKTtcclxuICAgICAgICBpZiAoY2Fwc0VsZW1lbnQpIHtcclxuICAgICAgICAgIGJvb2sucGFyZW50LnJlbW92ZUNoaWxkKGNhcHNFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpc0Zvcm0pIHtcclxuICAgICAgICBsZXQgY2Fwc0VsZW1lbnRzID0gdGhpc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLnNhbmF0aW8tYWxlcnQuaW5mbycpLFxyXG4gICAgICAgICAgcGFyZW50Tm9kZSxcclxuICAgICAgICAgIGNhcHNFbGVtZW50c0xlbmd0aCA9IDA7XHJcbiAgICAgICAgaWYgKGNhcHNFbGVtZW50cykge1xyXG4gICAgICAgICAgY2Fwc0VsZW1lbnRzTGVuZ3RoID0gY2Fwc0VsZW1lbnRzLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGNhcHNFbGVtZW50c0xlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHBhcmVudE5vZGUgPSBjYXBzRWxlbWVudHNbY2Fwc0VsZW1lbnRzTGVuZ3RoIC0gMV0ucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2Fwc0VsZW1lbnRzW2NhcHNFbGVtZW50c0xlbmd0aCAtIDFdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNhcHNFbGVtZW50c0xlbmd0aC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFuYWdlTXNncyhzaG91bGRDbGVhckFsbE1zZ3MgOiBib29sZWFuKSA6IHZvaWQge1xyXG4gICAgICAvLyBUT0RPOiBFeHBlbnNpdmUgRE9NIE1hbmlwdWxhdGlvbi4gTmVlZCB0byByZXRoaW5rLlxyXG4gICAgICBsZXQgdGhpc0Jvb2ssXHJcbiAgICAgICAgZXJyb3JGb3VuZCA9IGZhbHNlLFxyXG4gICAgICAgIHdhcm5pbmdGb3VuZCA9IGZhbHNlO1xyXG4gICAgICBpZiAoc2hvdWxkQ2xlYXJBbGxNc2dzKSB7XHJcbiAgICAgICAgX0FycmF5Q2FsbCh0aGlzLl9pLl9zdWJtaXR0ZWQpLmZvckVhY2goKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaykgPT4ge1xyXG4gICAgICAgICAgaWYgKGJvb2suaXNQYXJ0T2YpIHtcclxuICAgICAgICAgICAgX0FycmF5Q2FsbChib29rLmlzUGFydE9mKS5mb3JFYWNoKChuYW1lIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpc0Jvb2sgPSB0aGlzLl9ib29rQ29sW25hbWVdO1xyXG4gICAgICAgICAgICAgIGZvciAobGV0IHJ1bGUgaW4gdGhpc0Jvb2sucnVsZUJvb2spIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzQm9vay5ydWxlQm9vay5oYXNPd25Qcm9wZXJ0eShydWxlKSAmJiB0aGlzQm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJNc2codGhpc0Jvb2ssIHRoaXNCb29rLnJ1bGVCb29rW3J1bGVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcnVsZSBpbiBib29rLnJ1bGVCb29rKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGJvb2sucnVsZUJvb2suaGFzT3duUHJvcGVydHkocnVsZSkgJiYgYm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyTXNnKGJvb2ssIGJvb2sucnVsZUJvb2tbcnVsZV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9BcnJheUNhbGwodGhpcy5faS5fc3VibWl0dGVkKS5mb3JFYWNoKChib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2spID0+IHtcclxuICAgICAgICAgIGlmIChib29rLmlzUGFydE9mKSB7XHJcbiAgICAgICAgICAgIGlmIChib29rLmlzUGFydE9mLmluZGV4T2YoYm9vay5uYW1lKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS1ib29rJywgYm9vayk7XHJcbiAgICAgICAgICAgICAgX0FycmF5Q2FsbChib29rLmlzUGFydE9mKS5ldmVyeSgobmFtZSA6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLW5hbWUgMScsIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpc0Jvb2sgPSB0aGlzLl9ib29rQ29sW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcnVsZSBpbiB0aGlzQm9vay5ydWxlQm9vaykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAodGhpc0Jvb2sucnVsZUJvb2suaGFzT3duUHJvcGVydHkocnVsZSkgJiYgdGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0uYWxlcnRUeXBlID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNCb29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJNc2codGhpc0Jvb2ssIHRoaXNCb29rLnJ1bGVCb29rW3J1bGVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNCb29rLnJ1bGVCb29rWydyZXF1aXJlZCddLmlzUnVsZUF2YWlsYWJsZSAmJiAhdGhpc0Jvb2sucnVsZUJvb2tbJ3JlcXVpcmVkJ10uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd01zZyh0aGlzQm9vaywgdGhpc0Jvb2sucnVsZUJvb2tbJ3JlcXVpcmVkJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3JGb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bGUgIT09ICdyZXF1aXJlZCcgJiYgdGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0uaXNSdWxlQXZhaWxhYmxlICYmICF0aGlzQm9vay5ydWxlQm9va1tydWxlXS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TXNnKHRoaXNCb29rLCB0aGlzQm9vay5ydWxlQm9va1tydWxlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvckZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhZXJyb3JGb3VuZDtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBfQXJyYXlDYWxsKGJvb2suaXNQYXJ0T2YpLmV2ZXJ5KChuYW1lIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tbmFtZSAyJywgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nRm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXNCb29rID0gdGhpcy5fYm9va0NvbFtuYW1lXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHJ1bGUgaW4gdGhpc0Jvb2sucnVsZUJvb2spIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXNCb29rLnJ1bGVCb29rLmhhc093blByb3BlcnR5KHJ1bGUpICYmIHRoaXNCb29rLnJ1bGVCb29rW3J1bGVdLmFsZXJ0VHlwZSA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNCb29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJNc2codGhpc0Jvb2ssIHRoaXNCb29rLnJ1bGVCb29rW3J1bGVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNCb29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSAmJiAhdGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd01zZyh0aGlzQm9vaywgdGhpc0Jvb2sucnVsZUJvb2tbcnVsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2FybmluZ0ZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhd2FybmluZ0ZvdW5kO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBydWxlIGluIGJvb2sucnVsZUJvb2spIHtcclxuICAgICAgICAgICAgICBpZiAoYm9vay5ydWxlQm9vay5oYXNPd25Qcm9wZXJ0eShydWxlKSAmJiBib29rLnJ1bGVCb29rW3J1bGVdLmFsZXJ0VHlwZSA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvb2sucnVsZUJvb2tbcnVsZV0uaXNSdWxlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyTXNnKGJvb2ssIGJvb2sucnVsZUJvb2tbcnVsZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJvb2sucnVsZUJvb2tbJ3JlcXVpcmVkJ10uaXNSdWxlQXZhaWxhYmxlICYmICFib29rLnJ1bGVCb29rWydyZXF1aXJlZCddLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd01zZyhib29rLCBib29rLnJ1bGVCb29rWydyZXF1aXJlZCddKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocnVsZSAhPT0gJ3JlcXVpcmVkJyAmJiBib29rLnJ1bGVCb29rW3J1bGVdLmlzUnVsZUF2YWlsYWJsZSAmJiAhYm9vay5ydWxlQm9va1tydWxlXS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dNc2coYm9vaywgYm9vay5ydWxlQm9va1tydWxlXSk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZm9yIChsZXQgcnVsZSBpbiBib29rLnJ1bGVCb29rKSB7XHJcbiAgICAgICAgICAgIGlmIChib29rLnJ1bGVCb29rLmhhc093blByb3BlcnR5KHJ1bGUpICYmIGJvb2sucnVsZUJvb2tbcnVsZV0uYWxlcnRUeXBlID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgICBpZiAoYm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyTXNnKGJvb2ssIGJvb2sucnVsZUJvb2tbcnVsZV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoYm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBdmFpbGFibGUgJiYgIWJvb2sucnVsZUJvb2tbcnVsZV0uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd01zZyhib29rLCBib29rLnJ1bGVCb29rW3J1bGVdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wb3N0VmFsaWRhdGlvbigpIDogbnVtYmVyIHtcclxuICAgICAgbm9PZkVycm9ycyA9IDA7XHJcbiAgICAgIG5vT2ZXYXJuaW5ncyA9IDA7XHJcblxyXG4gICAgICBfQXJyYXlDYWxsKHRoaXMuX2kuX3N1Ym1pdHRlZCkuZm9yRWFjaCgoYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgcnVsZSBpbiBib29rLnJ1bGVCb29rKSB7XHJcbiAgICAgICAgICBpZiAoYm9vay5ydWxlQm9vay5oYXNPd25Qcm9wZXJ0eShydWxlKSkge1xyXG4gICAgICAgICAgICBpZiAoYm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBdmFpbGFibGUgJiYgYm9vay5ydWxlQm9va1tydWxlXS5hbGVydFR5cGUgPT09ICdlcnJvcicgJiYgIWJvb2sucnVsZUJvb2tbcnVsZV0uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgIG5vT2ZFcnJvcnMrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBdmFpbGFibGUgJiYgYm9vay5ydWxlQm9va1tydWxlXS5hbGVydFR5cGUgPT09ICd3YXJuaW5nJyAmJiAhYm9vay5ydWxlQm9va1tydWxlXS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgbm9PZldhcm5pbmdzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9pLl9lQ291bnQgPSBub09mRXJyb3JzO1xyXG4gICAgICB0aGlzLl9pLl93Q291bnQgPSBub09mV2FybmluZ3M7XHJcblxyXG4gICAgICBpZiAodGhpcy5faS5fcHJvcHMuZm9ybVBvc3QpIHtcclxuICAgICAgICBfQWRkQ2xhc3ModGhpcy5faS5fZm9ybSBhcyBIVE1MRWxlbWVudCwgdGhpcy5faS5fcHJvcHMuZm9ybVBvc3QpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9tYW5hZ2VNc2dzKGZhbHNlKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX2kuX2VDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF92YWxpZGF0ZUFnYWluc3RSdWxlKFxyXG4gICAgICB0aGlzVmFsdWUgOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgQXJyYXkgPCBudW1iZXIgPiB8IHVuZGVmaW5lZCxcclxuICAgICAgYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rLFxyXG4gICAgICBydWxlIDogc3RyaW5nKSA6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgcmV0dXJuIENvcmUuX01ldGhvZHNbcnVsZSBhcyBzdHJpbmddKHRoaXNWYWx1ZSwgYm9vay5ydWxlQm9va1tydWxlXS5wYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZhbGlkYXRlRWxlbShib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2spIDogdm9pZCB7XHJcbiAgICAgIGN1cnJlbnRWYWx1ZSA9IF9FbGVtVmFsdWUoYm9vayk7XHJcbiAgICAgIGZvciAobGV0IHJ1bGUgaW4gYm9vay5ydWxlQm9vaykge1xyXG4gICAgICAgIGlmIChib29rLnJ1bGVCb29rLmhhc093blByb3BlcnR5KHJ1bGUpKSB7XHJcbiAgICAgICAgICBpZiAoYm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBdmFpbGFibGUgJiYgYm9vay5ydWxlQm9va1tydWxlXS5wYXJhbXMpIHtcclxuICAgICAgICAgICAgYm9vay5ydWxlQm9va1tydWxlXS5pc1J1bGVBcHBsaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGJvb2suaWYpIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVBZ2FpbnN0UnVsZShfRWxlbVZhbHVlKGJvb2suaWYpLCBib29rLmlmLCAncmVxdWlyZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgYm9vay5ydWxlQm9va1tydWxlXS5pc1ZhbGlkID0gdGhpcy5fdmFsaWRhdGVBZ2FpbnN0UnVsZShjdXJyZW50VmFsdWUsIGJvb2ssIHJ1bGUpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBib29rLnJ1bGVCb29rW3J1bGVdLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBib29rLnJ1bGVCb29rW3J1bGVdLmlzVmFsaWQgPSB0aGlzLl92YWxpZGF0ZUFnYWluc3RSdWxlKGN1cnJlbnRWYWx1ZSwgYm9vaywgcnVsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFib29rLnJ1bGVCb29rW3J1bGVdLmlzVmFsaWQgJiYgKEFycmF5LmlzQXJyYXkoY3VycmVudFZhbHVlKSB8fCB0eXBlb2YgY3VycmVudFZhbHVlID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgID8gY3VycmVudFZhbHVlLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAgIDogY3VycmVudFZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID09PSAwKSAmJiAhYm9vay5pc1JlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgYm9vay5ydWxlQm9va1tydWxlXS5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc3VibWl0RXZlbnRGbihrZXkgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9va1tdLCBtb3VzZSA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rW10sIGV2ZW50IDogRXZlbnQpIDogdm9pZCB7XHJcblxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBfQXJyYXlDYWxsKGtleSkuZm9yRWFjaCgoYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2kuX3N1Ym1pdHRlZCAmJiAhX0lzSW5Db2xsZWN0aW9uKGJvb2ssIHRoaXMuX2kuX3N1Ym1pdHRlZCkpIHtcclxuICAgICAgICAgIHRoaXMuX2kuX3N1Ym1pdHRlZC5wdXNoKGJvb2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9vay5pc1JlcXVpcmVkIHx8IF9Jc0luQ29sbGVjdGlvbihib29rLCB0aGlzLl9pLl9zdWJtaXR0ZWQpKSB7XHJcbiAgICAgICAgICBpZiAoYm9vay5pc1BhcnRPZikge1xyXG4gICAgICAgICAgICBfQXJyYXlDYWxsKGJvb2suaXNQYXJ0T2YpLmZvckVhY2goKG5hbWUgOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUVsZW0odGhpcy5fYm9va0NvbFtuYW1lXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVFbGVtKGJvb2spO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIF9BcnJheUNhbGwobW91c2UpLmZvckVhY2goKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaykgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9pLl9zdWJtaXR0ZWQgJiYgIV9Jc0luQ29sbGVjdGlvbihib29rLCB0aGlzLl9pLl9zdWJtaXR0ZWQpKSB7XHJcbiAgICAgICAgICB0aGlzLl9pLl9zdWJtaXR0ZWQucHVzaChib29rKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvb2suaXNSZXF1aXJlZCB8fCBfSXNJbkNvbGxlY3Rpb24oYm9vaywgdGhpcy5faS5fc3VibWl0dGVkKSkge1xyXG4gICAgICAgICAgaWYgKGJvb2suaXNQYXJ0T2YpIHtcclxuICAgICAgICAgICAgX0FycmF5Q2FsbChib29rLmlzUGFydE9mKS5mb3JFYWNoKChuYW1lIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVFbGVtKHRoaXMuX2Jvb2tDb2xbbmFtZV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlRWxlbShib29rKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5fcG9zdFZhbGlkYXRpb24oKSA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuX3N1Ym1pdEhhbmRsZXIoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9jdXNFdmVudEZuKCkgOiB2b2lkIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JsdXJFdmVudEZuKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaywgY29taW5nRnJvbUlmIDogYm9vbGVhbikgOiB2b2lkIHtcclxuICAgICAgaWYgKCghYm9vay5pc0NoZWNrYWJsZSAmJiAoX0lzSW5Db2xsZWN0aW9uKGJvb2ssIHRoaXMuX2kuX3N1Ym1pdHRlZCkgfHwgYm9vay5pc1JlcXVpcmVkKSkgfHwgY29taW5nRnJvbUlmKSB7XHJcbiAgICAgICAgaWYgKGJvb2suaXNQYXJ0T2YpIHtcclxuICAgICAgICAgIF9BcnJheUNhbGwoYm9vay5pc1BhcnRPZikuZm9yRWFjaCgobmFtZSA6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUVsZW0odGhpcy5fYm9va0NvbFtuYW1lXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fdmFsaWRhdGVFbGVtKGJvb2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wb3N0VmFsaWRhdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfa2V5dXBFdmVudEZuKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaywgY29taW5nRnJvbUlmIDogYm9vbGVhbikgOiB2b2lkIHtcclxuICAgICAgY29uc3QgdGhpc0V2ZW50ID0gZXZlbnQgYXMgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgY29uc3QgdGhpc0tleWNvZGUgPSB0aGlzRXZlbnQud2hpY2ggfHwgdGhpc0V2ZW50LmtleUNvZGU7XHJcbiAgICAgIGlmICh0aGlzS2V5Y29kZSA9PT0gOSAmJiBfRWxlbVZhbHVlKGJvb2spID09PSAnJyB8fCBfQXJyYXlDYWxsKF9leGNsdWRlZEtleXMpLmluY2x1ZGVzKHRoaXNLZXljb2RlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIGlmIChfSXNJbkNvbGxlY3Rpb24oYm9vaywgdGhpcy5faS5fc3VibWl0dGVkKSB8fCBjb21pbmdGcm9tSWYpIHtcclxuICAgICAgICBpZiAoYm9vay5pc1BhcnRPZikge1xyXG4gICAgICAgICAgX0FycmF5Q2FsbChib29rLmlzUGFydE9mKS5mb3JFYWNoKChuYW1lIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlRWxlbSh0aGlzLl9ib29rQ29sW25hbWVdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl92YWxpZGF0ZUVsZW0oYm9vayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Bvc3RWYWxpZGF0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGJvb2suY2FyZEZvcm1hdHRpbmcuaXNBcHBsaWNhYmxlICYmIGJvb2subm9kZXMpIHtcclxuICAgICAgICAoYm9vay5ub2Rlc1swXSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IF9Gb3JtYXRDYXJkKF9FbGVtVmFsdWUoYm9vayksIGJvb2suY2FyZEZvcm1hdHRpbmcuY2hhcmFjdGVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2tleXByZXNzRXZlbnRGbihib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2spIDogdm9pZCB7XHJcbiAgICAgIGNvbnN0IHRoaXNFdmVudCA9IGV2ZW50IGFzIEtleWJvYXJkRXZlbnQ7XHJcbiAgICAgIGxldCBpc0NhcHNBY3RpdmUgPSAhX0NhcHNsb2NrRm4odGhpc0V2ZW50KTtcclxuXHJcbiAgICAgIGlmIChpc0NhcHNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLl9zaG93Q2Fwc01zZyhib29rKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9jbGVhckNhcHNNc2coYm9vayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jbGlja0V2ZW50Rm4oYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rLCBjb21pbmdGcm9tSWYgOiBib29sZWFuKSA6IHZvaWQge1xyXG4gICAgICBpZiAoX0lzSW5Db2xsZWN0aW9uKGJvb2ssIHRoaXMuX2kuX3N1Ym1pdHRlZCkgfHwgY29taW5nRnJvbUlmKSB7XHJcbiAgICAgICAgaWYgKGJvb2suaXNQYXJ0T2YpIHtcclxuICAgICAgICAgIF9BcnJheUNhbGwoYm9vay5pc1BhcnRPZikuZm9yRWFjaCgobmFtZSA6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUVsZW0odGhpcy5fYm9va0NvbFtuYW1lXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fdmFsaWRhdGVFbGVtKGJvb2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wb3N0VmFsaWRhdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYXR0YWNoU3VibWl0KGFkZE9yRGVsZXRlIDogYm9vbGVhbikgOiB2b2lkIHtcclxuICAgICAgbGV0IGtleWJvYXJkRWxlbWVudEJvb2tzIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2tbXSxcclxuICAgICAgbW91c2VFbGVtZW50Qm9va3MgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9va1tdO1xyXG4gICAgICBpZiAodGhpcy5faS5fZm9ybSAmJiB0aGlzLl9pLl9lbGVtR3Jwcykge1xyXG4gICAgICAgIGtleWJvYXJkRWxlbWVudEJvb2tzID0gdGhpcy5faS5fZWxlbUdycHMua2V5VHlwZXM7XHJcbiAgICAgICAgbW91c2VFbGVtZW50Qm9va3MgPSB0aGlzLl9pLl9lbGVtR3Jwcy5jbGlja1R5cGVzO1xyXG4gICAgICAgIGlmIChhZGRPckRlbGV0ZSkge1xyXG4gICAgICAgICAgdGhpcy5fc3VibWl0Q2xvc3VyZSA9IHRoaXNcclxuICAgICAgICAgICAgLl9zdWJtaXRFdmVudEZuXHJcbiAgICAgICAgICAgIC5iaW5kKHRoaXMsIGtleWJvYXJkRWxlbWVudEJvb2tzLCBtb3VzZUVsZW1lbnRCb29rcyk7XHJcbiAgICAgICAgICB0aGlzXHJcbiAgICAgICAgICAgIC5faVxyXG4gICAgICAgICAgICAuX2Zvcm1cclxuICAgICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuX3N1Ym1pdENsb3N1cmUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCwgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzXHJcbiAgICAgICAgICAgIC5faVxyXG4gICAgICAgICAgICAuX2Zvcm1cclxuICAgICAgICAgICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuX3N1Ym1pdENsb3N1cmUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCwgZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5fc3VibWl0Q2xvc3VyZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2F0dGFjaEtleUV2ZW50cyhcclxuICAgICAgbm9kZXMgOiBOb2RlTGlzdE9mIDwgRWxlbWVudCA+IHwgdW5kZWZpbmVkLFxyXG4gICAgICBib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2ssXHJcbiAgICAgIGFkZE9yRGVsZXRlIDogYm9vbGVhbixcclxuICAgICAgY29taW5nRnJvbUlmIDogYm9vbGVhbikgOiB2b2lkIHtcclxuXHJcbiAgICAgIGlmIChub2Rlcykge1xyXG4gICAgICAgIF9BcnJheUNhbGwobm9kZXMpLmZvckVhY2goKGVsZW0gOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGFkZE9yRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzQ2xvc3VyZSA9IHRoaXNcclxuICAgICAgICAgICAgICAuX2ZvY3VzRXZlbnRGblxyXG4gICAgICAgICAgICAgIC5iaW5kKHRoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5fYmx1ckNsb3N1cmUgPSB0aGlzXHJcbiAgICAgICAgICAgICAgLl9ibHVyRXZlbnRGblxyXG4gICAgICAgICAgICAgIC5iaW5kKHRoaXMsIGJvb2ssIGNvbWluZ0Zyb21JZiwgZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLl9rZXl1cENsb3N1cmUgPSB0aGlzXHJcbiAgICAgICAgICAgICAgLl9rZXl1cEV2ZW50Rm5cclxuICAgICAgICAgICAgICAuYmluZCh0aGlzLCBib29rLCBjb21pbmdGcm9tSWYsIGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5fa2V5cHJlc3NDbG9zdXJlID0gdGhpc1xyXG4gICAgICAgICAgICAgIC5fa2V5cHJlc3NFdmVudEZuXHJcbiAgICAgICAgICAgICAgLmJpbmQodGhpcywgYm9vaywgZXZlbnQpO1xyXG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fZm9jdXNDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9ibHVyQ2xvc3VyZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KTtcclxuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX2tleXVwQ2xvc3VyZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KTtcclxuICAgICAgICAgICAgaWYgKGJvb2suY2Fwc2xvY2tDaGVjay5pc0FwcGxpY2FibGUpIHtcclxuICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5fa2V5cHJlc3NDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fZm9jdXNDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9ibHVyQ2xvc3VyZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KTtcclxuICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX2tleXVwQ2xvc3VyZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KTtcclxuICAgICAgICAgICAgaWYgKGJvb2suY2Fwc2xvY2tDaGVjay5pc0FwcGxpY2FibGUpIHtcclxuICAgICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5fa2V5cHJlc3NDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hdHRhY2hNb3VzZUV2ZW50cyhcclxuICAgICAgbm9kZXMgOiBOb2RlTGlzdE9mIDwgRWxlbWVudCA+IHwgdW5kZWZpbmVkLFxyXG4gICAgICBib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2ssXHJcbiAgICAgIGFkZE9yRGVsZXRlIDogYm9vbGVhbixcclxuICAgICAgY29taW5nRnJvbUlmIDogYm9vbGVhbikgOiB2b2lkIHtcclxuXHJcbiAgICAgIGlmIChub2Rlcykge1xyXG4gICAgICAgIF9BcnJheUNhbGwobm9kZXMpLmZvckVhY2goKGVsZW0gOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGFkZE9yRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWNrQ2xvc3VyZSA9IHRoaXNcclxuICAgICAgICAgICAgICAuX2NsaWNrRXZlbnRGblxyXG4gICAgICAgICAgICAgIC5iaW5kKHRoaXMsIGJvb2ssIGNvbWluZ0Zyb21JZiwgZXZlbnQpO1xyXG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tDbG9zdXJlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrQ2xvc3VyZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2F0dGFjaEV2ZW50cyhhZGRPckRlbGV0ZSA6IGJvb2xlYW4pIDogdm9pZCB7XHJcbiAgICAgIGxldCBrZXlib2FyZEVsZW1lbnRCb29rcyA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rW10sXHJcbiAgICAgIG1vdXNlRWxlbWVudEJvb2tzIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2tbXTtcclxuICAgICAgaWYgKHRoaXMuX2kuX2VsZW1HcnBzKSB7XHJcbiAgICAgICAga2V5Ym9hcmRFbGVtZW50Qm9va3MgPSB0aGlzLl9pLl9lbGVtR3Jwcy5rZXlUeXBlcztcclxuICAgICAgICBtb3VzZUVsZW1lbnRCb29rcyA9IHRoaXMuX2kuX2VsZW1HcnBzLmNsaWNrVHlwZXM7XHJcbiAgICAgICAgX0FycmF5Q2FsbChrZXlib2FyZEVsZW1lbnRCb29rcykuZm9yRWFjaCgoYm9vayA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rLCBpbmRleCA6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fYXR0YWNoS2V5RXZlbnRzKGJvb2subm9kZXMsIGJvb2ssIGFkZE9yRGVsZXRlLCBmYWxzZSk7XHJcbiAgICAgICAgICBpZiAoYm9vay5pZikge1xyXG4gICAgICAgICAgICB0aGlzLl9hdHRhY2hLZXlFdmVudHMoYm9vay5pZi5ub2RlcywgYm9vaywgYWRkT3JEZWxldGUsIHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFhZGRPckRlbGV0ZSAmJiBpbmRleCA9PT0ga2V5Ym9hcmRFbGVtZW50Qm9va3MubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9mb2N1c0Nsb3N1cmUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2JsdXJDbG9zdXJlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9rZXl1cENsb3N1cmUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2tleXByZXNzQ2xvc3VyZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBfQXJyYXlDYWxsKG1vdXNlRWxlbWVudEJvb2tzKS5mb3JFYWNoKChib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2ssIGluZGV4IDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9hdHRhY2hNb3VzZUV2ZW50cyhib29rLm5vZGVzLCBib29rLCBhZGRPckRlbGV0ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgaWYgKGJvb2suaWYpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXR0YWNoTW91c2VFdmVudHMoYm9vay5pZi5ub2RlcywgYm9vaywgYWRkT3JEZWxldGUsIHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFhZGRPckRlbGV0ZSAmJiBpbmRleCA9PT0gbW91c2VFbGVtZW50Qm9va3MubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGlja0Nsb3N1cmUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlRWxlbWVudEJvb2soXHJcbiAgICAgIG5hbWUgOiBzdHJpbmcsXHJcbiAgICAgIGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vayxcclxuICAgICAgaXNDb21pbmdGcm9tSWYgOiBib29sZWFuKSA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rIHtcclxuXHJcbiAgICAgIGxldCBydWxlc0pTT04gOiBzdHJpbmcgfCBvYmplY3QgfCBudWxsLFxyXG4gICAgICAgIHRoaXNFbGVtZW50IDogSFRNTEVsZW1lbnQsXHJcbiAgICAgICAgdGhpc0VsZW1lbnRUYWcgOiBzdHJpbmcsXHJcbiAgICAgICAgdGhpc0VsZW1lbnRUeXBlIDogc3RyaW5nLFxyXG4gICAgICAgIGNhcmRGb3JtYXQgOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGNhcHNsb2NrQ2hlY2sgOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGFsZXJ0Q29udGFpbmVyIDogRWxlbWVudCB8IG51bGw7XHJcblxyXG4gICAgICBib29rLm5hbWUgPSBuYW1lO1xyXG4gICAgICBpZiAodGhpcy5faS5fZm9ybSkge1xyXG4gICAgICAgIGJvb2subm9kZXMgPSB0aGlzXHJcbiAgICAgICAgICAuX2lcclxuICAgICAgICAgIC5fZm9ybVxyXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lPScgKyBfRXNjQ3NzTWV0YShuYW1lKSArICddJyk7XHJcbiAgICAgICAgdGhpc0VsZW1lbnQgPSAoYm9vay5ub2Rlc1tib29rLm5vZGVzLmxlbmd0aCAtIDFdIGFzIEhUTUxFbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpc0VsZW1lbnRUYWcgPSAodGhpc0VsZW1lbnQudGFnTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB0aGlzRWxlbWVudFR5cGUgPSAodGhpc0VsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgYm9vay50YWdOYW1lID0gdGhpc0VsZW1lbnRUYWc7XHJcbiAgICAgICAgYm9vay50YWdUeXBlID0gdGhpc0VsZW1lbnRUeXBlO1xyXG4gICAgICAgIGJvb2sucGFyZW50ID0gX05lYXJlc3RQYXJlbnQodGhpc0VsZW1lbnQsICdbZGF0YS1zYW5hdGlvcGFyZW50XScpO1xyXG5cclxuICAgICAgICBhbGVydENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNhbmF0aW9hbGVydD0nICsgdGhpc0VsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJykgKyAnXScpO1xyXG4gICAgICAgIGlmIChhbGVydENvbnRhaW5lcikge1xyXG4gICAgICAgICAgYm9vay5jb250YWluZXIgPSBhbGVydENvbnRhaW5lciBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhcmRGb3JtYXQgPSB0aGlzRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2FuYXRpb2NhcmRmb3JtYXQnKSB8fCBudWxsO1xyXG4gICAgICAgIGlmIChjYXJkRm9ybWF0KSB7XHJcbiAgICAgICAgICBib29rLmNhcmRGb3JtYXR0aW5nLmlzQXBwbGljYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICBib29rLmNhcmRGb3JtYXR0aW5nLmNoYXJhY3RlciA9IGNhcmRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhcHNsb2NrQ2hlY2sgPSB0aGlzRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2FuYXRpb2NhcHNsb2NrJykgfHwgbnVsbDtcclxuICAgICAgICBpZiAoY2Fwc2xvY2tDaGVjaykge1xyXG4gICAgICAgICAgYm9vay5jYXBzbG9ja0NoZWNrLmlzQXBwbGljYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICBib29rLmNhcHNsb2NrQ2hlY2subWVzc2FnZSA9IGNhcHNsb2NrQ2hlY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29rLmlzQ2hlY2thYmxlID0gKHRoaXNFbGVtZW50VHlwZSA9PT0gJ3JhZGlvJyB8fCB0aGlzRWxlbWVudFR5cGUgPT09ICdjaGVja2JveCcpXHJcbiAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgIDogZmFsc2U7XHJcbiAgICAgICAgYm9vay5pc0NsaWNrYWJsZSA9IChcclxuICAgICAgICAgIHRoaXNFbGVtZW50VHlwZSA9PT0gJ3JhZGlvJyB8fFxyXG4gICAgICAgICAgdGhpc0VsZW1lbnRUeXBlID09PSAnY2hlY2tib3gnIHx8XHJcbiAgICAgICAgICB0aGlzRWxlbWVudFR5cGUgPT09ICdmaWxlJyB8fFxyXG4gICAgICAgICAgdGhpc0VsZW1lbnRUYWcgPT09ICdzZWxlY3QnKVxyXG4gICAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgIGJvb2suaXNTZWxlY3QgPSB0aGlzRWxlbWVudFRhZyA9PT0gJ3NlbGVjdCdcclxuICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgOiBmYWxzZTtcclxuICAgICAgICBib29rLmhhc0NvbnRlbnRFZGl0YWJsZSA9IHRoaXNFbGVtZW50LmdldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJylcclxuICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgOiBmYWxzZTtcclxuICAgICAgICAvLyBUT0RPOiBDb21wYXRpYmlsaXR5IGNoZWNrIGZvciBpY29uc1xyXG4gICAgICAgIGJvb2suaXNJY29uQXBwbGljYWJsZSA9IHRoaXNFbGVtZW50VGFnID09PSAnaW5wdXQnICYmIF9BcnJheUNhbGwoX2VsZW1lbnRzU3VwcG9ydGluZ0ljb25zKS5pbmNsdWRlcyh0aGlzRWxlbWVudFR5cGUpO1xyXG5cclxuICAgICAgICBib29rLnJ1bGVCb29rID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShDb3JlLl9SdWxlQm9vaykpO1xyXG4gICAgICAgIHJ1bGVzSlNPTiA9IHRoaXNFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zYW5hdGlvZWxlbWVudCcpO1xyXG4gICAgICAgIGlmIChydWxlc0pTT04pIHtcclxuICAgICAgICAgIHJ1bGVzSlNPTiA9IEpTT04ucGFyc2UocnVsZXNKU09OLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykpO1xyXG4gICAgICAgICAgX0FycmF5Q2FsbChydWxlc0pTT04pLmV2ZXJ5KChydWxlUmVmIDogU2FuYXRpb0ludGVyZmFjZXMuQ3VzdG9tUHJvcHNFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChydWxlUmVmLnJ1bGUgPT09ICdyZXF1aXJlZCcpIHtcclxuICAgICAgICAgICAgICBib29rLmlzUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgX0FycmF5Q2FsbChydWxlc0pTT04pLmZvckVhY2goKHJ1bGVSZWYgOiBTYW5hdGlvSW50ZXJmYWNlcy5DdXN0b21Qcm9wc0VsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgYm9vay5ydWxlQm9va1tydWxlUmVmLnJ1bGVdLmlzUnVsZUF2YWlsYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGJvb2sucnVsZUJvb2tbcnVsZVJlZi5ydWxlXS5hbGVydFR5cGUgPSBfVHJpbUZuKChydWxlUmVmLmFsZXJ0VHlwZSB8fCAnJykudG9TdHJpbmcoKSkubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgID8gcnVsZVJlZi5hbGVydFR5cGUgPT09ICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICAgPyAnd2FybmluZydcclxuICAgICAgICAgICAgICAgIDogJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgIDogJ2Vycm9yJztcclxuICAgICAgICAgICAgYm9vay5ydWxlQm9va1tydWxlUmVmLnJ1bGVdLm1lc3NhZ2UgPSBfVHJpbUZuKChydWxlUmVmLm1lc3NhZ2UgfHwgJycpLnRvU3RyaW5nKCkpLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgICA/IF9Gb3JtYXRNc2cocnVsZVJlZi5tZXNzYWdlLCBydWxlUmVmLnZhbHVlKVxyXG4gICAgICAgICAgICAgIDogX0Zvcm1hdE1zZyhDb3JlLl9NZXNzYWdlc1tydWxlUmVmLnJ1bGVdLCBydWxlUmVmLnZhbHVlKTtcclxuICAgICAgICAgICAgYm9vay5ydWxlQm9va1tydWxlUmVmLnJ1bGVdLnBhcmFtcyA9IHJ1bGVSZWYudmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChydWxlUmVmLmlmKSB7XHJcbiAgICAgICAgICAgICAgbGV0IGlmRWxlbWVudEJvb2sgPSB0aGlzLl9jcmVhdGVFbGVtZW50Qm9vayhydWxlUmVmLmlmLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9kZWZhdWx0RWxlbWVudEJvb2spKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgaWYgKGlmRWxlbWVudEJvb2spIHtcclxuICAgICAgICAgICAgICAgIGJvb2suaWYgPSBpZkVsZW1lbnRCb29rO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNDb21pbmdGcm9tSWYpIHtcclxuICAgICAgICAgIGJvb2sucnVsZUJvb2tbJ3JlcXVpcmVkJ10ucGFyYW1zID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpIHx8XHJcbiAgICAgICAgICBfQXJyYXlDYWxsKF9lbGVtZW50c0ZvcktleWJvYXJkRXZlbnRzKS5pbmNsdWRlcyh0aGlzRWxlbWVudFRhZykgfHxcclxuICAgICAgICAgIF9BcnJheUNhbGwoX2VsZW1lbnRzRm9yS2V5Ym9hcmRFdmVudHMpLmluY2x1ZGVzKHRoaXNFbGVtZW50VHlwZSkpIHtcclxuXHJcbiAgICAgICAgICBib29rLmtleVR5cGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoX0FycmF5Q2FsbChfZWxlbWVudHNGb3JNb3VzZUV2ZW50cykuaW5jbHVkZXModGhpc0VsZW1lbnRUYWcpIHx8IF9BcnJheUNhbGwoX2VsZW1lbnRzRm9yTW91c2VFdmVudHMpLmluY2x1ZGVzKHRoaXNFbGVtZW50VHlwZSkpIHtcclxuICAgICAgICAgIGJvb2suY2xpY2tUeXBlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGJvb2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9ybUVsZW1Cb29rcyhhbGxFbGVtZW50cyA6IE5vZGVMaXN0T2YgPCBFbGVtZW50ID4sIGFsbEdyb3VwcyA6IEFycmF5IDxBcnJheSA8c3RyaW5nPj4pIDogdm9pZCB7XHJcbiAgICAgIGxldCBlbGVtZW50TmFtZXMgOiBzdHJpbmdbXSA9IFtdLFxyXG4gICAgICAgIGtleWJvYXJkRWxlbWVudEJvb2tzIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2tbXSA9IFtdLFxyXG4gICAgICAgIG1vdXNlRWxlbWVudEJvb2tzIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2tbXSA9IFtdLFxyXG4gICAgICAgIGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vayxcclxuICAgICAgICBwYXJ0T2ZHcm91cCA6IEFycmF5IDxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgICBfQXJyYXlDYWxsKGFsbEVsZW1lbnRzKS5mb3JFYWNoKChlbGVtZW50IDogRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnROYW1lcy5wdXNoKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgJycpO1xyXG4gICAgICB9KTtcclxuICAgICAgZWxlbWVudE5hbWVzID0gZWxlbWVudE5hbWVzXHJcbiAgICAgICAgLnNvcnQoKVxyXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0sIHBvc2l0aW9uLCBhcnJheSkge1xyXG4gICAgICAgICAgcmV0dXJuICFwb3NpdGlvbiB8fCBpdGVtICE9PSBhcnJheVtwb3NpdGlvbiAtIDFdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBfQXJyYXlDYWxsKGVsZW1lbnROYW1lcykuZm9yRWFjaCgobmFtZSA6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGJvb2sgPSB0aGlzLl9jcmVhdGVFbGVtZW50Qm9vayhuYW1lLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9kZWZhdWx0RWxlbWVudEJvb2spKSwgZmFsc2UpO1xyXG4gICAgICAgIF9BcnJheUNhbGwoYWxsR3JvdXBzKS5ldmVyeSgoYXJyIDogQXJyYXk8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgaWYgKF9BcnJheUNhbGwoYXJyKS5maWx0ZXIoKHRoaXNOYW1lIDogc3RyaW5nKSA9PiB0aGlzTmFtZSA9PT0gYm9vay5uYW1lKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHBhcnRPZkdyb3VwID0gYXJyO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocGFydE9mR3JvdXAubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgYm9vay5pc1BhcnRPZiA9IHBhcnRPZkdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9vay5rZXlUeXBlKSB7XHJcbiAgICAgICAgICBrZXlib2FyZEVsZW1lbnRCb29rcy5wdXNoKGJvb2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9vay5jbGlja1R5cGUpIHtcclxuICAgICAgICAgIG1vdXNlRWxlbWVudEJvb2tzLnB1c2goYm9vayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Jvb2tDb2xbbmFtZV0gPSBib29rO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuX2kuX2VsZW1HcnBzLmtleVR5cGVzID0ga2V5Ym9hcmRFbGVtZW50Qm9va3M7XHJcbiAgICAgIHRoaXMuX2kuX2VsZW1HcnBzLmNsaWNrVHlwZXMgPSBtb3VzZUVsZW1lbnRCb29rcztcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRFbGVtKCkgOiB2b2lkIHtcclxuICAgICAgaWYgKHRoaXMuX2kuX2Zvcm0pIHtcclxuICAgICAgICBjb25zdCBhbGxFbGVtZW50cyA6IE5vZGVMaXN0T2YgPCBFbGVtZW50ID4gPSB0aGlzXHJcbiAgICAgICAgICAuX2lcclxuICAgICAgICAgIC5fZm9ybVxyXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNhbmF0aW9lbGVtZW50XScpLFxyXG4gICAgICAgICAgYWxsR3JvdXBzRGVmIDogTm9kZUxpc3RPZiA8IEVsZW1lbnQgPiA9IHRoaXMuX2kuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2FuYXRpb2dyb3VwXScpO1xyXG4gICAgICAgIGxldCBhbGxHcm91cHMgOiBBcnJheSA8QXJyYXkgPHN0cmluZz4+ID0gW107XHJcblxyXG4gICAgICAgIGlmIChhbGxHcm91cHNEZWYpIHtcclxuICAgICAgICAgIF9BcnJheUNhbGwoYWxsR3JvdXBzRGVmKS5mb3JFYWNoKChlbGVtZW50IDogRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ3JvdXBFbGVtTmFtZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zYW5hdGlvZ3JvdXAnKTtcclxuICAgICAgICAgICAgaWYgKGdyb3VwRWxlbU5hbWVzKSB7XHJcbiAgICAgICAgICAgICAgZ3JvdXBFbGVtTmFtZXMgPSBKU09OLnBhcnNlKGdyb3VwRWxlbU5hbWVzKTtcclxuICAgICAgICAgICAgICBpZiAoZ3JvdXBFbGVtTmFtZXMgJiYgQXJyYXkuaXNBcnJheShncm91cEVsZW1OYW1lcykpIHtcclxuICAgICAgICAgICAgICAgIGFsbEdyb3Vwcy5wdXNoKGdyb3VwRWxlbU5hbWVzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZm9ybUVsZW1Cb29rcyhhbGxFbGVtZW50cywgYWxsR3JvdXBzKTtcclxuICAgICAgICB0aGlzLl9hdHRhY2hFdmVudHModHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fYXR0YWNoU3VibWl0KHRydWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0KCkgOiB2b2lkIHtcclxuICAgICAgICBsZXQgY3VzdG9tUHJvcHMgOiBTYW5hdGlvSW50ZXJmYWNlcy5DdXN0b21Qcm9wc0hUTUwgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgY3VzdG9tUHJvcHNBdHRyIDogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgaWYgKHRoaXMuX2kuX2Zvcm0pIHtcclxuICAgICAgICB0aGlzXHJcbiAgICAgICAgICAuX2lcclxuICAgICAgICAgIC5fZm9ybVxyXG4gICAgICAgICAgLnNldEF0dHJpYnV0ZSgnbm92YWxpZGF0ZScsICdub3ZhbGlkYXRlJyk7XHJcbiAgICAgICAgY3VzdG9tUHJvcHNBdHRyID0gdGhpc1xyXG4gICAgICAgICAgLl9pXHJcbiAgICAgICAgICAuX2Zvcm1cclxuICAgICAgICAgIC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2FuYXRpb2N1c3RvbScpO1xyXG4gICAgICAgIGlmIChjdXN0b21Qcm9wc0F0dHIgJiYgX1RyaW1GbihjdXN0b21Qcm9wc0F0dHIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGN1c3RvbVByb3BzID0gSlNPTi5wYXJzZShjdXN0b21Qcm9wc0F0dHIpO1xyXG4gICAgICAgICAgaWYgKGN1c3RvbVByb3BzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2kuX3Byb3BzID0ge1xyXG4gICAgICAgICAgICAgIGZvcm1QcmU6IGN1c3RvbVByb3BzLmZvcm1WYWxpZGF0aW9uQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgZm9ybVBvc3Q6IGN1c3RvbVByb3BzLmZvcm1Qb3N0VmFsaWRhdGlvbkNsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICAgIHBhcmVudFM6IGN1c3RvbVByb3BzLnBhcmVudFN1Y2Nlc3NDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBwYXJlbnRFOiBjdXN0b21Qcm9wcy5wYXJlbnRFcnJvckNsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICAgIHBhcmVudFc6IGN1c3RvbVByb3BzLnBhcmVudFdhcm5pbmdDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBpY29uUzogY3VzdG9tUHJvcHMuaWNvblN1Y2Nlc3NDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBpY29uRTogY3VzdG9tUHJvcHMuaWNvbkVycm9yQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgaWNvblc6IGN1c3RvbVByb3BzLmljb25XYXJuaW5nQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgZWxlbVM6IGN1c3RvbVByb3BzLmVsZW1lbnRTdWNjZXNzQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgZWxlbUU6IGN1c3RvbVByb3BzLmVsZW1lbnRFcnJvckNsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICAgIGVsZW1XOiBjdXN0b21Qcm9wcy5lbGVtZW50V2FybmluZ0NsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICAgIG1zZ1M6IGN1c3RvbVByb3BzLm1lc3NhZ2VTdWNjZXNzQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgbXNnRTogY3VzdG9tUHJvcHMubWVzc2FnZUVycm9yQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgICAgbXNnVzogY3VzdG9tUHJvcHMubWVzc2FnZVdhcm5pbmdDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgICBlbGVtOiBjdXN0b21Qcm9wcy5hbGVydEVsZW1lbnQgfHwgJ2RpdicsXHJcbiAgICAgICAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGN1c3RvbVByb3BzLmNvbnRhaW5lcilcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1c3RvbVByb3BzICYmIGN1c3RvbVByb3BzLmZvcm1WYWxpZGF0aW9uQ2xhc3MpIHtcclxuICAgICAgICAgIF9BZGRDbGFzcyh0aGlzLl9pLl9mb3JtIGFzIEhUTUxFbGVtZW50LCBjdXN0b21Qcm9wcy5mb3JtVmFsaWRhdGlvbkNsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZ2V0RWxlbSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIENvcmUuX2FkZFJ1bGUoQmFua2NhcmRSdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoRGF0ZVJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShEYXRlSVNPUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKERpZ2l0c1J1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShFbWFpbFJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShFcXVhbHNUb1J1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShNYXhSdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoTWF4TGVuZ3RoUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKE1heE9wdGlvbnNSdWxlLlNhbmF0aW9SdWxlLlJ1bGUpO1xyXG4gIENvcmUuX2FkZFJ1bGUoTWluUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKE1pbkxlbmd0aFJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShNaW5PcHRpb25zUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKE51bWJlclJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShQYXR0ZXJuUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKFJhbmdlUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKFJhbmdlTGVuZ3RoUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKFJhbmdlT3B0aW9uc1J1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShSZXF1aXJlZFJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbiAgQ29yZS5fYWRkUnVsZShTdGVwUnVsZS5TYW5hdGlvUnVsZS5SdWxlKTtcclxuICBDb3JlLl9hZGRSdWxlKFVSTFJ1bGUuU2FuYXRpb1J1bGUuUnVsZSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NvcmUudHMiLCJpbXBvcnQgeyBTYW5hdGlvSW50ZXJmYWNlcyB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XHJcbmV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb0NvbnN0YW50cyB7XHJcbiAgbGV0IHZhbCA6IGFueSxcclxuICAgIGlkeCA6IGFueTtcclxuICBsZXQgY3VycmVudFZhbHVlLFxyXG4gICAgbWF0Y2hlcyxcclxuICAgIG1hdGNoLFxyXG4gICAgcGFydHMsXHJcbiAgICBjb3VudCxcclxuICAgIHZhbHVlTGVuZ3RoO1xyXG4gIGxldCBrZXlDb2RlLFxyXG4gICAgc2hpZnRLZXk7XHJcbiAgZXhwb3J0IGNvbnN0IF9SdWxlUmVmIDogU2FuYXRpb0ludGVyZmFjZXMuUnVsZVJlZmVyZW5jZSA9IHtcclxuICAgIGlzUnVsZUF2YWlsYWJsZTogZmFsc2UsXHJcbiAgICBpc1J1bGVBcHBsaWVkOiBmYWxzZSxcclxuICAgIGFsZXJ0VHlwZTogJycsXHJcbiAgICBpc1ZhbGlkOiBmYWxzZSxcclxuICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgcGFyYW1zOiAnJ1xyXG4gIH07XHJcbiAgZXhwb3J0IGNvbnN0IF9NZXRob2RCb29rIDogU2FuYXRpb0ludGVyZmFjZXMuTWV0aG9kQm9vayA9IHt9O1xyXG4gIGV4cG9ydCBjb25zdCBfTWVzc2FnZUJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5NZXNzYWdlQm9vayA9IHt9O1xyXG4gIGV4cG9ydCBjb25zdCBfUnVsZUJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5SdWxlQm9vayA9IHt9O1xyXG4gIGV4cG9ydCBjb25zdCBfRWxlbUJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vayA9IHtcclxuICAgIGlmOiB1bmRlZmluZWQsXHJcbiAgICBpc0NoZWNrYWJsZTogZmFsc2UsXHJcbiAgICBpc0NsaWNrYWJsZTogZmFsc2UsXHJcbiAgICBpc0ljb25BcHBsaWNhYmxlOiBmYWxzZSxcclxuICAgIGlzU2VsZWN0OiBmYWxzZSxcclxuICAgIGlzUmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgY2FyZEZvcm1hdHRpbmc6IHtcclxuICAgICAgaXNBcHBsaWNhYmxlOiBmYWxzZSxcclxuICAgICAgY2hhcmFjdGVyOiAnJ1xyXG4gICAgfSxcclxuICAgIGNhcHNsb2NrQ2hlY2s6IHtcclxuICAgICAgaXNBcHBsaWNhYmxlOiBmYWxzZSxcclxuICAgICAgbWVzc2FnZTogJydcclxuICAgIH0sXHJcbiAgICBoYXNDb250ZW50RWRpdGFibGU6IGZhbHNlLFxyXG4gICAgbmFtZTogJycsXHJcbiAgICBub2RlczogdW5kZWZpbmVkLFxyXG4gICAgcGFyZW50OiB1bmRlZmluZWQsXHJcbiAgICBjb250YWluZXI6IHVuZGVmaW5lZCxcclxuICAgIHJ1bGVCb29rOiBfUnVsZUJvb2ssXHJcbiAgICB0YWdOYW1lOiAnJyxcclxuICAgIHRhZ1R5cGU6ICcnLFxyXG4gICAga2V5VHlwZTogZmFsc2UsXHJcbiAgICBjbGlja1R5cGU6IGZhbHNlLFxyXG4gICAgaXNQYXJ0T2Y6IHVuZGVmaW5lZFxyXG4gIH07XHJcbiAgZXhwb3J0IGNvbnN0IF9JbnN0YW5jZSA6IFNhbmF0aW9JbnRlcmZhY2VzLkZvcm1JbnN0YW5jZSA9IHtcclxuICAgIF9mb3JtOiB1bmRlZmluZWQsXHJcbiAgICBfcHJvcHM6IHtcclxuICAgICAgZm9ybVByZTogJycsXHJcbiAgICAgIGZvcm1Qb3N0OiAnJyxcclxuICAgICAgcGFyZW50UzogJycsXHJcbiAgICAgIHBhcmVudEU6ICcnLFxyXG4gICAgICBwYXJlbnRXOiAnJyxcclxuICAgICAgaWNvblM6ICcnLFxyXG4gICAgICBpY29uRTogJycsXHJcbiAgICAgIGljb25XOiAnJyxcclxuICAgICAgZWxlbVM6ICcnLFxyXG4gICAgICBlbGVtRTogJycsXHJcbiAgICAgIGVsZW1XOiAnJyxcclxuICAgICAgbXNnUzogJycsXHJcbiAgICAgIG1zZ0U6ICcnLFxyXG4gICAgICBtc2dXOiAnJyxcclxuICAgICAgZWxlbTogJ2RpdicsXHJcbiAgICAgIGNvbnRhaW5lcjogbnVsbFxyXG4gICAgfSxcclxuICAgIF9lbGVtR3Jwczoge1xyXG4gICAgICBrZXlUeXBlczogW10sXHJcbiAgICAgIGNsaWNrVHlwZXM6IFtdXHJcbiAgICB9LFxyXG4gICAgX3N1Ym1pdHRlZDogW10sXHJcbiAgICBfZUNvdW50OiAwLFxyXG4gICAgX3dDb3VudDogMFxyXG4gIH07XHJcbiAgZXhwb3J0IGNvbnN0IF9LZXlFbGVtIDogc3RyaW5nW10gPSBbXHJcbiAgICAndGV4dCcsXHJcbiAgICAncGFzc3dvcmQnLFxyXG4gICAgJ2NvbG9yJyxcclxuICAgICdkYXRlJyxcclxuICAgICdkYXRldGltZS1sb2NhbCcsXHJcbiAgICAnZW1haWwnLFxyXG4gICAgJ21vbnRoJyxcclxuICAgICdudW1iZXInLFxyXG4gICAgJ3JhbmdlJyxcclxuICAgICdzZWFyY2gnLFxyXG4gICAgJ3RlbCcsXHJcbiAgICAndGltZScsXHJcbiAgICAndXJsJyxcclxuICAgICd3ZWVrJyxcclxuICAgICdyYWRpbycsXHJcbiAgICAnY2hlY2tib3gnLFxyXG4gICAgJ2ZpbGUnLFxyXG4gICAgJ2J1dHRvbicsXHJcbiAgICAnc2VsZWN0JyxcclxuICAgICd0ZXh0YXJlYScsXHJcbiAgICAnY29udGVudGVkaXRhYmxlJ1xyXG4gIF07XHJcbiAgZXhwb3J0IGNvbnN0IF9Nb3VzZUVsZW0gOiBzdHJpbmdbXSA9IFsncmFkaW8nLCAnY2hlY2tib3gnLCAnZmlsZScsICdzZWxlY3QnXTtcclxuICAvKiBBdm9pZCByZXZhbGlkYXRlIHRoZSBmaWVsZCB3aGVuIHByZXNzaW5nIG9uZSBvZiB0aGUgZm9sbG93aW5nIGtleXNcclxuICAgICAgKiBTaGlmdCAgICAgICA9PiAxNlxyXG4gICAgICAqIEN0cmwgICAgICAgID0+IDE3XHJcbiAgICAgICogQWx0ICAgICAgICAgPT4gMThcclxuICAgICAgKiBDYXBzIGxvY2sgICA9PiAyMFxyXG4gICAgICAqIEVuZCAgICAgICAgID0+IDM1XHJcbiAgICAgICogSG9tZSAgICAgICAgPT4gMzZcclxuICAgICAgKiBMZWZ0IGFycm93ICA9PiAzN1xyXG4gICAgICAqIFVwIGFycm93ICAgID0+IDM4XHJcbiAgICAgICogUmlnaHQgYXJyb3cgPT4gMzlcclxuICAgICAgKiBEb3duIGFycm93ICA9PiA0MFxyXG4gICAgICAqIEluc2VydCAgICAgID0+IDQ1XHJcbiAgICAgICogTnVtIGxvY2sgICAgPT4gMTQ0XHJcbiAgICAgICogQWx0R3Iga2V5ICAgPT4gMjI1XHJcbiAgICAgICovXHJcbiAgZXhwb3J0IGNvbnN0IF9leGNsdWRlZEtleXMgOiBudW1iZXJbXSA9IFtcclxuICAgIDE2LFxyXG4gICAgMTcsXHJcbiAgICAxOCxcclxuICAgIDIwLFxyXG4gICAgMzUsXHJcbiAgICAzNixcclxuICAgIDM3LFxyXG4gICAgMzgsXHJcbiAgICAzOSxcclxuICAgIDQwLFxyXG4gICAgNDUsXHJcbiAgICAxNDQsXHJcbiAgICAyMjVcclxuICBdO1xyXG4gIGV4cG9ydCBjb25zdCBfSWNvbmljRWxlbSA6IHN0cmluZ1tdID0gWyd0ZXh0JywgJ3Bhc3N3b3JkJ107XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBkZXRlY3QgdGhlIGNhcHNsb2NrIGtleVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGV4cG9ydCBjb25zdCBfQ2Fwc2xvY2tGbiA6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKGV2ZW50IDogS2V5Ym9hcmRFdmVudCkgOiBib29sZWFuIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBrZXlDb2RlID0gZXZlbnQua2V5Q29kZVxyXG4gICAgICAgID8gZXZlbnQua2V5Q29kZVxyXG4gICAgICAgIDogZXZlbnQud2hpY2g7XHJcbiAgICAgIHNoaWZ0S2V5ID0gZXZlbnQuc2hpZnRLZXlcclxuICAgICAgICA/IGV2ZW50LnNoaWZ0S2V5XHJcbiAgICAgICAgOiAoKGtleUNvZGUgPT09IDE2KVxyXG4gICAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgICA6IGZhbHNlKTtcclxuICAgICAgcmV0dXJuICEoKCgoa2V5Q29kZSA+PSA2NSAmJiBrZXlDb2RlIDw9IDkwKSAmJiAhc2hpZnRLZXkpIHx8ICgoa2V5Q29kZSA+PSA5NyAmJiBrZXlDb2RlIDw9IDEyMikgJiYgc2hpZnRLZXkpKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gcmV0dXJuIHRyaW1tZWQgc3RyaW5nXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX1RyaW1GbiA6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKHN0ciA6IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN0ciAmJiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHN0ciA9PT0gJ251bWJlcicpID8gc3RyLnRvU3RyaW5nKCkucmVwbGFjZSgvXlxccyt8XFxzKyQvZ20sICcnKSA6ICcnO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBwb2x5ZmlsbCBmb3IgTWF0Y2hlcyBmdW5jdGlvbiB0byBmaW5kIHRoZSBjbG9zZXN0IGVsZW1lbnRcclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX01hdGNoZXNQb2x5ZmlsbCA6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKCkgOiB2b2lkIHtcclxuICAgIEhUTUxFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gSFRNTEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXNcclxuICAgICAgfHwgSFRNTEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yXHJcbiAgICAgIHx8IEhUTUxFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XHJcbiAgICBpZiAoIUhUTUxFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XHJcbiAgICAgIEhUTUxFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKHNlbGVjdG9yIDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRoaXNFbGVtZW50ID0gdGhpcztcclxuICAgICAgICBpZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyh0aGlzRWxlbWVudCkpIHtcclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICBpZiAodGhpc0VsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNFbGVtZW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpc0VsZW1lbnQgPSAodGhpc0VsZW1lbnQucGFyZW50RWxlbWVudCB8fCB0aGlzRWxlbWVudC5wYXJlbnROb2RlKWFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIH0gd2hpbGUgKHRoaXNFbGVtZW50ICE9PSBudWxsICYmIHRoaXNFbGVtZW50Lm5vZGVUeXBlID09PSAxKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gZmluZCBhbmQgcmV0dXJuIHRoZSBjbG9zZXN0IGVsZW1lbnQgb3IgbnVsbCBiYXNlZCBvbiB0aGUgc2VsZWN0b3IgYW5kIGN1cnJlbnQgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gICAqIEByZXR1cm5zIHsoRWxlbWVudCB8IG51bGwpfVxyXG4gICAqL1xyXG4gIGV4cG9ydCBjb25zdCBfTmVhcmVzdFBhcmVudCA6IEZ1bmN0aW9uID0gZnVuY3Rpb24gKGVsZW0gOiBIVE1MRWxlbWVudCwgc2VsZWN0b3IgOiBzdHJpbmcpIDogRWxlbWVudCB8IG51bGwge1xyXG4gICAgcmV0dXJuIGVsZW0gJiYgZWxlbSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgPyBlbGVtLmNsb3Nlc3Qoc2VsZWN0b3IpIDogbnVsbDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gZm9ybWF0IHRoZSBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZCBhcyBlcnJvciBvciB3YXJuaW5nXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxyXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGV4cG9ydCBjb25zdCBfRm9ybWF0TXNnIDogRnVuY3Rpb24gPSBmdW5jdGlvbiAobWVzc2FnZSA6IHN0cmluZywgdmFsdWUgOiBhbnkpIDogc3RyaW5nIHtcclxuICAgIGlmIChtZXNzYWdlICYmIHZhbHVlKSB7XHJcbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnRvU3RyaW5nKCk7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBtZXNzYWdlID0gbWVzc2FnZS5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFx7MFxcXFx9JywgJ2cnKSwgdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZS5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFx7JyArIGkgKyAnXFxcXH0nLCAnZycpLCB2YWx1ZVtpXS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIHBhcnNlIHRoZSBjb2xsZWN0aW9uIGFzIGFuIEFycmF5XHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IGFyclxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAqL1xyXG4gIGV4cG9ydCBjb25zdCBfQXJyYXlDYWxsIDogRnVuY3Rpb24gPSBmdW5jdGlvbiAoYXJyIDogYW55KSA6IEFycmF5PGFueT4ge1xyXG4gICAgcmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID4gMCA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikgOiBbXTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gZmluZCB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2t9IGJvb2tcclxuICAgKiBAcmV0dXJucyB7KHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIgfCBBcnJheSA8IG51bWJlciA+IHwgdW5kZWZpbmVkKX1cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX0VsZW1WYWx1ZSA6IEZ1bmN0aW9uXHJcbiAgICA9IGZ1bmN0aW9uIChib29rIDogU2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2spIDogc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlciB8IEFycmF5IDwgbnVtYmVyID4gfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKGJvb2sgJiYgYm9vay5ub2Rlcykge1xyXG4gICAgICBpZiAoYm9vay5pc0NoZWNrYWJsZSkge1xyXG4gICAgICAgIHJldHVybiBfQXJyYXlDYWxsKGJvb2subm9kZXMpLmZpbHRlcigoZWwgOiBhbnkpID0+IGVsLmNoZWNrZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChib29rLmlzU2VsZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9BcnJheUNhbGwoKGJvb2subm9kZXNbMF1hcyBIVE1MU2VsZWN0RWxlbWVudCkub3B0aW9ucykuZmlsdGVyKChvcHRpb24gOiBIVE1MT3B0aW9uRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZCAmJiBvcHRpb24udmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGJvb2suaGFzQ29udGVudEVkaXRhYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9UcmltRm4oKChib29rLm5vZGVzWzBdYXMgYW55KS5pbm5lckhUTUwpLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YWwgPSAoYm9vay5ub2Rlc1swXWFzIGFueSkudmFsdWU7XHJcblxyXG4gICAgICBpZiAoYm9vay50YWdUeXBlID09PSAnZmlsZScpIHtcclxuICAgICAgICAvLyBNb2Rlcm4gYnJvd3NlciAoY2hyb21lICYgc2FmYXJpKVxyXG4gICAgICAgIGlmICh2YWwuc3Vic3RyKDAsIDEyKSA9PT0gJ0M6XFxcXGZha2VwYXRoXFxcXCcpIHtcclxuICAgICAgICAgIHJldHVybiBfVHJpbUZuKHZhbC5zdWJzdHIoMTIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTGVnYWN5IGJyb3dzZXJzIFVuaXgtYmFzZWQgcGF0aFxyXG4gICAgICAgIGlkeCA9IHZhbC5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgICAgIGlmIChpZHggPj0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIF9UcmltRm4odmFsLnN1YnN0cihpZHggKyAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFdpbmRvd3MtYmFzZWQgcGF0aFxyXG4gICAgICAgIGlkeCA9IHZhbC5sYXN0SW5kZXhPZignXFxcXCcpO1xyXG4gICAgICAgIGlmIChpZHggPj0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIF9UcmltRm4odmFsLnN1YnN0cihpZHggKyAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEp1c3QgdGhlIGZpbGUgbmFtZVxyXG4gICAgICAgIHJldHVybiBfVHJpbUZuKHZhbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBfVHJpbUZuKHZhbC5yZXBsYWNlKC9cXHIvZywgJycpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWw7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGVzY2FwZSB0aGUgbWV0YSBjaGFyYWN0ZXJzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX0VzY0Nzc01ldGEgOiBGdW5jdGlvbiA9IGZ1bmN0aW9uIChzdHIgOiBzdHJpbmcpIDogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHIgJiYgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIucmVwbGFjZSgvKFtcXFxcIVwiIyQlJicoKSorLC4vOjs8PT4/QFxcW1xcXV5ge3x9fl0pL2csICdcXFxcJDEnKSA6ICcnO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBjaGVjayBpZiB0aGUgZWxlbWVudCBoYXMgYSBjbGFzc05hbWUgYXR0YWNoZWQgdG8gaXRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGV4cG9ydCBjb25zdCBfSGFzQ2xhc3MgOiBGdW5jdGlvbiA9IGZ1bmN0aW9uIChlbCA6IEhUTUxFbGVtZW50LCBjbGFzc05hbWUgOiBzdHJpbmcpIDogYm9vbGVhbiB7XHJcbiAgICBpZiAoZWwgJiYgZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBjbGFzc05hbWUgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgaWYgKGVsLmNsYXNzTGlzdCkge1xyXG4gICAgICAgIHJldHVybiBlbFxyXG4gICAgICAgICAgLmNsYXNzTGlzdFxyXG4gICAgICAgICAgLmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICEhZWxcclxuICAgICAgICAgIC5jbGFzc05hbWVcclxuICAgICAgICAgIC5tYXRjaChuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgY2xhc3NOYW1lICsgJyhcXFxcc3wkKScpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBhZGQgY2xhc3NOYW1lKHMpIHRvIGFuIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAgICogQHBhcmFtIHsqfSBjbGFzc05hbWVcclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX0FkZENsYXNzIDogRnVuY3Rpb24gPSBmdW5jdGlvbiAoZWwgOiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lIDogYW55KSA6IHZvaWQge1xyXG4gICAgaWYgKGVsICYmIGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgY2xhc3NOYW1lICYmIHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGlmIChfVHJpbUZuKGNsYXNzTmFtZSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG4gICAgICAgIGZvciAobGV0IG5hbWUgaW4gY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIGVsXHJcbiAgICAgICAgICAgICAgLmNsYXNzTGlzdFxyXG4gICAgICAgICAgICAgIC5hZGQoY2xhc3NOYW1lW25hbWVdKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoIV9IYXNDbGFzcyhlbCwgY2xhc3NOYW1lW25hbWVdKSkge1xyXG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lW25hbWVdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byByZW1vdmUgY2xhc3NOYW1lKHMpIGZyb20gYW4gZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICAgKiBAcGFyYW0geyp9IGNsYXNzTmFtZVxyXG4gICAqL1xyXG4gIGV4cG9ydCBjb25zdCBfUmVtb3ZlQ2xhc3MgOiBGdW5jdGlvbiA9IGZ1bmN0aW9uIChlbCA6IEhUTUxFbGVtZW50LCBjbGFzc05hbWUgOiBhbnkpIDogdm9pZCB7XHJcbiAgICBpZiAoZWwgJiYgZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBjbGFzc05hbWUgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgaWYgKF9UcmltRm4oY2xhc3NOYW1lKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBjbGFzc05hbWUpIHtcclxuICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgZWxcclxuICAgICAgICAgICAgICAuY2xhc3NMaXN0XHJcbiAgICAgICAgICAgICAgLnJlbW92ZShjbGFzc05hbWVbbmFtZV0pO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfSGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNsYXNzTmFtZVtuYW1lXSArICcoXFxcXHN8JCknKTtcclxuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWxcclxuICAgICAgICAgICAgICAuY2xhc3NOYW1lXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UocmVnLCAnICcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBjaGVjayBpZiB0aGUgZWxlbWVudCBpcyBwcmVzZW50IGluIHN1cHBsaWVkIGNvbGxlY3Rpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U2FuYXRpb0ludGVyZmFjZXMuRWxlbWVudEJvb2t9IGJvb2tcclxuICAgKiBAcGFyYW0ge1NhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rW119IGNvbGxlY3Rpb25cclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgX0lzSW5Db2xsZWN0aW9uIDogRnVuY3Rpb25cclxuICAgID0gZnVuY3Rpb24gKGJvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaywgY29sbGVjdGlvbiA6IFNhbmF0aW9JbnRlcmZhY2VzLkVsZW1lbnRCb29rW10pIDogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gYm9vayAmJiBjb2xsZWN0aW9uICYmIGJvb2submFtZVxyXG4gICAgICA/IF9BcnJheUNhbGwoY29sbGVjdGlvbikuc29tZSgodGhpc0Jvb2sgOiBTYW5hdGlvSW50ZXJmYWNlcy5FbGVtZW50Qm9vaykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNCb29rLm5hbWUgPT09IGJvb2submFtZTtcclxuICAgICAgICB9KVxyXG4gICAgICA6IGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBmb3JtYXQgdGhlIEJhbmsgY2FyZCB2YWx1ZSBiYXNlZCBvbiB0aGUgc2VwYXJhdG9yIHBhc3NlZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlcGFyYXRvclxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgZXhwb3J0IGNvbnN0IF9Gb3JtYXRDYXJkIDogRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFsdWUgOiBzdHJpbmcsIHNlcGFyYXRvciA6IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgY3VycmVudFZhbHVlID0gdmFsdWVcclxuICAgICAgLnJlcGxhY2UoL1xccysvZywgJycpXHJcbiAgICAgIC5yZXBsYWNlKC9bXjAtOV0vZ2ksICcnKTtcclxuICAgICAgbWF0Y2hlcyA9IGN1cnJlbnRWYWx1ZS5tYXRjaCgvXFxkezQsMTd9L2cpO1xyXG4gICAgICBtYXRjaCA9IG1hdGNoZXMgJiYgbWF0Y2hlc1swXSB8fCAnJztcclxuICAgICAgcGFydHMgPSBbXTtcclxuICAgICAgc2VwYXJhdG9yID0gc2VwYXJhdG9yICYmIHR5cGVvZiBzZXBhcmF0b3IgPT09ICdzdHJpbmcnID8gc2VwYXJhdG9yIDogJy0nO1xyXG4gICAgICBmb3IgKGNvdW50ID0gMCwgdmFsdWVMZW5ndGggPSBtYXRjaC5sZW5ndGg7IGNvdW50IDwgdmFsdWVMZW5ndGg7IGNvdW50ICs9IDQpIHtcclxuICAgICAgICBwYXJ0cy5wdXNoKG1hdGNoLnN1YnN0cmluZyhjb3VudCwgY291bnQgKyA0KSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBhcnRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKHNlcGFyYXRvcik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ29uc3RhbnRzLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgbGV0IGx1aG5TdW0sXHJcbiAgICBsdWhuVmFsLFxyXG4gICAgbHVobkxlbixcclxuICAgIGx1aG5CaXQ7XHJcbiAgY29uc3QgcmVnZXggOiBSZWdFeHAgPSBuZXcgUmVnRXhwKCdeKD86KDRbMC05XXsxMn0oPzpbMC05XXszfSk/KXwoNVsxLTVdWzAtOV17MTR9KXwoNig/OjAxMXw1WzAtOV17Mn0pWzAtOV17MTJ9KXwoMycgK1xyXG4gICAgICAgICdbNDddWzAtOV17MTN9KXwoMyg/OjBbMC01XXxbNjhdWzAtOV0pWzAtOV17MTF9KXwoKD86MjEzMXwxODAwfDM1WzAtOV17M30pWzAtOV17MScgK1xyXG4gICAgICAgICcxfSkpJCcpLFxyXG4gICAgaXNMdWhuQ2hlY2tWYWxpZCA9IGZ1bmN0aW9uIChsdWhuIDogc3RyaW5nKSA6IGJvb2xlYW4ge1xyXG4gICAgICBsdWhuU3VtID0gMDtcclxuICAgICAgbHVoblZhbCA9IDE7XHJcbiAgICAgIGx1aG5MZW4gPSBsdWhuLmxlbmd0aDtcclxuICAgICAgd2hpbGUgKGx1aG5MZW4tLSkge1xyXG4gICAgICAgIGx1aG5CaXQgPSBwYXJzZUludChsdWhuLmNoYXJBdChsdWhuTGVuKSwgMTApICogbHVoblZhbDtcclxuICAgICAgICBsdWhuU3VtICs9IGx1aG5CaXQgLSAobHVobkJpdCA+IDlcclxuICAgICAgICAgID8gMVxyXG4gICAgICAgICAgOiAwKSAqIDk7XHJcbiAgICAgICAgbHVoblZhbCBePSAzO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAobHVoblN1bSAlIDEwID09PSAwKSAmJiAobHVoblN1bSA+IDApO1xyXG4gICAgfTtcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdiYW5rY2FyZCcsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICByZXR1cm4gcGFyYW1zXHJcbiAgICAgICAgPyB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHJlZ2V4LnRlc3QodmFsdWUucmVwbGFjZSgvWyAtXS9nLCAnJykpICYmIGlzTHVobkNoZWNrVmFsaWQodmFsdWUucmVwbGFjZSgvWyAtXS9nLCAnJykpIHx8IGZhbHNlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgY2FyZCBudW1iZXIuJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL2JhbmtjYXJkLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgY29uc3QgcmVnZXggOiBSZWdFeHAgPSAvSW52YWxpZHxOYU4vO1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ2RhdGUnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgICAgID8gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAhcmVnZXgudGVzdChuZXcgRGF0ZSh2YWx1ZSkudG9TdHJpbmcoKSkgfHwgZmFsc2VcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9kYXRlLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgY29uc3QgaXNvUmVnZXggOiBSZWdFeHAgPSAvXlxcZHs0fVtcXC9cXC1dKDA/WzEtOV18MVswMTJdKVtcXC9cXC1dKDA/WzEtOV18WzEyXVswLTldfDNbMDFdKSQvLFxyXG4gICAgcmVnZXggOiBSZWdFeHAgPSAvSW52YWxpZHxOYU4vO1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ2RhdGVJU08nLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgICAgID8gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiBpc29SZWdleC50ZXN0KHZhbHVlKSAmJiAhcmVnZXgudGVzdChuZXcgRGF0ZSh2YWx1ZSkudG9TdHJpbmcoKSkgfHwgZmFsc2VcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlIChJU08pLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9kYXRlSVNPLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgY29uc3QgcmVnZXggPSAvXlxcZCskLztcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdkaWdpdHMnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgICAgID8gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiByZWdleC50ZXN0KHZhbHVlKSB8fCBmYWxzZVxyXG4gICAgICAgIDogZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBvbmx5IGRpZ2l0cy4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvZGlnaXRzLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgY29uc3QgcmVnZXggOiBSZWdFeHAgPSAvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsM30pKyQvO1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ2VtYWlsJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiBwYXJhbXNcclxuICAgICAgICA/IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVnZXgudGVzdCh2YWx1ZSkgfHwgZmFsc2VcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9lbWFpbC50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGxldCBlbGVtO1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ2VxdWFsc3RvJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbaWQ9JyArIHBhcmFtcyArICddJyk7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnICYmIGVsZW0gJiYgZWxlbS52YWx1ZSA9PT0gdmFsdWUgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciB0aGUgc2FtZSB2YWx1ZSBhZ2Fpbi4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvZXF1YWxzdG8udHMiLCJleHBvcnQgbmFtZXNwYWNlIFNhbmF0aW9SdWxlIHtcclxuICBsZXQgb3B0aW9uRWxlbWVudDtcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdtYXgnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3B0aW9uRWxlbWVudCA9IHZhbHVlWzBdIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICAgICAgcmV0dXJuIE51bWJlcihvcHRpb25FbGVtZW50LnZhbHVlKSA8PSBOdW1iZXIocGFyYW1zKSB8fCBmYWxzZTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpIDw9IE51bWJlcihwYXJhbXMpIHx8IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsdWUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHswfS4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvbWF4LnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnbWF4bGVuZ3RoJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJyAmJiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgJiYgdmFsdWUubGVuZ3RoIDw9IHBhcmFtcyB8fCBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIG5vIG1vcmUgdGhhbiB7MH0gY2hhcmFjdGVycy4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvbWF4bGVuZ3RoLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnbWF4b3B0aW9ucycsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpICYmIHZhbHVlLmxlbmd0aCA8PSBwYXJhbXMgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBzZWxlY3Qgbm8gbW9yZSB0aGFuIHswfSBvcHRpb24ocykuJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL21heG9wdGlvbnMudHMiLCJleHBvcnQgbmFtZXNwYWNlIFNhbmF0aW9SdWxlIHtcclxuICBsZXQgb3B0aW9uRWxlbWVudDtcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdtaW4nLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3B0aW9uRWxlbWVudCA9IHZhbHVlWzBdIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICAgICAgcmV0dXJuIE51bWJlcihvcHRpb25FbGVtZW50LnZhbHVlKSA+PSBOdW1iZXIocGFyYW1zKSB8fCBmYWxzZTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpID49IE51bWJlcihwYXJhbXMpIHx8IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsdWUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHswfS4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvbWluLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnbWlubGVuZ3RoJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJyAmJiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgJiYgdmFsdWUubGVuZ3RoID49IHBhcmFtcyB8fCBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9taW5sZW5ndGgudHMiLCJleHBvcnQgbmFtZXNwYWNlIFNhbmF0aW9SdWxlIHtcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdtaW5vcHRpb25zJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJyAmJiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgJiYgdmFsdWUubGVuZ3RoID49IHBhcmFtcyB8fCBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIHNlbGVjdCBhdCBsZWFzdCB7MH0gb3B0aW9uKHMpLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9taW5vcHRpb25zLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgY29uc3QgcmVnZXggOiBSZWdFeHAgPSAvXig/Oi0/XFxkK3wtP1xcZHsxLDN9KD86LFxcZHszfSkrKT8oPzpcXC5cXGQrKT8kLztcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICdudW1iZXInLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgICAgID8gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiByZWdleC50ZXN0KHZhbHVlKSB8fCBmYWxzZVxyXG4gICAgICAgIDogZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlci4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvbnVtYmVyLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAncGF0dGVybicsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICYmIHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgJiYgbmV3IFJlZ0V4cChwYXJhbXMpLnRlc3QodmFsdWUpIHx8IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdTb3JyeSwgdGhpcyBkb2VzblxcJ3QgbWF0Y2ggd2l0aCB0aGUgZXhwZWN0ZWQgcGF0dGVybi4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvcGF0dGVybi50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGxldCBvcHRpb25FbGVtZW50O1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ3JhbmdlJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG9wdGlvbkVsZW1lbnQgPSB2YWx1ZVswXSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAgIHJldHVybiAoTnVtYmVyKG9wdGlvbkVsZW1lbnQudmFsdWUpID49IE51bWJlcihwYXJhbXNbMF0pICYmIE51bWJlcihvcHRpb25FbGVtZW50LnZhbHVlKSA8PSBOdW1iZXIocGFyYW1zWzFdKSkgfHwgZmFsc2U7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkgPj0gTnVtYmVyKHBhcmFtc1swXSkgJiYgTnVtYmVyKHZhbHVlKSA8PSBOdW1iZXIocGFyYW1zWzFdKSkgfHwgZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9LidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9yYW5nZS50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ3JhbmdlbGVuZ3RoJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBhcmFtcylcclxuICAgICAgICAmJiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSlcclxuICAgICAgICAmJiB2YWx1ZS5sZW5ndGggPj0gcGFyYW1zWzBdXHJcbiAgICAgICAgJiYgdmFsdWUubGVuZ3RoIDw9IHBhcmFtc1sxXSB8fCBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsdWUgYmV0d2VlbiB7MH0gYW5kIHsxfSBjaGFyYWN0ZXJzIGxvbmcuJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL3JhbmdlbGVuZ3RoLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBTYW5hdGlvUnVsZSB7XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAncmFuZ2VvcHRpb25zJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBhcmFtcylcclxuICAgICAgICAmJiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSlcclxuICAgICAgICAmJiB2YWx1ZS5sZW5ndGggPj0gcGFyYW1zWzBdXHJcbiAgICAgICAgJiYgdmFsdWUubGVuZ3RoIDw9IHBhcmFtc1sxXSB8fCBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIHNlbGVjdCB7MH0gdG8gezF9IG9wdGlvbnMuJ1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3J1bGVzL3Jhbmdlb3B0aW9ucy50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGV4cG9ydCBjb25zdCBSdWxlID0ge1xyXG4gICAgbmFtZTogJ3JlcXVpcmVkJyxcclxuICAgIGRlZmluaXRpb246IGZ1bmN0aW9uICh2YWx1ZSA6IGFueSwgcGFyYW1zIDogYW55KSB7XHJcbiAgICAgIHJldHVybiBwYXJhbXNcclxuICAgICAgICA/ICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSAmJiB2YWx1ZS5sZW5ndGggPiAwXHJcbiAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6ICdUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy9yZXF1aXJlZC50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIGxldCBzdGVwRGVjaW1hbFBsYWNlcyxcclxuICAgIHN0ZXBGbk1hdGNoO1xyXG4gIGNvbnN0IGdldFN0ZXBEZWNpbWFsUGxhY2VzID0gZnVuY3Rpb24gKG51bSA6IG51bWJlcikge1xyXG4gICAgc3RlcEZuTWF0Y2ggPSBudWxsO1xyXG4gICAgc3RlcEZuTWF0Y2ggPSAoJycgKyBudW0pLm1hdGNoKC8oPzpcXC4oXFxkKykpPyQvKTtcclxuICAgIGlmICghc3RlcEZuTWF0Y2gpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RlcEZuTWF0Y2hbMV1cclxuICAgICAgPyBzdGVwRm5NYXRjaFsxXS5sZW5ndGhcclxuICAgICAgOiAwO1xyXG4gIH07XHJcbiAgY29uc3QgZ2V0U3RlcFRvSW50ID0gZnVuY3Rpb24gKG51bSA6IG51bWJlciwgZGVjaW1hbHMgOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKG51bSAqIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG4gIH07XHJcbiAgZXhwb3J0IGNvbnN0IFJ1bGUgPSB7XHJcbiAgICBuYW1lOiAnc3RlcCcsXHJcbiAgICBkZWZpbml0aW9uOiBmdW5jdGlvbiAodmFsdWUgOiBhbnksIHBhcmFtcyA6IGFueSkge1xyXG4gICAgICBzdGVwRGVjaW1hbFBsYWNlcyA9IGdldFN0ZXBEZWNpbWFsUGxhY2VzKHBhcmFtcyk7XHJcbiAgICAgIHJldHVybiAhKGdldFN0ZXBEZWNpbWFsUGxhY2VzKHZhbHVlKSA+IHN0ZXBEZWNpbWFsUGxhY2VzXHJcbiAgICAgICAgfHwgZ2V0U3RlcFRvSW50KHZhbHVlLCBzdGVwRGVjaW1hbFBsYWNlcykgJSBnZXRTdGVwVG9JbnQodmFsdWUsIHN0ZXBEZWNpbWFsUGxhY2VzKSAhPT0gMCkgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhIG11bHRpcGxlIG9mIHswfS4nXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcnVsZXMvc3RlcC50cyIsImV4cG9ydCBuYW1lc3BhY2UgU2FuYXRpb1J1bGUge1xyXG4gIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2RwZXJpbmkvNzI5Mjk0IEF1dGhvcjogRGllZ28gUGVyaW5pIFVwZGF0ZWQ6XHJcbiAgLy8gMjAxMC8xMi8wNSBMaWNlbnNlOiBNSVRcclxuICAvL1xyXG4gIC8vIENvcHlyaWdodCAoYykgMjAxMC0yMDEzIERpZWdvIFBlcmluaSAoaHR0cDovL3d3dy5pcG9ydC5pdClcclxuICBjb25zdCByZWdleCA6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICtcclxuICAvLyBwcm90b2NvbCBpZGVudGlmaWVyXHJcbiAgJyg/Oig/Omh0dHBzP3xmdHApOi8vKScgK1xyXG4gIC8vIHVzZXI6cGFzcyBhdXRoZW50aWNhdGlvblxyXG4gICcoPzpcXFxcUysoPzo6XFxcXFMqKT9AKT8oPzonICtcclxuICAvLyBJUCBhZGRyZXNzIGV4Y2x1c2lvbiBwcml2YXRlICYgbG9jYWwgbmV0d29ya3NcclxuICAnKD8hKD86MTB8MTI3KSg/OlxcXFwuXFxcXGR7MSwzfSl7M30pKD8hKD86MTY5XFxcXC4yNTR8MTkyXFxcXC4xNjgpKD86XFxcXC5cXFxcZHsxLDN9KXsyfSkoPyEnICtcclxuICAgICAgJzE3MlxcXFwuKD86MVs2LTldfDJcXFxcZHwzWzAtMV0pKD86XFxcXC5cXFxcZHsxLDN9KXsyfSknICtcclxuICAvLyBJUCBhZGRyZXNzIGRvdHRlZCBub3RhdGlvbiBvY3RldHMgZXhjbHVkZXMgbG9vcGJhY2sgbmV0d29yayAwLjAuMC4wIGV4Y2x1ZGVzXHJcbiAgLy8gcmVzZXJ2ZWQgc3BhY2UgPj0gMjI0LjAuMC4wIGV4Y2x1ZGVzIG5ldHdvcmsgJiBicm9hY2FzdCBhZGRyZXNzZXMgKGZpcnN0ICZcclxuICAvLyBsYXN0IElQIGFkZHJlc3Mgb2YgZWFjaCBjbGFzcylcclxuICAnKD86WzEtOV1cXFxcZD98MVxcXFxkXFxcXGR8MlswMV1cXFxcZHwyMlswLTNdKSg/OlxcXFwuKD86MT9cXFxcZHsxLDJ9fDJbMC00XVxcXFxkfDI1WzAtNV0pKXsyfScgK1xyXG4gICAgICAnKD86XFxcXC4oPzpbMS05XVxcXFxkP3wxXFxcXGRcXFxcZHwyWzAtNF1cXFxcZHwyNVswLTRdKSl8JyArXHJcbiAgLy8gaG9zdCBuYW1lXHJcbiAgJyg/Oig/OlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XS0qKSpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV0rKScgK1xyXG4gIC8vIGRvbWFpbiBuYW1lXHJcbiAgJyg/OlxcXFwuKD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldLSopKlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XSspKicgK1xyXG4gIC8vIFRMRCBpZGVudGlmaWVyXHJcbiAgJyg/OlxcXFwuKD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmZdezIsfSkpJyArXHJcbiAgLy8gVExEIG1heSBlbmQgd2l0aCBkb3RcclxuICAnXFxcXC4/KScgK1xyXG4gIC8vIHBvcnQgbnVtYmVyXHJcbiAgJyg/OjpcXFxcZHsyLDV9KT8nICtcclxuICAvLyByZXNvdXJjZSBwYXRoXHJcbiAgJyg/OlsvPyNdXFxcXFMqKT8kJywgJ2knKTtcclxuICBleHBvcnQgY29uc3QgUnVsZSA9IHtcclxuICAgIG5hbWU6ICd1cmwnLFxyXG4gICAgZGVmaW5pdGlvbjogZnVuY3Rpb24gKHZhbHVlIDogYW55LCBwYXJhbXMgOiBhbnkpIHtcclxuICAgICAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZHBlcmluaS83MjkyOTQgQXV0aG9yOiBEaWVnb1xyXG4gICAgICAvLyBQZXJpbmkgVXBkYXRlZDogMjAxMC8xMi8wNSBMaWNlbnNlOiBNSVRcclxuICAgICAgLy9cclxuICAgICAgLy8gQ29weXJpZ2h0IChjKSAyMDEwLTIwMTMgRGllZ28gUGVyaW5pIChodHRwOi8vd3d3Lmlwb3J0Lml0KVxyXG4gICAgICByZXR1cm4gcGFyYW1zXHJcbiAgICAgICAgPyB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHJlZ2V4LnRlc3QodmFsdWUpIHx8IGZhbHNlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgVVJMLidcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ydWxlcy91cmwudHMiXSwic291cmNlUm9vdCI6IiJ9