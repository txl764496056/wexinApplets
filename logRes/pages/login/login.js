let app = getApp();
//logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcomeImg: "/images/welcome.jpg",
    isShow: true //第一次进入未授权登录时，进入此页面，授权登陆后，不再进入此页面
  },

  /**
   * 登录注册
   */
  bindGetUserInfo: function (evt) {

    if (evt.detail.userInfo) {
      // 通过授权获得用户信息
      app.globalData.userInfo = evt.detail.userInfo;
      // 标记用户已登录
      wx.setStorageSync("isLog", 1);
      //  跳转至登录页
      wx.redirectTo({
        url: "../bindPhone/bindPhone"
      });
      console.log("允许按钮,拿到用户信息，然后进入绑定手机页", evt.detail.userInfo);
    } else {
      console.log("拒绝按钮");
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    if (wx.getStorageSync("isLog") == 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    }
  }

})