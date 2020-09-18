export namespace SanatioRule {
  let keyCode,
    shiftKey;
  export const Rule = {
    name: 'capslock',
    definition: function (event : KeyboardEvent) {
      if (event) {
        keyCode = event.keyCode
          ? event.keyCode
          : event.which;
        shiftKey = event.shiftKey
          ? event.shiftKey
          : ((keyCode === 16)
            ? true
            : false);
        return !((((keyCode >= 65 && keyCode <= 90) && !shiftKey) || ((keyCode >= 97 && keyCode <= 122) && shiftKey)));
      } else {
        return true;
      }
    },
    message: 'Please check the capslock.'
  };
}
