export namespace SanatioRule {
  const regex = /^\d+$/;
  export const Rule = {
    name: 'digits',
    definition: function (value : any, params : any) {
      return params
        ? typeof value === 'string' && regex.test(value) || false
        : false;
    },
    message: 'Please enter only digits.'
  };
}
