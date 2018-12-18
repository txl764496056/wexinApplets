// pages/bindPhone/bindPhone.js
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
    
  },
  addTell:function(){
    let _this = this;
    let imgpath = "";
    wx.getImageInfo({
      src: 'http://img.zcool.cn/community/01528a58e4c8e6a801219c77b0154e.png@1280w_1l_2o_100sh.png',
      success: function (ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          fail:function(res){
            console.log("fail",res,path);
          },
          success(res) {
            console.log("success", res, path);
          },
          complete:function(res){
            console.log("complete", res, path);
          }
        })
      }
    });
    
    wx.addPhoneContact({
      firstName: "梁",
      lastName: "谭",
      middleName: "秀",
      remark: "添加个人备注",
      organization: "公司汇智",
      title: "职位经理",
      workPhoneNumber: "工作work1827169524545",
      hostNumber: "公司host854256",
      homePhoneNumber: "住宅home45488213644",
      nickName: "昵称txl",
      // photoFilePath: imgpath
      success:function(res){
        console.log(res,"addres");
      }
    })
    
    // wx.addPhoneContact({
    //   firstName: "梁",
    //   lastName: "谭",
    //   middleName: "秀",
    //   remark: "添加个人备注",
    //   organization: "公司汇智",
    //   title: "职位经理",
    //   workPhoneNumber: "工作work1827169524545",
    //   hostNumber: "公司host854256",
    //   homePhoneNumber: "住宅home45488213644",
    //   nickName: "昵称txl",
    //   photoFilePath: "../../images/photo/5.jpg"
    // })
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