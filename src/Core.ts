import {SanatioInterfaces} from './Interfaces';
import {SanatioConstants} from './Constants';

import * as BankcardRule from './rules/bankcard';
import * as DateRule from './rules/date';
import * as DateISORule from './rules/dateISO';
import * as DigitsRule from './rules/digits';
import * as EmailRule from './rules/email';
import * as EqualsToRule from './rules/equalsto';
import * as MaxRule from './rules/max';
import * as MaxLengthRule from './rules/maxlength';
import * as MaxOptionsRule from './rules/maxoptions';
import * as MinRule from './rules/min';
import * as MinLengthRule from './rules/minlength';
import * as MinOptionsRule from './rules/minoptions';
import * as NumberRule from './rules/number';
import * as NotEqualsTo from './rules/notequalsto';
import * as PatternRule from './rules/pattern';
import * as RangeRule from './rules/range';
import * as RangeLengthRule from './rules/rangelength';
import * as RangeOptionsRule from './rules/rangeoptions';
import * as RequiredRule from './rules/required';
import * as StepRule from './rules/step';
import * as URLRule from './rules/url';

export namespace SanatioCore {
  let noOfErrors = 0,
    noOfWarnings = 0,
    currentValue : boolean | number | Array < number > | string;
  const _defaultElementBook : SanatioInterfaces.ElementBook = SanatioConstants._ElemBook;
  const _elementsForKeyboardEvents : string[] = SanatioConstants._KeyElem;
  const _elementsForMouseEvents : string[] = SanatioConstants._MouseElem;
  const _excludedKeys : number[] = SanatioConstants._excludedKeys;
  const _elementsSupportingIcons : string[] = SanatioConstants._IconicElem;
  const _defaultFormInstance : SanatioInterfaces.FormInstance = SanatioConstants._Instance;
  const _CapslockFn : Function = SanatioConstants._CapslockFn;
  const _TrimFn : Function = SanatioConstants._TrimFn;
  const _MatchesPolyfill : Function = SanatioConstants._MatchesPolyfill;
  const _NearestParent : Function = SanatioConstants._NearestParent;
  const _FormatMsg : Function = SanatioConstants._FormatMsg;
  const _ArrayCall : Function = SanatioConstants._ArrayCall;
  const _ElemValue : Function = SanatioConstants._ElemValue;
  const _EscCssMeta : Function = SanatioConstants._EscCssMeta;
  const _FormatCard : Function = SanatioConstants._FormatCard;

  const _AddClass : Function = SanatioConstants._AddClass;
  const _RemoveClass : Function = SanatioConstants._RemoveClass;

  const _IsInCollection : Function = SanatioConstants._IsInCollection;

  export class Core {
    protected static _Methods : SanatioInterfaces.MethodBook = SanatioConstants._MethodBook;
    protected static _Messages : SanatioInterfaces.MessageBook = SanatioConstants._MessageBook;
    protected static _RuleBook : SanatioInterfaces.RuleBook = SanatioConstants._RuleBook;
    protected static _RuleRef : SanatioInterfaces.RuleReference = SanatioConstants._RuleRef;
    public globals : SanatioInterfaces.GlobalFunctions;
    private _i : SanatioInterfaces.FormInstance;
    private _submitHandler : Function;
    private _bookCol : SanatioInterfaces.BookCollection = {};

    private _submitClosure : EventListenerOrEventListenerObject | undefined = undefined;
    private _focusClosure : EventListenerOrEventListenerObject | undefined = undefined;
    private _blurClosure : EventListenerOrEventListenerObject | undefined = undefined;
    private _keyupClosure : EventListenerOrEventListenerObject | undefined = undefined;
    private _keypressClosure : EventListenerOrEventListenerObject | undefined = undefined;
    private _clickClosure : EventListenerOrEventListenerObject | undefined = undefined;

    constructor(formElement : HTMLFormElement) {
      this._i = JSON.parse(JSON.stringify(_defaultFormInstance));
      this._i._form = formElement;

      this.globals = {
        getNumberOfErrors: () : number => {
          try {
            return this._i._eCount;
          } catch (e) {
            console.error('Error while fetching the number of errors', e);
            return -1;
          }
        },
        getNumberOfWarnings: () : number => {
          try {
            return this._i._wCount;
          } catch (e) {
            console.error('Error while fetching the number of warnings', e);
            return -1;
          }
        },
        submitHandler: (submitHandlerFn : Function) : boolean => {
          try {
            this._submitHandler = submitHandlerFn;
            return true;
          } catch (e) {
            console.error('Error while adding the custom SubmitHandler', e);
            return false;
          }
        }
      };
      this._submitHandler = this._defaultSubmitFn;
      _MatchesPolyfill();
      this._init();
    }

