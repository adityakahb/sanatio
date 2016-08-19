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
    localSettings;
  
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
  
  var isThisFormValid;
  
  var preparedElements,
    checkedElements;
  
  var sanatioTrim = function (value) {
     return typeof value === 'string' ? value.replace( /^\s+|\s+$/g, '' ) : value;
  };
  var sanatioValue = function (element){
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
    defaultSanatioRulesObj.rules = [];
    
    for (rulesElementCount = 0; rulesElementCount < elementObj.elementsToValidate.length; rulesElementCount++){
      thisRuleElement = elementObj.elementsToValidate[rulesElementCount];
      
      tempRuleObj = {};
      tempRuleObj[$(thisRuleElement).attr('name')] = [];
      
      for (defaultRulesCount = 0; defaultRulesCount < defaultApplicableRules.length; defaultRulesCount++){
        for (rulesAttributesCount = 0; rulesAttributesCount < thisRuleElement.attributes.length; rulesAttributesCount++){
          
          ruleAttributeName = thisRuleElement.attributes[rulesAttributesCount];
          if (ruleAttributeName.name.indexOf( defaultApplicableRules[ defaultRulesCount ]) !== -1){
            tempRuleObj2 = {};
            tempRuleObj2['type'] = $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]+'-type');
            tempRuleObj2['name'] = defaultApplicableRules[ defaultRulesCount ];
            tempRuleObj2['value'] = $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]);
            tempRuleObj2['message'] = $(thisRuleElement).attr('data-sanatio-'+defaultApplicableRules[ defaultRulesCount ]+'-message');
            tempRuleObj[$(thisRuleElement).attr('name')].push(tempRuleObj2);
            break;
          }
        }
      }
      defaultSanatioRulesObj.rules.push(tempRuleObj);
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
          rules: defaultRulesObj[rulesElementCount].rules
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
      rules: {},
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
      messages: {
        
      },
      events: {
    		focusin: function (element) {
    			console.log('focusin');
    		},
    		focusout: function (element) {
    			console.log('focusout');
    		},
    		keyup: function (element, event) {
          console.log('keyup');
    			if ( event.which === 9 && this.elementValue( element ) === '' || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
    				return;
    			} else {
            
    			}
    		},
    		click: function (element) {
          console.log('clicked');
    		}
      },
      getElement: function (formElement, elementName){
        return formElement.find('[name='+elementName+']');
      },
      checkFor: {
        required: function (elementObj){
          if (elementObj.isClickable){
            if (sanatioValue(elementObj.element) === 0 || sanatioValue(elementObj.element).length === 0){
              console.log(elementObj.element, 'fail');
            } else {
              console.log(elementObj.element, 'pass');
            }
          } else {
            if (sanatioTrim(elementObj.element.val()).length > 0){
              console.log(elementObj.element, 'pass');
            } else {
              console.log(elementObj.element, 'fail');
            }
          }
        }
      }
  	},
    prototype: {
      prepareFormElements: function (){
        formElement = $(this.currentForm);
        formSettings = this.settings;
        for (cnt in formSettings.rules){
          for (outerCnt in formSettings.rules[cnt]){
            thisElement = formSettings.getElement(formElement, outerCnt);
            // this.settings = ['1', '2'];
            tempObj = {};
            tempObj.element = thisElement;
            if (thisElement.attr('type') === 'radio' || thisElement.attr('type') === 'checkbox' || thisElement.prop('tagName').toLowerCase() === 'select' || thisElement.prop('tagName').toLowerCase() === 'option'){
              tempObj.isClickable = true;
            } else {
              tempObj.isClickable = false;
            }
            
            for (innerCnt in formSettings.rules[cnt][outerCnt]){  
              if (formSettings.rules[cnt][outerCnt][innerCnt].name === 'required'){
                tempObj.shouldApplyRequired = true;
                break;
              } else {
                tempObj.shouldApplyRequired = false;
              }
            }
            /*for (innerCnt in formSettings.rules[cnt][outerCnt]){  
              if (formSettings.rules[cnt][outerCnt][innerCnt].name === 'minlength'){
                tempObj.applyMinlength = true;
                break;
              } else {
                tempObj.applyMinlength = false;
              }
            }*/
            this.settings.preparedElements.push(tempObj);
          }
        }
      },
      init: function (){
        // console.log('this', this);
        
        formEventCallMethod = function (event){
          localValidator = $.data( this.form, 'sanatio' );
  				//localEventType = "on" + event.type.replace( /^validate/, "" );
          localEventType = event.type;
  				localSettings = localValidator.settings;
          //console.log('localEventType', localEventType);
          console.log('localSettings[ localEventType ]', localSettings.events[ localEventType ]);
  				if ( localSettings[ localEventType ] && !$( this ).is( localSettings.ignoreElements ) ) {
            console.log('localSettings', localSettings);
  					// settings[ eventType ].call( sanatio, this, event );
  				}
          
          //console.log(event.type);
        };
        
        $( this.currentForm ).on( 'focusin.sanatio focusout.sanatio keyup.sanatio',
  					':text, [type=password], [type=file], select, textarea, [type=number], [type=search], [type=tel], [type=url], [type=email], [type=datetime], [type=date], [type=month], [type=week], [type=time], [type=datetime-local], [type=range], [type=color], [type=radio], [type=checkbox], [contenteditable]', formEventCallMethod ).on( 'click.sanatio', 'select, option, [type=radio], [type=checkbox]', formEventCallMethod);
      },
      checkForDefaultRules: function (){
        preparedElements = this.settings.preparedElements;
        for (cnt in preparedElements){
          if (preparedElements[cnt].shouldApplyRequired){
            this.settings.checkFor.required(preparedElements[cnt]);
          }
        }
        return false;
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
      isThisFormValid = sanatio.checkForDefaultRules();
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