<script>
import { mapState,mapActions } from 'pinia';
import Swal from 'sweetalert2'
import cartStore from '@/stores/cart.js';
const {VITE_URL, VITE_PATH} = import.meta.env;

export default{
    data(){
        return{
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
            message: '',
      },
        }
    },
    components:{
     
    },
    computed:{
        ...mapState(cartStore,['carts','final_total'])
    },
    methods:{
        ...mapActions(cartStore,['getCart','addToCart','deleteItem','updateCartItem','deleteCartsItem']),
      createOrder() {
      const loader = this.$loading.show({
              // Optional parameters
              container: this.fullPage ? null : this.$refs.formContainer,
              canCancel: true,
              onCancel: this.onCancel
      })
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then((response) => {
        const id = response.data.orderId
        console.log('id:',id)
        loader.hide()
        Swal.fire({
          position: 'top',
          title: '訂單已送出',
          showConfirmButton: false,
          timer: 1500,
          customClass:{
            popup:'small-swal2-popup',
            title:'small-swal2-title'
          }
        })
        this.$refs.form.resetForm();
        this.$router.push({ path: `form/${id}` })
        this.getCart();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    }  
    },
    mounted(){
        
    }
}
</script>
<template>
    <div class="container">
      <div class="row ">
        <div class="col-md-8" >
                <h2 class="fs-4 my-5">填寫訂購資訊</h2>
                <v-form ref="form" v-slot="{ errors }" @submit="createOrder">
                  <div class="mb-3 ">
                    <label for="email" class="form-label">Email</label>
                    <v-field id="email" name="email" type="email" class="form-control"
                      :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
                      v-model="form.user.email"></v-field>
                    <error-message name="email" class="invalid-feedback"></error-message>
                  </div>

                  <div class="mb-3">
                    <label for="name" class="form-label">收件人姓名</label>
                    <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                      placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
                    <error-message name="姓名" class="invalid-feedback"></error-message>
                  </div>

                  <div class="mb-3">
                    <label for="tel" class="form-label">收件人電話</label>
                    <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                      placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel"></v-field>
                    <error-message name="電話" class="invalid-feedback"></error-message>
                  </div>

                  <div class="mb-3">
                    <label for="address" class="form-label">收件人地址</label>
                    <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                      placeholder="請輸入地址" rules="required" v-model="form.user.address"></v-field>
                    <error-message name="地址" class="invalid-feedback"></error-message>
                  </div>

                  <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                  </div>
                  <div class="text-center mb-4">
                    <button type="submit" class="btn btn-danger btn-lg" >送出訂單</button>
                  </div>
                </v-form>
            </div>
            <div class="col-md-4   mb-5  mt-md-17 mt-sm-5 d-none d-md-block ">
              <div class="card bg-light"   >
                <div class="card-header  text-center text-white bg-success mb-2">
                  訂單摘要
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="px-2">小計</span>
                  <span class="px-2">{{ final_total }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="px-2">運費</span>
                  <span class="px-2">$0</span>
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <span class="px-2">總計</span>
                  <span class="px-2">{{ final_total }}</span>
                </div>
              </div>
            <div class="card mt-6 "   >
              <div class="card-header text-center text-white bg-success" >
                購物清單
              </div>
              <div class="card-body bg-light" >
                <table>
                   <tbody >
                     <tr class="border-bottom " v-for="item in carts" :key="item.id">
                      <div class="d-flex  ">
                        <td class="pb-2">
                        <div class="cart-img w-100">
                            <img :src="item.product.imageUrl"  style="width: 72px; height: 72px; object-fit: cover;">
                        </div>
                       </td>
                       <td class="pb-2">
                          <span class="px-4 text-nowrap">{{ item.product.title }}</span>
                          <br>
                          <small class="px-4">{{ item.qty }} 個</small>
                          <br>
                          <span class="px-4">NT${{ item.total }}</span>
                       </td>
                      </div>
                     </tr>
                   </tbody>
                </table>
              </div>
            </div>  
            </div>
      </div>
    </div>
            
           
           
             
           
</template>