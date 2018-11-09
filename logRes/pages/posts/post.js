// pages/posts/post.js
var postData = require("../../data/post-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图路径
      bannerUrl:[
        "/images/banner1.jpg",
        "/images/banner2.jpg",
        "/images/banner3.jpg"
      ],
    indicatorDots:"true", //显示轮播圆点
    autoplay:"true", //轮播自动播放
    indicatorActiveColor:"#fff" //轮播当前小圆点颜色
  },
  //跳转至新闻详情页 
  toDetail:function(evt){
    // console.log(evt,evt.currentTarget.dataset.postId);
    var postId = evt.currentTarget.dataset.postId;
    wx.navigateTo({
      url:"../posts/post-detail/post-detail?postId="+postId
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 将获取的数据让入data
    this.setData({ 
      post_list:postData.post_list
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("onready");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("onshow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})