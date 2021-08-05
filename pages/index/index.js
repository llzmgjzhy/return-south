// e:\programming\字节小程序\归南\归南\pages\index\index
//引用发送请求的方法 需要把路径补充完整
import { request } from "../../request/index.js"
const app = getApp();
Page({
  data: {
    winHeight: "",
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    showSearch: true,
    swiperList:[]
  },
  onLoad: function (options) {
    this.initLoad();
    var that = this;
    //高度自适应
    tt.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight;
        var clientWidth = res.windowWidth;
        var rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc);
        that.setData({
          winHeight: calc,
        });
      },
    });
  },
  showLoading() {
    wx.showNavigationBarLoading();
    // this.setData({
    //     subtitle: '加载中...',
    //     loading: true,
    // });
},
  initLoad() {
    // https://api.apiopen.top/getWangYiNews  网易新闻api
    // http://v.juhe.cn/toutiao/index?type=top&key=3dc86b09a2ee2477a5baa80ee70fcdf5  聚合api
    request({url:"http://v.juhe.cn/toutiao/index?type=top&key=3dc86b09a2ee2477a5baa80ee70fcdf5"})
    .then(result=>{
      console.log(result);
      this.setData({
              swiperList: result.data.result.data
             })
    })
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
    });
  },
  switchNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
      });
    }
  },
  navToArticle:function(e){
    console.log(e);
    let urllocation=e.path;
    tt.navigateTo({
      url: urllocation, // 指定页面的url
      success(res) {
        console.log("调用成功");
      },
      fail(res) {
        console.log("navigateTo调用失败");
      },
    });
  }
});