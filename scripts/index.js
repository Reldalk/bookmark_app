'use strict';
//Jonathon Garrett
$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getItems((items) => {
    items.forEach((item) => bookmark.addItem(item));
    bookmarkList.render();
  });
});