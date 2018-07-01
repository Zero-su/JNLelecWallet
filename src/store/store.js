
/*
    time : 2018-6-11
    author : chenzhihao
    desc : vuex配置
*/

import Vue from 'vue'
import Vuex from 'vuex'
import loading from "components/loading/loading.store.js"

Vue.use(Vuex)

export default new Vuex.Store({
    modules : {
    	loading: loading,
    }
})