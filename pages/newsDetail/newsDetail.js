// e:\programming\字节小程序\归南\归南\pages\newsDetail\newsDetail
import { request } from '../../request/index.js';
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({
	data: {
		news: [],
		url: '',
		title: '',
		image: ''
	},
	onLoad: function(options) {
		// console.log(options.newsid);
		var that = this;
		var Durl = options.newsid;
		var Dtitle = options.title;
		var Dimage = options.image;
		this.setData({
			title: Dtitle,
			image: Dimage,
			url: Durl
		});
		request({ url: Durl }).then((result) => {
			console.log(result);
			var article = result.data;
			WxParse.wxParse('article', 'html', article, that);
		});
	},
	initload() {},
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
});
