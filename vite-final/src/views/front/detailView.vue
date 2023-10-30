<script>

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cart.js';


const {VITE_URL, VITE_PATH} = import.meta.env;
export default{
    data(){
        return{
            product:[],
            products:[]
        }
    },
    components:{
      Swiper,
      SwiperSlide,
     
      
    },setup () {
      return {
      modules: [Autoplay]
      }
    },  
    computed:{
        ...mapState(cartStore,['productId','isProductLoad','loadingShow'])
    },
    methods:{
      getProducts(){
            this.$http(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
            .then(res=>{
                this.products =res.data.products
               
            })
        },
        getProduct(){
            const loader = this.$loading.show({
      // Optional parameters
            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: false,
            onCancel: this.onCancel
            })
            const { id } = this.$route.params;
            this.$http(`${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`)
            .then(res=>{
                this.product =res.data.product
                loader.hide()
            })
        },
        newProduct(id){
          this.$http(`${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`)
            .then(res=>{
                this.product =res.data.product
          })
        },
        ...mapActions(cartStore,['detailProductAddToCart','addToCart']),

    }, 
    watch: {
    '$route.params.id': function(newId, oldId) {
      if (newId !== oldId) {
          this.$router.go(0);
        }
      },
    },
    mounted (){
        this.getProduct(),
        this.getProducts()
        console.log(this.$route)
    }
}
</script>



<template>
      <loading v-model:active="loadingShow"
                 :can-cancel="true"
                 :color="color"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
      <div class="container">
        <div class="row align-items-center mt-4" data-aos="fade-up">
        <div class="col-md-8 " >
          <img :src="product.imageUrl" alt="" class="img-fluid">
        </div>
        <div class="col-md-4 detail-product">
          <div class="d-flex align-items-center ">
            <h2 class="fw-bold h1 mb-5 me-2">{{ product.title }}</h2>
            <p class="h4 fw-bold text-end mb-5">NT{{ product.price }}</p>
          </div>
          <div class="row align-items-center">
            <div class="col-md-6">
              <a href="#" class="text-nowrap btn btn-dark w-100 py-2  vl-parent "
                @click.prevent="()=>detailProductAddToCart(product.id)">加入購物車
                <!-- <div class="loader " v-if = "isProductLoad && product.id=== productId">
                        <span></span>
                        <span></span>
                        <span></span>
                </div> -->
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    
    
    
    <section class="pt-5  " data-aos="fade-up">
        <h2 class="text-center pb-5">熱銷商品</h2>
        <div class="container">
          <div class="row">
            <swiper :spaceBetween="30"  :loop="true" :centeredSlides="true" :autoplay="{ delay: 2500, disableOnInteraction: false,}" :modules="modules"  @autoplayTimeLeft="onAutoplayTimeLeft" :breakpoints="{
      '640': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    }" class="mySwiper">
              <swiper-slide v-for="product in products " :key="product.id" >
                <div class="w-100">
                  <div class="card border-0  position-relative  ">
                    <a href="#" @click.prevent="()=>newProduct(product.id)">
                       <!-- <RouterLink @click.prevent="()=>newProduct(product.id)"> -->
                        <img :src="product.imageUrl" class="card-img-top rounded-0 object-cover " height="300" alt="...">
                      <div class="content position-absolute d-flex justify-content-center align-items-center">
                        <h1>商品資訊</h1>
                      </div>
                    <!-- </RouterLink> -->
                    </a>
                   
                  </div>
                  <div class="card-body pt-0 mb-6 bg-primary ">
                    <h4 class="mb-2 pt-3 text-center">
                        {{ product.title }}
                    </h4>
                    <p class="card-text mb-2 text-center">NT$ {{ product.price }}</p>
                    <a href="#" class="text-nowrap btn btn-dark w-100 py-2 vl-parent position-relative"  
                      @click.prevent="()=>addToCart(product.id)">加入購物車
                      <div class="loader " v-if = "isProductLoad && product.id=== productId">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </a>
                </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
    </section>
</template>