Vue.component('product', {
    template: `
	<div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>User is premium: {{ premium }}</p>
            <p>Shipping: {{ shipping }}</p>
            <p>{{ description }}</p>
            <span> {{ sale }}</span>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            >
            </div>
            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>
            <p v-show="inStock" v-if="inStock == true">In stock</p>
            <p v-else :class="{ Out: !inStock}">Out of stock</p>
            <a :href="link">More products like this</a>
            
            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock}">
                Add to cart
            </button>
            <button v-on:click="deleteToCart">Delete to cart</button>
        </div>
   </div>
 `,
    data() {
        return {

                product: "Socks",
                brand: 'Vue Mastery',
                description: "A pair of warm, fuzzy socks.",
                selectedVariant: 0,
                altText: "A pair of socks.",
                link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
                inventory: 100,
                variants: [
                    {
                        variantId: 2234,
                        variantColor: 'green',
                        variantImage: "./assets/vmSocks-green-onWhite.jpg",
                        variantQuantity: 10,
                        variantSale: "on sale"
                    },
                    {
                        variantId: 2235,
                        variantColor: 'blue',
                        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                        variantQuantity: 0,
                        variantSale: "sale end"
                    }
                ],
                sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                cart: []
        }
    },
    methods: {
            addToCart() {
                this.$emit('add-to-cart',
                this.variants[this.selectedVariant].variantId);
            },

            updateProduct(index) {
                this.selectedVariant = index;
            },
            deleteToCart() {
                this.$emit('remove-to-cart', this.variants[this.selectedVariant].variantId);
            },


    },
    computed: {
            title() {
                return this.brand + ' ' + this.product;
            },
            image() {
                return this.variants[this.selectedVariant].variantImage;
            },
            inStock(){
                return this.variants[this.selectedVariant].variantQuantity;
            },
            sale(){
                return this.brand + ' ' + this.product + ' ' + this.variants[this.selectedVariant].variantSale;

            },
            shipping() {
                if (this.premium) {
                    return "Free";
                } else {
                    return 2.99
                }
            }

    },
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
})

Vue.component('product-details', {
    template: `
            <ul>
                 <li v-for="detail in details">{{ detail }}</li>
            </ul> `,
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
    }
})


let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeCart(id) {
            this.cart.pop(id);
        }
    }

})

