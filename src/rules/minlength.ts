export namespace SanatioRule {
  export const Rule = {
    name: 'minlength',
    definition: function (value : any, params : any) {
      return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length >= params || false;
    },
    message: 'Please enter at least {0} characters.'
  };
}
