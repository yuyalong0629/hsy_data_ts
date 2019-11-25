import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from './defaultSettings'
import VueLazyload from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'
import animate from 'animate.css'

// swiper styles
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueStorage, config.storageOptions)
Vue.use(VueLazyload)
Vue.use(VueClipboard)
Vue.use(animate)
Vue.use(VueAwesomeSwiper /* { default global options } */)
