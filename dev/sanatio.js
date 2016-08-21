(function( $ ) {
  
  'use strict';
  
  var defaultApplicableRules = [
    'required',
    'pattern',
    'email',
    'digits',
    'equalsWith',
    'url',
    'minlength',
    'maxlength',
    'luhn',
    'creditcard',
    'date',
    'shouldBeSameAs',
    'capslock'
  ],
    defaultRulesCount;
  
    // Avoid revalidate the field when pressing one of the following keys
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
  var excludedKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225],
    formEventCallMethod,
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
    tempObj;
  
  var cnt,
    outerCnt,
    innerCnt,
    rootCnt;
  
  var patternRegex;
  
  var isThisFormValid = {},
    isThisElementValid = {},
    isThisFormElementValid = {};
  
  var preparedElements,
    checkedElements;
  
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
        
      },
      events: {
    		focusin: function (sanitator, elementObj, event) {
    			console.log('focusin');
    		},
    		focusout: function (sanitator, elementObj, event) {
          if (elementObj.isEditable && sanitator.settings.submitted.indexOf(elementObj) !== -1){
            sanitator.settings.sanitation(sanitator, elementObj);
          }
    		},
    		keyup: function (sanitator, elementObj, event) {
          // console.log('keyup', elementObj, event);
    			if ( event.which === 9 && sanatioTrimmedValue( elementObj.element.val() ) === '' || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
    				return;
    			} else {
            sanitator.settings.sanitation(sanitator, elementObj);
    			}
    		},
    		click: function (sanitator, elementObj, event) {
          console.log('clicked');
    		}
      },
      getElement: function (formElement, elementName){
        return formElement.find( '[name=' + elementName + ']' );
      },
      sanitation: function (sanitator, elementObj){
        localSettings = sanitator.settings;
        $.each(localSettings.rulesConfig, function(index, elementItem){
          
          if (elementItem.elementObj === elementObj){
            isThisElementValid.has = {};
            isThisElementValid.has.errors = false;
            isThisElementValid.has.warnings = false;
            isThisElementValid.has.message = '';
            for (innerCnt in elementItem.rules){
              if (!isThisElementValid.has.errors && elementItem.rules[innerCnt].name === 'required'){
                isThisElementValid.has = localSettings.checkFor.required( elementObj, elementItem.rules[innerCnt] );
              }
            }
            // if (sanitator.settings.preparedInvalidElements.indexOf([elementObj, isThisElementValid]) === -1){
            
            if (sanitator.settings.preparedInvalidElements[elementItem.elementName] === 'undefined'){
              sanitator.settings.preparedInvalidElements[elementItem.elementName] = {};
            }
            sanitator.settings.preparedInvalidElements[elementItem.elementName] = [elementObj, isThisElementValid];
          }
        });
        localSettings.showErrors();
      },
      checkFor: {
        required: function (elementObj, rulesObj){
          if (elementObj.isClickable){
            if (sanatioClickedValue(elementObj.element) === 0 || sanatioClickedValue(elementObj.element).length === 0){
              return rulesObj.type === 'error' ? { errors: true, warnings: false, message: rulesObj.message } : { errors: false, warnings: true, message: rulesObj.message };
            } else {
              return {
                errors: false,
                warnings: false,
                message: ''
              };
            }
          } else {
            if (sanatioTrimmedValue(elementObj.element.val()).length > 0){
              return {
                errors: false,
                warnings: false,
                message: ''
              };
            } else {
              return rulesObj.type === 'error' ? { errors: true, warnings: false, message: rulesObj.message } : { errors: false, warnings: true, message: rulesObj.message };
            }
          }
        }
      },
      showErrors: function (){
        // console.log('sanatioArray', this.preparedInvalidElements);
        for (cnt in this.preparedInvalidElements){
          console.log('cnt', cnt, this.preparedInvalidElements[cnt]);
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
            
            /* if (formSettings.rulesConfig[cnt].rules[outerCnt].name === 'minlength'){
              tempObj.applyMinlength = true;
              break;
            } else {
              tempObj.applyMinlength = false;
            } */
            
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
        isThisFormElementValid.has = {};
        isThisFormElementValid.has.errors = false;
        isThisFormElementValid.has.warnings = false;
        isThisFormElementValid.has.message = '';
        
        for (cnt in this.settings.rulesConfig){
          if (this.settings.submitted.indexOf(this.settings.rulesConfig[cnt].elementObj) === -1 ){
            this.settings.submitted.push(this.settings.rulesConfig[cnt].elementObj);
          }
          if (this.settings.rulesConfig[cnt].elementObj.shouldApplyRequired){
            
            for (innerCnt in this.settings.rulesConfig[cnt].rules){
              
            }
            
            isThisFormElementValid.has = this.settings.checkFor.required(this.settings.rulesConfig[cnt].elementObj, this.settings.rulesConfig[cnt].rules);
            if (this.settings.preparedInvalidElements[this.settings.rulesConfig[cnt].elementName] === 'undefined') {
              this.settings.preparedInvalidElements[this.settings.rulesConfig[cnt].elementName] = {};
            }
            this.settings.preparedInvalidElements[this.settings.rulesConfig[cnt].elementName] = [this.settings.rulesConfig[cnt].elementObj, isThisFormElementValid];
          }
        }
        this.settings.showErrors();
        /* preparedElements = this.settings.preparedElements;
        for (cnt in preparedElements){
          if (preparedElements[cnt].shouldApplyRequired){
            this.settings.checkFor.required(preparedElements[cnt]);
          }
        }*/
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
    // console.log(defaultFormRulesObj);
    defaultSanatioValidate(defaultFormRulesObj);
  });
 
}( jQuery ));