<!-- eslint-disable no-unused-vars -->
<script>
// import { mapState,mapActions } from 'pinia';
// import {  RouterLink } from 'vue-router';
// const {VITE_URL, VITE_PATH} = import.meta.env;
// import cartStore from '../stores/cart';
const {VITE_URL, VITE_PATH} = import.meta.env;
import { ref, onMounted } from 'vue';
let orderModal = {

}
export default {
   data(){
        return{
            orders:[],
            product:{},
            products:[],
            final_total:0,
            qty:0,
            user:{},
            id:"",
            isChecked: false,
            order_id:"",
            selectedOrders: [], 
            
            
        }
    },
    methods:{
      getOrderAll(){
         this.$http(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders`).then( res =>{
            console.log(res)
            this.orders = res.data.orders
           
            
         }
         )
      },
      getOrder(id){
            this.$http(`${VITE_URL}/v2/api/${VITE_PATH}/order/${id}`).then(res =>{
                this.products = res.data.order.products
                this.user = this.user = res.data.order.user
                console.log('products:',this.products)
            }
        )
      },
      delteOrder(id){
        this.id = id
        this.$http.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${id}`).then(res=>{
          console.log(res)
          this.getOrderAll()
        })
      },
      openModal(id){
        this.getOrder(id)
        orderModal.show(id)
      },
      handleCheckboxChange(id) {
        this.order_id = id
        this.isChecked = !this.isChecked
      },
      toggleCheckboxStyle(orderId) {
        
        const isSelected = this.selectedOrders.includes(orderId);

       
        const checkbox = document.querySelector(`input[value="${orderId}"]`);
        if (isSelected) {
            checkbox.classList.add('selected-checkbox');
        } else {
            checkbox.classList.remove('selected-checkbox');
        }
      }
    },
    mounted(){
      const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('allenToken='))
        ?.split('=')[1];
        this.$http.defaults.headers.common['Authorization'] = cookieValue;
        

        this.getOrderAll()
         // eslint-disable-next-line no-undef
        orderModal = new bootstrap.Modal(document.getElementById('orderModal'),{
          keyboard: false
        })
      
    }
}
   

</script>




<template>
 
    <div class="container">
      <div class="card-body p-0 mt-4">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead class="bg-light">
                  <tr class="align-middle">
                      <th scope="col" class=" py-3">配送狀態</th>
                      <th scope="col" class=" py-3">訂單編號</th>
                      <th scope="col">Email</th>
                      <th scope="col">用戶姓名</th>
                      <th scope="col">付款狀態</th>
                      <th scope="col">購滿金額</th>
                      <th scope="col" class="pe-4">編輯</th>
                  </tr>
                </thead>
                <tbody class="text-nowrap">
                  <tr class="clickable" v-for="(order) in orders" :key="order.id"    :class="{ 'selected-checkbox': selectedOrders.includes(order.id) }" >
                    <td scope="row" class="ps-4" >
                      <input type="checkbox"   :value="order.id" v-model="selectedOrders"  @click="toggleCheckboxStyle(order.id)" >
                    </td>
                    <td scope="row" >{{ order.create_at }}</td>
                    <td>{{ order.user.email }}</td>
                    <td>{{ order.user.name }}</td>
                    <td >尚未付款</td>
                    <td class="text-start">900</td>
                    <td class="pe-4">
                      <div class="btn-group">
                            <a href="#" class="btn btn-sm btn-outline-dark" @click="openModal(order.id)">
                              編輯 
                              <i class="bi bi-pen"></i>
                            </a>
                            <a href="#" class="btn btn-sm btn-outline-danger text-danger" @click="delteOrder(order.id)">
                              刪除訂單
                            </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
      </div> 
    </div>
    <!-- modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table table-borderless mb-5" >
                        <thead class="bg-main-light">
                            <tr>
                                <th class=""> 品名 </th>
                                <th class="text-start"> 數量 </th>
                                <th class="text-right"> 總價 </th>
                            </tr>
                        </thead>
                        <tbody v-for="product in products " :key="product.id" >
                            <tr >
                               
                                <td class="font-weight-bolder">{{ product.product.title }}</td>
                                <td class="text-start">{{ product.qty }}</td>
                                <td class="text-right">{{ product.product.price }}</td>
                            </tr>
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" class="text-right"> 總計 </td>
                                <td class="text-right"> {{  }}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <table class="table mb-5">
                        <tbody>
                            <tr>
                                <th width="130"> Email </th>
                                <td>tt1235478@gmail.com</td>
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
                                    <td class="text-danger"> {{ }} </td>
                                </tr>
                            </tbody>
                    </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            
          </div>
    </div>
  </div>
</div>


</template>
<style>
 .selected-checkbox {
      background-color: rgba(0, 0, 0, 0.5); 
  }
</style>
