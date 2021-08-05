// e:\programming\字节小程序\归南\归南\pages\newsDetail\newsDetail
import { request } from "../../request/index.js"
var WxParse = require('../../utils/wxParse/wxParse.js')
Page({
  data: {
    news:[]
  },
  onLoad: function (options) {
    // console.log(options.newsid);
    var that = this;
    var url = options.newsid;
    request({url:url})
    .then(result=>{
      // console.log(result);
      var article = result.data;
      WxParse.wxParse('article', 'html', article, that);
    })
  },
  initload() {

  }
})