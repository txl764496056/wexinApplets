<script>
import store from "@/utils/store"
export default {
  data:function(){
    return {
    //   openid:"", //用户openid
      httpUrl:this.globalData.httpUrl,
      userUrl:this.globalData.userInfoUrl,//获取用户信息
      openidUrl:this.globalData.openidUrl//获取openid
    }
  },
  store,
  created () {
    let _this = this;
    let url = _this.httpUrl+_this.openidUrl;
        
    let promise = new Promise((success,fail)=>{
        success();
    });
    
    // * 获取微信返回的code
    promise.then((res)=>{
        return new Promise((success,fail)=>{
            wx.login({
                success:(res)=>{
                    let code = res.code;
                    success({code});
                }
            });
        })
    // * 通过code从后台获取openid，并存入本地缓存
    }).then((res)=>{
        return new Promise((success,fail)=>{
            wx.request({
                url,
                data:{
                    js_code:res.code
                },
                success:(res)=>{
                    let openid = res.data.data.openid;
                    _this.$store.commit("setOpenid",openid);
                    // _this.openid = _this.$store.state.openid;
                }
            });
        });
    }).catch((err)=>{
        console.log(err);
    }); //---promiseEnd
    
  },
  computed:{
     openid(){
        return this.$store.state.openid
     }
  },
  watch:{
      openid(newVal,oldVal){
          console.log("ddd",newVal);
         let _this = this;
         let openid = newVal; 
         let url = _this.httpUrl+_this.openidUrl; 
         let promise = new Promise((success,fail)=>{
             success();
         });
        //  获取用户信息
         promise.then((res)=>{
             return new Promise((success,fail)=>{
                 wx.request({
                     url,
                     data:{
                         openid
                     },
                     success:function(res){
                         console.log(res,"用户信息")
                     }
                 })
             });
         }).catch((err)=>{
             console.log(err);
         });
      }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.btn{background-color:transparent;border:1px solid #5E9DF1;color:#5E9DF1;font-size:34rpx;text-align:center;}
.btn::after,.btn.disabled:after{border:none;}
.btn:active{box-shadow:inset 0 0 6px #5E9DF1;}
.btn[disabled]:not(type){background-color:rgb(238, 245, 253);border:none;color:rgb(161, 202, 255)}
.btn[disabled]:active{box-shadow:none;}
</style>
