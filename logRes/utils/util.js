const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 星级[1,1,1,0,0],总共5星，这个数组表示3星
function convertToStarsArray(stars){
  var num = stars.toString().substring(0,1);
  var arr =[];//存放星级数据
  for(var i=1;i<=5;i++){
    if(i<=num){
      arr.push(1);
    }else{
      arr.push(0);
    }
  }
  return arr;
}

// 获取数据
function http(url,callBack) {
  var _this = this;
  wx.request({
    url: url,
    data: {},
    method: "GET",
    header: {
      "content-type": "application/xml"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    },
    complete: function () {

    }
  });
}

// 演员名字拼接
function convertToCastString(casts){
  var castsJoin = "";
  for(var index in casts){
    castsJoin = castsJoin+ casts[index].name+"/";
  }
  return castsJoin.substring(0,castsJoin.length-2);
}

function convertTocastInfos(casts){
  var castsArray = [];
  for(var index in casts){
    var cast ={
      name:casts[index].name,
      img:casts[index].avatars ? casts[index].avatars.large:"",
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString:convertToCastString,
  convertTocastInfos:convertTocastInfos
}
