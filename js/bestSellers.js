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
    fetch('./data/goods.json')
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