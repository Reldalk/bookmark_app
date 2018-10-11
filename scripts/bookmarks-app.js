'use strict';
const bookmarkList = (function() {
  let page = '', arrayCounter = 0;
  const errorObject = {
    url : 'URL',
    title : 'Title',
    rating : 'Rating',
    desc : 'Description'
  };
  function generateItemElement(item) {
    const array = ['whiteSmoke', 'lightGray', 'lightGray', 'whiteSmoke'];
    let string = '';
    let value = 1;
    if(page === 'main'){
      let comparison = item.rating;
      for(let i = 0; i < 5; i++){
        if(comparison < value){
          string += `<input type="radio" id = '1' class = "float-right" value = '${value}'
          aria-label="rating">`;
        }
        else {
          string += `<input type="radio" id = '1' class = "float-right" value = '${value}' checked
          aria-label="rating">`;
        }
        value++;
      }
      if(page === 'main'){
        string = 
        `
        <section role="region">
          <div class = ${array[arrayCounter % 4]} data-item-id=${item.id}>
            <label class="middle" aria-label="title-link"><a href=${item.url}>${item.title}</a></label>
            ${string}
            <button class="viewInfo">View Info</button>
            <button class="delete">Delete</button>
          </div>
         </section>`;
        arrayCounter++;
      }
    }
    else if(page === 'add'){
      return string = `
      <main role="main">
        <div class=submission-box>
          <label class = "submission-text"><b>${errorObject.url}</b></label>
          <input id = 'url' class = "submission" type="URL" placeholder="https://www.google.com" 
          aria-label="url-input">
          <br/>
          <br />
          <label class = "submission-text"><b>${errorObject.title}</b></label>
          <input id = 'title' class = "submission" type="text" placeholder="Enter title"
          aria-label="title-input">
          <br/>
          <br />
          <label class = "submission-text"><b>${errorObject.rating}</b></label>
          <input id = 'rating' class = "submission" type="number" placeholder="1 - 5"
          aria-label="rating-input">
          <br/>
          <br />
          <label class = "submission-text"><b>${errorObject.desc}</b></label>
          <textarea id = 'desc' class="submission" id="" rows="10"
          aria-label="description-input"></textarea>
          <br/>
          <input class="back-button" type="submit" value="Back">
          <br/>
          <br/>
          <input class = "submit-new-entry" type="submit" value="Submit">
        </div>
        </main>`;
    }
    else if(page ==='view'){
      if(item.viewInfo === true){
        return string = `
        <main role="main">
          <div class=submission-box>
            <label id = 'url' class = "submission" type="url"><a href=${item.url}
            aria-label="url">${item.url}</a></label>
            <br/>
            <br />
            <label id = 'title' class = "submission"
            aria-label="title">${item.title}</label>
            <br/>
            <br />
            <label id = 'rating' class = "submission"
            aria-label="rating">${item.rating + '/ 5 stars'}</label>
            <br/>
            <br />
            <textarea id = 'desc' class="submission" id="" rows="10" readonly
            aria-label="description">${item.desc}</textarea>
            <br/>
            <input class = "back-button" type="submit" value="Back">
          </div>
        </main>`;
      } 
    }
    return string;


  }


  function generateShoppingItemsString(shoppingList) {
    if(page === 'add'){
      return generateItemElement('');
    }
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }

  function findObjectData(event){
    let objectData = {};
    objectData.currentButton = event.currentTarget;
    objectData.currentId = bookmark.getItemIdFromElement(objectData.currentButton);
    objectData.currentObject = bookmark.findById(objectData.currentId);
    return objectData;
  }

  function addItemClick(){
    $('#js-header-form').on('click', '.add', event => {
      event.preventDefault();
      page = 'add';
      arrayCounter = 0;
      render();
    });
  }

  function handleEditClick(){
    $('#js-bookmark-form-entry').on('click', '.edit', event => {
      event.preventDefault();
      const objectData = findObjectData(event);
    });
  }

  function resetErrorTable(){
    bookmarkList.errorObject.url = 'URL';
    bookmarkList.errorObject.title = 'Title';
    bookmarkList.errorObject.rating = 'Rating';
    bookmarkList.errorObject.desc = 'Description';
  }

  function addConfirmClick(){
    $('#js-bookmark-form-entry').on('click', '.submit-new-entry', event => {
      event.preventDefault();
      resetErrorTable();
      let valid = true;
      let url = $('#url').val();
      let title = $('#title').val();
      let rating = $('#rating').val();
      let desc = $('#desc').val();

      valid = (item.validateURL(url) && valid);  
      valid = (item.validateTitle(title) && valid);
      valid = (item.validateRating(rating) && valid);
      valid = (item.validateDesc(desc) && valid);   
      render();


      if(valid === true){
        api.createItem(title, desc, url, rating, newItem => {
          bookmark.addItem(newItem);
          page = 'main';
          render();
        });
      }
    });
  }

  function handleViewInfoClick(){
    $('#js-bookmark-form-entry').on('click', '.viewInfo', event => {
      event.preventDefault();
      page = 'view';
      const object = findObjectData(event);
      object.currentObject.viewInfo = true;
      render();
    });
  }

  function handleRadioClick(){
    $('#js-bookmark-form-entry').on('change', '.float-right', event => {
      event.preventDefault();
      arrayCounter = 0;
      const currentButton = event.currentTarget;
      let id = bookmark.getItemIdFromElement(currentButton);
      const object = bookmark.findById(id);
      api.updateItem(object.id, {rating: $(currentButton).val()}, () => {
        object.rating = $(event.currentTarget).val();
        render();
      });
    });
  }

  function handleDeleteClick(){
    $('#js-bookmark-form-entry').on('click', '.delete', event => {
      event.preventDefault();
      const objectData = findObjectData(event);
      if (confirm(`Are you sure you want to delete ${objectData.currentObject.title}?`)){
        api.deleteItem(objectData.currentId, () => {
          bookmark.findAndDelete(objectData.currentId);
          arrayCounter = 0;
          render();
        });
      }
      else{
        return;
      }
    });
  }

  function handleFilterClick() {
    $('#js-header-form').on('click', '.filter', event => {
      const value = Number($(event.currentTarget).val());
      if(value === bookmark.filterByRating){
        return;
      }
      arrayCounter = 0;
      bookmark.filterByRating = value;
      render(value);
    });
  }

  function handleBackClick(){
    $('#js-bookmark-form-entry').on('click', '.back-button', event => {
      event.preventDefault();
      page = 'main';
      arrayCounter = 0;
      render();
    });
  }


  function bindEventListeners(){
    handleEditClick();
    addItemClick();
    addConfirmClick();
    handleDeleteClick();
    handleRadioClick();
    handleViewInfoClick();
    handleBackClick();
    handleFilterClick();
  }


  function render(test) {
    const rating = test || bookmark.filterByRating;
    if(page === '') page = 'main';
    let items = bookmark.items;
    if(rating !== 0){
      items = items.filter(item => parseInt(item.rating) === rating);
    }
    const bookmarkItemsString = generateShoppingItemsString(items);
    $('#js-bookmark-form-entry').html(bookmarkItemsString);
  }



  return {
    render : render,
    bindEventListeners,
    errorObject,
  };
}());