export namespace SanatioRule {
  export const Rule = {
    name: 'minoptions',
    definition: function (value : any, params : any) {
      return typeof params === 'number' && (typeof value === 'string' || Array.isArray(value)) && value.length >= params || false;
    },
    message: 'Please select at least {0} option(s).'
  };
}
