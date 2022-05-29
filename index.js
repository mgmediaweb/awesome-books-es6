import { delBooks, showAlert } from './modules/functions.js';
//import form from './modules/form.js';
import goto from './modules/goto.js';

class BooksClass {
  constructor() {
    return null;
  }

  add(title = null, author = null) {
    if (title && author) {
      const bookInfo = {
        title,
        author,
      };

      const bookMem = this.constructor.get();
      bookMem.push(bookInfo);
      this.constructor.set(bookMem);
      this.show();
      goto('booklist');
    }
  }

  del(id) {
    const books = this.constructor.get();

    const newBooks = books.filter((item, key) => {
      if (key !== id) return true;
      return null;
    });

    this.constructor.set(newBooks);
    this.show();
  }

  static get() {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books) return books;
    return [];
  }

  static set(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  show() {
    const books = this.constructor.get();
    const tableBook = document.getElementById('bookList').getElementsByTagName('tbody')[0];
    tableBook.innerHTML = '';

    if (books && books.length) {
      books.forEach((item, key) => {
        const newRow = tableBook.insertRow(key);
        const newCellTitle = newRow.insertCell(0);
        const newCellAuthor = newRow.insertCell(1);
        const newCellButton = newRow.insertCell(2);

        newCellButton.setAttribute('class', 'cellBtn text-center');

        const newBook = document.createTextNode(item.title);
        const newAuthor = document.createTextNode(item.author);

        newCellTitle.appendChild(newBook);
        newCellAuthor.appendChild(newAuthor);
        newCellButton.innerHTML = `<button type="button" onClick="delBooks(this.constructor,${key})">Remove</button>`;
      });

      let message = `${books.length} books availables`;
      if (books.length === 1) message = '1 book available';
      document.getElementById('cantBooks').innerHTML = message;
    } else {
      const newRow = tableBook.insertRow(0);
      const newCell = newRow.insertCell(0);
      const text = document.createTextNode('No books availables');

      newCell.setAttribute('colspan', 3);
      newCell.setAttribute('class', 'text-center');
      newCell.appendChild(text);
      document.getElementById('cantBooks').innerHTML = '';
    }

    return true;
  }
}

const books = new BooksClass();

document.getElementById('nav-booklist').addEventListener('click', () => goto('booklist'));
document.getElementById('nav-addbook').addEventListener('click', () => goto('addbook'));
document.getElementById('nav-contact').addEventListener('click', () => goto('contact'));

books.show();
showAlert('hide');
delBooks();
goto('booklist');