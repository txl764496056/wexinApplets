var app = getApp();
// pages/moves/moves.js
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
    var top250Url = app.globalData.doubanUrl + "/v2/movie/top250";
    // 正在热映
    var inTheatersUrl = app.globalData.doubanUrl + "/v2/movie/in_theaters";
    // 即将上映
    var comingSoonUrl = app.globalData.doubanUrl + "/v2/movie/coming_soon";
    
    this.getMoveListData(top250Url);
    this.getMoveListData(inTheatersUrl);
    
    this.getMoveListData(comingSoonUrl);
  },
  // 获取数据
  getMoveListData:function(url){
      wx.request({
        url: url,
        data: {},
        method: "GET",
        header: {
          "content-type": "application/xml"
        },
        success: function (res) {
          console.log(res);
        },
        fail: function () {
          console.log("失败");
        },
        complete: function () {

        }
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