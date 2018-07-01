

/**
 * time : 2018/6/7
 * author : chenzhihao
 * desc : 对vue-resource的封装
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)


function getResource(name,par){
	return Vue.http.post("http://119.254.102.231:8084/api/" + name,par,{emulateJSON: true});
	// return Vue.http.post("http://192.168.100.104:7005/api/" + name,par,{emulateJSON: true});
}
export default getResource