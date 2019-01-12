<script>

export default {
  
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
    
  },
  mounted:function(){
    
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
