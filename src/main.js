import Vue from 'vue'
import App from './App.vue'
import './style.css'

Vue.config.productionTip = false

Vue.component('TreeView', require('./components/TreeView.vue').default)

new Vue({
			render: function (h) {
				return h(App)
			},
		}).$mount('#app')
