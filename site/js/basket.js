class Basket {
    constructor() {
        this.showBasket();
    }

    async showBasket() {
        const sendOrder = await this.sendOrderToBackend();
        console.log(sendOrder.orderId);
    }

    getProductsInBasket() {
        const productsInBasket = localStorage.getItem('productsInBasket');
        return JSON.parse(productsInBasket);
    }

    sendOrderToBackend() {
        const productsId = this.getProductsInBasket();

        const contact = {
            firstName: 'Jane',
            lastName: 'Hill',
            address: '5 Lonely Ave 22039',
            city: 'NYC',
            email: 'jane.hill@gmail.com'
        };

        return fetch('http://localhost:7000/api/cameras/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact: contact,
                products: productsId
            })
        })
            .then((response) => response.json())
            .then((orderDetails) => orderDetails)
            .catch((error) => console.warn(error));
    }
}

const product = new Basket();
