import { SanatioCore } from './Core';
import { SanatioInterfaces } from './Interfaces';
/**
 * Sanatio plugin Namespace
 * @namespace Sanatio
 */
export namespace Sanatio {
  let _instances : SanatioInterfaces.SanatioInstance[] = [];

  /**
   * The main Vaidator Class
   *
   * @export
   * @class Validator
   */
  export class Validator {

    private static _instance : Validator;

    /**
     * Creates an instance of Validator.
     * @memberof Validator
     */
    constructor() {
      // this._instances = [];
    }

    /**
     * Public Method to get the singleton instance of Validator Class
     *
     * @static
     * @returns {Validator}
     * @memberof Validator
     */
    public static getInstance = () : Validator => {
      if (!Validator._instance) {
        Validator._instance = new Validator();
      }
      return Validator._instance;
    }

    /**
     * Public method to initialize the Validator into the formid and return the instance methods
     *
     * @param {string} formId
     * @returns {object}
     * @memberof Validator
     */
    public init = (formId : string) : SanatioInterfaces.GlobalFunctions | boolean => {
      return this._workOnCoreForm(formId, true);
    }

    public destroy = (formId : string) : SanatioInterfaces.GlobalFunctions | boolean => {
      return this._workOnCoreForm(formId, false);
    }

    /**
     * Public method to add custom rule to the Global Validator Core
     *
     * @param {object} rule
     * @returns {void}
     * @memberof Validator
     */
    public addRule = (rule : SanatioInterfaces.RuleStructure) : void => {
      SanatioCore
        .Core
        ._addRule(rule);
      return;
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
    private _workOnCoreForm(formId : string, initOrDestroy : boolean) : SanatioInterfaces.GlobalFunctions | boolean {
      try {
        const isFormAvailable : boolean = Array
          .prototype
          .slice
          .call(_instances)
          .some((currentForm : SanatioInterfaces.SanatioInstance) => currentForm.id === formId);
        let thisFormElement : Element | null,
          returnObj : SanatioCore.Core | undefined;

        if (!isFormAvailable && initOrDestroy) {
          thisFormElement = document.querySelector('#' + formId);
          if (thisFormElement) {
            let sanatioCore : SanatioCore.Core,
              newInstance : SanatioInterfaces.SanatioInstance;

            sanatioCore = new SanatioCore.Core(thisFormElement as HTMLFormElement);
            newInstance = {
              id: formId,
              coreElement: sanatioCore
            };
            _instances.push(newInstance);
            returnObj = _instances.filter((instance : SanatioInterfaces.SanatioInstance) => instance.id === formId)[0].coreElement;
          }
          if (returnObj) {
            return returnObj.globals;
          } else {
            throw ReferenceError('Form element is not present.');
          }
        } else if (isFormAvailable && !initOrDestroy) {
          returnObj = _instances.filter((instance : SanatioInterfaces.SanatioInstance) => instance.id === formId)[0].coreElement;
          if (returnObj && returnObj._destroy()) {
            _instances = _instances.filter(instance => instance.id !== formId);
            return true;
          }
        }
        return true;
      } catch (e) {
        console.error('Sanatio encountered some error.', e);
        return false;
      }
    }
  }
}
