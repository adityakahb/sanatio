import * as Sanatio from './../src/Sanatio';
let sanatioValidate1 : any;
let sanatioValidate2 : any;
let sanatioValidate3 : any;
if (document.querySelector('#simple_signup')) {
  sanatioValidate1 = Sanatio
    .Sanatio
    .Validator
    .getInstance()
    .init('simple_signup');
  (sanatioValidate1 as any).submitHandler(function () {
    alert('Form Submitted');
  });
  console.log('===sanatioValidate1', sanatioValidate1);
}

if (document.querySelector('#bootstrap1')) {
  sanatioValidate2 = Sanatio
    .Sanatio
    .Validator
    .getInstance();
  sanatioValidate2.addRule({
    name: 'datepattern',
    definition: function (value : string, params : string) {
      let check = value.match(new RegExp(params)),
        date;
      if (check) {
        date = new Date( parseInt(check[3], 10), parseInt(check[2], 10) - 1, parseInt(check[1], 10));
      }
      return check ? date ? true : false : false;
    },
    message: 'Date of Birth must be in DD-MM-YYYY format'
  });
  let globals = sanatioValidate2.init('bootstrap1');
  (globals as any).submitHandler(function () {
    alert('Form Submitted');
  });
  console.log('===sanatioValidate2', sanatioValidate2);
}

if (document.querySelector('#init_destroy_setup')) {
  sanatioValidate3 = Sanatio
    .Sanatio
    .Validator
    .getInstance();
  let initBtn = document.getElementById('init_btn');
  let destroyBtn = document.getElementById('destroy_btn');
  let initFn : EventListenerOrEventListenerObject = function (event : Event) {
    event.preventDefault();
    let globals = sanatioValidate3.init('init_destroy_setup');
    (globals as any).submitHandler(function () {
      alert('Form validated and Submitted');
    });
  };
  let destroyFn : EventListenerOrEventListenerObject = function (event : Event) {
    event.preventDefault();
    sanatioValidate3.destroy('init_destroy_setup');
  };
  if (initBtn && destroyBtn) {
    initBtn.addEventListener('click', initFn);
    destroyBtn.addEventListener('click', destroyFn);
  }
  console.log('===sanatioValidate3', sanatioValidate3);
}
