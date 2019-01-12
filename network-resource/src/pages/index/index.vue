<template>
  <div>
    <!-- <map id="map"
    scale="18"
    enable-3D="true"></map> -->
  </div>
</template>

<script>
import card from '@/components/card'
import utils from "@/utils/index"
export default {
  data () {
    return {
      userInfo: {},
      openid:"", //用户openid
      userInfoUrl:this.globalData.userInfoUrl,
      httpUrl:this.globalData.httpUrl,
      openidUrl:this.globalData.openidUrl//获取openid
    }
  },

  components: {
    card
  },

  methods: {
    
  },
  created () {
    let _this = this;
    // 获取openid
    let url = _this.httpUrl+_this.openidUrl;
    utils.getOpenid(url);
    console.log(url,"created");
    // 1、位登录则跳转至登录页
    // let openid = wx.getStorageSync("openid");

    // if(!openid){
      // wx.redirectTo({
      //   url:"/pages/login/main"
      // });
    // }else{
    //   wx.request({
    //     url:_this.globalData.httpUrl+_this.userInfoUrl,
    //     data:{
    //       openid
    //     },
    //     success:function(res){
    //       console.log(res,"获取用户基本信息");
    //     }
    //   });
    // }
    
    
  },
  mounted:function(){
    // console.log(this.globalData.openid,"index");
    let _this = this;
    // _this.openid = _this.globalData.openid;
    
    wx.redirectTo({
      url:"/pages/login/main"
    });

    // wx.request({
    //   url:_this.globalData.httpUrl+_this.userInfoUrl,
    //   data:{
    //     openid
    //   },
    //   success:function(res){
    //     console.log(res,"获取用户基本信息");
    //   }
    // });

  }
  
}
</script>

<style scoped>
#map{width:100%;height:100vh;}
</style>
