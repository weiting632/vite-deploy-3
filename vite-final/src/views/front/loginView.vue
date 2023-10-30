<template>
    
    <div class="col-md-6 mx-auto my-4">
      <form class="form-signin" @submit.prevent="login">
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" v-model="user.username" id="floatingInput"
                    placeholder="name@example.com" required autofocus>
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                  <input type="password" class="form-control" v-model="user.password" id="floatingPassword"
                    placeholder="Password" required>
                  <label for="floatingPassword">Password</label>
                </div>
                <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click ="login">
                  登入
                </button>
    </form>
    </div>
    
</template>
<script>
const { VITE_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const url = `${VITE_URL}v2/admin/signin`
      this.$http.post(url, this.user).then((res) => {
        const { expired, token } = res.data // 利用展開語法取得token ,expired
        document.cookie = `allenToken=${token}; expires=${new Date(expired)}`
        // window.location = './products.html' // 登入成功跳轉到產品頁面
        this.$router.push('/admin/products')
      }).catch(err => {
        console.log(err)
      })
    }

  },
  mounted(){
    
  }
}
</script>