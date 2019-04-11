//index.js
//获取应用实例
let app = getApp();
// 引入api
const API = require("../../wxApi/main.js");
// 引入处理时间的函数
const util = require("../../utils/util.js");

Page({
    onLoad(){
      console.log(util.formatTime(new Date()));
    }
})