    public static _addRule(rule : SanatioInterfaces.RuleStructure) : void {
      try {
        if (!rule.name || !rule.definition || !rule.message) {
          console.error('New Method not defined properly. It must be in format {name, definition, message' +
              '}.');
          return;
        }
        if (Core._Methods[rule.name]) {
          console.error('Rule ' + rule.name + ' already exists.');
        } else {
          Core._Methods[rule.name] = rule.definition;
          Core._Messages[rule.name] = rule.message && SanatioConstants
            ._TrimFn(rule.message.toString())
            .length > 0
            ? rule.message
            : 'Undefined message for ' + rule.name;
          Core._RuleBook[rule.name] = Core._RuleRef;
        }
      } catch (e) {
        console.error('Error while adding method', e);
      }
    }

    public _destroy = () : boolean => {
      try {
        this._manageMsgs(true);
        this._clearCapsMsg();
        this._attachSubmit(false);
        this._attachEvents(false);
        this._submitHandler = this._defaultSubmitFn;
        this._i = JSON.parse(JSON.stringify(_defaultFormInstance));
        return true;
      } catch (e) {
        console.error('Error while destroying the instance', e);
        return false;
      }
    }

    private _defaultSubmitFn() {
      if (this._i._form) {
        this
          ._i
          ._form
          .submit();
      }
    }

    private _showMsg(
      book : SanatioInterfaces.ElementBook,
      ruleReference : SanatioInterfaces.RuleReference) : void {

      let errorElement,
        iconElement,
        existingIconElement,
        parentElement,
        firstBook;

      if (!book.isPartOf) {
        firstBook = book;
      } else {
        firstBook = this._bookCol[book.isPartOf[0]];
      }

      if (this._i._props.container) {
        parentElement = this._i._props.container;
      } else if (firstBook.container) {
        parentElement = firstBook.container;
      } else {
        parentElement = firstBook.parent;
      }
      if (parentElement) {
        errorElement = parentElement.querySelector('.' + book.name + '.' + ruleReference.alertType);
        if (!errorElement) {
          errorElement = document.createElement(this._i._props.elem);
          errorElement.innerHTML = ruleReference.message;
          errorElement.className = 'sanatio-alert ' + ruleReference.alertType + ' ' + book.name;
          if (book.nodes) {
            if (ruleReference.alertType === 'error') {
              errorElement.className += ' ' + this._i._props.msgE;
              iconElement = book.isIconApplicable && _TrimFn(this._i._props.iconE).length > 0
                ? document.createElement('span')
                : null;
              if (iconElement) {
                iconElement.className = 'sanatio-icon error ' + this._i._props.iconE;
              }
              _ArrayCall(book.nodes).forEach((node : HTMLElement) => {
                _AddClass(node, this._i._props.elemE);
              });
              _AddClass(book.parent as HTMLElement, this._i._props.parentE);
            }
            if (ruleReference.alertType === 'warning') {
              errorElement.className += ' ' + this._i._props.msgW;
              iconElement = book.isIconApplicable && _TrimFn(this._i._props.iconW).length > 0
                ? document.createElement('span')
                : null;
              if (iconElement) {
                iconElement.className = 'sanatio-icon warning ' + this._i._props.iconW;
              }
              _ArrayCall(book.nodes).forEach((node : HTMLElement) => {
                _AddClass(node, this._i._props.elemW);
              });
              _AddClass(book.parent as HTMLElement, this._i._props.parentW);
            }
          }
          if (book.parent) {
            existingIconElement = book.parent.querySelector('.sanatio-icon.error');
            if (!existingIconElement && iconElement) {
              book.parent.appendChild(iconElement);
            }
          }
          parentElement.appendChild(errorElement);
        }
      }
      return;
    }

