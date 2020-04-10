class Product {
    constructor() {
        this.showProduct();
    }

    showProduct() {
        const selectedProduct = this.getSelectedProductFromLocalStorage();
        const productBlock = this.createElementWithText('div', 'product');
        const { _id, name, imageUrl, price, lenses } = selectedProduct;
        console.log({ _id, name, imageUrl, price, lenses });
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

    createElementWithText(tag, cssClass, text = '') {
        const element = document.createElement(tag);
        element.classList.add(cssClass);
        element.textContent = text;
        return element;
    }
}

const product = new Product();
