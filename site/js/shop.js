class Shop {
    constructor() {
        this.getProductList();
    }

    getProductList() {
        fetch('http://localhost:7000/api/cameras')
            .then(response => response.json())
            .then((products) => {
                this.showProductList(products);
            })
            .catch((error) => console.warn(error));
    }

    showProductList(products) {
        const productsSection = document.querySelector('.products');
        for (const product of products) {
            const { _id, name, imageUrl, price, lenses } = product;
            const productArticle = this.createElementWithText('article', 'single-product');
            const productLink = this.createElementWithText('a', 'product-link');
            productLink.href = 'product.html';
            const nameElement = this.createElementWithText('h3', 'product-name', name);
            const priceElement = this.createElementWithText('span', 'product-price', `${price} €`);
            const customOptionsElement = this.createCustomOptionsElement(lenses);
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.alt = '';
            productArticle.append(imageElement, nameElement, priceElement, customOptionsElement);
            productLink.addEventListener('click', this.saveProductId.bind(this, _id));
            productLink.appendChild(productArticle);
            productsSection.appendChild(productLink);
        }
    }

    saveProductId(id) {
        localStorage.setItem('selectedProduct', id);
    }

    createCustomOptionsElement(options) {
        const optionsBlock = this.createElementWithText('div', 'product-custom-options');
        for (const option of options) {
            const optionElement = this.createElementWithText('span', 'product-custom-option', option);
            optionsBlock.appendChild(optionElement);
        }
        return optionsBlock;
    }

    createElementWithText(tag, cssClass, text = '') {
        const element = document.createElement(tag);
        element.classList.add(cssClass);
        element.textContent = text;
        return element;
    }
}

const shop = new Shop();
