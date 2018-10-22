// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 查看是否授权,如果之前已经授权，直接登录，就不会经过onGetUserInfo，并且可以直接拿到用户信息
    wx.getSetting({
      success:function(res){
        if (res.authSetting["scope.userInfo"]){ 
          // 已授权，获取用户信息
          wx.getUserInfo({
            success:function(res){
              console.log(res);
            }
          })
        }
      }
    });

  },
  
  /**
   * 获取用户信息
   */
  onGetUserInfo:function(evt){
    // console.log(evt);
  }
})