    private _clearMsg(
      book : SanatioInterfaces.ElementBook,
      ruleReference : SanatioInterfaces.RuleReference) : void {

      let errorElement,
        iconElement,
        parentElement,
        firstBook;

      if (!book.isPartOf) {
        firstBook = book;
      } else {
        firstBook = this._bookCol[book.isPartOf[0]];
      }

      if (this._i._props.container) {
        parentElement = this._i._props.container;
      } else if (firstBook.container) {
        parentElement = firstBook.container;
      } else {
        parentElement = firstBook.parent;
      }

      if (parentElement) {
        errorElement = parentElement.querySelector('.' + book.name + '.' + ruleReference.alertType);
        if (errorElement) {
          parentElement.removeChild(errorElement);
          if (book.nodes && book.parent) {
            if (ruleReference.alertType === 'error') {
              iconElement = book
                .parent
                .querySelector('.sanatio-icon.error');
              _ArrayCall(book.nodes).forEach((node : HTMLElement) => {
                _RemoveClass(node, this._i._props.elemE);
              });
              _RemoveClass(book.parent as HTMLElement, this._i._props.parentE);
            }
            if (ruleReference.alertType === 'warning') {
              iconElement = book
                .parent
                .querySelector('.sanatio-icon.warning');
              _ArrayCall(book.nodes).forEach((node : HTMLElement) => {
                _RemoveClass(node, this._i._props.elemW);
              });
              _RemoveClass(book.parent as HTMLElement, this._i._props.parentW);
            }
            if (iconElement) {
              book
                .parent
                .removeChild(iconElement);
            }
          }
        }
      }
      return;
    }

    private _showCapsMsg(book : SanatioInterfaces.ElementBook) : void {
      if (book.parent) {
        let existingCapsElem = book.parent.querySelector('.sanatio-alert.info');
        if (!existingCapsElem) {
          let capsElement = document.createElement(this._i._props.elem);
          capsElement.className = 'sanatio-alert info ' + this._i._props.msgW;
          capsElement.innerHTML = book.capslockCheck.message;
          book.parent.appendChild(capsElement);
        }
      }
      return;
    }

    private _clearCapsMsg(book? : SanatioInterfaces.ElementBook) : void {
      let thisForm = this._i._form;
      if (book && book.parent) {
        let capsElement = book.parent.querySelector('.sanatio-alert.info');
        if (capsElement) {
          book.parent.removeChild(capsElement);
        }
      } else if (thisForm) {
        let capsElements = thisForm.querySelectorAll('.sanatio-alert.info'),
          parentNode,
          capsElementsLength = 0;
        if (capsElements) {
          capsElementsLength = capsElements.length;
        }
        while (capsElementsLength > 0) {
          parentNode = capsElements[capsElementsLength - 1].parentNode as HTMLElement;
          if (parentNode) {
            parentNode.removeChild(capsElements[capsElementsLength - 1]);
          }
          capsElementsLength--;
        }
      }
      return;
    }

