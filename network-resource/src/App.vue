<script>
import store from "@/utils/store"
export default {
  data:function(){
    return {
     
    }
  },
  store,
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // this.$store.commit("setOpenid",22);

    let url = "https://api.qhhznt.com/index.php/miniprogram/login/get_openid";

    // function getOpenid(url){
        let _this = this;
        
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
                        // _this.$store.commit("setOpenid",openid);
                        store.commit("setOpenid",openid);
                    }
                });
            });
        }).catch((err)=>{
            console.log(err);
        }); //---promiseEnd
    // }
    
  },
  mounted:function(){
  },
  watch:{
    "store.openid":function(oldVal,newVal){
      console.log("oldVal="+oldVal);
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
