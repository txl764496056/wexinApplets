// pages/bindPhone/bindPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * camera拍照功能 
   */
  carmeraTakePhoto:function(){
    let ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality:'high',
      success:(res)=>{
        this.setData({
          src:res.tempImagePath
        })
      },
      fail:function(err){
        console.log(err, "fail");
      },
      compolete:function(res){
        console.log(res, "compolete");
      }
    })
  },
  /**
   * chooseImage 拍照
   */
  TakePhoto:function(){
    let _this = this;
    wx.chooseImage({
      count:1,
      success:function(res){
        console.log(res,"success");
      },
      fail:function(err){
        console.log(err,"fail");
      },
      compolete:function(res){
        console.log(res,"compolete");
      }
    })
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