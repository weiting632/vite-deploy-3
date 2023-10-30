<script >
import { RouterLink } from 'vue-router';
import { Swiper,SwiperSlide } from 'swiper/vue'
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cart.js';
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import { RouterLink } from 'vue-router';
const {VITE_URL, VITE_PATH} = import.meta.env;

export default{
    data(){
        return{
            
            products:[],
            
        }
    },
    methods:{
        getProducts(){
              const loader = this.$loading.show({
              // Optional parameters
              container: this.fullPage ? null : this.$refs.formContainer,
              canCancel: true,
              onCancel: this.onCancel
              })
            this.$http(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
            .then(res=>{
                this.products =res.data.products
                loader.hide()
            })
        },
        ...mapActions(cartStore,['getCart','addToCart','deleteItem','updateCartItem','deleteCartsItem']),
    },
    computed:{
      ...mapState(cartStore,['productId','isProductLoad'])
    },
    components:{
      RouterLink,
      Swiper,
      SwiperSlide
    },setup () {
      return {
      modules: [Autoplay]
      }
    },  
    mounted () {
      AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 180, // offset (in px) from the original trigger point
  delay: 150, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
        this.getProducts()
      
    }
}

</script>


<template>
     <div class="">
        <div class="banner  d-flex flex-column fw-bold  align-items-center justify-content-center img-fluid  " style="background-image: url(https://images.unsplash.com/photo-1627373717559-17b8b84b2c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80);" >
            <h1 class=" text-white ">歡聚時刻 首選星杯</h1>
            <RouterLink class="btn btn-to-shop btn-outline bg-primary text-white px-7 mt-4" to="/products">來去看看</RouterLink>
        </div>
        
     </div>
      <!-- 左右卡片 -->
      <div class="">
        <div class="container " >
        <h2 class="text-center p-5 font-weight-normal">聚會首選</h2>
        <section class="py-5 text-center">
            <div class="container">
              <div class="row  align-items-strech gx-lg-5 align-items-center flex-row-reverse " data-aos="fade-up">
                <div class="col-lg-6">
                 
                  <h4>
                    朋友聚會不知道要吃什麼嗎?<br><br><br><br>星杯冰淇淋是您最佳選擇
                  </h4>
               
                </div>
                <div class="col-lg-6 mb-lg-0 mb-4 " >
                  <img src="https://media.istockphoto.com/id/1325108405/photo/close-up-of-scooping-ice-cream-in-gelato-cafe.jpg?s=612x612&w=0&k=20&c=pYpyUZHpoB8jPmYWE7y3MrrF-HAmcWllsJomik8fBeo=" class="img-fluid" alt="" />
                </div>
              </div>
            </div>
            <div class="row gx-lg-5 align-items-center" data-aos="fade-up">
                <div class="col-lg-6">
                   
                    <h4>
                      還在為送禮要送什麼煩惱嗎?<br><br><br><br>選擇星杯冰淇淋讓您大方不落伍
                    </h4>
                  
                  </div>
                  <div class="col-lg-6 mb-lg-0 mb-4">
                    <img src="https://media.istockphoto.com/id/1395380883/photo/caramel-ice-cream-with-topping.jpg?s=612x612&w=0&k=20&c=dGEeO8bOMDk4xfqHmb2yGmOXkgeEftbzAvf1182PY-s=" class="img-fluid" alt="" />
                  </div>
            </div>
          </section>
      </div>
    </div>
     
      <!-- 三欄卡片 -->
      <section class="py-5" data-aos="fade-up">
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
                    <RouterLink :to="`/products/${product.id}`">
                      <img :src="product.imageUrl" class="card-img-top rounded-0 object-cover " height="300" alt="...">
                      <div class="content position-absolute d-flex justify-content-center align-items-center">
                        <h1>商品資訊</h1>
                      </div>
                    </RouterLink>
                  </div>
                  <div class="card-body pt-0 mb-6 bg-primary ">
                    <h4 class="mb-2 pt-3 text-center">
                        {{ product.title }}
                    </h4>
                    <p class="card-text mb-2 text-center">NT$ {{ product.price }}</p>
                    <a href="#" class="text-nowrap btn btn-dark w-100 py-2  position-relative"  
                      @click.prevent="()=>addToCart(product.id)">加入購物車
                      <div class="loader " v-if = "isProductLoad && product.id === productId">
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
      <!-- 最新消息 -->
      <!-- <div class="bg-light mt-7">
        <div class="container">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row justify-content-center py-7">
                  <div class="col-md-6 text-center">
                    <h3>Lorem ipsum.</h3>
                    <p class="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                    <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row justify-content-center py-7">
                  <div class="col-md-6 text-center">
                    <h3>Lorem ipsum.</h3>
                    <p class="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                    <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row justify-content-center py-7">
                  <div class="col-md-6 text-center">
                    <h3>Lorem ipsum.</h3>
                    <p class="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                    <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                  </div>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls"  role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div> -->
</template>
<style>




.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}








</style>
