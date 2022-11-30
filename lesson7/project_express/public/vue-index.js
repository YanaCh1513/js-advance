class BasketProduct {
    constructor(id, title, price, quantity) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
}

class Product {
    constructor(id, title, prise, img) {
        this.id = id;
        this.title = title;
        this.price = prise;
        this.img = img;
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

async function fetchProducts(productApiUri) {
    const productsJson = await fetchJson(productApiUri);
    const products = [];
    productsJson.forEach(item => {
        products.push(new Product(item["id_product"], item["product_name"], item["price"], "product1.png"));
    });

    return products;
}

async function fetchBasketItems(basketItemsUri) {
    const basketJson = await fetchJson(basketItemsUri);
    const basketItems = [];
    basketJson["contents"].forEach(item => {
        basketItems.push(new BasketProduct(item["id_product"], item["product_name"], item["price"], item["quantity"]));
    });

    return basketItems;
}

const RESPONSE_API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// не пишем во вью чтобы эти поля не были реактивными, кажется это сэкономит ресурсы.
const PRODUCT_API = `${RESPONSE_API}/catalogData.json`;

const BASKET_API = `${RESPONSE_API}/getBasket.json`;
