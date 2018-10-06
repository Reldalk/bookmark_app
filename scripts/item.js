'use strict';
const Item = (function(){

  const validateName = function(name) {
    if (!name) throw new TypeError('Name must not be blank');
  };

  const notEmpty = function(name) {
    if(name !== ''){
      return true;
    }
    return false;
  }


  return {
    validateName,
    notEmpty,
  };
  
}());