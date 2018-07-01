import Vue from 'vue'
import App from './App.vue'
import router from "router/router.js"
import store from "store/store.js"
import "common/flexible.js";	//淘宝适配js
import "common/flexible.css" //淘宝适配css
import "common/common.css";	//去除默认样式文件

// 输入框数字验证
Vue.prototype.inputValida=function(val){
	var reg=/^[0123456789.]/
	if(val){
		var arr=val.split("");
		var str="";
		arr.forEach(function(item,index){
			if(reg.test(item)){
				str+=item;
			}
		})
		return str;
	}else{
		return "";
	}
}

new Vue({
	  el: '#app',
	  router,
	  store,
	  render: h => h(App)
	})

// let vueObj;

// document.addEventListener("deviceready",function(){
	
// 	document.addEventListener("backbutton",onBackKeyDown,false);
// 	vueObj=new Vue({
// 	  el: '#app',
// 	  router,
// 	  store,
// 	  render: h => h(App)
// 	})
// 	window.navigator.splashscreen.hide()
// },false)

// //安卓物理返回按钮
// function onBackKeyDown() {  
// 	var url=window.location.href;
// 	vueObj.$children[0].exitFlag=true;
// 	document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键  
// 	document.addEventListener("backbutton", exitApp, false);//绑定退出事件  
// 	// 2秒后重新注册  
// 	setTimeout(function(){
// 		vueObj.$children[0].exitFlag=false;
// 	},2000)
// 	var intervalID = window.setInterval(function() {
// 	    	window.clearInterval(intervalID);  
// 	        document.removeEventListener("backbutton", exitApp, false); // 注销返回键  
// 	        document.addEventListener("backbutton", onBackKeyDown, false); // 返回键  
// 	    }, 2000); 
     
// }  
// //退出app
// function exitApp(){  
//     navigator.app.exitApp();  
// } 

