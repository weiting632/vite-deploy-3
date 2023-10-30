<script>
import { RouterView, RouterLink } from 'vue-router';
import { mapState,mapActions } from 'pinia';
import cartStore from '@/stores/cart.js';
import Swal from 'sweetalert2'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const {VITE_URL, VITE_PATH} = import.meta.env;
export default{
    data(){
      return{
        products:[],
        product_id:"",
        searchText: '',
        productName:[],
        showRecommendations: false,
        foundProductArray:[],
        color: '#956134',
        fullPage: true,
        loader: "bars"
      }
    },
    components:{
         RouterView,RouterLink,Loading
    },
    computed:{
      ...mapState(cartStore,['carts','cartList','cartNum','loadingShow']),
      filteredProduct(){
        return this.productName.filter(item => item.toLowerCase().includes(this.searchText.toLocaleLowerCase()))
      }
     
    },
    methods:{
        ...mapActions(cartStore,['getCart']),
        ...mapActions(cartStore,['deleteItem']),
        ...mapActions(cartStore,['adjustmentTicket']),
        ...mapActions(cartStore,['cartCount']),
        getProducts(){
            this.$http(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
            .then(res=>{
              console.log(res)
                this.products =res.data.products
                this.productName = this.products.map(item =>{
                  return item.title
                })
               
            })
        },
        search() {
          if(this.searchText===''){
            this.showRecommendations=false
          }else{
            this.showRecommendations=true
          }
        },
        searchName(){
          let inputText = this.searchText
          let foundProduct = this.products.find(item => item.title === inputText)
          if(foundProduct){
            this.product_id = foundProduct.id
            this.$router.push({name:'product-detail', params:{id:`${this.product_id}`}})
          }else{
            Swal.fire({
              position: 'top-end',
              title: '找不到該產品',
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        updateSearchQuery(item) {
          this.searchText = item;
          let foundProduct = this.products.find(item => item.title === this.searchText)
          
          if(foundProduct){
            this.product_id = foundProduct.id
            this.$router.push({ name: 'product-detail', params: { id: this.product_id } })
          }
          this.showRecommendations = false; 
        },
        routerLook(){
          this.$router.push({path:`/products`})
        }
    },
    
    mounted(){
      this.getProducts()
      this.getCart()
    }
}
</script>
<template>
     <loading v-model:active="loadingShow"
                 :can-cancel="true"
                 :color="color"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"
                 :loader="loader"/>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="container">
        <a class="navbar-brand " href="#">
          <img src="../assets/icon/planet-ice-cream-3.png" style="width: 85px; height: 85px;" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink  class="nav-link " to="/">首頁</RouterLink> 
              </li>
              <li class="nav-item">
                <RouterLink  class="nav-link " to="/products">產品</RouterLink> 
              </li>
          </ul>
          <form class="d-flex search-container"  @submit.prevent="searchName()">
            <input class="form-control me-2 input-container" type="search" placeholder="Search" v-model="searchText" @input="search" aria-label="Search">
           
            <ul v-if="showRecommendations" class="list-group active">
              <li v-for="item in filteredProduct" :key="item" class="list-group-item">
                <button @click="updateSearchQuery(item)">{{ item }}</button>
              </li>
            </ul>
            <button class="btn btn-outline-success me-1" type="submit">Search</button>
           </form>
          <!-- <form class="d-flex search-container" @submit.prevent="searchName()">
           
            <input class="form-control me-2" type="text" placeholder="Search" v-model="searchText" @input="search" aria-label="Search">
            <ul v-if="showRecommendations" class="list-group active">
              <li v-for="item in filteredProduct" :key="item" class="list-group-item">
                <button @click="updateSearchQuery(item)">{{ item }}</button>
              </li>
            </ul>
            <button class="btn btn-outline-success me-1" type="submit">Search</button>
          </form> -->
          <button class="btn btn-primary border-none position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
              <i class="bi bi-bag "></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ cartNum }}
              </span>
          </button>
        </div>
      </div>
    </nav>
    <div  class="offcanvas offcanvas-end overflow-auto vl-parent " tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref="formContainer">
        <div class="offcanvas-header border-bottom bg-success text-white">
              <h5 id="offcanvasRightLabel " >
                 購物車
              </h5>
          <button type="button" class="btn-close text-reset " data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div v-if="carts.length===0" class="offcanvas-body bg-primary text-center" >
          <h5 class="text-center">購物車沒有品項</h5>
          <a href="#" class="btn btn-to-shop btn-outline  bg-success text-white px-7 mt-4" @click="routerLook()" data-bs-dismiss="offcanvas">來去看看</a>
         
        </div>
        <div v-else class="offcanvas-body bg-primary" >
          <ul class="list-unstyled">
              <li  class="d-flex align-items-center py-4 px-3  border-bottom "    v-for="item in carts"  :key="item.id" >
                  <div class="w-25" >
                    <img :src="item.product.imageUrl" style="width: 72px; height: 72px; object-fit: cover;" >
                  </div>
                  <div class="w-75 ms-3">
                      <h4 class="h6 mb-1">{{item.product.title}}</h4>
                      <p class="fw-bold text-dark"></p>
                      <div class="d-flex justify-content-between align-items-end">
                          <div class="fw-bold">
                              <a href="#" class="pe-2 text-success" type="btn" @click.prevent="()=>adjustmentTicket('-', item  )">
                                  <i class="bi bi-dash fs-6"></i>
                              </a>
                              <span class="fs-6"  >{{ item.qty }}</span>
                                  <a href="#" class="ps-2 text-success" type="btn" @click.prevent="()=>adjustmentTicket('+', item)">
                                  <i class="bi bi-plus fs-6"></i>
                              </a>
                          </div>
                          <button type="button" class="btn btn-outline-success" @click.prevent="()=>deleteItem(item)">
                              <i class="bi bi-trash">
                              </i>
                          </button>
                      </div>
                  </div>
              </li>
          </ul>
          <div class="mt-auto overflow-auto " >
            <div class="offcavans-footer" data-bs-dismiss="offcanvas" aria-label="Close" >
              <h4 class="py-3">
                總共: {{ cartList.a }}
              </h4>
              <RouterLink class ="btn btn-outline-success btn-lg w-100 mb-3" to="/cart">購物車</RouterLink>
              <RouterLink class=" btn btn-success btn-lg  w-100 text-white" to="/form"> 直接購買</RouterLink>
            </div>
          </div>
        </div>
      </div>
     <!-- 作為內頁顯示使用 -->
     <RouterView></RouterView>
     <footer class="py-5  text-light   bg-primary">
        <ul class="list-unstyled d-flex justify-content-center">
          <li>
            <a class="pe-3 link-warning" href="#"><i class="fab h5 fa-facebook"></i></a>
          </li>
          <li>
            <a class="pe-3 link-warning" href="#"><i class="fab h5 fa-instagram"></i></a>
          </li>
          <li>
            <a class="pe-3 link-warning" href="#"><i class="fab h5 fa-twitter-square"></i></a>
          </li>
          <li>
            <a class="pe-3 link-warning" href="#"><i class="fas h5 fa-envelope"></i></a>
          </li>
        </ul>
    </footer>
    <div class="d-flex flex-column text-primary  justify-content-center align-items-center p-2 bg-success">
      <span class="me-4"> 僅個人作品使用，無任何商業用途 </span>
      <div class="d-flex">
        <div>Copyright © 2023 星杯冰淇淋|</div>
        <Router-link to="/login">後台登入</Router-link>
      </div>
    </div>
</template>
<style>
  .navbar {
      margin-bottom: 0;
    }

    .search-container {
      position: relative;
    }

    .list-group {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
      display: none;
      width: 100%;
    }

    .list-group.active {
      display: block;
    }

    /* 自定义按钮样式，去除默认样式 */
    .list-group-item button {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }

</style>