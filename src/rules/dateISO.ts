export namespace SanatioRule {
  const isoRegex : RegExp = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
    regex : RegExp = /Invalid|NaN/;
  export const Rule = {
    name: 'dateISO',
    definition: function (value : any, params : any) {
      return params
        ? typeof value === 'string' && isoRegex.test(value) && !regex.test(new Date(value).toString()) || false
        : false;
    },
    message: 'Please enter a valid date (ISO).'
  };
}
