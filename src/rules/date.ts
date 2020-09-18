export namespace SanatioRule {
  const regex : RegExp = /Invalid|NaN/;
  export const Rule = {
    name: 'date',
    definition: function (value : any, params : any) {
      return params
        ? typeof value === 'string' && !regex.test(new Date(value).toString()) || false
        : false;
    },
    message: 'Please enter a valid date.'
  };
}
