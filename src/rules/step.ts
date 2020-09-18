export namespace SanatioRule {
  let stepDecimalPlaces,
    stepFnMatch;
  const getStepDecimalPlaces = function (num : number) {
    stepFnMatch = null;
    stepFnMatch = ('' + num).match(/(?:\.(\d+))?$/);
    if (!stepFnMatch) {
      return 0;
    }
    return stepFnMatch[1]
      ? stepFnMatch[1].length
      : 0;
  };
  const getStepToInt = function (num : number, decimals : number) {
    return Math.round(num * Math.pow(10, decimals));
  };
  export const Rule = {
    name: 'step',
    definition: function (value : any, params : any) {
      stepDecimalPlaces = getStepDecimalPlaces(params);
      return !(getStepDecimalPlaces(value) > stepDecimalPlaces
        || getStepToInt(value, stepDecimalPlaces) % getStepToInt(value, stepDecimalPlaces) !== 0) || false;
    },
    message: 'Please enter a multiple of {0}.'
  };
}
