const goto = (page) => {
  const section = document.querySelectorAll('section');

  section.forEach((elem) => {
    const idnum = elem.getAttribute('id');

    if (idnum !== page) {
      document.getElementById(idnum).style.display = 'none';
      document.getElementById(`nav-${idnum}`).removeAttribute('class');
    }
  });

  document.getElementById(page).style.display = 'block';
  document.getElementById(`nav-${page}`).setAttribute('class', 'active');
};

export default goto;