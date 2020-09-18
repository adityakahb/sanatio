export namespace SanatioRule {
  export const Rule = {
    name: 'maxlength',
    definition: function (value : any, params : any) {
      return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length <= params || false;
    },
    message: 'Please enter no more than {0} characters.'
  };
}