    private _manageMsgs(shouldClearAllMsgs : boolean) : void {
      // TODO: Expensive DOM Manipulation. Need to rethink.
      let thisBook,
        errorFound = false,
        warningFound = false;
      if (shouldClearAllMsgs) {
        _ArrayCall(this._i._submitted).forEach((book : SanatioInterfaces.ElementBook) => {
          if (book.isPartOf) {
            _ArrayCall(book.isPartOf).forEach((name : string) => {
              thisBook = this._bookCol[name];
              for (let rule in thisBook.ruleBook) {
                if (thisBook.ruleBook.hasOwnProperty(rule) && thisBook.ruleBook[rule].isRuleAvailable) {
                  this._clearMsg(thisBook, thisBook.ruleBook[rule]);
                }
              }
            });
          } else {
            for (let rule in book.ruleBook) {
              if (book.ruleBook.hasOwnProperty(rule) && book.ruleBook[rule].isRuleAvailable) {
                this._clearMsg(book, book.ruleBook[rule]);
              }
            }
          }
        });
      } else {
        _ArrayCall(this._i._submitted).forEach((book : SanatioInterfaces.ElementBook) => {
          if (book.isPartOf) {
            if (book.isPartOf.indexOf(book.name) === 0) {
              console.log('---book', book);
              _ArrayCall(book.isPartOf).every((name : string) => {
                console.log('---name 1', name);
                errorFound = false;
                thisBook = this._bookCol[name];
                for (let rule in thisBook.ruleBook) {
                  if (thisBook.ruleBook.hasOwnProperty(rule) && thisBook.ruleBook[rule].alertType === 'error') {
                    if (thisBook.ruleBook[rule].isRuleAvailable) {
                      this._clearMsg(thisBook, thisBook.ruleBook[rule]);
                    }
                    if (thisBook.ruleBook['required'].isRuleAvailable && !thisBook.ruleBook['required'].isValid) {
                      this._showMsg(thisBook, thisBook.ruleBook['required']);
                      errorFound = true;
                      break;
                    }
                    if (rule !== 'required' && thisBook.ruleBook[rule].isRuleAvailable && !thisBook.ruleBook[rule].isValid) {
                      this._showMsg(thisBook, thisBook.ruleBook[rule]);
                      errorFound = true;
                      break;
                    }
                  }
                }

                return !errorFound;
              });
              _ArrayCall(book.isPartOf).every((name : string) => {
                console.log('---name 2', name);
                warningFound = false;
                thisBook = this._bookCol[name];
                for (let rule in thisBook.ruleBook) {
                  if (thisBook.ruleBook.hasOwnProperty(rule) && thisBook.ruleBook[rule].alertType === 'warning') {
                    if (thisBook.ruleBook[rule].isRuleAvailable) {
                      this._clearMsg(thisBook, thisBook.ruleBook[rule]);
                    }
                    if (thisBook.ruleBook[rule].isRuleAvailable && !thisBook.ruleBook[rule].isValid) {
                      this._showMsg(thisBook, thisBook.ruleBook[rule]);
                      warningFound = true;
                      break;
                    }
                  }
                }

                return !warningFound;
              });
            }
          } else {
            for (let rule in book.ruleBook) {
              if (book.ruleBook.hasOwnProperty(rule) && book.ruleBook[rule].alertType === 'error') {
                if (book.ruleBook[rule].isRuleAvailable) {
                  this._clearMsg(book, book.ruleBook[rule]);
                }
                if (book.ruleBook['required'].isRuleAvailable && !book.ruleBook['required'].isValid) {
                  this._showMsg(book, book.ruleBook['required']);
                  break;
                }
                if (rule !== 'required' && book.ruleBook[rule].isRuleAvailable && !book.ruleBook[rule].isValid) {
                  this._showMsg(book, book.ruleBook[rule]);
                  break;
                }
              }
            }
          }
          for (let rule in book.ruleBook) {
            if (book.ruleBook.hasOwnProperty(rule) && book.ruleBook[rule].alertType === 'warning') {
              if (book.ruleBook[rule].isRuleAvailable) {
                this._clearMsg(book, book.ruleBook[rule]);
              }
              if (book.ruleBook[rule].isRuleAvailable && !book.ruleBook[rule].isValid) {
                this._showMsg(book, book.ruleBook[rule]);
                break;
              }
            }
          }
        });
      }
      return;
    }

    private _postValidation() : number {
      noOfErrors = 0;
      noOfWarnings = 0;

      _ArrayCall(this._i._submitted).forEach((book : SanatioInterfaces.ElementBook) => {
        for (let rule in book.ruleBook) {
          if (book.ruleBook.hasOwnProperty(rule)) {
            if (book.ruleBook[rule].isRuleAvailable && book.ruleBook[rule].alertType === 'error' && !book.ruleBook[rule].isValid) {
              noOfErrors++;
            }
            if (book.ruleBook[rule].isRuleAvailable && book.ruleBook[rule].alertType === 'warning' && !book.ruleBook[rule].isValid) {
              noOfWarnings++;
            }
          }
        }
      });
      this._i._eCount = noOfErrors;
      this._i._wCount = noOfWarnings;

      if (this._i._props.formPost) {
        _AddClass(this._i._form as HTMLElement, this._i._props.formPost);
      }

      this._manageMsgs(false);
      return this._i._eCount;
    }

    private _validateAgainstRule(
      thisValue : string | boolean | number | Array < number > | undefined,
      book : SanatioInterfaces.ElementBook,
      rule : string) : boolean {

      return Core._Methods[rule as string](thisValue, book.ruleBook[rule].params);
    }

    private _validateElem(book : SanatioInterfaces.ElementBook) : void {
      currentValue = _ElemValue(book);
      for (let rule in book.ruleBook) {
        if (book.ruleBook.hasOwnProperty(rule)) {
          if (book.ruleBook[rule].isRuleAvailable && book.ruleBook[rule].params) {
            book.ruleBook[rule].isRuleApplied = true;
            if (book.if) {
              if (this._validateAgainstRule(_ElemValue(book.if), book.if, 'required')) {
                book.ruleBook[rule].isValid = this._validateAgainstRule(currentValue, book, rule);
              } else {
                book.ruleBook[rule].isValid = true;
              }
            } else {
              book.ruleBook[rule].isValid = this._validateAgainstRule(currentValue, book, rule);
            }
            if (!book.ruleBook[rule].isValid && (Array.isArray(currentValue) || typeof currentValue === 'string'
              ? currentValue.length === 0
              : currentValue.toString().length === 0) && !book.isRequired) {
              book.ruleBook[rule].isValid = true;
            }
          }
        }
      }
      return;
    }

