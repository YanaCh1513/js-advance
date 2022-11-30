Vue.component('products', {
    props: ['filtertext'],
    data() {
        return {
            products: []
        }
    },
    template: `
        <div class="content">
            <product v-for="product in filteredProducts" :key="product.id"
            v-bind:id="product.id" v-bind:title="product.title">
            </product>        
        </div>
    `,
    methods: {
        async initProducts(uri) {
            this.products = await fetchProducts(uri);
        },
    },
    computed: {
        filteredProducts: function () {
            if (!this.filtertext) return this.products;
            return this.products.filter(
                x => {
                    // здесь каждый раз надо создавать объект регулярного выражения
                    // понизит ли это эффективность по сравнению с String.indexOf(...)
                    let reg = new RegExp(`.*${this.filtertext}.*`, "g");
                    return reg.test(x.title);
                }
                // тоже самое только, без регулярки
                //x => x.title.indexOf(this.filtertext) >= 0
            );
        }
    },
    async mounted() {
        await this.initProducts(PRODUCT_API);
        //this.log(this.products)
    }
});

Vue.component('product', {
    props: ["id", "title", "price", "imgUri"],
    data() {
        return {

        }
    },
    template: `
            <div class="card">
                <img :src="imgUri" alt="picture">
                <h3>{{title}}</h3>
                <p>{{price}}</p>
                <button>Buy</button>
            </div>
    `
})

Vue.component('basket', {
    data() {
        return {
            basketProducts: []
        }
    },
    template: `
        <div class="basket">
            <h3>Корзина</h3>
            <div class="basket-item" v-for="basketProduct in basketProducts" :key="basketProduct.id">
                title: {{basketProduct.title}}, price: {{basketProduct.price}}, quantity: {{basketProduct.quantity}}
            </div>
        </div>    
        `,
    methods: {
        async initBasket(uri) {
            this.basketProducts = await fetchBasketItems(uri);
        }
    },

    async mounted() {
        await this.initBasket(BASKET_API);
        console.log(this.basketProducts)
    }
});

Vue.component('search', {
    data() {
        return {
            searchtext: ""
        }
    },
    template: `
        <div class="searchBox">
            <span>Поиск:</span>
            <input @input="onInput" v-model="searchtext" type="search" class="search">
            <span class="searchIcon" :class="this.searchtext? '' : 'searchIconToggle'">&#x1F50E;&#xFE0E;</span>
            <div>{{searchtext}}</div>
        </div>
    `,
    methods: {
        onInput(event) {
            this.$emit('change', this.searchtext);
            this.$parent.filterText = this.searchtext;
            //this.log($parent)
        },
        log(d) { console.log(d) }
    }
});