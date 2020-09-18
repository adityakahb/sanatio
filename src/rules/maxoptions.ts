export namespace SanatioRule {
  export const Rule = {
    name: 'maxoptions',
    definition: function (value : any, params : any) {
      return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length <= params || false;
    },
    message: 'Please select no more than {0} option(s).'
  };
}
