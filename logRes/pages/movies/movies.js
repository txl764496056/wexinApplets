var app = getApp();
var util = require("../../utils/util.js");
// pages/moves/moves.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top250: {},
    inTheaters: {},
    comingSoon: {},
    moviePageShow:true,
    searchPannelShow:false,
    searchValue:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 参数，只要3条数据
    var num = "?start=0&count=3";
    //top250
    var top250Url = app.globalData.doubanUrl + "/v2/movie/top250" + num;
    // 正在热映
    var inTheatersUrl = app.globalData.doubanUrl + "/v2/movie/in_theaters" + num;
    // 即将上映
    var comingSoonUrl = app.globalData.doubanUrl + "/v2/movie/coming_soon" + num;

    this.getMoveListData(top250Url, "top250");
    this.getMoveListData(inTheatersUrl, "inTheaters");
    this.getMoveListData(comingSoonUrl, "comingSoon");
  },
  // 获取数据
  getMoveListData: function(url, movieKey) {
    var _this = this;
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        "content-type": "application/xml"
      },
      success: function(res) {
        _this.processDoubanData(res.data, movieKey);
      },
      fail: function() {
        console.log("失败");
      },
      complete: function() {

      }
    });
  },

  // 处理豆瓣电影数据
  processDoubanData: function (moiveData, movieKey) {
    var movies = []; //存放当前页面所需要的电影数据
    for (var index in moiveData.subjects) {
      var subject = moiveData.subjects[index];
      // 每部电影title
      var title = subject.title.substr(0,8);
      var temp = {
        title: title,
        stars: util.convertToStarsArray(subject.rating.stars), //星级
        average: subject.rating.average, //评分
        images: subject.images.large, //图片海报
        id: subject.id //id号
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[movieKey] = {
      movieType: moiveData.title, //电影类型
      movies: movies
    };
    this.setData(readyData);
  },
  
  // 更多，跳转
  movieMore:function(evt){
    // 获取电影类型属性值
    var movieType = evt.currentTarget.dataset.movieType;
    // 跳转至更多电影页面
    wx.navigateTo({
      url: "more-movies/more-movies?a=ddd&&movieType=" + movieType
    })
  },

  // 搜索聚焦事件
  searchFocus:function(evt){
    this.setData({
      moviePageShow:false,
      searchPannelShow:true
    });
  },

  //完成搜索
  searchChange:function(evt){
    var val = evt.detail.value;
    var searchUrl = app.globalData.doubanUrl+"/v2/movie/search?q="+val;
    this.getMoveListData(searchUrl,"search");
  },

  // 退出搜索
  searchCancel:function(){
    this.setData({
      moviePageShow: true,
      searchPannelShow: false
    });
    this.setData({
      searchValue:""
    });
  },

  // 跳转至电影详情页
  toMovieDetails:function(evt){
    var movieId = evt.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: 'movie-details/movie-details?movieId=' + movieId,
    })
  },






  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})