class Product {
    constructor() {
        this.showProduct();
    }

    showProduct() {
        const selectedProduct = this.getSelectedProductFromLocalStorage();
        const productBlock = this.createElementWithText('main', 'product');
        const { _id, name, imageUrl, price, lenses, description } = selectedProduct;
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

    getSelectedProductFromLocalStorage() {
        const selectedProductId = localStorage.getItem('selectedProduct');
        const allProducts = JSON.parse(localStorage.getItem('products'));
        for (const product of allProducts) {
            if (product._id === selectedProductId) {
                return product;
            }
        }
        console.warn('😢 The product id was not found in the LocalStorage :(', selectedProductId);
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
}

const product = new Product();
