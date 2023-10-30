// global-components.js
import { createApp } from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css' // 引入样式

const app = createApp({})

app.use(Loading, {
  // 可以根据需要进行配置
  // 例如：color, width, height, canCancel, onCancel, etc.
})

export default app
