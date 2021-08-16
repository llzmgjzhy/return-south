// e:\programming\字节小程序\归南\归南\pages\index\index
import { request } from '../../request/index.js';
const app = getApp();
Page({
	data: {
		winHeight: '',
		currentTab: 0, //预设当前项的值
		scrollLeft: 0, //tab标题的滚动条位置
		currentPage: 1, //当前页数，默认为1
		Tab1PreVideo: -1, //上一个视频的编号
		Tab2PreVideo: -1,
		Tab3PreVideo: -1,
		Tab4PreVideo: -1,
		videoCurrent: -1,
		showSearch: true,
		orderListHeight: {}, //每个swiper对应的高度
		Tab1swiperList: [], //首页的数据
		Tab2swiperList: [],
		Tab3swiperList: [],
		Tab4swiperList: [],
		Tab1currentid: 127398,
		Tab2currentid: 127498,
		Tab3currentid: 127698,
		Tab4currentid: 127798,
		timebefore: 0,
		timenow: '',
		hidden: true,
		Tab1videoshow: [], //决定显示的是图片还是视频
		Tab2videoshow: [],
		Tab3videoshow: [],
		Tab4videoshow: []
	},
	onLoad: function(options) {
		this.initLoad();
		// this.setSwiperHeight('item' + this.data.currentTab);
		var that = this;
		// 高度自适应
		tt.getSystemInfo({
			success: (res) => {
				var clientHeight = res.windowHeight;
				var clientWidth = res.windowWidth;
				var rpxR = 750 / clientWidth;
				var calc = clientHeight * rpxR - 180;
				console.log(calc);
				that.setData({
					winHeight: clientHeight+50
				});
			}
		});
	},
	initLoad() {
		request({
			url: 'https://api.apiopen.top/videoRecommend?id=127399'
		}).then((result) => {
			console.log(result);
			this.setData({
				Tab1swiperList: result.data.result
			});
		});
	},
	switchTab: function(e) {
		this.setData({
			currentTab: e.detail.current,
			['Tab1videoshow[' + this.data.Tab1PreVideo + ']']: false,
			['Tab2videoshow[' + this.data.Tab2PreVideo + ']']: false,
			['Tab3videoshow[' + this.data.Tab3PreVideo + ']']: false,
			['Tab4videoshow[' + this.data.Tab4PreVideo + ']']: false,
		});
		if (e.detail.current == '1') {
			request({
				url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab2currentid
			}).then((result) => {
				console.log(result);
				this.setData({
					Tab2swiperList: result.data.result
				});
			});
		}
		if (e.detail.current == '2') {
			request({
				url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab3currentid
			}).then((result) => {
				console.log(result);
				this.setData({
					Tab3swiperList: result.data.result
				});
			});
		}
		if (e.detail.current == '3') {
			request({
				url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab4currentid
			}).then((result) => {
				console.log(result);
				this.setData({
					Tab4swiperList: result.data.result
				});
			});
		}
	},
	switchNav: function(options) {
		console.log(options);
		if (this.data.timebefore == 0) {
			this.setData({
				timebefore: options.timeStamp
			});
			return;
		}
		this.setData({
			timenow: options.timeStamp,
			['Tab1videoshow[' + this.data.Tab1PreVideo + ']']: false,
			['Tab2videoshow[' + this.data.Tab2PreVideo + ']']: false,
			['Tab3videoshow[' + this.data.Tab3PreVideo + ']']: false,
			['Tab4videoshow[' + this.data.Tab4PreVideo + ']']: false,
		});
		if (this.data.timenow - this.data.timebefore <= 400) {
			tt.pageScrollTo({
				scrollTop: -40,
				duration: 1000,
				success(_res) {
					console.log(`pageScrollTo调用成功`);
				},
				fail(res) {
					console.log(`pageScrollTo调用失败`, res.errMsg);
				}
			});
			this.setData({
				timebefore: options.timeStamp
			});
		} else {
			this.setData({
				timebefore: options.timeStamp
			});
		}
		var cur = options.target.dataset.current;
		if (this.data.currentTab == cur) {
			return false;
		} else {
			this.setData({
				currentTab: cur
			});
			if (options.target.dataset.current == '1') {
				request({
					url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab2currentid
				}).then((result) => {
					console.log(result);
					this.setData({
						Tab2swiperList: result.data.result
					});
				});
			}
			if (options.target.dataset.current == '2') {
				request({
					url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab3currentid
				}).then((result) => {
					console.log(result);
					this.setData({
						Tab3swiperList: result.data.result
					});
				});
			}
			if (options.target.dataset.current == '3') {
				request({
					url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab4currentid
				}).then((result) => {
					console.log(result);
					this.setData({
						Tab4swiperList: result.data.result
					});
				});
			}
		}
	},
	onPullDownRefresh: function(e) {
		request({
			url: 'https://api.apiopen.top/videoCategoryDetails?id=24'
		})
			.then((result) => {
				console.log(result);
				this.setData({
					Tab1swiperList: result.data.result
				});
			})
			.then((res) => {
				tt.hideNavigationBarLoading(); //完成停止加载
				tt.stopPullDownRefresh(); //停止下拉刷新
			});
	},
	onReachBottom: function(e) {
		if (this.data.currentTab == '0') {
			this.setData({
				Tab1currentid: this.data.Tab1currentid + 1,
				hidden: false
			});
			request({
				url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab1currentid
			}).then((result) => {
				// console.log(result);
				var tempList = this.data.Tab1swiperList;
				var tempList = tempList.concat(result.data.result);
				this.setData({
					Tab1swiperList: tempList,
					// winHeight: this.data.winHeight+2680,
					hidden: true
				});
			});
			return;
		}
		if (this.data.currentTab == '1') {
			this.setData({
				Tab2currentid: this.data.Tab2currentid + 1,
				hidden: false
			});
			request({
				url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab2currentid
			}).then((result) => {
				// console.log(result);
				var tempList = this.data.Tab2swiperList;
				var tempList = tempList.concat(result.data.result);
				this.setData({
					Tab2swiperList: tempList,
					// winHeight: this.data.winHeight + 2680,
					hidden: true
				});
			});
		}
		if (this.data.currentTab == '2') {
			this.setData({
				Tab3currentid: this.data.Tab3currentid + 1,
				hidden: false
			});
			request({
				url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab3currentid
			}).then((result) => {
				console.log(result);
				var tempList = this.data.Tab3swiperList;
				var tempList = tempList.concat(result.data.result);
				this.setData({
					Tab3swiperList: tempList,
					// winHeight: this.data.winHeight + 2680,
					hidden: true
				});
			});
		}
		if (this.data.currentTab == '3') {
			this.setData({
				Tab4currentid: this.data.Tab4currentid + 1,
				hidden: false
			});
			request({
				url: 'https://api.apiopen.top/videoRecommend?id=' + this.data.Tab4currentid
			}).then((result) => {
				console.log(result);
				var tempList = this.data.Tab4swiperList;
				var tempList = tempList.concat(result.data.result);
				this.setData({
					Tab4swiperList: tempList,
					// winHeight: this.data.winHeight + 2680,
					hidden: true
				});
			});
		}
	},
	videoTap: function(e) {
		var that = this;
		var curIdx = e.currentTarget.dataset.index;

		if (that.data.videoCurrent != -1) {
			var videoContextPrev = tt.createVideoContext('myVideo' + that.data.videoCurrent);
			if (that.data.videoCurrent != curIdx) {
				videoContextPrev.pause();
			}
			that.setData({
				videoCurrent: curIdx
			});
			var videoContextCurrent = tt.createVideoContext('myVideo' + curIdx);
			videoContextCurrent.play();
		} else {
			that.setData({
				videoCurrent: curIdx
			});
			var videoContext = tt.createVideoContext('myVideo' + curIdx);
			videoContext.play();
		}
	},
	imageTap: function(e) {
		console.log(e);
		var CurrentVideo = e.currentTarget.dataset.index;
		if (this.data.currentTab == 0) {
			if (this.data.Tab1PreVideo == -1 || this.data.Tab1PreVideo == CurrentVideo) {
				// console.log('第一次播放')
				this.setData({
					['Tab1videoshow[' + CurrentVideo + ']']: true,
					Tab1PreVideo: CurrentVideo
				});
			} else {
				// console.log('不是第一次')
				this.setData({
					['Tab1videoshow[' + this.data.Tab1PreVideo + ']']: false,
					['Tab1videoshow[' + CurrentVideo + ']']: true,
					Tab1PreVideo: CurrentVideo
				});
			}
		}
		if (this.data.currentTab == 1) {
			if (this.data.Tab2PreVideo == -1 || this.data.Tab2PreVideo == CurrentVideo) {
				// console.log('第一次播放')
				this.setData({
					['Tab2videoshow[' + CurrentVideo + ']']: true,
					Tab2PreVideo: CurrentVideo
				});
			} else {
				// console.log('不是第一次')
				this.setData({
					['Tab2videoshow[' + this.data.Tab2PreVideo + ']']: false,
					['Tab2videoshow[' + CurrentVideo + ']']: true,
					Tab2PreVideo: CurrentVideo
				});
			}
		}
		if (this.data.currentTab == 2) {
			if (this.data.Tab3PreVideo == -1 || this.data.Tab3PreVideo == CurrentVideo) {
				// console.log('第一次播放')
				this.setData({
					['videoshow[' + CurrentVideo + ']']: true,
					Tab3PreVideo: CurrentVideo
				});
			} else {
				// console.log('不是第一次')
				this.setData({
					['Tab3videoshow[' + this.data.Tab3PreVideo + ']']: false,
					['Tab3videoshow[' + CurrentVideo + ']']: true,
					Tab3PreVideo: CurrentVideo
				});
			}
		}
		if (this.data.currentTab == 3) {
			if (this.data.Tab4PreVideo == -1 || this.data.Tab4PreVideo == CurrentVideo) {
				// console.log('第一次播放')
				this.setData({
					['Tab4videoshow[' + CurrentVideo + ']']: true,
					Tab4PreVideo: CurrentVideo
				});
			} else {
				// console.log('不是第一次')
				this.setData({
					['Tab4videoshow[' + this.data.Tab4PreVideo + ']']: false,
					['Tab4videoshow[' + CurrentVideo + ']']: true,
					Tab4PreVideo: CurrentVideo
				});
			}
		}
		// var videoContextPrev = tt.createVideoContext('myVideo' + CurrentVideo);
		// videoContextPrev.play();
	},
	scrollToBottom:function(e){
		console.log('hello')
	},
	videoNavigateTo:function(e){
		var videourl=e.currentTarget.dataset.url
		var url=encodeURIComponent(videourl)
		// var coverurl=e.currentTarget.dataset.cover
		var cover=e.currentTarget.dataset.cover
		console.log(cover)
		var title=e.currentTarget.dataset.title
		tt.navigateTo({
		  url: '/pages/videoDetail/vedieoDetail?title='+title+'&videourl='+url+'&cover='+cover ,// 指定页面的url
		  success(res) {
			// console.log(res);
		  },
		  fail(res) {
			console.log("navigateTo调用失败");
		  },
		});
	}
});