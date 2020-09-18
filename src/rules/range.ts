export namespace SanatioRule {
  let optionElement;
  export const Rule = {
    name: 'range',
    definition: function (value : any, params : any) {
      if (typeof value === 'object') {
        try {
          optionElement = value[0] as HTMLOptionElement;
          return (Number(optionElement.value) >= Number(params[0]) && Number(optionElement.value) <= Number(params[1])) || false;
        } catch (e) {
          return false;
        }
      } else if (typeof value === 'string' || typeof value === 'number') {
        return (Number(value) >= Number(params[0]) && Number(value) <= Number(params[1])) || false;
      }
      return false;
    },
    message: 'Please enter a value between {0} and {1}.'
  };
}
