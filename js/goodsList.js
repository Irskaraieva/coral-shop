// goods.js

const slidecontainer = document.getElementById('slidecontainer');
const emptyText = document.querySelector('.empty-text');

function createContent(godsData) {

    const color = godsData.status == 'hot' ? "background-color: #FF6F61;" : "background-color: #080808;";
    const truncatedCategory = godsData.title.length > 29
        ? `${godsData.title.slice(0, 29)}...`
        : godsData.title;

    const price = godsData.price.toFixed(2);
    const newPrice = Number(godsData.promoPrice).toFixed(2);
    const andPrice = godsData.promoPrice !== "" ? newPrice : price;

    const span = godsData.promoPrice !== "" ? `<span>$${newPrice}</span>` : '';
    const textDecoration = godsData.promoPrice == "" ? "text-decoration: none;  font-weight: 600;" : "text-decoration: line-through;";
    const dataName = godsData.category.toLowerCase();
    const picture = godsData.image ? godsData.image : './images/content-images/imageNotFound.png';


    const prod = `
        <figure class="product-card card-rotate" data-name='${dataName}' data-price='${andPrice}'>
            <div class="card-wrapper">
                <div class="card-front">
                    <img src='${picture}' />
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
                </div>
                <div class="card-back"></div>                
            </div>
        </figure>
   `;
    return createFragmentTemplate(prod);
};

function createFragmentTemplate(str) {
    const template = document.createElement('template');
    template.innerHTML = str;
    return template.content;
};

function appendContent(content) {
    const el = document.getElementById('projects');
    el.appendChild(content);
};

function init() {
    fetch('./data/goods.json')
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
                slidecontainer.style.display = 'none';

                const minPrice = parseFloat(document.querySelector('.input-min').value);
                const maxPrice = parseFloat(document.querySelector('.input-max').value);


                filterableCards.forEach(card => {
                    const cardPrice = parseFloat(card.dataset.price);
                    const cardDataName = card.dataset.name;
                    card.classList.add('hide');

                    if (cardPrice >= minPrice && cardPrice <= maxPrice) {
                        if ((cardDataName === e.target.dataset.name) || (e.target.dataset.name === 'all products')) {
                            card.classList.remove('hide');
                        }
                    }

                });

                const isEmptyList = document.querySelectorAll('.goods .product-card:not(.hide)');

                if (isEmptyList.length === 0) {
                    emptyText.style.display = 'block';
                } else {
                    emptyText.style.display = 'none';
                }
            };

            // add click event listener
            filterButtons.forEach(button => button.addEventListener('click', filterCards));



        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

init();

// filter by price

const rangeInput = document.querySelectorAll('.points input');
const parseInput = document.querySelectorAll('.price-input input');
const progress = document.querySelector('.progress-line');


const priceGap = 100;

rangeInput.forEach(input => {
    input.addEventListener('input', (e) => {
        const minValue = parseInt(rangeInput[0].value);
        const maxValue = parseInt(rangeInput[1].value);

        if (maxValue - minValue < priceGap) {
            if (e.target.className === 'point-min') {
                rangeInput[0].value = maxValue - priceGap;
            } else {
                rangeInput[1].value = minValue + priceGap;
            }
        } else {
            parseInput[0].value = minValue;
            parseInput[1].value = maxValue;
            progress.style.left = (minValue / rangeInput[0].max) * 100 + '%';
            progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + '%';
        }
    })
});

parseInput.forEach(input => {
    input.addEventListener('input', (e) => {
        const minValue = parseInt(parseInput[0].value);
        const maxValue = parseInt(parseInput[1].value);

        if ((maxValue - minValue >= priceGap) && maxValue <= 1000) {
            if (e.target.className === 'input-min') {
                rangeInput[0].value = minValue;
                progress.style.left = (minValue / rangeInput[0].max) * 100 + '%';
            } else {
                rangeInput[1].value = maxValue;
                progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + '%';
            }
        } else {
            parseInput[0].value = minValue;
            parseInput[1].value = maxValue;
        }
    })
});

// show filter

const filter = document.getElementById('filter');
const apply = document.getElementById('apply');

filter.addEventListener('click', () => {
    slidecontainer.style.display = slidecontainer.style.display == 'none' ? 'flex' : 'none';
});

apply.addEventListener('click', () => {
    slidecontainer.style.display = 'none';

    const minPrice = parseFloat(document.querySelector('.input-min').value);
    const maxPrice = parseFloat(document.querySelector('.input-max').value);

    const visibleCard = document.querySelectorAll('.goods .product-card');
    const filterButton = document.querySelector('.nav-products button.active');
    const filterButtonName = filterButton.getAttribute('data-name');

    visibleCard.forEach(card => {
        const cardPrice = parseFloat(card.dataset.price);
        const cardName = card.dataset.name;

        if ((cardPrice >= minPrice && cardPrice <= maxPrice) && ((cardName === filterButtonName)|| (filterButtonName === 'all products'))) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }

    });

    const isEmptyList = document.querySelectorAll('.goods .product-card:not(.hide)');

    if (isEmptyList.length === 0) {
        emptyText.style.display = 'block';
    }
    else {
        emptyText.style.display = 'none';
    }
});


