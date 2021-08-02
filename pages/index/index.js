// e:\programming\字节小程序\归南\归南\pages\index\index
const app = getApp();
Page({
  data: {
    winHeight: "",
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    showSearch: true,
    array: [1, 2, 3, 4, 5],
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
    // this.showLoading();
    tt.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', // 目标服务器url
      success: (res) => {
        // console.log(res);
        this.setData({
          swiperList: res.data.message
        })
      }
    });
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
});
