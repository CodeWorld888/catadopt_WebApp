import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import '@/assets/js/flexible'
import '@/assets/css/reset.css' 
import store from './store'
import {Empty, Icon, Dialog, Toast, Radio, RadioGroup, Form, Divider, NavBar, Button, Uploader, Picker, ActionSheet, DatetimePicker, Popup, Field, Collapse, CollapseItem, Area, Search, Cell, CellGroup, Cascader} from 'vant';

Vue.use(Empty)
Vue.use(Icon)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Form)
Vue.use(Divider)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Uploader)
Vue.use(Picker)
Vue.use(ActionSheet)
Vue.use(DatetimePicker)
Vue.use(Popup)
Vue.use(Cascader)
Vue.use(Field)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(VueRouter)
Vue.use(Area)
Vue.use(Search)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
