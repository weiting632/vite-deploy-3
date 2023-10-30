import{S as l}from"./sweetalert2.all-51399132.js";import{H as r,I as e}from"./index-6b8b058e.js";const{VITE_URL:s,VITE_PATH:i}={VITE_URL:"https://vue3-course-api.hexschool.io/",VITE_PATH:"tomyalan978",BASE_URL:"/vite-deploy-3",MODE:"production",DEV:!1,PROD:!0,SSR:!1},h=r("cart",{state:()=>({carts:[],total:0,final_total:0,qty:1,loadingItem:"",cartNum:0,loadingShow:!1,productId:null,isProductLoad:!1}),actions:{getCart(){e.get(`${s}/v2/api/${i}/cart`).then(t=>{console.log(t),this.carts=t.data.data.carts,this.total=t.data.data.total,this.final_total=t.data.data.final_total,this.cartNum=this.carts.reduce(function(a,o){return a+o.qty},0),console.log(this.cartNum)})},addToCart(t,a=1){this.isProductLoad=!0,this.productId=t;const o={data:{product_id:t,qty:a}};e.post(`${s}/v2/api/${i}/cart`,o).then(d=>{console.log(d),this.getCart(),this.isProductLoad=!1,this.productId=null,l.fire({position:"top-end",title:"成功加入購物車",showConfirmButton:!1,timer:1500,customClass:{popup:"small-swal2-popup",title:"small-swal2-title"}})})},detailProductAddToCart(t,a=1){this.loadingShow=!0,this.productId=t;const o={data:{product_id:t,qty:a}};e.post(`${s}/v2/api/${i}/cart`,o).then(d=>{console.log(d),this.getCart(),this.loadingShow=!1,this.productId=null,l.fire({position:"top-end",title:"成功加入購物車",showConfirmButton:!1,timer:1500,customClass:{popup:"small-swal2-popup",title:"small-swal2-title"}})})},adjustmentTicket(t,a){const o={product_id:a.product.id,qty:a.qty};t==="+"?(o.qty++,this.updateCartItem(o,a.id)):a.qty===1&&a.qty<2?this.deleteItem(a):t==="-"&&(o.qty--,this.updateCartItem(o,a.id))},updateCartItem(t,a){this.loadingShow=!0,this.loadingItem=a.id,e.put(`${s}/v2/api/${i}/cart/${a}`,{data:t}).then(o=>{console.log("更新購物車",o.data),this.getCart(),this.loadingShow=!1,this.loadingItem=""})},changeCartItem(t){this.loadingItem=t.id;const a={product_id:t.product.id,qty:t.qty};e.put(`${s}/v2/api/${i}/cart/${t.id}`,{data:a}).then(o=>{console.log("滾動更新購物車",o.data),this.getCart(),this.loadingItem=""})},deleteItem(t){this.loadingShow=!0,this.loadingItem=t.id,e.delete(`${s}/v2/api/${i}/cart/${t.id}`).then(a=>{console.log("刪除購物車",a.data),this.loadingItem="",this.getCart(),this.loadingShow=!1})},deleteCartsItem(){l.fire({title:"確認刪除購物車全品項",icon:"warning",width:"500px",height:"300px",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"取消",confirmButtonText:"確認",customClass:{popup:"big-small-swal2-popup"}}).then(t=>{t.isConfirmed&&(e.delete(`${s}/v2/api/${i}/carts`).then(a=>{console.log(a),this.getCart()}).catch(a=>{alert(a.response.data.message)}),l.fire("Deleted!","Your file has been deleted.","success"))})}},getters:{cartList({total:t}){return{a:t}}}});export{h as c};