    private _submitEventFn(key : SanatioInterfaces.ElementBook[], mouse : SanatioInterfaces.ElementBook[], event : Event) : void {

      event.preventDefault();
      _ArrayCall(key).forEach((book : SanatioInterfaces.ElementBook) => {
        if (this._i._submitted && !_IsInCollection(book, this._i._submitted)) {
          this._i._submitted.push(book);
        }
        if (book.isRequired || _IsInCollection(book, this._i._submitted)) {
          if (book.isPartOf) {
            _ArrayCall(book.isPartOf).forEach((name : string) => {
              this._validateElem(this._bookCol[name]);
            });
          } else {
            this._validateElem(book);
          }
        }
      });
      _ArrayCall(mouse).forEach((book : SanatioInterfaces.ElementBook) => {
        if (this._i._submitted && !_IsInCollection(book, this._i._submitted)) {
          this._i._submitted.push(book);
        }
        if (book.isRequired || _IsInCollection(book, this._i._submitted)) {
          if (book.isPartOf) {
            _ArrayCall(book.isPartOf).forEach((name : string) => {
              this._validateElem(this._bookCol[name]);
            });
          } else {
            this._validateElem(book);
          }
        }
      });
      if (this._postValidation() === 0) {
        this._submitHandler();
      }
      return;
    }

    private _focusEventFn() : void {
      return;
    }

    private _blurEventFn(book : SanatioInterfaces.ElementBook, comingFromIf : boolean) : void {
      if ((!book.isCheckable && (_IsInCollection(book, this._i._submitted) || book.isRequired)) || comingFromIf) {
        if (book.isPartOf) {
          _ArrayCall(book.isPartOf).forEach((name : string) => {
            this._validateElem(this._bookCol[name]);
          });
        } else {
          this._validateElem(book);
        }
        this._postValidation();
      }
    }

    private _keyupEventFn(book : SanatioInterfaces.ElementBook, comingFromIf : boolean) : void {
      const thisEvent = event as KeyboardEvent;
      const thisKeycode = thisEvent.which || thisEvent.keyCode;
      if (thisKeycode === 9 && _ElemValue(book) === '' || _ArrayCall(_excludedKeys).includes(thisKeycode)) {
        return;
      } else if (_IsInCollection(book, this._i._submitted) || comingFromIf) {
        if (book.isPartOf) {
          _ArrayCall(book.isPartOf).forEach((name : string) => {
            this._validateElem(this._bookCol[name]);
          });
        } else {
          this._validateElem(book);
        }
        this._postValidation();
      }
      if (book.cardFormatting.isApplicable && book.nodes) {
        (book.nodes[0] as HTMLInputElement).value = _FormatCard(_ElemValue(book), book.cardFormatting.character);
      }
    }

    private _keypressEventFn(book : SanatioInterfaces.ElementBook) : void {
      const thisEvent = event as KeyboardEvent;
      let isCapsActive = !_CapslockFn(thisEvent);

      if (isCapsActive) {
        this._showCapsMsg(book);
      } else {
        this._clearCapsMsg(book);
      }
    }

    private _clickEventFn(book : SanatioInterfaces.ElementBook, comingFromIf : boolean) : void {
      if (_IsInCollection(book, this._i._submitted) || comingFromIf) {
        if (book.isPartOf) {
          _ArrayCall(book.isPartOf).forEach((name : string) => {
            this._validateElem(this._bookCol[name]);
          });
        } else {
          this._validateElem(book);
        }
        this._postValidation();
      }
    }

    private _attachSubmit(addOrDelete : boolean) : void {
      let keyboardElementBooks : SanatioInterfaces.ElementBook[],
      mouseElementBooks : SanatioInterfaces.ElementBook[];
      if (this._i._form && this._i._elemGrps) {
        keyboardElementBooks = this._i._elemGrps.keyTypes;
        mouseElementBooks = this._i._elemGrps.clickTypes;
        if (addOrDelete) {
          this._submitClosure = this
            ._submitEventFn
            .bind(this, keyboardElementBooks, mouseElementBooks);
          this
            ._i
            ._form
            .addEventListener('submit', this._submitClosure as EventListenerOrEventListenerObject, false);
        } else {
          this
            ._i
            ._form
            .removeEventListener('submit', this._submitClosure as EventListenerOrEventListenerObject, false);
          this._submitClosure = undefined;
        }
      }
      return;
    }

