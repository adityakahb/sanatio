export namespace SanatioRule {
  let elem;
  export const Rule = {
    name: 'equalsto',
    definition: function (value : any, params : any) {
      elem = document.querySelector('[id=' + params + ']');
      return typeof value === 'string' && typeof params === 'string' && elem && elem.value === value || false;
    },
    message: 'Please enter the same value again.'
  };
}
