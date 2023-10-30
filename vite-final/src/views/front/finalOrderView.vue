<script>
import Swal from 'sweetalert2'
const {VITE_URL, VITE_PATH} = import.meta.env;
export default{
    data(){
        return{
            order:{},
            products:[],
            final_total:0,
            qty:0,
            user:{},
            is_paid:false,
            is_change: true,
           
            
        }
    },
    components:{
    },
    computed:{
        // ...mapState(cartStore,['carts','final_total'])
    },
    methods:{
        // ...mapActions(cartStore,['getCart','addToCart','deleteItem','updateCartItem','deleteCartsItem']),
        getOrder(){
            const loader = this.$loading.show({
              // Optional parameters
              container: this.fullPage ? null : this.$refs.formContainer,
              canCancel: true,
              onCancel: this.onCancel
            })
            const  {id}  = this.$route.params;
            console.log('id:', id),
            this.$http(`${VITE_URL}/v2/api/${VITE_PATH}/order/${id}`).then(res =>{
                console.log(res)
                loader.hide()
                this.order = res.data.order
                this.is_paid = res.data.order.is_paid
                this.products = res.data.order.products
                this.user = res.data.order.user
                console.log('products:',this.products)
            }
        )
        },
        changeStatus() {  
            this.payTheBill()
            this.is_change = !this.is_change;
            this.getOrder()
           
        },
        payTheBill(){
            const loader = this.$loading.show({
              // Optional parameters
              container: this.fullPage ? null : this.$refs.formContainer,
              canCancel: true,
              onCancel: this.onCancel
            })
            const  {id}  = this.$route.params;
            this.$http.post(`${VITE_URL}/v2/api/${VITE_PATH}/pay/${id}`).then(res=>{
                console.log(res)
                this.is_change = false
                loader.hide()
                Swal.fire({
                    position: 'top',
                    title: '已成功結帳',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass:{
                        popup:'small-swal2-popup',
                        title:'small-swal2-title'
                    }
                })
            })
        },
        backToProduct(){
            const loader = this.$loading.show({
              // Optional parameters
              container: this.fullPage ? null : this.$refs.formContainer,
              canCancel: true,
              onCancel: this.onCancel
            })
            this.$router.push({path:`/products`})
            loader.hide()
        },
       
       

    },
    watch(){

    },
    mounted(){
        // this.getCart()
        this.getOrder()
    }
}
</script>



<template>
    
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form  action="">
                    <h2 class="text-center font-weight-bolder mb-5">  </h2>
                    <table class="table table-borderless mb-5" >
                        <thead class="bg-main-light">
                            <tr>
                                <th class=""> 品名 </th>
                                <th class="text-start"> 數量 </th>
                                <th class="text-right"> 總價 </th>
                            </tr>
                        </thead>
                        <tbody v-for="(item) in products " :key="item.id">
                            <tr>
                                <td class="font-weight-bolder">{{ item.product.title }}</td>
                                <td class="text-start">{{ item.qty }}</td>
                                <td class="text-right">{{ item.product.price }}</td>
                            </tr>
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" class="text-right"> 總計 </td>
                                <td class="text-right"> {{ order.total }}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <table class="table mb-5">
                        <tbody>
                            <tr>
                                <th width="130"> Email </th>
                                <td>{{ user.email }}</td>
                            </tr>
                            <tr>
                                <th>姓名</th>
                                <td>{{ user.name }}</td>
                            </tr>
                            <tr>
                                <th>收件人電話</th>
                                <td>{{ user.tel }}</td>
                            </tr>
                            <tr>
                                <th>收件人地址</th>
                                <td>{{ user.address }}</td>
                            </tr>
                                <tr>
                                    <th>付款狀態</th>
                                    <td v-if="is_paid === false" class="text-danger"> 未付款 </td>
                                    <td v-else class="text-primary"> 已付款 </td>
                                </tr>
                            </tbody>
                    </table>
                        <button v-if="is_change === true" class="btn btn-primary mb-5 w-100 " @click="changeStatus">確認結帳</button>
                        <button v-else class="btn btn-primary mb-5 w-100" @click="backToProduct()">繼續購物</button>
                </form>
            </div>
        </div>
    </div>
</template>