import Vue from 'vue'
import App from './App'
 

Vue.config.productionTip = false
App.mpType = 'app'
 
Vue.prototype.globalData = {}
// Vue.prototype.globalData = getApp().globalData

// API接口地址前半段
Vue.prototype.globalData.httpUrl = "https://api.qhhznt.com/index.php/";
// 用户信息API
Vue.prototype.globalData.userInfoUrl = "miniprogram/index/get_userinfo";
// 登录绑定API
Vue.prototype.globalData.loginUrl = "miniprogram/index/sms_login";
// 获取验证码API
Vue.prototype.globalData.verifyUrl = "miniprogram/index/send_sms";
// 获取openidAPI
Vue.prototype.globalData.openidUrl = "miniprogram/login/get_openid";
// 附近人API
Vue.prototype.globalData.nearbyUrl = "miniprogram/index/nearby_people";
Vue.prototype.globalData.userInfo = {};
Vue.prototype.globalData.openid = "";

const app = new Vue(App)
app.$mount()
