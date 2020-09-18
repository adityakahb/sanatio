export namespace SanatioRule {
  const regex : RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  export const Rule = {
    name: 'email',
    definition: function (value : any, params : any) {
      return params
        ? typeof value === 'string' && regex.test(value) || false
        : false;
    },
    message: 'Please enter a valid email address.'
  };
}
