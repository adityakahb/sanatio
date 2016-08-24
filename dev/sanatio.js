(function( $ ) {
  
  'use strict';
  
  var defaultApplicableRules = [
    'required',
    'pattern',
    'email',
    'digits',
    'url',
    'minlength',
    'maxlength',
    'luhn',
    'creditcard',
    'date',
    'equalthisto',
    'rangeminmax',
    'capslock'
  ],
    defaultRulesCount;
  
    // Avoid revalidate the field when pressing one of the following keys
    // Enter       => 13
    // Shift       => 16
    // Ctrl        => 17
    // Alt         => 18
    // Caps lock   => 20
    // End         => 35
    // Home        => 36
    // Left arrow  => 37
    // Up arrow    => 38
    // Right arrow => 39
    // Down arrow  => 40
    // Insert      => 45
    // Num lock    => 144
    // AltGr key   => 225
  var excludedKeys = [13, 16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225],
    emailRegex = new RegExp('^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'),
    urlRegex = new RegExp( '^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$','i'),
    digitsRegex = new RegExp('^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$'),
    creditcardRegex = new RegExp('^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$');
    
  var formEventCallMethod,
    localValidator,
    localEventType,
    localSettings,
    localElementObj;
  
  var defaultElements,
    defaultElementSettings,
    defaultElementCount,
    defaultElementObj,
    elementsToValidate;
 
  var formValidStatus = false,
    elementValidStatus = false;
 
  var formElement,
    formSettings,
    sanatioElementsPattern = 'data-sanatio',
    thisElement,
    tempObj,
    tempObj2,
    tempErrorObj,
    tempWarnObj,
    isItemPresent;
  
  var cnt,
    outerCnt,
    innerCnt,
    rootCnt,
    msgCnt;
  
  var patternRegex;
  
  var isThisFormValid = {},
    isThisElementValid = {},
    isThisFormElementValid = {};
  
  var preparedElements,
    checkedElements;
  
  var luhnLen,
    luhnBit,
    luhnSum;
  
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
    
  var sanatioTrimmedValue = function (value) {
     return typeof value === 'string' ? value.replace( /^\s+|\s+$/g, '' ) : value;
  };
  var sanatioClickedValue = function (element){
    if (element.attr('type') === 'checkbox' || element.attr('type') === 'radio'){
      checkedElements = 0;
      $.each(element, function (){
        if ( $(this).is(':checked') ){
          checkedElements++;
        }
      });
      return checkedElements;
    } else {
      return element.val();
    }
  };
  var sanatioFormattedMessage = function(message, value){
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
  * Takes out the elements which have data-sanatio-* rules on them
  * when a form is initiated using data-sanatio
  * @param elements
  * @return elements which have data-sanatio-* rules
  */
  var matched,
    elem;
  var getSanatioElements = function (elements){
    matched = [];
    elements.each(function(index) {
      elem = this;
      $.each(this.attributes, function( index, attr ) {
        if(attr.name.indexOf(sanatioElementsPattern)===0){
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
            tempRuleObj2['type'] = $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]+'-type');
            tempRuleObj2['name'] = defaultApplicableRules[ defaultRulesCount ];
            tempRuleObj2['value'] = $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]);
            tempRuleObj2['message'] = $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]+'-message');
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
  var defaultSanatioValidate = function (defaultRulesObj){
    if (defaultRulesObj.length > 0){
      for (rulesElementCount = 0; rulesElementCount < defaultRulesObj.length; rulesElementCount++){
        $('#'+$(defaultRulesObj[rulesElementCount].formElement).attr('id')).sanatio({
          rulesConfig: defaultRulesObj[rulesElementCount].rulesConfig
        });
      }
    }
  };
  
  // Constructor for validator
  $.sanatio = function( options, form ) {
    this.settings = $.extend( true, {}, $.sanatio.defaults, options );
    this.currentForm = form;
    this.init();
  };
  
  $.extend( $.sanatio, {
  	defaults: {
      rulesConfig: {},
      groups: {},
      errorClass: 'sanatio-error',
      warningClass: 'sanatio-warn',
      errorCount: 0,
      warningCount: 0,
      ignoreElements: ':hidden',
      allowWarningsToPassForm: true,
      isValid: false,
      debug: true,
      preparedElements: [],
      preparedInvalidElements: [],
      submitted: [],
      messages: {
        'required': 'This is required default',
        'pattern': 'Required pattern not followed default',
        'email': 'This is not a valid email default',
        'digits': 'Only digits are allowed default',
        'url': 'This is not a valid url default',
        'minlength': 'Minimum {{0}} length is required default',
        'maxlength': 'Maximum {{0}} length is required default',
        'luhn': 'Luhn Check not valid default',
        'creditcard': 'Invalid Credit Card observed default',
        'date': 'Invalid date default',
        'equalthisto': 'Values of {{0}} and {{1}} not same default',
        'rangeminmax': 'Minimum {{0}} and Maximum {{1}} default',
        'capslock': 'Please check the capslock default'
      },
      events: {
    		focusin: function (sanitator, elementObj, event) {
    			console.log('focusin');
    		},
    		focusout: function (sanitator, elementObj, event) {
          if ( (elementObj.isEditable || elementObj.isCheckable) && sanitator.settings.submitted.indexOf(elementObj) !== -1){
            sanitator.settings.doSanitation(sanitator, elementObj);
            sanitator.settings.showSanatioErrors();
          }
          if (sanitator.settings.submitted.indexOf(elementObj) === -1 && (elementObj.isEditable && sanatioTrimmedValue(elementObj.element.val()).length > 0)){
            sanitator.settings.submitted.push(elementObj);
          }
    		},
    		keyup: function (sanitator, elementObj, event) {
    			if ( event.which === 9 && sanatioTrimmedValue( elementObj.element.val() ) === '' || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
    				return;
    			} else {
            if ( (elementObj.isEditable || elementObj.isCheckable) && sanitator.settings.submitted.indexOf(elementObj) !== -1){
              sanitator.settings.doSanitation(sanitator, elementObj);
              sanitator.settings.showSanatioErrors();
            }
    			}
    		},
    		click: function (sanitator, elementObj, event) {
          console.log('clicked');
    		}
      },
      getElement: function (formElement, elementName){
        return formElement.find( '[name=' + elementName + ']' );
      },
      doSanitation: function (sanitator, elementObj){
        localSettings = sanitator.settings;
        $.each(localSettings.rulesConfig, function(index, elementItem){
          if (elementItem.elementObj === elementObj){
            tempObj2 = {};
            tempObj2.isThisElementValid = [];
            
            for (innerCnt in elementItem.rules){
              isThisElementValid = {};
              isThisElementValid.errors = false;
              isThisElementValid.warnings = false;
              isThisElementValid.errorType = '';
              isThisElementValid.warningType = '';
              isThisElementValid.message = '';
              tempErrorObj = false;
              tempWarnObj = false;
              isItemPresent = false;

              for (rootCnt in defaultApplicableRules){
                if (!isThisElementValid.errors && elementItem.rules[innerCnt].name === defaultApplicableRules[rootCnt] && elementItem.rules[innerCnt].type === 'error'){
                  tempErrorObj = localSettings.checkFor[defaultApplicableRules[rootCnt]]( elementObj, elementItem.rules[innerCnt] );
                  isThisElementValid.errors = typeof tempErrorObj !== 'undefined' ? tempErrorObj : false;
                  isThisElementValid.errorType = defaultApplicableRules[rootCnt];
                  
                  if (typeof elementItem.rules[innerCnt].message === 'undefined'){
                    if ($.inArray( defaultApplicableRules[rootCnt], ['minlength', 'maxlength', 'rangeminmax'] ) !== -1){
                      isThisElementValid.message = sanatioFormattedMessage(localSettings.messages[defaultApplicableRules[rootCnt]], elementItem.rules[innerCnt].value);
                    } else {
                      isThisElementValid.message = localSettings.messages[defaultApplicableRules[rootCnt]];
                    }
                  } else {
                    isThisElementValid.message = elementItem.rules[innerCnt].message;
                  }
                }
                if (!isThisElementValid.warnings && elementItem.rules[innerCnt].name === defaultApplicableRules[rootCnt] && elementItem.rules[innerCnt].type === 'warning'){
                  tempWarnObj = localSettings.checkFor[defaultApplicableRules[rootCnt]]( elementObj, elementItem.rules[innerCnt] );
                  isThisElementValid.warnings = typeof tempWarnObj !== 'undefined' ? tempWarnObj : false;
                  isThisElementValid.warningType = defaultApplicableRules[rootCnt];
                  
                  if (typeof elementItem.rules[innerCnt].message === 'undefined'){
                    isThisElementValid.message = 'undefined';
                  } else {
                    isThisElementValid.message = elementItem.rules[innerCnt].message;
                  }
                }
              }
              tempObj2.elementObj = elementItem.elementObj;
              tempObj2.isThisElementValid.push(isThisElementValid);
            }
            
            if (localSettings.preparedInvalidElements.length > 0){

              for (innerCnt in localSettings.preparedInvalidElements){
                if (localSettings.preparedInvalidElements[innerCnt].elementObj.element === tempObj2.elementObj.element){
                  localSettings.preparedInvalidElements[innerCnt] = tempObj2;
                  isItemPresent = true;
                  break;
                } else {
                  isItemPresent = false;
                }
              }

              if (!isItemPresent){
                localSettings.preparedInvalidElements.push(tempObj2);
              }
            } else {
              localSettings.preparedInvalidElements.push(tempObj2);
            }
            
            return false;
          }
        });
      },
      checkFor: {
        required: function (elementObj, rulesObj){
          if (elementObj.isClickable){
            if (sanatioClickedValue(elementObj.element) === 0 || sanatioClickedValue(elementObj.element).length === 0){
              return true;
            }
          } else {
            if (sanatioTrimmedValue(elementObj.element.val()).length === 0){
              return true;
            }
          }
          
          return false;
        },
        pattern: function (elementObj, rulesObj){
          if (elementObj.isEditable){
            patternRegex = new RegExp( rulesObj.value );
            if (!patternRegex.test(sanatioTrimmedValue(elementObj.element.val()))){
              return true;
            }
          }
          
          return false;
        },
        email: function (elementObj, rulesObj){
          if (elementObj.isEditable){
            patternRegex = emailRegex;
            if (!patternRegex.test(sanatioTrimmedValue(elementObj.element.val()))){
              return true;
            }
          }
          
          return false;
        },
        url: function (elementObj, rulesObj){
          if (elementObj.isEditable){
            patternRegex = urlRegex;
            if (!patternRegex.test(sanatioTrimmedValue(elementObj.element.val()))){
              return true;
            }
          }
          
          return false;
        },
        digits: function (elementObj, rulesObj){
          if (elementObj.isEditable){
            patternRegex = digitsRegex;
            if (!patternRegex.test(sanatioTrimmedValue(elementObj.element.val()))){
              return true;
            }  
          }
          
          return false;
        },
        minlength: function (elementObj, rulesObj){
          jsonedValue = JSON.parse( rulesObj.value );
          if (elementObj.isClickable){
            if (sanatioClickedValue(elementObj.element) > jsonedValue || sanatioClickedValue(elementObj.element).length > jsonedValue){
              return true;
            }
          } else {
            if (sanatioTrimmedValue(elementObj.element.val()).length > jsonedValue){
              return false;
            }
          }
          
          return false;
        },
        maxlength: function (elementObj, rulesObj){
          jsonedValue = JSON.parse( rulesObj.value );
          if (elementObj.isClickable){
            if (sanatioClickedValue(elementObj.element) < jsonedValue || sanatioClickedValue(elementObj.element).length < jsonedValue){
              return true;
            }
          } else {
            if (sanatioTrimmedValue(elementObj.element.val()).length < jsonedValue){
              return false;
            }
          }
          
          return false;
        },
        rangeminmax: function (elementObj, rulesObj){
          jsonedValue = JSON.parse( rulesObj.value );
          if (elementObj.isClickable){
            if ((sanatioClickedValue(elementObj.element) > jsonedValue[0] && sanatioClickedValue(elementObj.element).length < jsonedValue[1]) || (sanatioClickedValue(elementObj.element) > jsonedValue[0] && sanatioClickedValue(elementObj.element).length < jsonedValue[1])){
              return true;
            }
          } else {
            if (sanatioTrimmedValue(elementObj.element.val()).length > jsonedValue[0] && sanatioTrimmedValue(elementObj.element.val()).length < jsonedValue[1]){
              return false;
            }
          }
          
          return false;
        }
      },
      showSanatioErrors: function (){
        for (outerCnt in this.preparedInvalidElements){
          elementsLength = this.preparedInvalidElements[outerCnt].elementObj.element.length;
          errorElementProps = this.preparedInvalidElements[outerCnt].isThisElementValid;
          localError = '';
          localWarning = '';
          localErrorType = '';
          localWarningType = '';
          insertedWarningElement = null;
          insertedErrorElement = null;
          if (elementsLength === 1){
            errorElement = this.preparedInvalidElements[outerCnt].elementObj.element;
            
            for (innerCnt in errorElementProps){
              if (errorElementProps[innerCnt].errors){
                localError = errorElementProps[innerCnt].message;
                localErrorType = errorElementProps[innerCnt].errorType;
              }
              if (localError.length > 0){
                errorElement.addClass('has-sanatio-error');
                break;
              } else {
                errorElement.removeClass('has-sanatio-error');
              }
            }
            for (innerCnt in errorElementProps){
              if (errorElementProps[innerCnt].warnings){
                localWarning = errorElementProps[innerCnt].message;
                localWarningType = errorElementProps[innerCnt].warningType;
              }
              if (localWarning.length > 0){
                errorElement.addClass('has-sanatio-warning');
                break;
              } else {
                errorElement.removeClass('has-sanatio-warning');
              }
            }
            
            insertedWarningElement = errorElement.nextAll('.warning-' + localWarningType).eq(0);
            insertedErrorElement = errorElement.nextAll('.error-' + localErrorType).eq(0);
            
            if (typeof insertedWarningElement !== 'undefined' && insertedWarningElement !== null){
              insertedWarningElement.remove();
            }
            if (typeof insertedErrorElement !== 'undefined' && insertedErrorElement !== null){
              insertedErrorElement.remove();
            }
            
            if (errorElement.hasClass('has-sanatio-warning') && localWarningType.length > 0 && errorElement.nextAll('.warning-' + localWarningType).eq(0).length === 0){
              errorElement.after('<div class="' + this.warningClass + ' warning-' + localWarningType + '">'+ localWarning +'</div>');
            }
            
            if (errorElement.hasClass('has-sanatio-error') && localErrorType.length > 0 && errorElement.nextAll('.error-' + localErrorType).eq(0).length === 0){
              errorElement.after('<div class="' + this.errorClass + ' error-' + localErrorType + '">'+ localError +'</div>');
            }
            
          } else {
            
          }
        }
      }
  	},
    prototype: {
      prepareFormElements: function (){
        formElement = $(this.currentForm);
        formSettings = this.settings;
        for (cnt in formSettings.rulesConfig){
          thisElement = formSettings.getElement(formElement, formSettings.rulesConfig[cnt].elementName);
          
          tempObj = {};
          tempObj.element = thisElement;
          
          if (thisElement.prop('tagName').toLowerCase() === 'select' || thisElement.prop('tagName').toLowerCase() === 'option'){
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
          for (outerCnt in formSettings.rulesConfig[cnt].rules){
            
            if (formSettings.rulesConfig[cnt].rules[outerCnt].name === 'required'){
              tempObj.shouldApplyRequired = true;
              break;
            } else {
              tempObj.shouldApplyRequired = false;
            }
            
          }
          
          for (outerCnt in formSettings.rulesConfig[cnt].rules){
            
            if (formSettings.rulesConfig[cnt].rules[outerCnt].name === 'creditcard'){
              tempObj.shouldApplyCreditcard = true;
              break;
            } else {
              tempObj.shouldApplyCreditcard = false;
            }
            
          }
          
          this.settings.rulesConfig[cnt].elementObj = tempObj;
          this.settings.preparedElements.push(tempObj);
        }
      },
      init: function (){
        
        formEventCallMethod = function (event){
          localValidator = $.data( this.form, 'sanatio' );
          localEventType = event.type;
  				localSettings = localValidator.settings;
          localElementObj;
          
  				if ( localSettings.events[ localEventType ] && !$( this ).is(localSettings.ignoreElements) ) {
            
            for (cnt in localSettings.preparedElements){
              if (localSettings.preparedElements[cnt].element.is($(this))){
                localElementObj = localSettings.preparedElements[cnt];
                break;
              }
            }
            localSettings.events[ localEventType ]( localValidator, localElementObj, event );
  					// settings[ eventType ].call( sanatio, this, event );
  				}
        };
        
        $( this.currentForm ).on( 'focusin.sanatio focusout.sanatio keyup.sanatio', ':text, [type=password], [type=file], select, textarea, [type=number], [type=search], [type=tel], [type=url], [type=email], [type=datetime], [type=date], [type=month], [type=week], [type=time], [type=datetime-local], [type=range], [type=color], [type=radio], [type=checkbox], [contenteditable]', formEventCallMethod ).on( 'click.sanatio', 'select, option, [type=radio], [type=checkbox]', formEventCallMethod);
      },
      checkForSubmittedElements: function (){
        
        for (cnt in this.settings.rulesConfig){
          if (this.settings.submitted.indexOf(this.settings.rulesConfig[cnt].elementObj) === -1 ){
            this.settings.submitted.push(this.settings.rulesConfig[cnt].elementObj);
          }
        }
        
        for (cnt in this.settings.submitted){
          this.settings.doSanitation(this, this.settings.submitted[cnt]);
        }
        this.settings.showSanatioErrors();
  
        return {
            hasErrors: false,
            hasWarnings: false
          };
      }
    }
  });
  
  
  
  $.fn.sanatio = function(options) {
      
    // Check if a validator for this form was already created
    var sanatio = $.data( this[ 0 ], 'sanatio' );
    
    if ( sanatio ) {
      return sanatio;
    }
    this.attr('novalidate', 'novalidate');
      
    sanatio = new $.sanatio( options, this[ 0 ] );
    $.data( this[ 0 ], 'sanatio', sanatio );
    
    sanatio.prepareFormElements();
    
    this.on( "submit.sanatio", function( event ) {
      if ( sanatio.settings.debug ) {

        // Prevent form submit to be able to see console output
        event.preventDefault();
      }
      isThisFormValid = sanatio.checkForSubmittedElements();
      return false;
    });
  
    return this;

  };

  /**
  * Auto initialize plugins for forms which have data-sanatio attribute
  * @param
  * @return
  */
  var defaultFormRulesObj = [];
  $(function() {
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