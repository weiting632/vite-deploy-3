<script>
  import { RouterView } from 'vue-router'
  import { RouterLink } from 'vue-router';
  const { VITE_URL } = import.meta.env
  export default {
    components: {
      RouterView,
      RouterLink
    },
    methods: {
      logout () {
        document.cookie = `allenToken=; expires=${new Date()};`
        this.$router.push('/login')
      },
      checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)allenToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      const url = `${VITE_URL}v2/api/user/check`
      this.$http.post(url).then((res) => {
        console.log(token)
        if (!res.data.success) {
          this.$router.push('login')
        }
      }).catch(err => {
        console.dir(err)
        this.$router.push('/login')
      })
    }

     
    },
    mounted () {
        // this.logout()
        this.checkLogin()
        const toggleMenuBtn = document.querySelector('#toggle-btn');
        const body = document.querySelector('body');
        toggleMenuBtn.addEventListener('click',(evt)=>{
            evt.preventDefault();
            body.classList.toggle('sidebar-toggled');
        })
    
     
    }
  }
  </script>




<template >
    <div class="d-flex">
        <aside class="sidebar vh-100 border-end pt-3 d-flex bg-white flex-column" >
            <div class="px-4">
                <strong>星杯冰淇淋</strong>-後臺管理
            </div>
            <div class="overflow-auto mt-3">
              <div>
                  <RouterLink href="#" class="sidebar-link " to='/'>
                        <div class="px-4">
                            首頁
                        </div>
                    </RouterLink>
                </div>
                <div>
                  <RouterLink href="#" class="sidebar-link " to="/admin/products">
                        <div class="px-4">
                            產品管理
                        </div>
                    </RouterLink>
                </div>
                <div>
                    <RouterLink href="#" class="sidebar-link " to="/admin/Orders">
                        <div class="px-4">
                            訂單管理
                        </div>
                    </RouterLink>
                </div>
            </div>
            
            <a href="#" class="mt-auto sidebar-link" @click = "logout()">
                <div class="px-4">
                    登出
                </div>
            </a>
        </aside>
        <main class="main">
            <div class="bg-white w-100 border-bottom sticky-top">
                <a href="#" class="d-inline-block py-3 px-4 border-end" id="toggle-btn">
                    <i class="bi bi-arrows-angle-expand"></i>
                </a>
                
            </div>
            <RouterView></RouterView>
        </main>
    </div>
    
    
  </template>
  
