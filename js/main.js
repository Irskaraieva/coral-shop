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

// bestSellers.js
new Swiper('.swiper', {
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    keyboard: {
        enabled: true,
        pageUpDown: true,
    },

    spaceBetween: 20,

    lazy: true,
    watchOverflow: true,
    
    initialSlide: true,

    breakpoints: {
        320: {
            slidesPerView: 1,
        },

        420: {
            slidesPerView: 2,
        },

        540: {
            slidesPerView: 3,
        },

        820: {
            slidesPerView: 3,
        },
        1120: {
            slidesPerView: 4,
        },
    }
});

function createContentTemplate(godsData) {

    const color = godsData.status == 'hot' ? "background-color: #FF6F61;" : "background-color: #080808;";
    const price = godsData.price.toFixed(2);
    const newPrice = Number(godsData.promoPrice).toFixed(2);
    const textDecoration = godsData.promoPrice == "" ? "text-decoration: none; font-weight: 600;" : "text-decoration: line-through;";
    const span = godsData.promoPrice !== "" ? `<span class="new-price">$${newPrice}</span>` : '';
    const dataName = godsData.category.toLowerCase();


    const product = `
    <div class="swiper-slide" data-name='${dataName}'>
        <figure class="product-card">
            <img src='${godsData.image}' />
            <div class="product-card-label" style="${color}">
                <h6>${godsData.status}</h6>
            </div>
            <figcaption class="product-caption">
            <div class="product-name">${godsData.title}</div>
            <div class="product-footer">
                <h6 class="product-category">${godsData.category}</h6>
                <div class="total">
                <span class="product-price" style="${textDecoration}">$${price}</span>${span}
                </div> 
            </div>
            </figcaption>
        </figure>
    </div>
   `;
    return createFragmentTemplate(product);
}

function createFragmentTemplate(str) {
    const template = document.createElement('template');
    template.innerHTML = str;
    return template.content;
}

function appendContentToBestSellers(content) {
    const el = document.getElementById('bestSellers');
    el.appendChild(content);
}

function initBestSellers() {
    fetch('./../data/goods.json')
        .then((response) => response.json())
        .then((goodsDatas) => {
            const bestSellersDatas = goodsDatas.filter((goodsData) => goodsData.bestsellers === true);

            const fragment = document.createDocumentFragment();

            bestSellersDatas.forEach((el) => {
                fragment.appendChild(createContentTemplate(el));
            });

            appendContentToBestSellers(fragment);

            // select all filter btns and all cards
            const filterableCards = document.querySelectorAll('.swiper-slide');
            const filterButtons = document.querySelectorAll('.nav-products-best button');


            // filter cards
            const filterCards = (e) => {
                document.querySelector('.nav-products-best .active').classList.remove('active');
                e.target.classList.add('active');

                filterableCards.forEach(card => {
                    card.classList.add('hide');
                    if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === 'all products') {
                        card.classList.remove('hide');
                    }
                });

            }
            // add click event listener
            filterButtons.forEach(button => button.addEventListener('click', filterCards));

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

initBestSellers();



// goods.js

function createContent(godsData) {

    const color = godsData.status == 'hot' ? "background-color: #FF6F61;" : "background-color: #080808;";
    const price = godsData.price.toFixed(2);
    const truncatedCategory = godsData.title.length > 29
        ? `${godsData.title.slice(0, 29)}...`
        : godsData.title;
    const newPrice = Number(godsData.promoPrice).toFixed(2);
    const textDecoration = godsData.promoPrice == "" ? "text-decoration: none;  font-weight: 600;" : "text-decoration: line-through;";
    const span = godsData.promoPrice !== "" ? `<span>$${newPrice}</span>` : '';
    const dataName = godsData.category.toLowerCase();


    const prod = `
        <figure class="product-card" data-name='${dataName}'>
            <img src='${godsData.image}' />
            <div class="product-card-label" style="${color}">
                <h6>${godsData.status}</h6>
            </div>
            <figcaption class="product-caption">
            <div class="product-name"><h5>${truncatedCategory}</h5></div>
            <div class="product-footer">
                <h6>${godsData.category}</h6>
                <div class="total">
                <span style="${textDecoration}">$${price}</span>${span}
                </div> 
            </div>
            </figcaption>
        </figure>
   `;
    return createFragmentTemplate(prod);
}

function createFragmentTemplate(str) {
    const template = document.createElement('template');
    template.innerHTML = str;
    return template.content;
}

function appendContent(content) {
    const el = document.getElementById('projects');
    el.appendChild(content);
}


function init() {
    fetch('./../data/goods.json')
        .then((response) => response.json())
        .then((goodsDatas) => {

            const fragment = document.createDocumentFragment();

            goodsDatas.forEach((goodsData) => {
                fragment.appendChild(createContent(goodsData));
            });

            appendContent(fragment);

            // select all filter btns and all cards
            const filterableCards = document.querySelectorAll('.goods .product-card');
            const filterButtons = document.querySelectorAll('.nav-products button');

            // filter cards
            const filterCards = (e) => {
                document.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                filterableCards.forEach(card => {
                    card.classList.add('hide');
                    if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === 'all products') {
                        card.classList.remove('hide');
                    }

                })

            }

            // add click event listener
            filterButtons.forEach(button => button.addEventListener('click', filterCards))

        })
        .catch((error) => {
            console.error('Something wrong:', error);
        });
}

init();

