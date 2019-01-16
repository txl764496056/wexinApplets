import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{ 
        openid:""
    },
    userInfo:{},//用户信息
    nearbyList:[], //附近人列表
    mutations:{
        setOpenid:function(state,openid){
            state.openid = openid;
        },
        setUserInfo:function(state,userInfo){
            state.userInfo = userInfo;
        },
        nearbyList:function(state,nearbyList){
            state.nearbyList = nearbyList;
        }
    }
});

// export default {
//     store
// }

export default store