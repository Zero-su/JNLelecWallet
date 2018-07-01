export default{
    state: {
        loadingShow: false
    },
    mutations: {
        ['LOADING_SHOW'](state){
            state.loadingShow = true
        },
        ['LOADING_HIDDEN'](state){
            state.loadingShow = false
        }
    }
}