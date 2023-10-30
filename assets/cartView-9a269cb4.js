import{_ as h,a as p,m as b,b as m,r as u,o as n,c as a,e as t,f as g,F as c,h as i,t as l,d as f,w,E as v,g as C,G as y,k}from"./index-6b8b058e.js";import{c as r}from"./cart-2d51eb96.js";import"./sweetalert2.all-51399132.js";const x={components:{RouterLink:p},computed:{...b(r,["carts","final_total"])},methods:{...m(r,["getCart","addToCart","deleteItem","updateCartItem","changeCartItem","deleteCartsItem"]),loaderCartview(){const s=this.$loading.show({container:this.fullPage?null:this.$refs.formContainer,canCancel:!0,onCancel:this.onCancel});this.getCart(),s.hide()}},mounted(){this.loaderCartview()}},I={class:""},$={class:"container"},V={class:"row"},L={class:"d-flex justify-content-between my-4"},N=t("h3",{class:"mt-3 mb-4"},"購物車",-1),S={key:0,class:"col-md-8"},j=t("h2",null,"購物車沒有產品",-1),B=[j],R={key:1,class:"col-md-8"},T={class:"table text-nowrap"},U={scope:"row",class:"border-0 px-0 font-weight-normal py-4"},q=["src"],D={class:"mb-0 fw-bold ms-3 d-inline-block"},E={class:"border-0 align-middle",style:{"max-width":"160px"}},F={class:"input-group pe-5"},M=t("div",{class:"input-group-prepend"},null,-1),z=["onUpdate:modelValue","disabled","onChange"],A=["value"],G=t("div",{class:"input-group-append"},null,-1),P={class:"border-0 align-middle"},H={class:"mb-0 ms-auto"},J={class:"border-0 align-middle"},K=["onClick","disabled"],O=t("i",{class:"bi bi-x-lg"},null,-1),Q=[O],W={class:"col-md-4"},X={class:"border p-4 mb-4 bg-light"},Y=t("h4",{class:"fw-bold mb-4"},"訂單摘要",-1),Z={class:"table text-muted border-bottom"},tt=t("th",{scope:"row",class:"border-0 px-0 pt-4 font-weight-normal"},"小計",-1),st={class:"text-end border-0 px-0 pt-4"},et=t("tr",null,[t("th",{scope:"row",class:"border-0 px-0 pt-0 pb-4 font-weight-normal"},"運費"),t("td",{class:"text-end border-0 px-0 pt-0 pb-4"},"NT$0")],-1),ot={class:"d-flex justify-content-between mt-4"},nt=t("p",{class:"mb-0 h4 fw-bold"},"總計",-1),at={class:"mb-0 h4 fw-bold"};function lt(s,d,dt,ct,it,rt){const _=u("RouterLink");return n(),a("div",I,[t("div",$,[t("div",V,[t("div",L,[N,t("button",{onClick:d[0]||(d[0]=g(()=>s.deleteCartsItem(),["prevent"])),class:"mt-3 mb-4 bg-success text-white"},"清除購物車")]),s.carts.length===0?(n(),a("div",S,B)):(n(),a("div",R,[t("table",T,[t("tbody",null,[(n(!0),a(c,null,i(s.carts,e=>(n(),a("tr",{key:e.id,class:"border-bottom border-top"},[t("th",U,[t("img",{src:e.product.imageUrl,style:{width:"72px",height:"72px","object-fit":"cover"}},null,8,q),t("p",D,l(e.product.title),1)]),t("td",E,[t("div",F,[M,C(t("select",{name:"",id:"",class:"form-control","onUpdate:modelValue":o=>e.qty=o,disabled:e.id===s.loadingItem,onChange:o=>s.changeCartItem(e)},[(n(),a(c,null,i(20,o=>t("option",{value:o,key:o+"12345678"},l(o),9,A)),64))],40,z),[[y,e.qty]]),G])]),t("td",P,[t("p",H,l(s.carts.final_total),1)]),t("td",J,[t("button",{type:"button",class:"btn btn-outline-success btn-sm",onClick:o=>s.deleteItem(e),disabled:e.id===s.loadingItem},Q,8,K)])]))),128))])])])),t("div",W,[t("div",X,[Y,t("table",Z,[t("tbody",null,[t("tr",null,[tt,t("td",st,l(s.final_total),1)]),et])]),t("div",ot,[nt,t("p",at,l(s.final_total),1)]),f(_,{class:v(["btn btn-outline-success btn-lg w-100 my-4",{disabled:s.carts.length===0}]),to:"/form"},{default:w(()=>[k("下一頁")]),_:1},8,["class"])])])])])])}const bt=h(x,[["render",lt]]);export{bt as default};
