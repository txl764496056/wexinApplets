import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        openid:""
    },
    mutations:{
        setOpenid:function(state,openid){
            state.openid = openid;
        }
    }
});

// export default {
//     store
// }

export default store