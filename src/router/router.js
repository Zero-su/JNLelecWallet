
/*
    time : 2018-6-11
    author : chenzhihao
    desc : 路由配置
*/



import vue from 'vue'
import vueRouter from 'vue-router'
import login from "pages/login/login.vue"
import register from "pages/register/register.vue"
import entryPage from "pages/entryPage/entryPage.vue"

vue.use(vueRouter)

const vuerouter = new vueRouter({
    routes: [{
        path: "/",
        redirect: "/entryPage",
        component: entryPage
    },{
        path: "/entryPage",
        component: entryPage
    },{
        path: "/login",
        component: login
    },{
        path: "/register",
        component: register 
    }]
})

//判断是否登录，登陆后才能进入app
vuerouter.beforeEach(function (to, from, next) {
    //第一次登录才出现进入页
    if(to.path=="/entryPage"){
        if(localStorage.getItem("status"))
            next("/login");
        else{
            localStorage.setItem("status","true")
            next();
        }  
    }
    // 判断是否登录
    if(!sessionStorage.getItem("userInfo")){
        if(to.path=="/login" || to.path=="/register" || to.path=="/entryPage")
            next();
        else
            next("/login");
    }
    else
        next();
    
})
export default vuerouter