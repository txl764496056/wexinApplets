<template>
  <div>
    <map id="map"
    :longitude="longitude"
    :latitude="latitude"
    show-compass="true"
    show-location
    :markers="markers"
    :scale="scale"
    >
      <cover-view v-if="!mapAuthor" class="nearby-btn" @click="setAuthorize">附近人</cover-view>
      <cover-view v-else class="nearby-btn">人脉列表</cover-view>
    </map>
  </div>
</template>

<script>
import store from '@/utils/store'
import card from '@/components/card'
import utils from "@/utils/index"
export default {
  data () {
    return {
      userInfo: {},
      longitude: "113.97796", //经度
      latitude: "22.592274", //纬度
      scale:14, //地图缩放比例
      markers:[],
      currOpenid:"",
      // openid:"", //用户openid
      mapAuthor:false, //记录授权状态，false:未授权,true:已授权
      httpUrl:this.globalData.httpUrl,
      nearbyUrl:this.globalData.nearbyUrl //附近人信息
    }
  },
  store,
  components: {
    card
  },

  created () {
    let _this = this;
    console.log(this.$store.state.openid,"openid");
    
  },
  computed:{
     openid(){
        return this.$store.state.openid
     }
  },
  watch:{
    "openid":function(newVal,oldVal){
      let _this = this;
      _this.currOpenid = newVal;
        _this.getLocation();//获取位置信息
    }
  },
   methods: {
     /**
      * 手动设置授权信息，打开授权设置页，授权
      */
     setAuthorize:function(){
       let _this = this;
        wx.showModal({
          title:"授权",
          content:"需要您的位置信息用于展示附近人",
          confirmText:"授权",
          success:function(res){
            if(res.confirm){
              wx.openSetting({
                success:function(res){
                  _this.mapAuthor = res.authSetting['scope.userLocation'];
                  _this.getNearbyList();//显示附近人信息
                },
                fail:function(err){
                  console.log(err,"授权失败");
                }
              });
            }
          }
        });
     },
     /**
      * 定位询问弹窗，获取定位信息
      * 定位权限列表中不存在位置权限信息时弹出，也就是首次进入页面时弹出
      * 弹窗只出现一次，但是可以多次条用获取位置信息
      */
     getLocation:function(){
       let _this = this;
       wx.getLocation({
          type:"wgs84",
          // 获取位置信息成功
          success:function(res){
            _this.longitude = res.longitude;
            _this.latitude = res.latitude;
            _this.mapAuthor = true; //已授权
            _this.getNearbyList(); // 显示附近人
          },
          // 获取位置信息失败
          fail:function(err){
            _this.mapAuthor = false; //未授权
          }
        });
     },
     /**
      * 附近人
      */
     getNearbyList:function(openid){
      let _this = this;
      let url = _this.httpUrl+_this.nearbyUrl;

      //获取附近人列表 
      wx.request({
        url,
        data:{
          openid:_this.currOpenid,
          lng:_this.longitude,
          lat:_this.latitude
        },
        success:function(res){
          let list = res.data.data.card_list; //附近人信息
          let arr = list.map(function(item,index){
            return {
              longitude:item.lng,
              latitude:item.lat,
              iconPath:item.head_pic_path,
              width:"26",
              height:"26"
            }
          });
          _this.markers.push(...arr);
        }
      });
    }
  },
  
}
</script>

<style scoped>
*{padding:0;margin:0;}
#map{width:100%;height:100vh;}
.nearby-btn{position:absolute;right:0;bottom:80rpx;background-color:#5E9DF1;color:#fff;font-size:28rpx;padding:0 20rpx 0 30rpx;height:60rpx;border-radius:30rpx 0 0 30rpx;line-height:58rpx;}
</style>
