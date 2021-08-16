// e:\programming\ByteMiniApp\归南\归南\pages\videoDetail\vedieoDetail
Page({
  data: {
    title:'',
    videourl:'',
    cover:''
  },
  onLoad: function (options) {
    var receiveurl=decodeURIComponent(options.videourl);
    var receivetitle=options.title;
    var receivecover=decodeURIComponent(options.cover);
    console.log(receivetitle)
    this.setData({
      title:receivetitle,
      videourl:receiveurl,
      cover:receivecover
    })
  },
  onShareAppMessage: function(e) {
		console.log(e);
		var that = this;
		return {
      title:that.data.title,
			imageUrl: that.data.image,
			path:
				'/pages/newsDetail/newsDetail?newsid=' +
				that.data.url +
				'title=' +
				that.data.title +
				'image=' +
				that.data.image,
			success: function(res) {
				// 转发成功
				tt.showToast({
					title: '转发成功！'
				});
			},
			fail: function(res) {
				// 转发失败
				tt.showToast({
					icon: 'none',
					title: '转发失败'
				});
			}
		};
	}
})