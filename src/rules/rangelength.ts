export namespace SanatioRule {
  export const Rule = {
    name: 'rangelength',
    definition: function (value : any, params : any) {
      return Array.isArray(params)
        && (typeof value === 'string' || Array.isArray(value))
        && value.length >= params[0]
        && value.length <= params[1] || false;
    },
    message: 'Please enter a value between {0} and {1} characters long.'
  };
}
