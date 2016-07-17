(function( $ ) {
  
  var defaultApplicableRules = [
    'required',
    'minlength',
    'maxlength',
    'pattern',
    'luhn',
    'creditcard',
    'date',
    'shouldBeSameAs',
    'capslock'
  ],
    defaultRulesCount;
  
  var defaultElements,
    defaultElementSettings,
    defaultElementCount,
    defaultElementObj;
 
 
  var formElement,
    sanatioElementsPattern = 'data-sanatio';
  
  
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
  * Creates validation rules JSON object
  * @param elementsObj
  * @return JSON object with respect to every form
  */
  var sanatioRulesObj,
    rulesElementCount,
    rulesAttributesCount,
    thisRuleElement,
    tempRuleObj,
    ruleAttributeName;
  var createSanatioRules = function (elementObj){
    sanatioRulesObj = {};
    sanatioRulesObj.formElement = elementObj.formElement;
    sanatioRulesObj.rules = [];
    
    for (rulesElementCount = 0; rulesElementCount < elementObj.elementsToValidate.length; rulesElementCount++){
      thisRuleElement = elementObj.elementsToValidate[rulesElementCount];
      
      for (rulesAttributesCount = 0; rulesAttributesCount < thisRuleElement.attributes.length; rulesAttributesCount++){
        for (defaultRulesCount = 0; defaultRulesCount < defaultApplicableRules.length; defaultRulesCount++){
          
          ruleAttributeName = thisRuleElement.attributes[rulesAttributesCount];
          if (ruleAttributeName.name.indexOf( defaultApplicableRules[ defaultRulesCount ])){
            tempRuleObj = {};
            console.log($(thisRuleElement).attr('name'));
            break;
          }
        }
      }
    }
  };

  var init = function (parentElement){
    
  };

  $.fn.sanatio = function(options) {

    var settings,
      defaults;

      settings = $.extend( true, {}, defaults, options );
  
      init(this);
  
      return this;

    };

    /**
    * Auto initialize plugins for forms which have data-sanatio attribute
    * @param
    * @return
    */
    $(function() {
      defaultElements = $('[data-sanatio]');
      for (defaultElementCount = 0; defaultElementCount < defaultElements.length; defaultElementCount++){
        defaultElementObj = defaultInit($(defaultElements[defaultElementCount]));
        if (defaultElementObj.elementsToValidate.length > 0){
          createSanatioRules(defaultElementObj);
        }
      }
    });
 
}( jQuery ));