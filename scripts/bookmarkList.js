'use strict';


const bookmarkList = (function() {
  
  function generateItemElement(item) {
    let string = '';
    let value = 1;
    let comparison = item.rating;
    for(let i = 0; i < 5; i++){
      if(comparison < value){
        string += `<input type="radio" id = '1' class = "float-right" value = '${value}'>`;
      }
      else {
        string += `<input type="radio" id = '1' class = "float-right" value = '${value}' checked>`;
      }
      value++;
    }
  return `<div class = inline>
    <li class="js-item-element" data-item-id="${item.id}">
    <p class = center>${item.title}</p>
    ${string}
    <button type="button" class ="delete">Delete</button>
    </li>
  </div>`;
  }


  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }


  function render() {
  // Filter item list if store prop is true by item.checked === false
    let items = store.items;
    items = store.items.filter(item => item.rating >= store.filterByRating);
    // Filter item list if store prop `searchTerm` is not empty
    // render the shopping list in the DOM
    const shoppingListItemsString = generateShoppingItemsString(items);
    $('#js-bookmark-form-entry').html(shoppingListItemsString);
  }


  function handleFilterClick() {
    $('#js-bookmark-form').on('click', '.filter', event => {
      const value = Number($(event.currentTarget).val());
      if(value === store.filterByRating){
        return;
      }
      store.filterByRating = value;
      render();
    });
  }

  function handleAddClick(){
    $('#js-bookmark-form').on('click', '.add', event => {
      event.preventDefault();
      let itemName = $('#name-submit').val();
      let itemDescription = $('#description-submit').val();
      let itemRating = $('#rating-submit').val();
      let url = $('#url-submit').val();

      
      api.createItem(itemName, itemDescription, url, itemRating, newItem => {
        store.addItem(newItem);
        render();
      });
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  function handleDeleteClick(){
    $('#js-bookmark-form-entry').on('click', '.delete', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      })
    });
  }



  function handleRadioClick(){
    $('#js-bookmark-form-entry').on('click', '.float-right', event => {
      event.preventDefault();
      const currentButton = event.currentTarget;
      let id = getItemIdFromElement(currentButton);
      const object = store.findById(id);
      console.log($(currentButton).val());
      api.updateItem(object.id, {rating: $(currentButton).val()}, () => {
        object.rating = $(event.currentTarget).val();
        render();
      });
    });
  }


  function bindEventListeners(){
    handleFilterClick();
    handleAddClick();
    handleRadioClick();
    handleDeleteClick();
  }



  return {
    bindEventListeners : bindEventListeners,
    render : render,
  };
}());