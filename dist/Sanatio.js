"use strict";
exports.__esModule = true;
var Core_1 = require("./Core");
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
//# sourceMappingURL=Sanatio.js.map