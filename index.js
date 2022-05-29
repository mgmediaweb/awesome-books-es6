import goto from './modules/goto.js';
import BooksMaster from './modules/bookClass.js';
import { DateTime } from "./modules/luxon.min.js";

setInterval(() => {
  const now = DateTime.now();
  const showDate = now.toLocaleString(DateTime.DATE_FULL)  + ' ' + now.hour + ':' + twoDigits(now.minute) + ':' + twoDigits(now.second) + ' hrs.';
  document.getElementById('showDate').innerHTML = showDate;
},1000);

const form = document.getElementById('addBookForm');
const fieldTitle = document.getElementById('book-title');
const fieldAuthor = document.getElementById('book-author');
const btnsNav = document.querySelectorAll('.nav-button');

btnsNav.forEach((btn) => {
  btn.addEventListener('click', () => goto(btn.getAttribute('id').slice(4)));
});

const loadButtons = () => {
  const btnsRemove = document.querySelectorAll('.btn-remove');
  btnsRemove.forEach((btn) => {
    const bookClick = new BooksMaster();
    btn.addEventListener('click', () => {
      bookClick.del(btn.getAttribute('id').slice(4));
      loadButtons();
    });
  });
};

class BooksClass extends BooksMaster {
  constructor() {
    super();
    return undefined;
  }

  addBook(book, author) {
    this.add(book, author);
    loadButtons();
    goto('booklist');
  }

  listBooks() {
    this.show();
    loadButtons();
  }
}

const books = new BooksClass();

const showAlert = (opc) => {
  const alert = document.querySelector('.alert');

  if (opc === 'show') alert.style.display = 'block';
  else alert.style.display = 'none';
};

const twoDigits = num => {
  if( num < 10) return '0' + num;
  else return num;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const bookTitle = document.getElementById('book-title');
  const bookAuthor = document.getElementById('book-author');

  if ((bookTitle.value.trim() !== '') && (bookAuthor.value.trim() !== '')) {
    books.addBook(bookTitle.value, bookAuthor.value);
    bookTitle.value = '';
    bookAuthor.value = '';
  } else {
    showAlert('show');
  }
});

fieldTitle.addEventListener('keyup', () => showAlert('hide'));
fieldAuthor.addEventListener('keyup', () => showAlert('hide'));

books.listBooks();
showAlert('hide');
goto('booklist');