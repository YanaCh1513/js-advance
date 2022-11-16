
class BasketItem {
    constructor(id, title, price, quantity) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }

    getHtml() {
        return `
            <div class="backet-item"> title: ${this.title}, price: ${this.price}, quantity: ${this.quantity}</div>
        `;
    }
}

class Basket {
    constructor(backetItems) {
        this.items = backetItems;
    }

    render(container) {
        container.innerHTML = "";

        for (let item of this.items) {
            container.insertAdjacentHTML('beforeend', item.getHtml());
        }
    }

    add(item) {
        items.push(backetItem);
    }

    total() {
        let total = 0;
        for (let item of this.items) {
            total += item.price;
        }
        return total;
    };
}

class ProductList {
    constructor(products, itemsConteiner) {
        this.products = products;
        this.itemsConteiner = itemsConteiner;
    }

    // Билдер вы меня просили в прошлый рарз применять. Не знаю, здесь может билдер который будет
    // render осуществлять. На вход контейнер. Почитаю подумаю еще. 
    render() {
        this.itemsConteiner.innerHTML = "";

        for (let product of this.products) {
            this.itemsConteiner.insertAdjacentHTML('beforeend', product.getHtml());
        }
    }
}

class Product {
    constructor(id, title, prise, img) {
        this.id = id;
        this.title = title;
        this.price = prise;
        this.img = img;
    }

    getHtml() {
        return `
                <div class="card" data-id=${this.id} data-title="${this.title}" data-price="${this.price}">
                    <img src="${this.img}" alt="picture">
                    <h3>${this.title}</h3>
                    <p>$${this.price}</p>
                    <button>Buy</button>
                </div>`;
    }
}

async function fetchJson(uri) {
    const response = await fetch(uri);
    if (response.status != 200) {
        console.log(response.error);
    }
    const json = await response.json();
    return json;
}

async function getProducts(productApiUri) {
    const productsJson = await fetchJson(productApiUri);
    const products = [];
    productsJson.forEach(item => {
        products.push(new Product(item["id_product"], item["product_name"], item["price"], "./resources/product2.png"));
    });

    return products;
}

async function getBasketItems(basketItemsUri) {
    const basketJson = await fetchJson(basketItemsUri);
    const basketItems = [];
    basketJson["contents"].forEach(item => {
        basketItems.push(new BasketItem(item["id_product"], item["product_name"], item["price"], item["quantity"]));
    });

    return basketItems;
}


(async () => {

    const RESPONSE_API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

    const PRODUCT_API = `${RESPONSE_API}/catalogData.json`;

    const BASKET_API = `${RESPONSE_API}/getBasket.json`;

    let products = await getProducts(PRODUCT_API);
    const productConteiner = document.querySelector('.content');
    let productList = new ProductList(products, productConteiner);
    productList.render();

    let basketItems = await getBasketItems(BASKET_API);
    const basketContainer = document.querySelector('.backet');
    let basketList = new Basket(basketItems);
    basketList.render(basketContainer);

})();



