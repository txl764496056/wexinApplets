<template>
    <div class="login-container">
        <img src="/static/banner/banner_chongzhi.png" alt="">
        <div class="input-box">
            <p>手机号</p>
            <input type="number" placeholder="请输入手机号" @input="isDisable" placeholder-class="txt-color" v-model="tell">
        </div>
        <div class="input-box">
            <p>验证码</p>
            <input type="number" placeholder="请输入验证码" @input="isDisable" placeholder-class="txt-color" v-model="verifyCode">
            <button class="btn" :disabled="downTime!=''" @click="sendVerify">获取验证码{{downTime}}</button>
        </div>
        <button :disabled="disabled" class="login-btn btn" open-type="getUserInfo" @getuserinfo="onGotUserInfo">登录</button>
    </div>
</template>
<script>

export default {
    data(){
        return {
            openid:"",
            disabled:true,
            tell:"",
            verifyCode:"",
            downTime:"",//倒计时时间
            userInfo:{},
            httpUrl:this.globalData.httpUrl,
            // loginUrl:"miniprogram/index/sms_login", 
            loginUrl:this.globalData.loginUrl,//登录
            // verifyUrl:"miniprogram/index/send_sms", 
            verifyUrl:this.globalData.verifyUrl,//获取验证码
            // openidUrl:"miniprogram/login/get_openid" 
            openidUrl:this.globalData.openidUrl//获取openid
        }
    },
    created:function(){
        let _this = this;
        
    }, 
    mounted:function(){
        let _this = this;
        // console.log(_this.globalData.openid,"login");
    },
    methods:{  
        /**
         * 验证码和手机不为空时，登录按钮disable设置为true
         */
        isDisable:function(evt){
            let _this = this;
            let isDisable = _this.tell!=''&&_this.verifyCode!='';
            _this.disabled = !isDisable;
        },
        /**
         * 发送验证码,获取短信唯一序列
         */
        sendVerify:function(){
            let _this = this;
            let tell = _this.tell;
            let url = _this.httpUrl+_this.verifyUrl;
            _this.downTime = "60s";
            _this.countDown();
            wx.request({
                url,
                data:{
                    openid:_this.openid,
                    mobile:_this.tell
                },
                success:function(res){ 
                    console.log(res,"获取验证码，唯一序列");
                    if(res.data.code==200){
                        let unique = res.data.data.sms_uniqid;
                        _this.userInfo.verfiyUnique = unique;
                    }
                }
            });
        },
        /**
         * 60s倒计时，再次点亮获取验证码按钮
         */
        countDown:function(){
            let _this = this;
            let time = 60;
            let timeId = setInterval(() => {
                if(time == 0){
                    clearInterval(timeId);
                    _this.downTime = "";
                }else{
                    _this.downTime = (--time)+"s";
                }
            }, 1000);
        },
        /**
         * 获取用户openid,并存入本地缓存
         */
        // getOpenid:function(){
        //     let _this = this;

        //     let promise = new Promise((success,fail)=>{
        //         success();
        //     });
        //     // * 获取微信返回的code
        //     promise.then((res)=>{
        //         return new Promise((success,fail)=>{
        //             wx.login({
        //                 success:(res)=>{
        //                     let code = res.code;
        //                     let url = _this.httpUrl+_this.openidUrl;
        //                     success({code,url});
        //                 }
        //             });
        //         })
        //     // * 通过code从后台获取openid，并存入本地缓存
        //     }).then((res)=>{
        //         return new Promise((success,fail)=>{
        //             wx.request({
        //                 url:res.url,
        //                 data:{
        //                     js_code:res.code
        //                 },
        //                 success:(res)=>{
        //                     let openid = res.data.data.openid
        //                     wx.setStorageSync("openid",openid);
        //                     _this.openid = openid;
        //                 }
        //             });
        //         });
        //     }).catch((err)=>{
        //         console.log(err);
        //     }); //---promiseEnd
        // },
        /**
         * 获取授权，保存用户信息
         * 登录
         */
        onGotUserInfo:function(evt){
            let _this = this;
            
            let promise = new Promise((success,fail)=>{
                success();
            });
            // 获取授权，保存用户微信信息
            promise.then((res)=>{
                return new Promise((success,fail)=>{
                    if(evt.target.userInfo){ 
                        let userInfo = evt.target.userInfo;
                        Object.assign(_this.userInfo,userInfo);
                        success();
                    }else{
                        fail("获取授权失败！");
                    }
                }); 

            // 登录
            }).then((res)=>{
                return new Promise((success,fail)=>{
                    let url = _this.httpUrl+_this.loginUrl;
                    let data = {
                        openid:_this.openid,
                        mobile:_this.tell, //电话号码
                        sms_code:_this.verifyCode, //验证码
                        sms_uniqid:_this.userInfo.verfiyUnique, //短信唯一序列
                        plat_nickname:_this.userInfo.nickName, //微信昵称
                        plat_head_pic:_this.userInfo.avatarUrl //微信头像
                    };
                    wx.request({
                        url,
                        data:data,
                        success:function(res){
                            if(res.data.code==200){
                                let data = res.data.data;
                                // console.log(res);
                                // wx.setStorageSync("is_login",data.is_in);
                                // Object.assign(_this.globalData.userInfo,data);
                                wx.switchTab({
                                    url:"/pages/index/main"
                                });
                            }else{
                               let str = res.data.msg;
                               wx.showToast({
                                   title:str,
                                   icon:"none"
                               });
                            }
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
.login-container img{width:100%;height:300rpx;margin-bottom: 20rpx;}
.login-btn,.input-box{margin:40rpx 40rpx;height:80rpx;line-height:80rpx;border-radius: 6px;padding-top:0;padding-bottom:0;}
.input-box{display:flex;font-size:28rpx;border:1px solid #5E9DF1;align-items:center;padding-left:20rpx;overflow: hidden;}
.input-box:last-of-type{justify-content: space-between;}
.input-box button{width:220rpx;border:0;font-size:26rpx;background-color:#5E9DF1;color:#fff;height:100%;border-radius:0;display:flex;align-items:center;}
.input-box input{flex:1;margin-left:10rpx;color:#666;}
.input-box p{color:#5E9DF1;}
.txt-color{color:#bbb;}
</style>


