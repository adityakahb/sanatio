export namespace SanatioRule {
  export const Rule = {
    name: 'pattern',
    definition: function (value : any, params : any) {
      return typeof value === 'string'
        && typeof params === 'string'
        && new RegExp(params).test(value) || false;
    },
    message: 'Sorry, this doesn\'t match with the expected pattern.'
  };
}
