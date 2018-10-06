'use strict';

const store = (function () {

  const addItem = function(item) {
    this.items.push(item);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };



  return{
    items : [],
    addItem,
    filterByRating : 0,
    findAndDelete,
    findById,
  };
}() );