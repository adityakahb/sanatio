import { SanatioCore } from './Core';
export namespace SanatioInterfaces {
  export interface SanatioInstance {
    id : string;
    coreElement : SanatioCore.Core | undefined;
  }
  export interface GlobalFunctions {
    getNumberOfErrors : Function;
    getNumberOfWarnings : Function;
    submitHandler : Function;
  }
  export interface RuleStructure {
    name : string;
    definition : Function;
    message : string;
  }
  export interface RuleReference {
    isRuleAvailable : boolean;
    isRuleApplied : boolean;
    alertType : string;
    isValid : boolean;
    message : string;
    params : any;
  }
  export interface MethodBook {
    [index : string] : Function;
  }
  export interface MessageBook {
    [index : string] : string;
  }
  export interface RuleBook {
    [index : string] : RuleReference;
  }
  export interface CardFormat {
    isApplicable : boolean;
    character : string;
  }
  export interface CapslockCheck {
    isApplicable : boolean;
    message : string;
  }
  export interface ElementBook {
    if : ElementBook | undefined;
    isCheckable : boolean;
    isClickable : boolean;
    isIconApplicable : boolean;
    isSelect : boolean;
    isRequired : boolean;
    cardFormatting : CardFormat;
    capslockCheck : CapslockCheck;
    hasContentEditable : boolean;
    name : string;
    nodes : NodeListOf < Element > | undefined;
    parent : HTMLElement | undefined;
    container : HTMLElement | undefined;
    ruleBook : RuleBook;
    tagName : string;
    tagType : string;
    keyType : boolean;
    clickType : boolean;
    isPartOf : Array <string> | undefined;
  }
  export interface BookCollection {
    [index : string] : ElementBook;
  }
  export interface SegregatedElements {
    keyTypes : ElementBook[];
    clickTypes : ElementBook[];
  }
  export interface CustomPropsCore {
    formPre : string;
    formPost : string;
    parentS : string;
    parentE : string;
    parentW : string;
    iconS : string;
    iconE : string;
    iconW : string;
    elemS : string;
    elemE : string;
    elemW : string;
    msgS : string;
    msgE : string;
    msgW : string;
    elem : string;
    container : HTMLElement | null;
  }
  export interface CustomPropsHTML {
    formValidationClass : string;
    formPostValidationClass : string;
    parentSuccessClass : string;
    parentErrorClass : string;
    parentWarningClass : string;
    iconSuccessClass : string;
    iconErrorClass : string;
    iconWarningClass : string;
    elementSuccessClass : string;
    elementErrorClass : string;
    elementWarningClass : string;
    messageSuccessClass : string;
    messageErrorClass : string;
    messageWarningClass : string;
    alertElement : string;
    container : string;
  }
  export interface CustomPropsElement {
    rule : string;
    value : boolean | number | Array < number > | string;
    message : string;
    alertType : string;
    if : string;
  }
  export interface FormInstance {
    _form : HTMLFormElement | undefined;
    _props : CustomPropsCore;
    _elemGrps : SegregatedElements;
    _submitted : ElementBook[];
    _eCount : number;
    _wCount : number;
  }
}
