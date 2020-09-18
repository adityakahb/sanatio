import { SanatioInterfaces } from './Interfaces';
export namespace SanatioConstants {
  let val : any,
    idx : any;
  let currentValue,
    matches,
    match,
    parts,
    count,
    valueLength;
  let keyCode,
    shiftKey;
  export const _RuleRef : SanatioInterfaces.RuleReference = {
    isRuleAvailable: false,
    isRuleApplied: false,
    alertType: '',
    isValid: false,
    message: '',
    params: ''
  };
  export const _MethodBook : SanatioInterfaces.MethodBook = {};
  export const _MessageBook : SanatioInterfaces.MessageBook = {};
  export const _RuleBook : SanatioInterfaces.RuleBook = {};
  export const _ElemBook : SanatioInterfaces.ElementBook = {
    if: undefined,
    isCheckable: false,
    isClickable: false,
    isIconApplicable: false,
    isSelect: false,
    isRequired: false,
    cardFormatting: {
      isApplicable: false,
      character: ''
    },
    capslockCheck: {
      isApplicable: false,
      message: ''
    },
    hasContentEditable: false,
    name: '',
    nodes: undefined,
    parent: undefined,
    container: undefined,
    ruleBook: _RuleBook,
    tagName: '',
    tagType: '',
    keyType: false,
    clickType: false,
    isPartOf: undefined
  };
  export const _Instance : SanatioInterfaces.FormInstance = {
    _form: undefined,
    _props: {
      formPre: '',
      formPost: '',
      parentS: '',
      parentE: '',
      parentW: '',
      iconS: '',
      iconE: '',
      iconW: '',
      elemS: '',
      elemE: '',
      elemW: '',
      msgS: '',
      msgE: '',
      msgW: '',
      elem: 'div',
      container: null
    },
    _elemGrps: {
      keyTypes: [],
      clickTypes: []
    },
    _submitted: [],
    _eCount: 0,
    _wCount: 0
  };
  export const _KeyElem : string[] = [
    'text',
    'password',
    'color',
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'range',
    'search',
    'tel',
    'time',
    'url',
    'week',
    'radio',
    'checkbox',
    'file',
    'button',
    'select',
    'textarea',
    'contenteditable'
  ];
  export const _MouseElem : string[] = ['radio', 'checkbox', 'file', 'select'];
  /* Avoid revalidate the field when pressing one of the following keys
      * Shift       => 16
      * Ctrl        => 17
      * Alt         => 18
      * Caps lock   => 20
      * End         => 35
      * Home        => 36
      * Left arrow  => 37
      * Up arrow    => 38
      * Right arrow => 39
      * Down arrow  => 40
      * Insert      => 45
      * Num lock    => 144
      * AltGr key   => 225
      */
  export const _excludedKeys : number[] = [
    16,
    17,
    18,
    20,
    35,
    36,
    37,
    38,
    39,
    40,
    45,
    144,
    225
  ];
  export const _IconicElem : string[] = ['text', 'password'];

  /**
   * Method to detect the capslock key
   *
   * @param {KeyboardEvent} event
   * @returns {boolean}
   */
  export const _CapslockFn : Function = function (event : KeyboardEvent) : boolean {
    if (event) {
      keyCode = event.keyCode
        ? event.keyCode
        : event.which;
      shiftKey = event.shiftKey
        ? event.shiftKey
        : ((keyCode === 16)
          ? true
          : false);
      return !((((keyCode >= 65 && keyCode <= 90) && !shiftKey) || ((keyCode >= 97 && keyCode <= 122) && shiftKey)));
    } else {
      return true;
    }
  };

  /**
   * Method to return trimmed string
   *
   * @param {string} str
   * @returns {string}
   */
  export const _TrimFn : Function = function (str : string) : string {
    return str && (typeof str === 'string' || typeof str === 'number') ? str.toString().replace(/^\s+|\s+$/gm, '') : '';
  };

  /**
   * Add polyfill for Matches function to find the closest element
   */
  export const _MatchesPolyfill : Function = function () : void {
    HTMLElement.prototype.matches = HTMLElement.prototype.matches
      || HTMLElement.prototype.msMatchesSelector
      || HTMLElement.prototype.webkitMatchesSelector;
    if (!HTMLElement.prototype.closest) {
      HTMLElement.prototype.closest = function (selector : string) {
        let thisElement = this;
        if (!document.documentElement.contains(thisElement)) {
          return null;
        }
        do {
          if (thisElement.matches(selector)) {
            return thisElement;
          }
          thisElement = (thisElement.parentElement || thisElement.parentNode)as HTMLElement;
        } while (thisElement !== null && thisElement.nodeType === 1);
        return null;
      };
    }
  };

  /**
   * Method to find and return the closest element or null based on the selector and current element
   *
   * @param {HTMLElement} elem
   * @param {string} selector
   * @returns {(Element | null)}
   */
  export const _NearestParent : Function = function (elem : HTMLElement, selector : string) : Element | null {
    return elem && elem instanceof HTMLElement && selector && typeof selector === 'string' ? elem.closest(selector) : null;
  };

