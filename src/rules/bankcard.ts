export namespace SanatioRule {
  let luhnSum,
    luhnVal,
    luhnLen,
    luhnBit;
  const regex : RegExp = new RegExp('^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3' +
        '[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{1' +
        '1}))$'),
    isLuhnCheckValid = function (luhn : string) : boolean {
      luhnSum = 0;
      luhnVal = 1;
      luhnLen = luhn.length;
      while (luhnLen--) {
        luhnBit = parseInt(luhn.charAt(luhnLen), 10) * luhnVal;
        luhnSum += luhnBit - (luhnBit > 9
          ? 1
          : 0) * 9;
        luhnVal ^= 3;
      }
      return (luhnSum % 10 === 0) && (luhnSum > 0);
    };
  export const Rule = {
    name: 'bankcard',
    definition: function (value : any, params : any) {
      return params
        ? typeof value === 'string' && regex.test(value.replace(/[ -]/g, '')) && isLuhnCheckValid(value.replace(/[ -]/g, '')) || false
        : false;
    },
    message: 'Please enter a valid card number.'
  };
}
