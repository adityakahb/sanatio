SANATIO
=======
A jquery validation plugin to handle warnings and errors separately.
_[sanatio on wiktionary](https://en.wiktionary.org/wiki/sanatio)_

Installation
============
BOWER: `bower install sanatio`

NPM: `npm install sanatio`

Basic Requirements
==================
* __[JQuery](http://www.jquery.com) is required for the plugin.__

* __[MomentJS](http://momentjs.com) is required for Date related validations.__

* __All Form elements must have valid name attributes. `Sanatio` does not work with IDs, but with Names.__

* __The Form must have a submit button.__

Supported Browsers
==================
__All modern browsers are supported__

Usage
=====

### Via `data-sanatio`

```html
<form data-sanatio id="formId" action="/">
  <label for="textfield">Text</label>
  <input type="text" name="textfield" id="textfield" placeholder="text"
    data-sanatio-required="true"
  >
  <hr>
  <label for="passwordfield">Password</label>
  <input type="password" name="passwordfield" id="passwordfield" placeholder="passwordfield"
    data-sanatio-required="true"
    data-sanatio-capslock="true"
    data-sanatio-pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    data-sanatio-pattern-type="warning"
  >
  <button type="submit">Submit</button>
</form>
```

### Via `jquery`

```html
<form data-sanatio id="formId" action="/">
  <label for="textfield">Text</label>
  <input type="text" name="textfield" id="textfield" placeholder="text">
  <hr>
  <label for="passwordfield">Password</label>
  <input type="password" name="passwordfield" id="passwordfield" placeholder="passwordfield">
  <button type="submit">Submit</button>
</form>
```
```js
  var validatorObj = {
    'rulesConfig': [{
      'elementName': 'textfield',
      'rules': [
        {
          "name": "error",
          "value": "true"
        }
      ]
    },{
      'elementName': 'passwordfield',
      'rules': [
        {
          "name": "required",
          "value": "true"
        },
        {
          "name": "capslock",
          "value": "true",
          "type": "warning"
          "message": "Customized message for this element"
        },
        {
          "name": "pattern",
          "type": "warning",
          "value": "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        }
      ]
    }]
  }
  var initSanatioForm = $('#formId').sanatio(validatorObj);
```

Features
========
* Define `type` to specify if it should be considered as a warning.
* If `type` is not specified, it is taken as an error.
* You can configure if you want the form to be passed with warnings or not.
* You can specify the messages for every error or warning
* Same rule can be applied as warning to one element and error to another.
* Custom rule with custom logic can be added to the Sanatio.
* jQuery Chaining supported when initiated via jQuery.
* In-built credit card formatter available.
* Conditional validation for Checkboxes.
* More features will be added soon.

Available Rules
===============

### If Boolean values are defined as false, validation will be ignored.
* `capslock`: Uses `capslock.js` snippets from `http://code.stephenmorley.org/`
  * `Boolean`
* `required`: Vanilla empty value checker
  * `Boolean`
* `pattern`: RegExp checker
  * `Regexp pattern`
* `email`: Inbuilt Email RegExp checker
  * `Boolean`
* `digits`: Inbuilt Only Digits RegExp checker
  * `Boolean`
* `url`: Inbuilt URL RegExp checker
  * `Boolean`
* `minvalue`: To check supplied value against required minimum
  * `Numeric`
* `maxvalue`: To check supplied value against required maximum
  * `Numeric`
* `minlength`: To check length of supplied value against required minimum
  * `Numeric`
* `maxlength`: To check length of supplied value against required maximum
  * `Numeric`
* `luhn`: Luhn check for Credit Card number
  * `Boolean`
* `creditcard`: Inbuilt Credit card RegExp checker; Luhn check can be added into this
  * 'with-luhn' or 'without-luhn (default)'
  * `data-sanatio-creditcard-formatter` optionally can be specified for enabling in-built formatting of credit card number: (' ' or '-' or '')
* `date`: To check if supplied value is a date.
  * `Boolean`
* `dateformat`: To check if supplied value strictly follows the required date format.
  * `date-format`as required be `momentjs`.
* `equalthisto`: To check if supplied value matches with required element name.
  * `Other form element name` for value comparison.
* `rangelength`: To check if length of supplied value falls under required minimum and maximum.
  * `Numeric`
* `rangevalue`: To check if supplied value falls under required minimum and maximum.
  * `Numeric`
* `if`: Conditional validation if the criteria is met.
  * `Other form element name:checked`

### Coming soon
* `step`
* `remote`
* `group` (validation elements as a group, like [DD] [MM] [YYYY] or [first name] [last name]) 

Usage in Detail
===============

### Details of working with `data-sanatio`

This is more straight forward way of using `Sanatio`. This helps people with minimum and straight forward requirements to implement validation.

Add `data-sanatio` to the form element to get this collected into the `Sanatio` plugin.
```html
<form id="form-id" data-sanatio>
```

Add rules to every form element as needed.
```html
<input type="text" name="textfield" id="textfield" placeholder="text"
  data-sanatio-{{rulename}}="{{rulevalue}}"
  data-sanatio-{{rulename}}-type="{{warning / error}}"
  data-sanatio-{{rulename}}-message="{{Customized message}}"
>
```

For sample creditcard:
```html
<input type="text" name="textfield" id="textfield" placeholder="text"
  data-sanatio-creditcard="with-luhn"
  data-sanatio-creditcard-type="error"
  data-sanatio-creditcard-formatter="-"
>
```

If the form contains only warnings and no errors, it is considered as valid. You can reverse this behaviour with `data-sanatio-spec-allowwarningstopassform`. Default value is `true`.
```html
<form id="form-id" data-sanatio data-sanatio-spec-allowwarningstopassform='false'>
```

That's it. No need to specify anything else. `Sanatio` will handle the validation itself.

User does not have any more custom options available from the plugin. But if initiated explicitly via jQuery, `Sanatio` provides some configurable options.

### Details of explicit `jquery` implementation

__HTML markup should not have any `data-sanatio` attributes.__ 

```js
  var validatorObj = {
    'debug': true,
    'highlightParent': '.form-group',
    'errorClass': 'has-error',
    'warningClass': 'has-warning',
    'errorTag': 'span',
    'additionalErrorClasses': 'help-block',
    'additionalWarningClasses': 'help-block',
    'rulesConfig': [{
      'elementName': '<<name attribute of the element>>', /* ID will not work */
      'rules': [
        {
          "name": "<<rulename>>",
          "value": "<<rule value>>", /* Can be boolean or string depending on the rule; if boolean, true or false both are expected */
          "message": "<<custom error message>>", /* Optional */
          "type": "error" /* 'error' or 'warning' is expected. If not mentioned, will be taken as error */
        }
      ]
    }]
  }
```

### Configurations
* `debug`: If set to `true`, will stop the form submission even if validated; adds `event.preventDefault()` to the form submit event; default is `false`

* `allowWarningsToPassForm`: If set to `false`, will not allow the form to be submitted if it has only warnings; default is `true`

* `errorClass`: CSS Class applied to the displayed error; default is `sanatio-error`

* `warningClass`: CSS Class applied to the displayed warning __NOTE__: both `errorClass` and `warningClass` are independent; if only one is mentioned, other will not take it;  default is `sanatio-warn`

* `additionalErrorClasses`: If more CSS classes need to be added to the errors

* `additionalWarningClasses`: If more CSS classes need to be added to the warnings __NOTE__: independent to `additionalErrorClasses`

* `highlightParent`: The parent of the element can be highlighted with the CSS classes mentioned in `errorClass`, `warningClass`, `additionalErrorClasses` and `additionalWarningClasses`

* `messagePlaceholder`: In case you want to place the error or warning in certain placeholder related to individual form element

* `errorTag`: Markup element to place the error or warning message; default is `label`


### Methods

`addSanatioRule`: Can be used to add custom rule to `Sanatio`; must return Boolean
```js
$.sanatio.addSanatioRule('customrule', function (element, value){
  return parseInt(element.val()) !== parseInt(value);
});
```
`submitHandler`: Can be used to add custom logic while submitting the __validated__ form __NOTE__ this will apply to all forms on the page globally
```js
$.sanatio.submitHandler = function (){
  alert('form validated');
  /* For example, ajax logic can be implemented here */
  return false;
};
```
`getSanatioObject`: For debugging purpose. Nothing to describe as such.
```js
var sanatioInit = $('#form1').sanatio(validatorObj);
console.log(sanatioInit.getSanatioObject());
```
`getValidityStatus`: Returns an object with counts of errors and warnings on the form.
```js
var sanatioInit = $('#form1').sanatio(validatorObj);
console.log(sanatioInit.getValidityStatus()); /* Returns Object {errors: 0, warnings: 0} */
```
`destroySanatio`: Destroys the `Sanatio` implementation on a form.
```js
var sanatioInit = $('#form1').sanatio(validatorObj); /* Initiates Sanatio and returns form object */
var sanatioDestroy = $('#form1').destroySanatio(); /* Destroys Sanatio and returns form object */
```

More
====
More to come soon.