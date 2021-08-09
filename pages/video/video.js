// e:\programming\字节小程序\归南\归南\pages\index\index
import { request } from '../../request/index.js';
const app = getApp();
Page({
  data: {
    winHeight:1000,
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    currentPage: 1,//当前页数，默认为1
		showSearch: true,
		Tab1swiperList: [], //首页的数据
		Tab2swiperList: [],
		Tab3swiperList: [],
		Tab4swiperList: [],
		hidden: true
  },
  onLoad: function (options) {
    this.initLoad();
    var that=this;
    //高度自适应
    // tt.getSystemInfo({
    //   success: (res) => {
    //     var clientHeight=res.windowHeight;
    //     var clientWidth=res.windowWidth;
    //     var rpxR=750/clientWidth;
    //     var calc=clientHeight*rpxR-180;
    //     console.log(calc)
    //     that.setData({
    //       winHeight:calc
    //     });
    //   }
    // });
  },
  initLoad(){
    request({
			url: 'https://api.apiopen.top/todayVideo'
		})
			.then((result) => {
				console.log(result);
				this.setData({
					Tab1swiperList: result.data.result[18].data.content
				});
			})
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
    });
  },
  switchNav:function(e){
    var cur=e.target.dataset.current;
    if(this.data.currentTab==cur){
      return false;
    }
    else{
      this.setData({
        currentTab:cur
      })
    }
  }
});
