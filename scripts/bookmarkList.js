'use strict';


const bookmarkList = (function() {
  
  function generateItemElement(item) {
    let string = '';
    let value = 1;
    let comparison = item.rating;
    console.log(item.edit);
    for(let i = 0; i < 5; i++){
      if(comparison < value){
        string += `<input type="radio" id = '1' class = "float-right" value = '${value}'>`;
      }
      else {
        string += `<input type="radio" id = '1' class = "float-right" value = '${value}' checked>`;
      }
      value++;
    }
    if(item.expanded === true){
      return `<div class = inline>
      <li class="js-item-element" data-item-id="${item.id}">
      <p class = center>${item.title}</p>
      ${string}
      <button type="button" class ="delete">Delete</button>
      <button type="button" class ="edit">Edit</button>
      <a href="${item.url}" target="_blank" class="left-margin">${item.url}</a>
      <textarea readonly rows="5" class="box-space">
        ${item.desc}
      </textarea>
      </li>
    </div>`; 
    }
    else if(item.edit === true){
      console.log('IT WAS TRUE!!!!!');
      return `<div class = inline>
      <li class="js-item-element" data-item-id="${item.id}">
      <input id="title-input" type="text" class="input-center" placeholder=${item.title}>
      ${string}
      <button type="button" class ="delete">Delete</button>
      <button type="button" class ="confirm">Confirm</button>
      <input id="url-input" type="text" placeholder=${item.url}>
      <textarea id="desc-input" rows="5" class="box-space">${item.desc}</textarea>
      </li>
    </div>`; 
    }
    else{
      return `<div class = inline>
      <li class="js-item-element" data-item-id="${item.id}">
      <p class = center>${item.title}</p>
      ${string}
      <button type="button" class ="delete">Delete</button>
      <button type="button" class ="edit">Edit</button>
      </li>
    </div>`; 
    }
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
        console.log('createItem called ' + newItem);
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
      });
    });
  }

  function handleBoxExpansionClick(){
    $('#js-bookmark-form-entry').on('click', '.center', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const element = store.findById(id);
      element.expanded = !element.expanded;
      render();
      console.log(element.expanded);
    });
  }



  function handleRadioClick(){
    $('#js-bookmark-form-entry').on('click', '.float-right', event => {
      event.preventDefault();
      const currentButton = event.currentTarget;
      let id = getItemIdFromElement(currentButton);
      const object = store.findById(id);
      api.updateItem(object.id, {rating: $(currentButton).val()}, () => {
        object.rating = $(event.currentTarget).val();
        render();
      });
    });
  }

  function handleEditClick(){
    $('#js-bookmark-form-entry').on('click', '.edit', event =>{
      event.preventDefault();
      const currentButton = event.currentTarget;
      const id = getItemIdFromElement(currentButton);
      const object = store.findById(id);
      object.edit = true;
      render();
    });
  };

  function handleConfirmClick(){
    $('#js-bookmark-form-entry').on('click', '.confirm', event => {
      event.preventDefault();
      let urlInput = $('#url-input').val();
      let titleInput = $('#title-input').val();
      let descInput = $('#desc-input').val();
      const currentButton = event.currentTarget;
      const id = getItemIdFromElement(currentButton);
      const object = store.findById(id);
      if(Item.notEmpty(urlInput)) object.url = urlInput;
      if(Item.notEmpty(titleInput)) object.title = titleInput;
      if(Item.notEmpty(descInput)) object.desc = descInput;
      object.edit = false;
      render();
    });
  };


  function bindEventListeners(){
    handleFilterClick();
    handleAddClick();
    handleRadioClick();
    handleDeleteClick();
    handleBoxExpansionClick();
    handleEditClick();
    handleConfirmClick();
  }



  return {
    bindEventListeners : bindEventListeners,
    render : render,
  };
}());