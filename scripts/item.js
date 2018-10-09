'use strict';
const item = (function(){

  const validateName = function(name) {
    if (!name) throw new TypeError('Name must not be blank');
  };

  const notEmpty = function(name) {
    if(name !== ''){
      return true;
    }
    return false;
  };

  const validateURL = function(url){
    if(url === ''){
      bookmarkList.errorObject.url = 'url cannot be empty';
      return false;
    }
    else if(url.startsWith('https://www') !== true){
      bookmarkList.errorObject.url = 'must start with https://www.';
      return false;
    }
    else if(url.endsWith('.com') !== true){
      bookmarkList.errorObject.url = 'must end with .com';
      return false;
    }
    return true;
  };

  const validateTitle = function(title){
    if(title === ''){
      bookmarkList.errorObject.title = 'title cannot be empty';
      return false;
    }
    return true;
  };

  const validateRating = function(rating){
    if(parseInt(rating) > 5 || parseInt(rating) < 0){
      bookmarkList.errorObject.url = 'must be between 1 and 5';
      return false;
    }
    else if(rating === ''){
      bookmarkList.errorObject.url = 'rating can not be empty';
    }
    return true;
  };

  const validateDesc = function(desc){
    if(desc === ''){
      bookmarkList.errorObject.url = 'desc can not be empty';
      return false;
    }
    return true;
  };

  return {
    validateName,
    notEmpty,
    validateURL,
    validateTitle,
    validateRating,
    validateDesc,
  };
  
}());