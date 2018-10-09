'use strict';
const api = (function() {
  let BASE_URL = 'https://thinkful-list-api.herokuapp.com/Jonathon';

  const getItems = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createItem = function(title, description, url, rating, callback){
    console.log('createItem ' + description);
    let newItem = JSON.stringify({
      title : title,
      url : url,
      desc : description,
      rating : rating,
      viewInfo : false,
    });
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType : 'application/json',
      data : newItem,
      success : callback,
    });
  };

  const updateItem = function(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
    })
  }

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
    updateItem,
    createItem,
    deleteItem,
  }
}());