    private _attachKeyEvents(
      nodes : NodeListOf < Element > | undefined,
      book : SanatioInterfaces.ElementBook,
      addOrDelete : boolean,
      comingFromIf : boolean) : void {

      if (nodes) {
        _ArrayCall(nodes).forEach((elem : HTMLElement) => {
          if (addOrDelete) {
            this._focusClosure = this
              ._focusEventFn
              .bind(this, event);
            this._blurClosure = this
              ._blurEventFn
              .bind(this, book, comingFromIf, event);
            this._keyupClosure = this
              ._keyupEventFn
              .bind(this, book, comingFromIf, event);
            this._keypressClosure = this
              ._keypressEventFn
              .bind(this, book, event);
            elem.addEventListener('focus', this._focusClosure as EventListenerOrEventListenerObject);
            elem.addEventListener('blur', this._blurClosure as EventListenerOrEventListenerObject);
            elem.addEventListener('keyup', this._keyupClosure as EventListenerOrEventListenerObject);
            if (book.capslockCheck.isApplicable) {
              elem.addEventListener('keypress', this._keypressClosure as EventListenerOrEventListenerObject);
            }
          } else {
            elem.removeEventListener('focus', this._focusClosure as EventListenerOrEventListenerObject);
            elem.removeEventListener('blur', this._blurClosure as EventListenerOrEventListenerObject);
            elem.removeEventListener('keyup', this._keyupClosure as EventListenerOrEventListenerObject);
            if (book.capslockCheck.isApplicable) {
              elem.removeEventListener('keypress', this._keypressClosure as EventListenerOrEventListenerObject);
            }
          }
        });
      }
    }

    private _attachMouseEvents(
      nodes : NodeListOf < Element > | undefined,
      book : SanatioInterfaces.ElementBook,
      addOrDelete : boolean,
      comingFromIf : boolean) : void {

      if (nodes) {
        _ArrayCall(nodes).forEach((elem : HTMLElement) => {
          if (addOrDelete) {
            this._clickClosure = this
              ._clickEventFn
              .bind(this, book, comingFromIf, event);
            elem.addEventListener('click', this._clickClosure as EventListenerOrEventListenerObject);
          } else {
            elem.removeEventListener('click', this._clickClosure as EventListenerOrEventListenerObject);
          }
        });
      }
    }

