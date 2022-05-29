export const showAlert = (opc) => {
  const alert = document.querySelector('.alert');

  if (opc === 'show') alert.style.display = 'block';
  else alert.style.display = 'none';
};

export const delBooks = (book,id = null) => {
  if (id != null) books.del(id);
};