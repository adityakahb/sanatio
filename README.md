SANATIO
=======
A jquery validation plugin to handle warnings and errors separately.

Installation
============
BOWER: `bower install sanatio`

NPM: `npm install sanatio`

Basic Requirements
==================
__[JQuery](http://www.jquery.com) is required for the plugin. [MomentJS](http://momentjs.com) is required for Date related validations__

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
          "name": "error"
        }
      ]
    },{
      'elementName': 'passwordfield',
      'rules': [
        {
          "name": "required"
        },
        {
          "name": "capslock",
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
* More features will be added soon.

More
====
More to come soon.