    private _attachEvents(addOrDelete : boolean) : void {
      let keyboardElementBooks : SanatioInterfaces.ElementBook[],
      mouseElementBooks : SanatioInterfaces.ElementBook[];
      if (this._i._elemGrps) {
        keyboardElementBooks = this._i._elemGrps.keyTypes;
        mouseElementBooks = this._i._elemGrps.clickTypes;
        _ArrayCall(keyboardElementBooks).forEach((book : SanatioInterfaces.ElementBook, index : number) => {
          this._attachKeyEvents(book.nodes, book, addOrDelete, false);
          if (book.if) {
            this._attachKeyEvents(book.if.nodes, book, addOrDelete, true);
          }
          if (!addOrDelete && index === keyboardElementBooks.length - 1) {
            this._focusClosure = undefined;
            this._blurClosure = undefined;
            this._keyupClosure = undefined;
            this._keypressClosure = undefined;
          }
          return;
        });
        _ArrayCall(mouseElementBooks).forEach((book : SanatioInterfaces.ElementBook, index : number) => {
          this._attachMouseEvents(book.nodes, book, addOrDelete, false);
          if (book.if) {
            this._attachMouseEvents(book.if.nodes, book, addOrDelete, true);
          }
          if (!addOrDelete && index === mouseElementBooks.length - 1) {
            this._clickClosure = undefined;
          }
        });
      }
      return;
    }
    private _createElementBook(
      name : string,
      book : SanatioInterfaces.ElementBook,
      isComingFromIf : boolean) : SanatioInterfaces.ElementBook {

      let rulesJSON : string | object | null,
        thisElement : HTMLElement,
        thisElementTag : string,
        thisElementType : string,
        cardFormat : string | null,
        capslockCheck : string | null,
        alertContainer : Element | null;

      book.name = name;
      if (this._i._form) {
        book.nodes = this
          ._i
          ._form
          .querySelectorAll('[name=' + _EscCssMeta(name) + ']');
        thisElement = (book.nodes[book.nodes.length - 1] as HTMLElement);

        thisElementTag = (thisElement.tagName || '').toLowerCase();
        thisElementType = (thisElement.getAttribute('type') || '').toLowerCase();
        book.tagName = thisElementTag;
        book.tagType = thisElementType;
        book.parent = _NearestParent(thisElement, '[data-sanatioparent]');

        alertContainer = document.querySelector('[data-sanatioalert=' + thisElement.getAttribute('name') + ']');
        if (alertContainer) {
          book.container = alertContainer as HTMLElement;
        }

        cardFormat = thisElement.getAttribute('data-sanatiocardformat') || null;
        if (cardFormat) {
          book.cardFormatting.isApplicable = true;
          book.cardFormatting.character = cardFormat;
        }
        capslockCheck = thisElement.getAttribute('data-sanatiocapslock') || null;
        if (capslockCheck) {
          book.capslockCheck.isApplicable = true;
          book.capslockCheck.message = capslockCheck;
        }

        book.isCheckable = (thisElementType === 'radio' || thisElementType === 'checkbox')
          ? true
          : false;
        book.isClickable = (
          thisElementType === 'radio' ||
          thisElementType === 'checkbox' ||
          thisElementType === 'file' ||
          thisElementTag === 'select')
          ? true
          : false;
        book.isSelect = thisElementTag === 'select'
          ? true
          : false;
        book.hasContentEditable = thisElement.getAttribute('contenteditable')
          ? true
          : false;
        // TODO: Compatibility check for icons
        book.isIconApplicable = thisElementTag === 'input' && _ArrayCall(_elementsSupportingIcons).includes(thisElementType);

        book.ruleBook = JSON.parse(JSON.stringify(Core._RuleBook));
        rulesJSON = thisElement.getAttribute('data-sanatioelement');
        if (rulesJSON) {
          rulesJSON = JSON.parse(rulesJSON.replace(/\\/g, '\\\\'));
          _ArrayCall(rulesJSON).every((ruleRef : SanatioInterfaces.CustomPropsElement) => {
            if (ruleRef.rule === 'required') {
              book.isRequired = true;
              return false;
            }
            return true;
          });
          _ArrayCall(rulesJSON).forEach((ruleRef : SanatioInterfaces.CustomPropsElement) => {
            book.ruleBook[ruleRef.rule].isRuleAvailable = true;
            book.ruleBook[ruleRef.rule].alertType = _TrimFn((ruleRef.alertType || '').toString()).length > 0
              ? ruleRef.alertType === 'warning'
                ? 'warning'
                : 'error'
              : 'error';
            book.ruleBook[ruleRef.rule].message = _TrimFn((ruleRef.message || '').toString()).length > 0
              ? _FormatMsg(ruleRef.message, ruleRef.value)
              : _FormatMsg(Core._Messages[ruleRef.rule], ruleRef.value);
            book.ruleBook[ruleRef.rule].params = ruleRef.value;
            if (ruleRef.if) {
              let ifElementBook = this._createElementBook(ruleRef.if, JSON.parse(JSON.stringify(_defaultElementBook)), true);
              if (ifElementBook) {
                book.if = ifElementBook;
              }
            }
          });
        }

        if (isComingFromIf) {
          book.ruleBook['required'].params = true;
        }

        if (thisElement.hasAttribute('contenteditable') ||
          _ArrayCall(_elementsForKeyboardEvents).includes(thisElementTag) ||
          _ArrayCall(_elementsForKeyboardEvents).includes(thisElementType)) {

          book.keyType = true;
        }
        if (_ArrayCall(_elementsForMouseEvents).includes(thisElementTag) || _ArrayCall(_elementsForMouseEvents).includes(thisElementType)) {
          book.clickType = true;
        }
      }
      return book;
    }

    private _formElemBooks(allElements : NodeListOf < Element >, allGroups : Array <Array <string>>) : void {
      let elementNames : string[] = [],
        keyboardElementBooks : SanatioInterfaces.ElementBook[] = [],
        mouseElementBooks : SanatioInterfaces.ElementBook[] = [],
        book : SanatioInterfaces.ElementBook,
        partOfGroup : Array <string> = [];

      _ArrayCall(allElements).forEach((element : Element) => {
        elementNames.push(element.getAttribute('name') || '');
      });
      elementNames = elementNames
        .sort()
        .filter(function (item, position, array) {
          return !position || item !== array[position - 1];
        });
      _ArrayCall(elementNames).forEach((name : string) => {
        book = this._createElementBook(name, JSON.parse(JSON.stringify(_defaultElementBook)), false);
        _ArrayCall(allGroups).every((arr : Array<string>) => {
          if (_ArrayCall(arr).filter((thisName : string) => thisName === book.name).length > 0) {
            partOfGroup = arr;
            return false;
          }
          return true;
        });
        if (partOfGroup.length > 0) {
          book.isPartOf = partOfGroup;
        }
        if (book.keyType) {
          keyboardElementBooks.push(book);
        }
        if (book.clickType) {
          mouseElementBooks.push(book);
        }
        this._bookCol[name] = book;
      });

      this._i._elemGrps.keyTypes = keyboardElementBooks;
      this._i._elemGrps.clickTypes = mouseElementBooks;

      return;
    }

