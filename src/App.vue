<template>
    <div id="app">
        <!-- 路由 -->
        <router-view></router-view>
        <!-- 底部导航 -->
        <vfooter v-if="isShowFooter"></vfooter>
        <!-- 加载动画 -->
        <div class="loadingBox" v-show="loadingShow">
            <i></i>
        </div>
        <!-- 再点一次退出app -->
        <div class="exit" v-if="exitFlag">
            再按一次返回键退出程序
        </div>
    </div>
</template>

<script>
/*
    time : 2018-6-11
    author : chenzhihao
    desc : 架构页面
*/
import vfooter from "components/footer/footer.vue"
import get from 'ajax/get.js'
import {mapState} from 'vuex'
export default {
    name: 'app',
    data () {
        return {
            exitFlag: false,
            isShowFooter: true
        }
    },
    components: {
        vfooter
    },
    computed: {
        ...mapState({
            loadingShow: state=>state.loading.loadingShow
        })
    },
    watch: {
        //路由监控，控制footer组件显示隐藏
        $route(){
            let path = this.$route.path;
            if(path == "/login" || path == "/register" || path == "/entryPage")
                this.isShowFooter = false;
            else
                this.isShowFooter = true;
        }
    },
    created(){
      
    },
    mounted(){
        let path = this.$route.path;
        if(path == "/login" || path == "/register" || path == "/entryPage")
            this.isShowFooter = false;
        else
            this.isShowFooter = true;
    }
  
}
</script>

<style lang="scss" scoped>
    #app{
        width: 100%;
        height: 100%;
        position: relative;
        .loadingBox{
            width: 106px;
            height: 106px;
            background: rgba(0,0,0,0.7);
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -53px;
            margin-top: -53px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                display: block;
                width: 34px;
                height: 33px;
                background: url(./pages/images/loading/loading.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                animation:mymove 1.5s linear infinite;
            }
        }
        .exit{
            z-index:9999;
            position:fixed;
            width:380px;
            height:60px;
            display:flex;
            left:50%;
            bottom:90px;
            align-items:center;
            justify-content:center;
            font-size:28px;
            border-radius:60px;
            background:rgba(0,0,0,0.4);
            color:#ffffff;
            margin-left:-190px;
        }
    }

    @keyframes mymove{
        0% {transform:rotate(0deg)}
        100% {transform:rotate(360deg)}
    }
</style>
