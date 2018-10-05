'use strict';
const api = (function() {
  let BASE_URL = 'https://thinkful-list-api.herokuapp.com/Jonathon';

  const getItems = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createItem = function(title, description, url, rating, callback){
    let newItem = JSON.stringify({
      title : title,
      description : description,
      url : url,
      rating : rating,
    });
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType : 'application/json',
      data : newItem,
      success : callback,
    });
  };

  const deleteItem = function(id, callback){
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    });
  };

  return {
    getItems,
    createItem,
    deleteItem,
  }
}());