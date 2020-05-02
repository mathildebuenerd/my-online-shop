class Product {
    constructor() {
        this.showProduct();
    }

    async showProduct() {
        const selectedProductId = this.getSelectedProductIdFromLocalStorage();
        const selectedProduct = await this.getProduct(selectedProductId);
        const { _id, name, imageUrl, price, lenses, description } = selectedProduct;

        const productBlock = this.createElementWithText('main', 'product');
        const nameElement = this.createElementWithText('h1', 'product-name', name);
        const descriptionElement = this.createElementWithText('p', 'product-description', description);
        const priceElement = this.createElementWithText('span', 'product-price', price);
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = '';
        this.createCustomOptionsElement(lenses);
        productBlock.append(imageElement, nameElement, descriptionElement, priceElement);
        document.querySelector('.product-description').appendChild(productBlock);
    }

    getSelectedProductIdFromLocalStorage() {
        const selectedProductId = localStorage.getItem('selectedProduct');
        return selectedProductId || console.warn('😢 The product id was not found in the LocalStorage :(', selectedProductId);
    }

    createCustomOptionsElement(options) {
        const optionsBlock = this.createElementWithText('div', 'product-custom-options');
        for (const option of options) {
            const optionElement = this.createElementWithText('span', 'product-custom-option', option);
            optionsBlock.appendChild(optionElement);
        }
        document.querySelector('.product-options').appendChild(optionsBlock);
    }

    createElementWithText(tag, cssClass, text = '') {
        const element = document.createElement(tag);
        element.classList.add(cssClass);
        element.textContent = text;
        return element;
    }

    getProduct(id) {
        return fetch('http://localhost:7000/api/cameras/' + id)
            .then((response) => response.json())
            .then((product) => product)
            .catch((error) => console.warn(error));
    }
}

const product = new Product();
