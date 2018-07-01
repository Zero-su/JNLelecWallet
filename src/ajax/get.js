

/**
 * time : 2018/6/7 
 * author : chenzhihao
 * desc : 对vue-resource的封装
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import { LOADING_SHOW, LOADING_HIDDEN } from 'store/type.js'
import store from 'store/store.js'
Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
	store.commit(LOADING_SHOW)
	next((response) => {
		store.commit(LOADING_HIDDEN)
	})
})

function getResource(name,par){
	return Vue.http.get("http://119.254.102.231:8084/api/" + name, {
	// return Vue.http.get("http://192.168.100.104:7005/api/" + name, {
		params:par
	},{emulateJSON: true});
}
export default getResource