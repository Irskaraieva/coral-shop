/* open menu header */
const burgerOpen = document.getElementById('burgerOpen');
const navList = document.getElementById('navList');

burgerOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    navList.classList.toggle('open');
    burgerOpen.classList.toggle('rotate');
});

/* open menu footer */
const catalogArrow = document.getElementById('catalogArrow');
const aboutArrow = document.getElementById('aboutArrow');
const customerArrow = document.getElementById('customerArrow');
const catalogList = document.getElementById('catalogList');
const aboutList = document.getElementById('aboutList');
const customerList = document.getElementById('customerList');

catalogArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    catalogList.classList.toggle('open');
    catalogArrow.classList.toggle('rotate');
});

aboutArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    aboutList.classList.toggle('open');
    aboutArrow.classList.toggle('rotate');
});

customerArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    customerList.classList.toggle('open');
    customerArrow.classList.toggle('rotate');
});

/* hide the open menu after clicking the document */
document.documentElement.addEventListener('click', () => {
    if (catalogList.classList.contains('open')) {
        catalogList.classList.remove('open');
        catalogArrow.classList.remove('rotate');
    } else if (aboutList.classList.contains('open')) {
        aboutList.classList.remove('open');
        aboutArrow.classList.remove('rotate');
    } else if (customerList.classList.contains('open')) {
        customerList.classList.remove('open');
        customerArrow.classList.remove('rotate');
    } else if (navList.classList.contains('open')) {
        navList.classList.remove('open');
        burgerOpen.classList.remove('rotate');
    }
});

/*scroll to top*/

const scrollToTop = document.getElementById('scrollToTop');

scrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* search header */
const searchContent = document.getElementById('searchContent');
const searchIcon = document.getElementById('searchIcon');
const searchBtn = document.getElementById('searchBtn');
const input = document.getElementById('input');

searchIcon.addEventListener('click', () => {   
    searchBtn.classList.toggle('show-me');
    searchContent.classList.toggle('clicked');

    if (searchBtn.classList.contains('show-me')) {
        input.focus();
    } else {
        input.blur();
    }
});

input.addEventListener('focus', () => {
    searchBtn.classList.add('show-me');
    searchContent.classList.add('clicked');
});

input.addEventListener('blur', () => {
    input.value = '';
});

searchBtn.addEventListener('click', () => {
    input.value = '';
    searchBtn.classList.remove('show-me');
    searchContent.classList.remove('clicked');
});

