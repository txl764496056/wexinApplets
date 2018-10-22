// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapCtx:{}, //map上下文对象
    markers:[{
      id:0,
      iconPath:"/images/markers.png",
      longitude:"113.840612",
      latitude:"22.59863",
      width:30,
      height:30
    },{
      id:1,
      iconPath:"/images/markers.png",
      longitude:"113.872166",
      latitude:"22.581929",
      width:30,
      height:30
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // 获取map上下文
    this.mapCtx = wx.createMapContext("my-map");

    // 获取当前地图中心的经纬度，返回的是gcj02坐标系，可以用用于wx.openLocation()
    this.mapCtx.getCenterLocation({
      success:function(res){
        // console.log(res);
      }
    });
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