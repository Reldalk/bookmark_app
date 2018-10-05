'use strict';
const Item = (function(){

  const validateName = function(name) {
    if (!name) throw new TypeError('Name must not be blank');
  };

  const create = function(title, description, url, rating) {
    return {
      id: cuid(),
      title : title,
      description : description,
      url : url,
      rating : rating,
    };
  };

  return {
    validateName,
    create,
  };
  
}());