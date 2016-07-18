(function( $ ) {
  
  var defaultApplicableRules = [
    'required',
    'pattern',
    'email',
    'url',
    'minlength',
    'maxlength',
    'luhn',
    'creditcard',
    'date',
    'shouldBeSameAs',
    'capslock'
  ],
    defaultRulesCount,
    ignoreKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
  
  var defaultElements,
    defaultElementSettings,
    defaultElementCount,
    defaultElementObj;
 
  var formValidStatus = false,
    elementValidStatus = false;
 
  var formElement,
    sanatioElementsPattern = 'data-sanatio';
  
  var cnt,
    outerCnt,
    innerCnt,
    rootCnt;
  
  var patternRegex;
  
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
  
  $.fn.sanatio = function(options) {

    var settings,
      defaults;

      settings = $.extend( true, {}, defaults, options );
      
      var msgCnt;
      var showSanatioErrors = function (element, settingsFn){
        for (msgCnt = 0; msgCnt < settingsFn.length; msgCnt++){
          element.parent().find('.sanatio-message').remove();
          if (settingsFn[msgCnt].isValid === false){
            element.after('<span class="sanatio-message sanatio-error">' + settingsFn[msgCnt].message + '</span>');
            break;
          } else if (settingsFn[msgCnt].isValid === 'warn'){
            element.after('<span class="sanatio-message sanatio-warn">' + settingsFn[msgCnt].message + '</span>');
            break;
          } else if (settingsFn.isValid === true){
            element.parent().find('.sanatio-message').remove();
          }
        }
      };
      
      /**
      * Check if the value of the element is empty
      * @param element
      * @return is empty or not: Boolean
      */
      var checkRuleRequired = function (elem){
        if ($.type(elem.val()) === 'string'){
          return $.trim(''+elem.val()).length > 0 ? true : false;
        } else {
          return elem.val().length > 0 ? true : false;
        }
      };
      
      /**
      * Check if the value matches the expected pattern
      * @param element
      * @return is pattern matched or not: Boolean
      */
      var checkRulePattern = function (elem, pattern){
        patternRegex = new RegExp( pattern );
        return patternRegex.test( $.trim( '' + elem.val() ));
      };
      
      /**
      * Add events to the form elements
      * @param form, respective element, settings
      * @return 
      */
      var addRuleEvents = function (formElement, ruleElement, ruleSettings){
        ruleElement = selectByNameOrId(formElement, ruleElement);
        
        ruleElement.on('keyup.sanatio', function(e){
          if ( e.which === 9 && $.trim(''+ruleElement.val()) === '' || $.inArray( e.keyCode, ignoreKeys ) !== -1 ) {
    				return;
    			}
          for (cnt in ruleSettings){
            
            switch (ruleSettings[cnt].name) {
              case 'required':{
                ruleSettings[cnt].isValid = checkRuleRequired(ruleElement);
                ruleSettings[cnt].isValid = (ruleSettings[cnt].type === 'warn' && ruleSettings[cnt].isValid === false) ? 'warn' : ruleSettings[cnt].isValid;
                break;
              }
              case 'pattern':{
                ruleSettings[cnt].isValid = checkRulePattern(ruleElement, ruleSettings[cnt].value);
                ruleSettings[cnt].isValid = (ruleSettings[cnt].type === 'warn' && ruleSettings[cnt].isValid === false) ? 'warn' : ruleSettings[cnt].isValid;
                break;
              }
              case 'email':{
                ruleSettings[cnt].isValid = checkRulePattern(ruleElement, '^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$');
                ruleSettings[cnt].isValid = (ruleSettings[cnt].type === 'warn' && ruleSettings[cnt].isValid === false) ? 'warn' : ruleSettings[cnt].isValid;
                break;
              }
              default: ruleSettings[cnt].isValid = true;
            };
          }
          showSanatioErrors(ruleElement, ruleSettings);
        });
      };
      
      /**
      * Selects the element from the form based on the name or id
      * @param form, selector string
      * @return Applicable element
      */
      var tempElement;
      var selectByNameOrId = function (formElement, string){
        
        //TODO: Enahance this more to select dynamically.
        tempElement = $(formElement).find('[name=' + string + ']');
        
        if (tempElement.length > 1){
          return $(tempElement).eq(0);
        }
        
        return $(tempElement);
      };
      
      /**
      * Main plugin init
      * @param form element and rules settings
      * @return
      */
      var init = function (formObj, ruleSettings){
        
        for(outerCnt in ruleSettings){
          for(innerCnt = 0; innerCnt < ruleSettings[outerCnt].length; innerCnt++){
            for (rootCnt in ruleSettings[outerCnt][innerCnt]){
              formValidStatus = addRuleEvents(formObj, rootCnt, ruleSettings[outerCnt][innerCnt][rootCnt]);
            }
          }
        }
      };
  
      init(this, settings);
  
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