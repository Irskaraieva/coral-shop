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

                filterableCards.forEach(card => {
                    card.classList.add('hide');
                    if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === 'all products') {
                        card.classList.remove('hide');
                    }
                });
            };
            
            // add click event listener
            filterButtons.forEach(button => button.addEventListener('click', filterCards));

        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

init();

