export namespace SanatioRule {
  export const Rule = {
    name: 'required',
    definition: function (value : any, params : any) {
      return params
        ? (typeof value === 'string' || Array.isArray(value)) && value.length > 0
          ? true
          : false
        : false;
    },
    message: 'This field is required.'
  };
}
