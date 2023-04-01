let myLibrary = [];

function Book(title,author,pages,isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.toggleIsReadStatus = function(btn){
  if(this.isRead === true){
    this.isRead = false;
    btn.classList.remove('isRead');
    btn.classList.add('notRead');
    btn.textContent = 'Not read';
  }
  else if(this.isRead === false){
    console.log('fuck')
    this.isRead = true;
    btn.classList.remove('notRead');
    btn.classList.add('isRead');
    btn.textContent = 'Read';
  }
}
document.querySelector("form").addEventListener("submit", addBookToLibrary);

const form_hider = document.getElementById("form_hider");

document.getElementById("add_btn").addEventListener('click', () => {
  form_hider.hidden = false;
});
document.getElementById("cls_btn").addEventListener('click', () =>{
  form_hider.hidden = true;
});

function addBookToLibrary(e){
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let isRead = null;

  if(document.getElementById("isRead").checked){
    isRead = true;
  }
  else{
    isRead = false;
  }

  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);

  console.log('New book has been added succesfully!');
  clearForm()
  displayBook(title, author, pages, isRead, newBook);
  e.preventDefault();
}

function displayBook(title, author, pages, isRead){
    const book_container = document.querySelector(".book_container");
    const div = document.createElement('div');
    const div1 = document.createElement('div');
    const change_btn = document.createElement('button');
    const remove_btn = document.createElement('button');
    const par1 = document.createElement('p');
    const par2 = document.createElement('p');
    const par3 = document.createElement('p');

    div.classList.add("book_card");
    book_container.appendChild(div);
    div.appendChild(div1);

    myLibrary.forEach((book) =>{
        
      div.appendChild(div1);
      div1.appendChild(par1).textContent = book.title;
      div1.appendChild(par2).textContent = 'by '+ book.author;
      div.appendChild(par3).textContent = 'Number of Pages: '+ book.pages;
      div.dataset.title = book.title;
      div.appendChild(change_btn);
      if(book.isRead === false){
        change_btn.classList.remove('isRead');
        change_btn.classList.add('notRead');
        change_btn.textContent = 'Not read';
      }
      else if (book.isRead === true){
        change_btn.classList.remove('notRead');
        change_btn.classList.add('isRead');
        change_btn.textContent = 'Read';
      }
      
      change_btn.addEventListener('click', () =>{
        book.toggleIsReadStatus(change_btn);
      });

      div.appendChild(remove_btn).classList.add('remove');
      remove_btn.onclick = removeBook;
      remove_btn.textContent = 'Remove';
    })
}

function clearForm(){
  form_hider.hidden = true;
  document.querySelector("form").reset();
}

function removeBook(){
  myLibrary.splice(myLibrary[this.dataset.title],1);
  this.parentNode.remove();
}