import Swal from 'sweetalert2'
import { defineStore } from 'pinia'
import axios from 'axios';

const {VITE_URL, VITE_PATH} = import.meta.env
//目前這個環境不屬於vue
const cartStore = defineStore('cart',{
  state: () => {
    return {
      carts:[],
      total:0,
      final_total: 0,
      qty:1,
      loadingItem: '',
      cartNum:0,
      loadingShow: false,
      productId: null,
      isProductLoad: false
      
    }
  },
  // actions 概念同「methods」
  actions: {
     getCart(){
        //  this.loadingShow = true
         axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`)
        .then((res)=>{
          console.log(res);
          // this.loadingShow = false
          this.carts = res.data.data.carts;
          this.total = res.data.data.total;
          this.final_total = res.data.data.final_total;
          this.cartNum = this.carts.reduce(function(accumulator,currentValue ){
            return accumulator + currentValue.qty
          },0)
          console.log(this.cartNum);
        })
        
    },
    addToCart(product_id, qty=1){
      this.isProductLoad =true
      this.productId = product_id
      const data = {
        data: {
          product_id,
          qty,
        }
      }
      axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`,data)
      .then(res=>{
        console.log(res);
        this.getCart()
        this.isProductLoad = false
        this.productId = null
        Swal.fire({
          position: 'top-end',
          title: '成功加入購物車',
          showConfirmButton: false,
          timer: 1500,
          customClass:{
            popup:'small-swal2-popup',
            title:'small-swal2-title'
          }
        }) 
      })
    },
    detailProductAddToCart(product_id, qty=1){
      this.loadingShow = true
      this.productId = product_id
      const data = {
        data: {
          product_id,
          qty,
        }
      }
      axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`,data)
      .then(res=>{
        console.log(res);
        this.getCart()
        this.loadingShow = false
        this.productId = null
        Swal.fire({
          position: 'top-end',
          title: '成功加入購物車',
          showConfirmButton: false,
          timer: 1500,
          customClass:{
            popup:'small-swal2-popup',
            title:'small-swal2-title'
          }
        }) 
      })
    },
    //購物車數量更新
    adjustmentTicket(state,item){
      const data = {
        product_id : item.product.id,
        qty:item.qty
      }
      if(state === '+'){
        data.qty++
        this.updateCartItem(data ,item.id)
      }else if(item.qty===1 && item.qty<2){
        this.deleteItem(item) 
      }else if(state === '-'){
          data.qty-- 
          this.updateCartItem(data ,item.id)
      }
    },
    updateCartItem(data,cartId){ //購物車的id 產品的id
      this.loadingShow = true
      this.loadingItem = cartId.id;
      axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${cartId}`, { data })
      .then((res)=>{
          console.log('更新購物車',res.data);
          this.getCart();
          this.loadingShow = false
          this.loadingItem ="";
          
      })
    },
    changeCartItem(item){
      this.loadingItem = item.id;
      const data = {
        product_id: item.product.id,
        qty:item.qty
      }
      axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`,{data}).then((res)=>{
        console.log('滾動更新購物車',res.data);
        
        this.getCart();
        
        this.loadingItem ='';
      })
    },
    deleteItem(item){
      this.loadingShow = true
      this.loadingItem = item.id;
      axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`).then((res) => {
          console.log('刪除購物車', res.data);
          this.loadingItem ="";
          this.getCart();
          this.loadingShow = false
      });
    },
    deleteCartsItem(){
      Swal.fire({
        title: '確認刪除購物車全品項',
        icon: 'warning',
        width: '500px', // 設置寬度
        height: '300px',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'取消',
        confirmButtonText: '確認',
        customClass:{
          popup:'big-small-swal2-popup'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/carts`).then((res)=>{
            console.log(res)
            this.getCart();
        }).catch((err) => {
          alert(err.response.data.message);
        });
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
         
        } 
      
    
    
  
  },
  // getters 概念同「computed」
  getters: {
    cartList({total}){
        let a = total
        return {a}
    }
  },
  
})

export default cartStore;