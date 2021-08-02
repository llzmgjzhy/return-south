// e:\programming\字节小程序\归南\归南\pages\index\index
const app = getApp();
Page({
  data: {
    winHeight:"",
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
  },
  onLoad: function (options) {
    var that=this;
    //高度自适应
    tt.getSystemInfo({
      success: (res) => {
        var clientHeight=res.windowHeight;
        var clientWidth=res.windowWidth;
        var rpxR=750/clientWidth;
        var calc=clientHeight*rpxR-180;
        console.log(calc)
        that.setData({
          winHeight:calc
        });
      }
    });
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