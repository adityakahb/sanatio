export namespace SanatioRule {
  export const Rule = {
    name: 'rangeoptions',
    definition: function (value : any, params : any) {
      return Array.isArray(params)
        && (typeof value === 'string' || Array.isArray(value))
        && value.length >= params[0]
        && value.length <= params[1] || false;
    },
    message: 'Please select {0} to {1} options.'
  };
}
