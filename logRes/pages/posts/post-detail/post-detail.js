// pages/posts/post-detail/post-detail.js
var postData = require("../../../data/post-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:"",
    currentPostId:'' //当前新闻id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接受跳转传过来的参数
    var postId = options.postId;
    this.data.currentPostId = postId;
    var postItemData = postData.post_list[postId];
    this.setData({
      postItem:postItemData
    });

  // 获取缓存数据
    var postsCollected = wx.getStorageSync("postsCollected");
    // 存在缓存数据，并且去除新闻的收藏状态
    if(postsCollected[postId]){
      var postCollected = postsCollected[postId];
      this.setData({
        collected:postCollected
      })
    }else{ //缓存数据不存在
      var postsCollected = {};
      postsCollected[postId]  = false;
      wx.setStorageSync("postsCollected", postsCollected);
    }
  },
  // 分享事件
  shareTap:function(){
    wx.showActionSheet({
      itemList: [
        "分享到微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ],
      itemColor:"#ff6600",
      success:function(res){
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
      }
    })
  },

  // 收藏与取消收藏事件
  oncllectionTap:function(){
    // 获取所有收藏记录缓存
    var postsCollected = wx.getStorageSync("postsCollected");
    // 获取指定新闻收藏记录
    var postCollected = postsCollected[this.data.currentPostId];
    // 点击后收藏变为取消收藏，没收藏变为收藏
    postCollected = !postCollected; 
    // 更新收藏缓存
    postsCollected[this.data.currentPostId]= postCollected;
    wx.setStorageSync("postsCollected", postsCollected);
    this.setData({
      collected: postCollected
    });

    // postCollected=true，则表示收藏状态
    var msg = postCollected===true ? "收藏成功":"取消成功";
    // 提示消息
    wx.showToast({
      title: msg, //提示框标题
      duration:1000 //1000ms后提示框消失
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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