'use strict';
const Item = (function(){

  const validateName = function(name) {
    if (!name) throw new TypeError('Name must not be blank');
  };


  return {
    validateName,
  };
  
}());