  /**
   * Method to format the message to be displayed as error or warning
   *
   * @param {string} message
   * @param {*} value
   * @returns {string}
   */
  export const _FormatMsg : Function = function (message : string, value : any) : string {
    if (message && value) {
      message = message.toString();
      if (typeof value === 'number' || typeof value === 'string') {
        message = message.replace(new RegExp('\\{0\\}', 'g'), value.toString());
        return message;
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          message = message.replace(new RegExp('\\{' + i + '\\}', 'g'), value[i].toString());
        }
        return message;
      }
      return message;
    } else {
      return '';
    }
  };

  /**
   * Method to parse the collection as an Array
   *
   * @param {*} arr
   * @returns {Array<any>}
   */
  export const _ArrayCall : Function = function (arr : any) : Array<any> {
    return arr && arr.length > 0 ? Array.prototype.slice.call(arr) : [];
  };

  /**
   * Method to find the value of the element
   *
   * @param {SanatioInterfaces.ElementBook} book
   * @returns {(string | boolean | number | Array < number > | undefined)}
   */
  export const _ElemValue : Function
    = function (book : SanatioInterfaces.ElementBook) : string | boolean | number | Array < number > | undefined {
    if (book && book.nodes) {
      if (book.isCheckable) {
        return _ArrayCall(book.nodes).filter((el : any) => el.checked);
      }
      if (book.isSelect) {
        return _ArrayCall((book.nodes[0]as HTMLSelectElement).options).filter((option : HTMLOptionElement) => {
          return option.selected && option.value;
        });
      }
      if (book.hasContentEditable) {
        return _TrimFn(((book.nodes[0]as any).innerHTML).toString());
      }

      val = (book.nodes[0]as any).value;

      if (book.tagType === 'file') {
        // Modern browser (chrome & safari)
        if (val.substr(0, 12) === 'C:\\fakepath\\') {
          return _TrimFn(val.substr(12));
        }
        // Legacy browsers Unix-based path
        idx = val.lastIndexOf('/');
        if (idx >= 0) {
          return _TrimFn(val.substr(idx + 1));
        }
        // Windows-based path
        idx = val.lastIndexOf('\\');
        if (idx >= 0) {
          return _TrimFn(val.substr(idx + 1));
        }
        // Just the file name
        return _TrimFn(val);
      }

      return _TrimFn(val.replace(/\r/g, ''));
    }
    return val;
  };

  /**
   * Method to escape the meta characters
   *
   * @param {string} str
   * @returns {string}
   */
  export const _EscCssMeta : Function = function (str : string) : string {
    return str && typeof str === 'string' ? str.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, '\\$1') : '';
  };

  /**
   * Method to check if the element has a className attached to it
   *
   * @param {HTMLElement} el
   * @param {string} className
   * @returns {boolean}
   */
  export const _HasClass : Function = function (el : HTMLElement, className : string) : boolean {
    if (el && el instanceof HTMLElement && className && typeof className === 'string') {
      if (el.classList) {
        return el
          .classList
          .contains(className);
      } else {
        return !!el
          .className
          .match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
      }
    } else {
      return false;
    }
  };

  /**
   * Method to add className(s) to an element
   *
   * @param {HTMLElement} el
   * @param {*} className
   */
  export const _AddClass : Function = function (el : HTMLElement, className : any) : void {
    if (el && el instanceof HTMLElement && className && typeof className === 'string') {
      if (_TrimFn(className).length > 0) {
        className = className.split(' ');
        for (let name in className) {
          if (el.classList) {
            el
              .classList
              .add(className[name]);
          } else if (!_HasClass(el, className[name])) {
            el.className += ' ' + className[name];
          }
        }
      }
    }
  };

  /**
   * Method to remove className(s) from an element
   *
   * @param {HTMLElement} el
   * @param {*} className
   */
  export const _RemoveClass : Function = function (el : HTMLElement, className : any) : void {
    if (el && el instanceof HTMLElement && className && typeof className === 'string') {
      if (_TrimFn(className).length > 0) {
        className = className.split(' ');
        for (let name in className) {
          if (el.classList) {
            el
              .classList
              .remove(className[name]);
          } else if (_HasClass(el, className)) {
            const reg = new RegExp('(\\s|^)' + className[name] + '(\\s|$)');
            el.className = el
              .className
              .replace(reg, ' ');
          }
        }
      }
    }
  };

  /**
   * Method to check if the element is present in supplied collection
   *
   * @param {SanatioInterfaces.ElementBook} book
   * @param {SanatioInterfaces.ElementBook[]} collection
   * @returns {boolean}
   */
  export const _IsInCollection : Function
    = function (book : SanatioInterfaces.ElementBook, collection : SanatioInterfaces.ElementBook[]) : boolean {
    return book && collection && book.name
      ? _ArrayCall(collection).some((thisBook : SanatioInterfaces.ElementBook) => {
          return thisBook.name === book.name;
        })
      : false;
  };

  /**
   * Method to format the Bank card value based on the separator passed
   *
   * @param {string} value
   * @param {string} separator
   * @returns {string}
   */
  export const _FormatCard : Function = function (value : string, separator : string) : string {
    if (value && typeof value === 'string') {
      currentValue = value
      .replace(/\s+/g, '')
      .replace(/[^0-9]/gi, '');
      matches = currentValue.match(/\d{4,17}/g);
      match = matches && matches[0] || '';
      parts = [];
      separator = separator && typeof separator === 'string' ? separator : '-';
      for (count = 0, valueLength = match.length; count < valueLength; count += 4) {
        parts.push(match.substring(count, count + 4));
      }
      if (parts.length) {
        return parts.join(separator);
      } else {
        return value;
      }
    } else {
      return '';
    }
  };
}
