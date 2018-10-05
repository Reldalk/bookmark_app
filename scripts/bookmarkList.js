'use strict';


const bookmarkList = (function() {
  
  function generateItemElement(item) {
    console.log(item);
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
    // Filter item list if store prop `searchTerm` is not empty
    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateShoppingItemsString(items);
    $('#js-bookmark-form-entry').html(shoppingListItemsString);
  }

  
  function handleNewItemSubmit(){
    $('#js-bookmark-form').submit(function (event) {
      event.preventDefault();
      console.log('testing');
      const newItemName = $('.submit').val();
      console.log(newItemName);
    });
  }

  function handleFilterClick() {
    $('#js-bookmark-form').on('click', '.filter', event => {
      console.log('calling filter');
    });
  }

  function handleAddClick(){
    $('#js-bookmark-form').on('click', '.add', event => {
      event.preventDefault();
      console.log($('#name-submit').val());
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
      console.log(id);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      })
    });
  }



  function handleRadioClick(){
    $('#js-bookmark-form-entry').on('click', '.float-right', event => {
      event.preventDefault();
      let id = getItemIdFromElement(event.currentTarget);
      id = store.findById(id);
      api.updateItem(id.id, {rating: id.rating}, () => {
        id.rating = $(event.currentTarget).val();
        render();
      });
    });
  }


  function bindEventListeners(){
    console.log('handleNewItem called');
    handleNewItemSubmit();
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