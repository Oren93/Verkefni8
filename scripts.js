const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');



  text.init(form, items);
});

const text = (() => {
  let items;
  var placeholder;
  var list = document.querySelector('.items');
  var entry = document.querySelector('.form');

  function init(_form, _items) {
    items = _items;
  //  _form.addEventListener('submit', formHandler);

    for (const i of items.querySelectorAll('.item')) {
      i.querySelector('.item__text').addEventListener('click', edit);
      i.querySelector('.item__checkbox').addEventListener('change', finish);
      i.querySelector('.item__button').addEventListener('click', deleteItem);

    }
  }


  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log(this);
    placeholder = this.innerText;
    console.log(placeholder);
    var span = e;
    var elem = this;

    var input = document.createElement("input");
    input.type = "text";
    input.className = "item__edit";
    input.value = placeholder;
    console.log(input);
    elem.parentNode.replaceChild(input, elem);
    input.focus();
    input.setSelectionRange(0, input.value.length); //selected automatically

    input.addEventListener("keypress", enterKeyItem);
    input.addEventListener("blur", updateItem); //to prevent editing two together



  }

  //Enter is pressed on editing items in list
  function enterKeyItem(e) {
    if (event.which === 13) {
      console.log(this.value);
      updateItem.call(this);
    }
  }

  //replacing the value from the input into a new span then reseting enetlistener
  function updateItem() {
    var elem = this;
    console.log(this);
    if (this.value === "") {
      console.log(placeholder);
      var str = document.createTextNode(placeholder);
    }   //list cannot contain empty items
    else
      var str = document.createTextNode(this.value);
    console.log(this.value);
    var span = document.createElement("span");
    span.className = "item__text";

    span.appendChild(str);
    span.addEventListener('click', edit);
    console.log("parent node  "+elem.parentNode);
    elem.parentNode.replaceChild(span, elem);

  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    console.log(this);
    var x = e.target;
    x.classList.toggle('checked');
    x.parentNode.classList.toggle('item--done');
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    console.log(this);
    this.closest("li").remove();
  }



  entry.onsubmit = function (evt) {
    evt.preventDefault();

    var newitem = document.querySelector('.form__input').value;
    console.log("this is:  " + newitem);
    if (newitem == "") 
      return;

    var li = document.createElement('li');
    li.setAttribute('class', 'item');

    //creating checkbox
    var input = document.createElement("input");
    input.className = "item__checkbox";
    input.type = "checkbox";
    input.addEventListener('change', finish);

    //creating span to contain new text
    var span = document.createElement("span");
    span.className = "item__text";
    span.addEventListener('click', edit);
    //Creating button
    var button = document.createElement("button");
    button.className = "item__button";
    button.addEventListener('click', deleteItem);

    var node = document.createTextNode(newitem);

    span.appendChild(node);
    button.appendChild(document.createTextNode("Eyða"));
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
    //Empying input box (added a bit after return time):
    document.querySelector('.form__input').value = "";
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
  }

 /* function formHandler(e) {
    e.preventDefault();
    
    console.log('halló heimur');
  }*/



  return {
    init: init
  }
})();