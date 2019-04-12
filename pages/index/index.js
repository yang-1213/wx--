//index.js
//获取应用实例
let app = getApp();
// 引入api
const API = require("../../wxApi/main.js");
// 引入处理时间的函数
const util = require("../../utils/util.js");

Page({
  data:{
    indexPage: [1, 2, 3, 4, 5, 6, 7],
    current:0
  },
  addCurrent(e){
    // 获取indexPage的页面个数
    let count = this.data.indexPage.length;
    if(this.data.current<count-1){
      this.setData({
        current: ++this.data.current
      })
    }
    console.log(e);
  },
  reduceCurrent(e){
    if (this.data.current > 0){
      this.setData({
        current: --this.data.current
      })
    }
  }
})

