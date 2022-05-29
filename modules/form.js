const form = document.getElementById('addBookForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const bookTitle = document.getElementById('book-title');
  const bookAuthor = document.getElementById('book-author');

  if ((bookTitle.value.trim() !== '') && (bookAuthor.value.trim() !== '')) {
    books.add(bookTitle.value, bookAuthor.value);
    bookTitle.value = '';
    bookAuthor.value = '';
  } else {
    showAlert('show');
  }
});

export default form;