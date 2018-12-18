//index.js
const app = getApp()

Page({
  data: {
    inputVal: "",
    msgData: []
  },
  changeInputVal: function (ev) {
    this.setData({
      inputVal: ev.detail.value
    });
  },
  //  添加留言
  addMsg: function () {

    var list = this.data.msgData;
    list.push({
      msg: this.data.inputVal
    });
    this.setData({
      msgData: list,
      inputVal: ""
    });
  },
  //  删除留言
  delMsg: function (ev) {
    var list = this.data.msgData;
    var n = ev.target.dataset.index;
    list.splice(n, 1);
    this.setData({
      msgData: list
    });
  }

})
