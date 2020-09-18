export namespace SanatioRule {
  const regex : RegExp = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
  export const Rule = {
    name: 'number',
    definition: function (value : any, params : any) {
      return params
        ? typeof value === 'string' && regex.test(value) || false
        : false;
    },
    message: 'Please enter a valid number.'
  };
}
