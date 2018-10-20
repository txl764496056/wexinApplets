var app = getApp();
var util = require("../../../utils/util.js");
// pages/movies/more-movies/more-movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl:"",
    totalCount:0, //每次加载20条数据，第一加载后+20，下一次加载就会获取20-39的20条数据
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传过来的电影类型
    var movieType = options.movieType;
    // 设置到导航栏标题
    wx.setNavigationBarTitle({
      title:movieType
    });

    //获取对应类型的数据
    var dataUrl = "";

    if (/正在上映/.test(movieType)){

      dataUrl = app.globalData.doubanUrl + "/v2/movie/in_theaters";

    } else if (/即将上映/.test(movieType)){

      dataUrl = app.globalData.doubanUrl + "/v2/movie/coming_soon";

    } else if (/Top250/.test(movieType)){

      dataUrl = app.globalData.doubanUrl + "/v2/movie/top250";

    }
    // 上滑加载更多需要用到这个链接
    this.requestUrl = dataUrl;
    util.http(dataUrl,this.processDoubanData);
  },

  // 数据处理
  processDoubanData:function(data){ 
    var movies = [];
    for(var index in data.subjects){
      var subject = data.subjects[index];
      var title = subject.title.substr(0,8);
      var temp = {
        title:title, //电影标题
        stars: util.convertToStarsArray(subject.rating.stars), //电影星级数组
        average:subject.rating.average, //电影评分
        images:subject.images.large, //电影海报图
        id:subject.id // 电影id号
      }
      movies.push(temp);
    }

    var totalMovies = [];
    // 判断是否是第一次加载数据
    if(this.data.isEmpty){ //是第一次加载
        this.data.isEmpty = false;
        totalMovies = movies;
    }else{ //不是第一次加载数据，新旧数据合并在一起
        totalMovies = this.data.movies.concat(movies);
        this.isEmpty = false;
    }
    
    this.data.totalCount +=20;
    this.setData({ 
      movies: totalMovies,
      });
    // 隐藏顶部导航栏里的加载动画
    wx.hideNavigationBarLoading();
  },

  // 上滑加载更多
  scrollLower:function(evt){ //与下拉刷新不能共存
    // var nextUrl = this.requestUrl+"?start="+this.data.totalCount+"&count=20";
    // util.http(nextUrl,this.processDoubanData);
    // // 设置加载动画，在顶部导航条显示，提示用户正在加载
    // wx.showNavigationBarLoading();
  },
  // 上滑加载更多
  onReachBottom:function(){
    var nextUrl = this.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    // 设置加载动画，在顶部导航条显示，提示用户正在加载
    wx.showNavigationBarLoading();
  },


  onReady:function(){
    
  },
  onShow:function(){
   
  }
})