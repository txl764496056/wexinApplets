//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let flag = 1;
    let promise = new Promise((success,fail)=>{
      success();
    });
    promise.then((res)=>{
      // 登录
      return new Promise((success,fail)=>{
          wx.login({ //得到code
            success:res=>{
              let code = code;
              console.log(code)
              success(111);
            },
            fail:res=>{
              fail(res,"fail");
            },
            compolete:res=>{
              console.log("完成登录");
            }
          })
      })

    }).then((res)=>{
      
      return new Promise((success,fail)=>{
           console.log(res);
      });

    }).catch((res)=>{
      console.log("异常");
    });

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
      
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
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
    url:'https://api.qhhznt.com/index.php',
    userInfo: null
  }
})