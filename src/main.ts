import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueAxios } from './utils/request'
import './config/index'
import './utils/filter'

import {
  Avatar,
  Anchor,
  Alert,
  Button,
  BackTop,
  Badge,
  Breadcrumb,
  Col,
  Collapse,
  Comment,
  Card,
  Divider,
  Dropdown,
  DatePicker,
  Empty,
  Form,
  Input,
  Icon,
  List,
  Layout,
  LocaleProvider,
  Menu,
  Modal,
  message,
  Upload,
  Popover,
  Pagination,
  Progress,
  Row,
  Rate,
  Radio,
  Select,
  Skeleton,
  Spin,
  Steps,
  Table,
  Timeline,
  Tabs,
  Tag,
  Tooltip,
  TimePicker
} from 'ant-design-vue'

Vue.config.productionTip = false
Vue.use(VueAxios)
Vue.use(Avatar)
Vue.use(Alert)
Vue.use(Anchor)
Vue.use(BackTop)
Vue.use(Badge)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(Col)
Vue.use(Comment)
Vue.use(Collapse)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Dropdown)
Vue.use(Dropdown)
Vue.use(DatePicker)
Vue.use(Empty)
Vue.use(Form)
Vue.use(Icon)
Vue.use(List)
Vue.use(Layout)
Vue.use(LocaleProvider)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Upload)
Vue.use(Popover)
Vue.use(Pagination)
Vue.use(Progress)
Vue.use(Row)
Vue.use(Rate)
Vue.use(Radio)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Timeline)
Vue.use(Spin)
Vue.use(Steps)
Vue.use(Select)
Vue.use(Skeleton)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(TimePicker)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$warning = Modal.warning

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