    private _getElem() : void {
      if (this._i._form) {
        const allElements : NodeListOf < Element > = this
          ._i
          ._form
          .querySelectorAll('[data-sanatioelement]'),
          allGroupsDef : NodeListOf < Element > = this._i._form.querySelectorAll('[data-sanatiogroup]');
        let allGroups : Array <Array <string>> = [];

        if (allGroupsDef) {
          _ArrayCall(allGroupsDef).forEach((element : Element) => {
            let groupElemNames = element.getAttribute('data-sanatiogroup');
            if (groupElemNames) {
              groupElemNames = JSON.parse(groupElemNames);
              if (groupElemNames && Array.isArray(groupElemNames)) {
                allGroups.push(groupElemNames);
              }
            }
          });
        }

        this._formElemBooks(allElements, allGroups);
        this._attachEvents(true);
        this._attachSubmit(true);
      }
      return;
    }

    private _init() : void {
        let customProps : SanatioInterfaces.CustomPropsHTML | undefined,
        customPropsAttr : string | null;
      if (this._i._form) {
        this
          ._i
          ._form
          .setAttribute('novalidate', 'novalidate');
        customPropsAttr = this
          ._i
          ._form
          .getAttribute('data-sanatiocustom');
        if (customPropsAttr && _TrimFn(customPropsAttr).length > 0) {
          customProps = JSON.parse(customPropsAttr);
          if (customProps) {
            this._i._props = {
              formPre: customProps.formValidationClass || '',
              formPost: customProps.formPostValidationClass || '',
              parentS: customProps.parentSuccessClass || '',
              parentE: customProps.parentErrorClass || '',
              parentW: customProps.parentWarningClass || '',
              iconS: customProps.iconSuccessClass || '',
              iconE: customProps.iconErrorClass || '',
              iconW: customProps.iconWarningClass || '',
              elemS: customProps.elementSuccessClass || '',
              elemE: customProps.elementErrorClass || '',
              elemW: customProps.elementWarningClass || '',
              msgS: customProps.messageSuccessClass || '',
              msgE: customProps.messageErrorClass || '',
              msgW: customProps.messageWarningClass || '',
              elem: customProps.alertElement || 'div',
              container: document.querySelector('#' + customProps.container)
            };
          }
        }
        if (customProps && customProps.formValidationClass) {
          _AddClass(this._i._form as HTMLElement, customProps.formValidationClass);
        }
        this._getElem();
      }
      return;
    }
  }

  Core._addRule(BankcardRule.SanatioRule.Rule);
  Core._addRule(DateRule.SanatioRule.Rule);
  Core._addRule(DateISORule.SanatioRule.Rule);
  Core._addRule(DigitsRule.SanatioRule.Rule);
  Core._addRule(EmailRule.SanatioRule.Rule);
  Core._addRule(EqualsToRule.SanatioRule.Rule);
  Core._addRule(MaxRule.SanatioRule.Rule);
  Core._addRule(MaxLengthRule.SanatioRule.Rule);
  Core._addRule(MaxOptionsRule.SanatioRule.Rule);
  Core._addRule(MinRule.SanatioRule.Rule);
  Core._addRule(MinLengthRule.SanatioRule.Rule);
  Core._addRule(MinOptionsRule.SanatioRule.Rule);
  Core._addRule(NumberRule.SanatioRule.Rule);
  Core._addRule(NotEqualsTo.SanatioRule.Rule);
  Core._addRule(PatternRule.SanatioRule.Rule);
  Core._addRule(RangeRule.SanatioRule.Rule);
  Core._addRule(RangeLengthRule.SanatioRule.Rule);
  Core._addRule(RangeOptionsRule.SanatioRule.Rule);
  Core._addRule(RequiredRule.SanatioRule.Rule);
  Core._addRule(StepRule.SanatioRule.Rule);
  Core._addRule(URLRule.SanatioRule.Rule);
}
