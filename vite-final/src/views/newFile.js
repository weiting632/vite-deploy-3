import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cart.js';
import Swal from 'sweetalert2';

export default (await import('vue')).defineComponent({
data() {
return {
products: [],
fullPage: false,
product_id: "",
searchText: '',
productName: [],
showRecommendations: false,
foundProductArray: []
};
},
components: {
RouterView, RouterLink,
},
computed: {
...mapState(cartStore, ['carts', 'cartList', 'cartNum']),
filteredProduct() {
return this.productName.filter(item => item.toLowerCase().includes(this.searchText.toLocaleLowerCase()));
}
},
methods: {
...mapActions(cartStore, ['getCart']),
...mapActions(cartStore, ['deleteItem']),
...mapActions(cartStore, ['adjustmentTicket']),
...mapActions(cartStore, ['cartCount']),
getProducts() {
this.$http(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
.then(res => {
console.log(res);
this.products = res.data.products;
this.productName = this.products.map(item => {
return item.title;
});

});
},
search() {
if (this.searchText === '') {
this.showRecommendations = false;
} else {
this.showRecommendations = true;
}
},
searchName() {
let inputText = this.searchText;
let foundProduct = this.products.find(item => item.title === inputText);
if (foundProduct) {
this.product_id = foundProduct.id;
this.$router.push({ name: 'product-detail', params: { id: `${this.product_id}` } });
} else {
Swal.fire({
position: 'top-end',
title: '找不到該產品',
showConfirmButton: false,
timer: 1500
});
}
},
updateSearchQuery(item) {
this.searchText = item;
let foundProduct = this.products.find(item => item.title === this.searchText);
if (foundProduct) {
this.product_id = foundProduct.id;
if (this.$route.name = 'product-detail') {
const newProductId = this.product_id; // 你想要的新产品 ID
const currentRoute = { ...this.$route }; // 复制当前路由对象
currentRoute.params.id = newProductId;
this.$router.push(currentRoute);
} else {
this.$router.push({ name: 'product-detail', params: { id: `${this.product_id}` } });
}
}
this.showRecommendations = false; // 隐藏推荐列表
},
routerLook() {
this.$router.push({ path: `/products` });
}
},
mounted() {
this.getProducts();
this.getCart();
}
});
