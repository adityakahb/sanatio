export namespace SanatioRule {
  let optionElement;
  export const Rule = {
    name: 'max',
    definition: function (value : any, params : any) {
      if (typeof value === 'object') {
        try {
          optionElement = value[0] as HTMLOptionElement;
          return Number(optionElement.value) <= Number(params) || false;
        } catch (e) {
          return false;
        }
      } else if (typeof value === 'string' || typeof value === 'number') {
        return Number(value) <= Number(params) || false;
      }
      return false;
    },
    message: 'Please enter a value less than or equal to {0}.'
  };
}
