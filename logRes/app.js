//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let _this = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code;
        if(res.code){ //临时登录码，5分钟后过期
          wx.request({
            url: this.globalData.url+'/miniprogram/login/get_openid',
            data:{
              js_code:code
            },
            success:function(res){
              if(res.data==200){
                _this.globalData.openid = res.data.data.openId;
                wx.setStorageSync("openid", res.data.data.openId);
              }
            }
          })
        }
      }
    });

    // 获取用户信息-------
    // 1、用户已经授权，即不是第一进入小程序的时候，
    // 2、在第一进入程序还未获得授权，提示用户授权
    // 3、在用户在第一进入同意并授权之后，再进入小程序，就不会提示用户授权，直接在这里就能获取用户微信信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              console.log("app.js获取用户信息",res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  globalData: {
    userInfo: null,
    // doubanUrl:"https://douban.uieee.com",
    url:'https://api.qhhznt.com/index.php',
    openid:''
  }
})