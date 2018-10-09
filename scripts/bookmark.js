'use strict';

const bookmark = (function () {

  const addItem = function(item) {
    item.viewInfo = false;
    item.edit = false;
    this.items.push(item);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  

  function getItemIdFromElement(item) {
    return $(item)
      .closest('div')
      .data('item-id');
  }




  return{
    items : [],
    filterByRating : 0,
    addItem,
    findAndDelete,
    findById,
    getItemIdFromElement,
  };
}() );