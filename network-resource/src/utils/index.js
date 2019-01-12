import Vue from 'vue'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 获取openid
 */
function getOpenid(url){
  let _this = this;
  
  let promise = new Promise((success,fail)=>{
      success();
  });
 
  // * 获取微信返回的code
  promise.then((res)=>{
      return new Promise((success,fail)=>{
          wx.login({
              success:(res)=>{
                  let code = res.code;
                  success({code});
              }
          });
      })
  // * 通过code从后台获取openid，并存入本地缓存
  }).then((res)=>{
      return new Promise((success,fail)=>{
          wx.request({
              url,
              data:{
                  js_code:res.code
              },
              success:(res)=>{
                  let openid = res.data.data.openid;
                  // wx.setStorageSync("openid",openid);
                  Vue.prototype.globalData.openid = openid;
              }
          });
      });
  }).catch((err)=>{
      console.log(err);
  }); //---promiseEnd
  console.log("getOpenid 执行");
}


export default {
  formatNumber,
  formatTime,
  getOpenid
}
