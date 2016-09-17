/*!
 * Sanatio Validator v1.1.7
 */
(function ( $ ) {
  
  'use strict';
  var thisSanatioObject,
    defaultApplicableRules = [
      'capslock',
      'required',
      'pattern',
      'email',
      'digits',
      'url',
      'minvalue',
      'maxvalue',
      'minlength',
      'maxlength',
      'luhn',
      'creditcard',
      'date',
      'dateformat',
      'equalthisto',
      'rangelength',
      'rangevalue'
    ];
    // Avoid revalidate the field when pressing one of the following keys
    // Enter       => 13 ==> Not used
    // Shift       => 16
    // Ctrl        => 17
    // Alt         => 18
    // Caps lock   => 20 ==> NOT USED
    // End         => 35
    // Home        => 36
    // Left arrow  => 37
    // Up arrow    => 38
    // Right arrow => 39
    // Down arrow  => 40
    // Insert      => 45
    // Num lock    => 144
    // AltGr key   => 225
  var excludedKeys = [16, 17, 18, 35, 36, 37, 38, 39, 40, 45, 144, 225],
    emailRegex = new RegExp('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$', 'i'),
    urlRegex = new RegExp( '^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$', 'i'),
    digitsRegex = new RegExp('^\\d+$'),
    creditcardFormatRegex = new RegExp('.{1,4}', 'g'),
    creditcardRegex = new RegExp('^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$'),
    patternRegex;
    
  var typeEvents = 'focusin.sanatio focusout.sanatio keyup.sanatio keypress.sanatio keydown.sanatio',
    typeFields = ':text, [type=password], select, textarea, [type=number], [type=search], [type=tel], [type=url], [type=email], [type=datetime], [type=date], [type=month], [type=week], [type=time], [type=datetime-local], [type=range], [type=color], [type=radio], [type=checkbox], [contenteditable]',
    changeEvents = 'change.sanatio',
    changeFields = 'select, option, [type=file], [type=radio], [type=checkbox]';
    
  var eventFn,
    localValidator,
    localEventType,
    localSettings,
    localElementObj;
  
  var defaultElements,
    defaultElementCount,
    defaultElementObj,
    elementsToValidate;
 
  var formElement,
    formSettings,
    sanatioElementsPattern = 'data-sanatio',
    thisElement,
    thisMessage,
    thisMessagePlaceholder,
    addedMessage,
    tempObj,
    tempObj2,
    tempErrorObj,
    tempWarnObj,
    isItemPresent,
    ifConditionPresent,
    ifConditionObj,
    ifConditionArr = [];
  
  var defaultRulesCount,
    cnt,
    outerCnt,
    innerCnt,
    rootCnt,
    msgCnt,
    errorsCount,
    warningsCount,
    showThisElement;
  
  var creditCardValue,
    creditCardTestValue,
    creditCardMatch,
    capsLock,
    listeners,
    isMac,
    priorCapsLock,
    charCode,
    index;
  
  var isThisFormValid = {},
    isElemValid = {};
  
  var checkedElements;
  
  var luhnLen,
    luhnBit,
    luhnSum,
    luhnVal;
  
  var elementsLength = 0,
    errorElement,
    errorElementProps,
    jsonedValue,
    localError,
    localWarning,
    localErrorType,
    localWarningType,
    insertedErrorElement,
    insertedWarningElement;
  
  var passToSubmitHandler;
  
  var momentJSWarning = 'Sanatio uses MomentJS to validate the date values. Please check if the MomentJS plugin file is included and referred correctly.\nVisit http://momentjs.com/ for more information.';

  var putOnConsole = function (str, type){
    if( window.console ) {
        console[type]( str );
    }
  };
  /**
  * Function to check for Luhn Algorithm for Credit Card
  * @param credit card number inserted by user
  * @return true if Luhn Algorithm holds true else false
  */
  var sanatioLuhnCheck = (function (arr) {
    return function (ccNum) {
      luhnLen = ccNum.length;
      luhnBit = 1;
      luhnSum = 0;

      while (luhnLen) {
        luhnVal = parseInt( ccNum.charAt(--luhnLen), 10 );
        luhnSum += (luhnBit ^= 1) ? arr[luhnVal] : luhnVal;
      }

      return luhnSum && luhnSum % 10 === 0;
    };
  }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));
  
  /**
  * Function to trim value of typable form element
  * @param value inserted by the user
  * @return trimmed value
  */
  var sanatioTrimmedValue = function (value) {
    try {
      return typeof value === 'string' ? value.replace( /^\s+|\s+$/g, '' ) : value;
    } catch (e){
      return value;
    }
  };
  
  /**
  * Function to return the value of a form element
  * @param form element
  * @return length in case of checkbox or radio & value in case of typable, select or file inputs
  */
  var sanatioReturnValue = function (element){
    if (element.attr('type') === 'checkbox' || element.attr('type') === 'radio'){
      checkedElements = 0;
      $.each(element, function (){
        if ( $(this).is(':checked') ){
          checkedElements++;
        }
      });
      
      return checkedElements;
    } else if (element.prop('tagName').toLowerCase() === 'select'){
      if ($.type(element.val()) === 'array'){  
        return sanatioTrimmedValue(element.val().join().replace(/,/g, '')).length;
      } else {
        return sanatioTrimmedValue(element.val());
      }
    } else {
      return sanatioTrimmedValue(element.val());
    }
    
    return '';
  };
  
  /**
  * Function to return the length of a form element
  * @param form element
  * @return length in case of checkbox or radio & length of the value in case of typable, select or file inputs
  */
  var sanatioReturnLength = function (element){
    if (element.attr('type') === 'checkbox' || element.attr('type') === 'radio'){
      checkedElements = 0;
      $.each(element, function (){
        if ( $(this).is(':checked') ){
          checkedElements++;
        }
      });
      
      return checkedElements;
    } else if (element.prop('tagName').toLowerCase() === 'select'){
      if ($.type(element.val()) === 'array'){
        return sanatioTrimmedValue(element.val().join().replace(/,/g, '')).length;
      } else {
        return sanatioTrimmedValue(element.val()).length;
      }
    } else {
      return sanatioTrimmedValue(element.val()).length;
    }
    
    return 0;
  };
  
  /**
  * Function to format the message in case it has replacable values
  * @param message, values which need to be replaced
  * @return formatted message
  */
  var sanatioFormattedMessage = function (message, value){
    value = JSON.parse(value);
    
    if ($.type(value) === 'number'){
      message = message.replace('{{0}}', value);
    } else if ($.type(value) === 'array'){
      for (msgCnt in value){
        message = message.replace('{{' + msgCnt + '}}', value[msgCnt]);
      }
    }
    
    return message;
  };
  
  /**
  * Function to select the message, from default messages or user selected message, for the error or warning
  * @param message, values which need to be selected
  * @return selected message
  */
  var setSanatioMessage = function (receivedSettings, receivedMessage, receivedRule, receivedValue){
    
    thisMessage = '';
    
    if (typeof receivedMessage === 'undefined'){
      if ($.inArray( receivedRule, ['minlength', 'maxlength', 'rangelength', 'rangevalue'] ) !== -1){
        thisMessage = sanatioFormattedMessage(receivedSettings.msgSetup[receivedRule], receivedValue);
      } else {
        thisMessage = receivedSettings.msgSetup[receivedRule];
      }
    } else {
      thisMessage = receivedMessage;
    }
    
    return thisMessage;
  };
  
  /*

  CapsLock.js

  An object allowing the status of the caps lock key to be determined

  Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
  the terms of the CC0 1.0 Universal legal code:

  http://creativecommons.org/publicdomain/zero/1.0/legalcode

  */

  var CapsLock = (function (){

    capsLock = false;
    listeners = [];
    isMac = /Mac/.test(navigator.platform);

    function isOn (){
      return capsLock;
    }

    function addListener (listener){
      listeners.push(listener);
    }

    function handleKeyPress (e){

      if (!e) e = window.event;

      priorCapsLock = capsLock;

      charCode = (e.charCode ? e.charCode : e.keyCode);

      if (charCode >= 97 && charCode <= 122){
        capsLock = e.shiftKey;
      } else if (charCode >= 65 && charCode <= 90 && !(e.shiftKey && isMac)){
        capsLock = !e.shiftKey;
      }

      if (capsLock !== priorCapsLock){
        for (index = 0; index < listeners.length; index ++){
          listeners[index](capsLock);
        }
      }

    }

    if (window.addEventListener){
      window.addEventListener('keypress', handleKeyPress, false);
    } else {
      document.documentElement.attachEvent('onkeypress', handleKeyPress);
    }

    return {
      isOn: isOn,
      addListener: addListener
    };

  })();

  /**
  * Gets the place where an error or warning should be placed
  * @param elementsObj and custom placeholder (if any)
  * @return element and its relative place like after or append
  */
  var getErrorPlacement = function (eObj, custom){
    
    thisMessagePlaceholder = eObj.element.parent().find(custom);
    
    if (thisMessagePlaceholder && thisMessagePlaceholder.length === 1){
      thisMessagePlaceholder.empty();
      
      return [thisMessagePlaceholder, 'append'];
    } else {
      if (eObj.isCheckable){
        if (eObj.element.last().parents('label').length === 1){
          return [eObj.element.last().parents('label'), 'after'];
        } else if (eObj.element.last().next('label').length === 1){
          return [eObj.element.last().next('label'), 'after'];
        } else {
          return [eObj.element.last(), 'after'];
        }
      } else {
        return [eObj.element, 'after'];
      }
    }
  };
  
  /**
  * Pretty much like previous function, but this time it gets the placed error
  * @param elementsObj
  * @return element
  */
  var getPlacedError = function (eObj){
    if (eObj.isCheckable){
      if (eObj.element.last().parents('label').length === 1){
        return [eObj.element.last().parents('label'), eObj.element.attr('name')];
      } else if (eObj.element.last().next('label').length === 1){
        return [eObj.element.last().next('label'), eObj.element.attr('name')];
      } else {
        return [eObj.element.last(), , eObj.element.attr('name')];
      }
    } else {
      return [eObj.element, eObj.element.attr('name')];
    }
  };
  
  /**
  * Takes out the elements which have data-sanatio-* rules on them when a form is initiated using data-sanatio
  * @param elements
  * @return elements which have data-sanatio-* rules
  */
  var matched,
    elem;
  var getSanatioElements = function (elements){
    matched = [];
    elements.each(function (index) {
      elem = this;
      $.each(this.attributes, function (index, attr) {
        if (attr.name.indexOf(sanatioElementsPattern) === 0){
          matched.push(elem);
          
          return false;
        }
      });
    });
    
    return $( matched );
  };

  /**
  * Creates validation rules JSON object
  * @param elementsObj
  * @return JSON object with respect to every form
  */
  var defaultInit = function (parentElement){
    formElement = parentElement;
    elementsToValidate = getSanatioElements(formElement.find('*'));
    
    return {
      formElement: formElement,
      elementsToValidate: elementsToValidate
    };
  };

  /**
  * Creates validation rules JSON object for every form which has data-sanatio attribute
  * @param elementsObj
  * @return JSON object with respect to every form
  */
  var defaultSanatioRulesObj,
    rulesElementCount,
    rulesAttributesCount,
    thisRuleElement,
    tempRuleObj,
    tempRuleObj2,
    ruleAttributeName;
    
  var createSanatioRules = function (elementObj){
    defaultSanatioRulesObj = {};
    defaultSanatioRulesObj.formElement = elementObj.formElement;
    defaultSanatioRulesObj.rulesConfig = [];
    
    for (rulesElementCount = 0; rulesElementCount < elementObj.elementsToValidate.length; rulesElementCount++){
      thisRuleElement = elementObj.elementsToValidate[rulesElementCount];
      
      tempRuleObj = {};
      tempRuleObj.rules = [];
      tempRuleObj.elementName = $(thisRuleElement).attr('name');
      
      for (defaultRulesCount = 0; defaultRulesCount < defaultApplicableRules.length; defaultRulesCount++){
        for (rulesAttributesCount = 0; rulesAttributesCount < thisRuleElement.attributes.length; rulesAttributesCount++){
          ruleAttributeName = thisRuleElement.attributes[rulesAttributesCount];
          if (ruleAttributeName.name.indexOf( defaultApplicableRules[ defaultRulesCount ]) !== -1){
            tempRuleObj2 = {};
            tempRuleObj2['type'] = typeof $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]+'-type') !== 'undefined' ? $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]+'-type') : 'error';
            tempRuleObj2['name'] = defaultApplicableRules[ defaultRulesCount ];
            tempRuleObj2['value'] = $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]);
            tempRuleObj2['message'] = $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]+'-message');
            
            if (tempRuleObj2['name'] === 'creditcard'){
              tempRuleObj2['luhncheck'] = $(thisRuleElement).attr('data-sanatio-creditcard');
              tempRuleObj2['formatter'] = $(thisRuleElement).attr('data-sanatio-creditcard-formatter');
            }
            
            tempRuleObj.rules.push(tempRuleObj2);
            break;
          }
        }
      }
      
      defaultSanatioRulesObj.rulesConfig.push(tempRuleObj);
    }
    
    return defaultSanatioRulesObj;
  };
  
  
  /**
  * Call the plugin for all forms which have data-sanatio attribute one by one
  * @param defaultRulesObj
  * @return
  */
  var formElementFromData,
    warningsPassForm;
  var defaultSanatioValidate = function (defaultRulesObj){
    if (defaultRulesObj.length > 0){
      for (rulesElementCount = 0; rulesElementCount < defaultRulesObj.length; rulesElementCount++){
        formElementFromData = defaultRulesObj[rulesElementCount];
        
        if (typeof $(formElementFromData.formElement).attr('data-sanatio-spec-allowwarningstopassform') !== 'undefined'){
          warningsPassForm = $(formElementFromData.formElement).attr('data-sanatio-spec-allowwarningstopassform') === 'false' ? false : true;
        } else {
          warningsPassForm = true;
        }
        
        $('#'+$(formElementFromData.formElement).attr('id')).sanatio({
          rulesConfig: formElementFromData.rulesConfig,
          allowWarningsToPassForm: warningsPassForm
        });
      }
    }
  };
  
  
  // Constructor for validator
  $.sanatio = function (options, form) {
    this.specs = $.extend( true, {}, $.sanatio.defaults, options );
    this.currentForm = form;
    this.init();
  };
  
  /**
  * Default Sanatio Setup with default values and functions
  * @param 
  * @return 
  */
  $.extend( $.sanatio, {
    defaults: {
      debug: false,
      allowWarningsToPassForm: true,
      errorClass: 'sanatio-error',
      warningClass: 'sanatio-warn',
      additionalErrorClasses: '',
      additionalWarningClasses: '',
      highlightParent: '',
      messagePlaceholder: '',
      errorTag: 'label',
      /* --------------------------------------- */
      rulesConfig: {},
      groups: {},
      errorCount: 0,
      warningCount: 0,
      ignoreElements: ':hidden',
      validationStatus: {errors: 0, warnings: 0},
      preparedElements: [],
      invalidElements: [],
      submitted: [],
      msgSetup: {
        capslock: 'Capslock is / was on. Please check.',
        required: 'This field is required.',
        pattern: 'This does not follow expected pattern.',
        email: 'Please enter a valid email address.',
        digits: 'Please enter only digits.',
        url: 'Please enter a valid URL.',
        minvalue: 'Please enter at least {{0}} characters.',
        maxvalue: 'Please enter no more than {{0}} characters.',
        minlength: 'Entered / Selected value(s) must be at least {{0}} in length.',
        maxlength: 'Entered / Selected value(s) must be at max {{0}} in length.',
        luhn: 'Luhn check didn\'t pass for this field.',
        creditcard: 'Please enter a valid credit card number.',
        date: 'Please enter a valid date.',
        dateformat: 'Please check the Date Format.',
        equalthisto: 'Values do not match.',
        rangelength: 'Please enter a value between {{0}} and {{1}} characters long.',
        rangevalue: 'Please enter a value between {{0}} and {{1}}.'
      },
      events: {
        focusin: function (sanitator, elementObj, event) {
          // TODO: FocusIn implementation
        },
        focusout: function (sanitator, elementObj, event) {
          if (elementObj.isEditable){
            if (sanitator.specs.submitted.indexOf(elementObj) !== -1){

              showThisElement = sanitator.specs.doSanity(sanitator, elementObj);
              sanitator.specs.showMsgs(showThisElement, true);

            }
            if (sanitator.specs.submitted.indexOf(elementObj) === -1 && (elementObj.isEditable && sanatioTrimmedValue(elementObj.element.val()).length > 0)){

              sanitator.specs.submitted.push(elementObj);

            }
          }
        },
        keyup: function (sanitator, elementObj, event) {
          if ( event.which === 9 && sanatioTrimmedValue( elementObj.element.val() ) === '' || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
            return;
          } else {
            if (sanitator.specs.submitted.indexOf(elementObj) !== -1 && !elementObj.applyCaps){
              
              showThisElement = sanitator.specs.doSanity(sanitator, elementObj);
              sanitator.specs.showMsgs(showThisElement);

            }
            if (elementObj.applyCaps){
              
              if (sanitator.specs.submitted.indexOf(elementObj) !== -1){
                sanitator.specs.submitted.push(elementObj);
              }
              
              showThisElement = sanitator.specs.doSanity(sanitator, elementObj);
              sanitator.specs.showMsgs(showThisElement);
            }
          }
        },
        keydown: function (sanitator, elementObj, event) {
          // TODO: Keydown implementation
        },
        change: function (sanitator, elementObj, event) {

          if (sanitator.specs.submitted.indexOf(elementObj) !== -1){

            showThisElement = sanitator.specs.doSanity(sanitator, elementObj);
            sanitator.specs.showMsgs(showThisElement);

          }
          if (sanitator.specs.submitted.indexOf(elementObj) === -1 && (elementObj.isEditable && sanatioTrimmedValue(elementObj.element.val()).length > 0)){

            sanitator.specs.submitted.push(elementObj);

          }
        },
        keypress: function (sanitator, elementObj, event) {
          if (elementObj.ccProps !== null && elementObj.ccProps.applyCC && elementObj.ccProps.format){

            creditCardValue = elementObj.element.val().split(elementObj.ccProps.formatter).join(''); // remove hyphens

            if (creditCardValue.length > 0) {
              creditCardValue = creditCardValue.match(creditcardFormatRegex).join(elementObj.ccProps.formatter);
            }

            elementObj.element.val(creditCardValue);
          }
        }
      },
      
      /**
      * Function to select the element based on the element name
      * @param Form and element name from the defined rules
      * @return element selected from the form element
      */
      getElement: function (formElement, elementName){
        try {
            if (typeof formElement.find( '[name=' + elementName + ']' ) !== 'undefined'){
                return formElement.find( '[name=' + elementName + ']' );
            }
        } catch (e){
            putOnConsole('No element with name \'' + elementName + '\' was found.', 'error');
        }
      },
      
      verifyRule: function (ruleValue, ruleFunction, ruleElement, temp_obj, str, typeStr, countStr, messageStr, returnObj, actualMessage, shouldApplyCaps, capsStatus){
        try {
          jsonedValue = JSON.parse(ruleValue);
        } catch (e){
          jsonedValue = ruleValue;
        }
        
        if (shouldApplyCaps && countStr === 'capslock'){

          temp_obj = ruleFunction(capsStatus);

        } else {

          if (countStr === 'equalthisto'){
            temp_obj = ruleFunction(ruleElement, this.getElement(this.currentForm, jsonedValue));
          } else {
            temp_obj = ruleFunction(ruleElement, jsonedValue);
          }

        }
        
        returnObj[str] = typeof temp_obj !== 'undefined' ? temp_obj : false;
        
        returnObj[typeStr] = countStr;
        
        returnObj[messageStr] = setSanatioMessage(localSettings, actualMessage, countStr, ruleValue);
        returnObj[messageStr].length === 0 ? returnObj.message = 'No error message specified for ' + countStr : returnObj[messageStr];
        
        return returnObj;
      },

      /**
      * Function to sanitize the form element based on defined rules
      * @param Respective Sanatio object and form element
      * @return 
      */
      doSanity: function (sanitator, elementObj, capsrule){
        
        localSettings = sanitator.specs;
        tempObj2 = {};
  
        $.each(localSettings.rulesConfig, function (index, elementItem){
          if (elementItem.elementObj === elementObj){

            tempObj2.isElemValid = [];

            if (typeof elementItem.rules !== 'undefined'){

              for (innerCnt in elementItem.rules){

                isElemValid = {};
                isElemValid.errors = false;
                isElemValid.warnings = false;
                isElemValid.errorType = '';
                isElemValid.warningType = '';
                isElemValid.message = '';
                tempErrorObj = false;
                tempWarnObj = false;
                isItemPresent = false;
                localWarningType = '';
                localErrorType = '';
                ifConditionPresent = false;

                for (rootCnt in localSettings.msgSetup){
                  if (typeof elementItem.if !== 'undefined'){

                    ifConditionPresent = true;

                    if (elementItem.elementObj.ifConditionElement.element.is(elementItem.elementObj.ifConditionElement.condition)){
                      ifConditionPresent = false;
                    }

                  } else {
                    ifConditionPresent = false;
                  }

                  if (!ifConditionPresent && typeof elementItem.rules[innerCnt].value !== 'undefined' && sanatioTrimmedValue(elementItem.rules[innerCnt].value).toString() !== 'false'){

                    if (elementItem.rules[innerCnt].name === 'equalthisto'){
                        elementItem.rules[innerCnt].type = 'error';
                    }
                    if (elementItem.rules[innerCnt].name === 'capslock'){
                        elementItem.rules[innerCnt].type = 'warning';
                    }
                    if (elementItem.rules[innerCnt].name === rootCnt && elementItem.rules[innerCnt].type === 'error'){

                      isElemValid = localSettings.verifyRule(elementItem.rules[innerCnt].value, localSettings.checkFor[rootCnt], elementObj.element, tempErrorObj, 'errors', 'errorType', rootCnt, 'message', {}, elementItem.rules[innerCnt].message, elementObj.applyCaps, elementObj.capslockStatus);

                    }
                    if (elementItem.rules[innerCnt].name === rootCnt && elementItem.rules[innerCnt].type === 'warning'){

                      isElemValid = localSettings.verifyRule(elementItem.rules[innerCnt].value, localSettings.checkFor[rootCnt], elementObj.element, tempWarnObj, 'warnings', 'warningType', rootCnt, 'message', {}, elementItem.rules[innerCnt].message, elementObj.applyCaps, elementObj.capslockStatus);

                    }
                  }
                }

                tempObj2.elementObj = elementItem.elementObj;
                tempObj2.isElemValid.push(isElemValid);
              }
              
            }
              
            if (localSettings.invalidElements.length > 0){

              for (innerCnt in localSettings.invalidElements){
                if (localSettings.invalidElements[innerCnt].elementObj && localSettings.invalidElements[innerCnt].elementObj.element === tempObj2.elementObj.element){

                  localSettings.invalidElements[innerCnt] = tempObj2;
                  isItemPresent = true;
                  break;

                } else {
                  isItemPresent = false;
                }
              }

              if (!isItemPresent){
                localSettings.invalidElements.push(tempObj2);
              }
            } else {
              localSettings.invalidElements.push(tempObj2);
            }

            return false;
          }
        });
          
        return tempObj2;
      },
      
      /**
      * Object containing the validation methods
      * @param form element and expected values
      * @return 
      */
      checkFor: {
        required: function (element, mustBe){
          return sanatioReturnLength(element) === 0 ? true : false;
        },
        pattern: function (element, mustBe){
          patternRegex = new RegExp(mustBe);

          return !patternRegex.test(sanatioReturnValue(element));
        },
        email: function (element, mustBe){
          return !emailRegex.test(sanatioReturnValue(element));
        },
        url: function (element, mustBe){
          return !urlRegex.test(sanatioReturnValue(element));
        },
        digits: function (element, mustBe){
          return !digitsRegex.test(sanatioReturnValue(element));
        },
        minvalue: function (element, mustBe){
          try {
            return parseInt(sanatioReturnValue(element)) < parseInt(mustBe) ? true : false;
          } catch (e){
            return true;
          }
          
          return true;
        },
        maxvalue: function (element, mustBe){
          try {
            return parseInt(sanatioReturnValue(element)) > parseInt(mustBe) ? true : false;
          } catch (e){
            return true;
          }
          
          return true;
        },
        minlength: function (element, mustBe){
          return sanatioReturnLength(element) < mustBe ? true : false;
        },
        maxlength: function (element, mustBe){
          return sanatioReturnLength(element) > mustBe ? true : false;
        },
        rangelength: function (element, mustBe){
          return sanatioReturnLength(element) < mustBe[0] || sanatioReturnLength(element) > mustBe[1] ? true : false;
        },
        rangevalue: function (element, mustBe){
          try {
            return parseInt(sanatioReturnValue(element)) >= parseInt(mustBe[0]) && parseInt(sanatioReturnValue(element)) <= parseInt(mustBe[1]) ? false : true;
          } catch (e){
            return true;
          }
          
          return true;
        },
        equalthisto: function (element, mustBe){
          try {
            return sanatioReturnValue(element) === sanatioReturnValue(mustBe) ? false : true;
          } catch (e){
            return true;
          }
          
          return true;
        },
        creditcard: function (element, mustBe){
          creditCardTestValue = sanatioReturnValue(element).replace(/[ -]/g, '');
          if (mustBe === 'without-luhn'){
            return !creditcardRegex.test(creditCardTestValue);
          } else {
            creditCardMatch =creditcardRegex.exec(creditCardTestValue);
            if (creditCardMatch) {
              for (defaultRulesCount = 1; defaultRulesCount < creditCardMatch.length; defaultRulesCount++) {
                if (creditCardMatch[defaultRulesCount]) {  
                  return !sanatioLuhnCheck(creditCardTestValue);
                  break;
                }
              }
            } else {
              return true;
            }
          }
          
          return true;
        },
        luhn: function (element, mustBe){
          creditCardTestValue = sanatioReturnValue(element).replace(/[ -]/g, '');
          creditCardMatch =creditcardRegex.exec(creditCardTestValue);
          if (creditCardMatch) {
            for (defaultRulesCount = 1; defaultRulesCount < creditCardMatch.length; defaultRulesCount++) {
              if (creditCardMatch[defaultRulesCount]) {  
                return !sanatioLuhnCheck(creditCardTestValue);
                break;
              }
            }
          } else {
            return true;
          }
          
          return true;
        },
        date: function (element, mustBe){
          try {
            return !moment(sanatioReturnValue(element)).isValid();
          } catch (e){
            putOnConsole(momentJSWarning, 'warn');
            return true;
          }
          
          return true;
        },
        dateformat: function (element, mustBe){
          try {
            return !moment(sanatioReturnValue(element), mustBe, true).isValid();
          } catch (e){
            putOnConsole(momentJSWarning, 'warn');
            
            return true;
          }
          
          return true;
        },
        capslock: function (element, mustBe){
          return CapsLock.isOn();
        }
      },
      
      /**
      * Function to clean the errors on the element
      * @param elementObj with element and its properties
      * @return
      */
      cleanErrors: function (elementObj, type){
        
        defaultElementObj = getPlacedError(elementObj);
        insertedWarningElement = null;
        insertedErrorElement = null;
        insertedWarningElement = $(defaultElementObj[0]).nextAll('[for="' + defaultElementObj[1] + '"].'+this.warningClass).eq(0);
        insertedErrorElement = $(defaultElementObj[0]).nextAll('[for="' + defaultElementObj[1] + '"].'+this.errorClass).eq(0);
        
        if (typeof insertedWarningElement !== 'undefined' && insertedWarningElement !== null){
          insertedWarningElement.remove();
        }
        if (type === 'all'){
          if (typeof insertedErrorElement !== 'undefined' && insertedErrorElement !== null){
            insertedErrorElement.remove();
          }
        }
      },
      
      /**
      * Return preMsg back to insertMsg function
      * @param elementObj with its properties, element, element error or warning class, error or warn string and its string class, message string
      * @return preMsg
      */
      preMsg: function (errorTag, selectorClass, type, messageClass, additionalClasses, message, element){
        return $('<' + errorTag + ' for="' + element.attr('name') + '" class="' + selectorClass + type + ' ' + messageClass + ' ' + additionalClasses + '">'+ message +'</' + errorTag + '>');
      },
      
      /**
      * Insert the error or warning respective to the element
      * @param elementObj with its properties, element, element error or warning class, error or warn string and its string class, message string
      * @return 
      */
      insertMsg: function (placeholderArr, element, elementClass, type, selectorClass, message, messageClass, additionalClasses){
        addedMessage = this.preMsg(this.errorTag, selectorClass.substr(1), type, messageClass, additionalClasses, message, element);
        placeholderArr[0][placeholderArr[1]](addedMessage);
        
        // addedMessage.show('slow');
      },
      
      /**
      * Function to show and remove respective errors
      * @param
      * @return 
      */
      showMsgs: function (elementToBeSanitized, removeCapsError){

        errorsCount = typeof this.validationStatus['errors'] === 'undefined' ? 0 : parseInt(this.validationStatus['errors']);
        warningsCount = typeof this.validationStatus['warnings'] === 'undefined' ? 0 : parseInt(this.validationStatus['warnings']);
        
        outerCnt = this.invalidElements.indexOf(elementToBeSanitized);

        if (outerCnt >= 0 && typeof elementToBeSanitized.elementObj !== 'undefined'){
          
          elementsLength = this.invalidElements[outerCnt].elementObj;
          errorElementProps = this.invalidElements[outerCnt].isElemValid;
          localError = '';
          localWarning = '';
          localErrorType = '';
          localWarningType = '';
          insertedWarningElement = null;
          insertedErrorElement = null;
          
          errorElement = this.invalidElements[outerCnt].elementObj.element;
          
          this.cleanErrors(elementsLength, 'all');
          
          for (innerCnt in errorElementProps){
            if (errorElementProps[innerCnt].errors){
              localError = errorElementProps[innerCnt].message;
              localErrorType = errorElementProps[innerCnt].errorType;
            }

            if (localError.length > 0 && localErrorType.length > 0 && typeof errorElementProps[innerCnt].errors !== 'undefined'){
              errorElement.addClass('has-sanatio-error');
              
              if (sanatioTrimmedValue(this.highlightParent).length > 0 && typeof errorElement.closest(this.highlightParent) !== 'undefined'){
                errorElement.closest(this.highlightParent).addClass(this.errorClass).addClass(this.additionalErrorClasses);
              }
              break;
            } else if (typeof errorElementProps[innerCnt].errors !== 'undefined'){
              errorElement.removeClass('has-sanatio-error');
              
              if (sanatioTrimmedValue(this.highlightParent).length > 0 && typeof errorElement.closest(this.highlightParent) !== 'undefined'){
                errorElement.parents(this.highlightParent).removeClass(this.errorClass).removeClass(this.additionalErrorClasses);
              }
            }
            
          }
          for (innerCnt in errorElementProps){

            if (errorElementProps[innerCnt].warnings){
              localWarning = errorElementProps[innerCnt].message;
              localWarningType = errorElementProps[innerCnt].warningType;
            }
              
            if (localWarning.length > 0 && localWarningType.length > 0 && typeof errorElementProps[innerCnt].warnings !== 'undefined'){

              errorElement.addClass('has-sanatio-warning');
              
              if (sanatioTrimmedValue(this.highlightParent).length > 0 && typeof errorElement.closest(this.highlightParent) !== 'undefined'){
                errorElement.closest(this.highlightParent).addClass(this.warningClass).addClass(this.additionalWarningClasses);
              }
              break;
            } else if (typeof errorElementProps[innerCnt].warnings !== 'undefined'){
              errorElement.removeClass('has-sanatio-warning');

              if (sanatioTrimmedValue(this.highlightParent).length > 0 && typeof errorElement.closest(this.highlightParent) !== 'undefined'){
                errorElement.closest(this.highlightParent).removeClass(this.warningClass).removeClass(this.additionalWarningClasses);
              }
            }
          }
          
          thisMessagePlaceholder = getErrorPlacement(elementsLength, this.messagePlaceholder);
          
          if (errorElement.hasClass('has-sanatio-warning') && localWarningType.length > 0){
            this.insertMsg(thisMessagePlaceholder, elementsLength.element, 'has-sanatio-warning', localWarningType, '.warning-', localWarning, this.warningClass, this.additionalWarningClasses);
            ++warningsCount;
          }

          if (errorElement.hasClass('has-sanatio-error') && localErrorType.length > 0){
            this.insertMsg(thisMessagePlaceholder, elementsLength.element, 'has-sanatio-error', localErrorType, '.error-', localError, this.errorClass, this.additionalErrorClasses);
            ++errorsCount;
          }

          if (!elementsLength.applyRequired && sanatioReturnLength(errorElement) === 0){
            errorsCount = 0;
            this.cleanErrors(elementsLength, 'all');
          }
          
          if ((elementsLength.applyRequired && sanatioReturnLength(errorElement) === 0) || (typeof removeCapsError !== 'undefined' && removeCapsError === true)){
            this.cleanErrors(elementsLength, 'warnings');
          }

        }

        this.validationStatus['errors'] = errorsCount;
        this.validationStatus['warnings'] = warningsCount;
      }
    },
    
    /**
    * Function to add custom method and rule
    * @param rule name and function defination
    * @return 
    */
    addSanatioRule: function (fnName, fn){
      
      if (typeof this.defaults.msgSetup[fnName] === 'undefined'){
        this.defaults.msgSetup[fnName] = '';
      } else {
        return;
      }
      if (typeof this.defaults.checkFor[fnName] === 'undefined'){
        this.defaults.checkFor[fnName] = fn;
      } else {
        return;
      }
      
    },
    
    /**
    * Function to generate the form submit
    * @param shouldPassTheForm Boolean
    * @return 
    */
    submitHandler: function (){
      return true;
    },
    
    prototype: {
      prepareElements: function (){
        var spec;
        formElement = $(this.currentForm);
        formSettings = this.specs;
        formSettings.currentForm = formElement;
        
        if (sanatioTrimmedValue(formSettings.errorClass).length === 0){
          formSettings.errorClass = 'sanatio-error';
        }
        if (sanatioTrimmedValue(formSettings.warningClass).length === 0){
          formSettings.warningClass = 'sanatio-warn';
        }
        
        for (cnt in formSettings.rulesConfig){
          spec = formSettings.rulesConfig[cnt];
          thisElement = formSettings.getElement(formElement, spec.elementName);
          
          tempObj = {};
          tempObj.element = thisElement;
          
          if (thisElement.prop('tagName').toLowerCase() === 'select' || thisElement.prop('tagName').toLowerCase() === 'option' || (thisElement.prop('tagName').toLowerCase() === 'input' && thisElement.attr('type').toLowerCase() === 'file')){
            tempObj.isClickable = true;
            tempObj.isCheckable = false;
            tempObj.isEditable = false;
          } else if (thisElement.attr('type') === 'radio' || thisElement.attr('type') === 'checkbox'){
            tempObj.isClickable = true;
            tempObj.isCheckable = true;
            tempObj.isEditable = false;
          } else {
            tempObj.isClickable = false;
            tempObj.isCheckable = false;
            tempObj.isEditable = true;
          }
          
          if (typeof spec.if !== 'undefined'){
            tempObj.if = spec.if;
            
            ifConditionArr = tempObj.if.split(':');
            ifConditionObj = {};
            ifConditionObj.element = formSettings.getElement(formElement, ifConditionArr[0]);
            ifConditionObj.condition = ':'+ifConditionArr[1];
            
            tempObj.ifConditionElement = ifConditionObj;

          }

          if (typeof spec.rules !== 'undefined'){
            for (outerCnt in spec.rules){
              if (typeof spec.rules[outerCnt].type === 'undefined'){
                spec.rules[outerCnt].type = 'error';
              }
            }
            for (outerCnt in spec.rules){
              
              if (spec.rules[outerCnt].name === 'required'){
                tempObj.applyRequired = true;
                break;
              } else {
                tempObj.applyRequired = false;
              }
              
            }
            
            for (outerCnt in spec.rules){
              if (spec.rules[outerCnt].name === 'creditcard'){
                tempObj.ccProps = {};
                tempObj.ccProps.applyCC = true;

                tempObj.ccProps.luhnCheck = typeof spec.rules[outerCnt].value !== 'undefined' ? spec.rules[outerCnt].value : 'without-luhn';
                tempObj.ccProps.format = typeof spec.rules[outerCnt].formatter !== 'undefined' ? true : false;
                tempObj.ccProps.formatter = typeof spec.rules[outerCnt].formatter !== 'undefined' ? spec.rules[outerCnt].formatter : '';

                if (tempObj.ccProps.formatter !== ' ' && tempObj.ccProps.formatter !== '-' && tempObj.ccProps.formatter !== ''){
                    
                  putOnConsole('Invalid separator is used; resetting it to blankspace.', 'warn');
                  tempObj.ccProps.formatter = ' ';
                }

                break;
              } else {
                tempObj.ccProps = null;
              }
              
            }
            
            for (outerCnt in spec.rules){
              if (spec.rules[outerCnt].name === 'capslock'){
                tempObj.applyCaps = true;
                break;
              } else {
                tempObj.applyCaps = false;
              }
            }
          }
          
          this.specs.rulesConfig[cnt].elementObj = tempObj;
          this.specs.preparedElements.push(tempObj);
        }
      },
      
      init: function (){
        
        eventFn = function (event){
          localValidator = $.data( this.form, 'sanatio' );
          localEventType = event.type;
          localSettings = localValidator.specs;
          localElementObj;
          
          if ( localSettings.events[ localEventType ] && !$( this ).is(localSettings.ignoreElements) ) {
            
            for (cnt in localSettings.preparedElements){
              if (localSettings.preparedElements[cnt].element.is($(this))){
                localElementObj = localSettings.preparedElements[cnt];
                break;
              }
            }
            if (localElementObj){
              localSettings.events[ localEventType ]( localValidator, localElementObj, event );
            }
  					// settings[ eventType ].call( sanatio, this, event );
          }
        };
        
        $( this.currentForm ).on(typeEvents, typeFields, eventFn ).on(changeEvents, changeFields, eventFn);
      },
      
      checkSubmitted: function (){
        
        for (cnt in this.specs.rulesConfig){
          if (this.specs.submitted.indexOf(this.specs.rulesConfig[cnt].elementObj) === -1 ){
            this.specs.submitted.push(this.specs.rulesConfig[cnt].elementObj);
          }
        }
        
        for (cnt in this.specs.submitted){
          showThisElement = this.specs.doSanity(this, this.specs.submitted[cnt]);
          this.specs.showMsgs(showThisElement);
        }
        
        return;
      }
    }
  });
  
  /**
  * Function to destroy Sanatio instance on a form
  * @param rules form element
  * @return 
  */
  $.fn.destroySanatio = function (options) {
    var sanatio = $.data( this[ 0 ], 'sanatio' );
    if (typeof sanatio !== 'undefined'){
      
      $(this).find('.' + sanatio.specs.errorClass).remove();
      $(this).find('.' + sanatio.specs.warningClass).remove();
      $(this).find('.has-sanatio-error').removeClass('has-sanatio-error');
      $(this).find('.has-sanatio-warning').removeClass('has-sanatio-warning');
      
      $(this).off('submit.sanatio').off( typeEvents, typeFields ).off( changeEvents, changeFields );
      
      $.removeData(this[0]);
    }
    
    return this;
  };
  
  /**
  * Default plugin initiation for each form
  * @param rules options
  * @return 
  */
  $.fn.sanatio = function (options) {
      
    // Check if a validator for this form was already created
    var sanatio = $.data( this[ 0 ], 'sanatio' );
    
    if ( sanatio ) {
      return sanatio;
    }
    
    this.attr('novalidate', 'novalidate');
      
    sanatio = new $.sanatio( options, this[ 0 ] );
    $.data( this[ 0 ], 'sanatio', sanatio );

    sanatio.prepareElements();
    
    this.on( 'submit.sanatio', function ( event ) {
      if ( sanatio.specs.debug ) {

        // Prevent form submit to be able to see console output
        event.preventDefault();
      }
      sanatio.specs.validationStatus['errors'] = 0;
      sanatio.specs.validationStatus['warnings'] = 0;
      
      sanatio.checkSubmitted();
      
      isThisFormValid = sanatio.specs.validationStatus;
      
      if (sanatio.specs.allowWarningsToPassForm){
        passToSubmitHandler = isThisFormValid.errors === 0 ? true : false;
      } else {
        passToSubmitHandler = (isThisFormValid.errors !== 0 || isThisFormValid.warnings !== 0) ? false : true;
      }
      
      return passToSubmitHandler === true ? $.sanatio.submitHandler(this) : false;
      
    });
    
    thisSanatioObject = $.data(this[0]);
    
    this.getSanatioObject = function (){
      return thisSanatioObject.sanatio;
    };
    
    this.getValidityStatus = function (){
      return thisSanatioObject.sanatio.specs.validationStatus;
    };
    
    return this;

  };

  /**
  * Auto initialize plugins for forms which have data-sanatio attribute
  * @param
  * @return
  */
  var defaultFormRulesObj = [];
  $(function () {
    defaultElements = $('[data-sanatio]');
    for (defaultElementCount = 0; defaultElementCount < defaultElements.length; defaultElementCount++){
      defaultElementObj = defaultInit($(defaultElements[defaultElementCount]));
      if (defaultElementObj.elementsToValidate.length > 0){
        defaultFormRulesObj.push(createSanatioRules(defaultElementObj));
      }
    }
    
    defaultSanatioValidate(defaultFormRulesObj);
  });
 
}( jQuery ));