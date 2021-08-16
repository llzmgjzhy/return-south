// e:\programming\字节小程序\归南\归南\pages\index\index
//引用发送请求的方法 需要把路径补充完整
import { request } from '../../request/index.js';
const app = getApp();
Page({
	data: {
		winHeight: 2000,
		currentTab: 0, //预设当前项的值
		scrollLeft: 0, //tab标题的滚动条位置
		currentPage: 1, //当前页数，默认为1
		showSearch: true,
		Tab1swiperList: [], //首页的数据
		Tab2swiperList: [],
		Tab3swiperList: [],
		Tab4swiperList: [],
		Tab1timerecord: [], //记录经过处理的时间
		Tab1times: [], //在页面显示的经过处理额时间
		Tab2timeRecord: [],
		Tab2times: [],
		Tab3timeRecord: [],
		Tab3times: [],
		Tab4timeRecord: [],
		Tab4times: [],
		hidden: true
	},
	onReady: function(options) {},
	onLoad: function(options) {
		this.initLoad();
		var that = this;
		// 高度自适应
		tt.getSystemInfo({
			success: (res) => {
				var clientHeight = res.windowHeight;
				var clientWidth = res.windowWidth;
				var rpxR = 750 / clientWidth;
				var calc = clientHeight * rpxR - 180;
				// console.log(calc);
				that.setData({
					winHeight: calc
				});
			}
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
		// http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html   网易新闻api
		// http://v.juhe.cn/toutiao/index?type=top&key=3dc86b09a2ee2477a5baa80ee70fcdf5  聚合api
		// http://v.juhe.cn/toutiao/index?type=&page=&page_size=&is_filter=1&key=5ddab5a7bc994f03649b1920f835ca6c 我的聚合api

		request({
			url:
				'http://v.juhe.cn/toutiao/index?type=top&page=1&page_size=20&is_filter=1&key=5ddab5a7bc994f03649b1920f835ca6c'
		})
			.then((result) => {
				console.log(result);
				this.setData({
					Tab1swiperList: result.data.result.data
				});
				for (let i = 0; i < 20; i++) {
					this.data.Tab1swiperList[i].date = this.timesFun(this.data.Tab1swiperList[i].date);
					this.data.Tab1timerecord[i] = this.data.Tab1swiperList[i].date.timesString;
				}
			})
			.then((res) => {
				this.setData({
					Tab1times: this.data.Tab1timerecord
				});
			});
	},
	switchTab: function(e) {
		this.setData({
			currentTab: e.detail.current
		});
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
		if (e.detail.current == '1') {
			request({
				url: 'http://v.juhe.cn/toutiao/index?type=yule&page=1&page_size=20&is_filter=1&key=5ddab5a7bc994f03649b1920f835ca6c'
			})
				.then((result) => {
					console.log(result);
					this.setData({
						Tab2swiperList: result.data.result.data
					});
					for (let i = 0; i < 20; i++) {
						this.data.Tab2swiperList[i].date = this.timesFun(this.data.Tab2swiperList[i].date);
						this.data.Tab2timeRecord[i] = this.data.Tab2swiperList[i].date.timesString;
					}
				})
				.then((res) => {
					this.setData({
						Tab2times: this.data.Tab2timeRecord
					});
				});
		}
		if (e.detail.current == '2') {
			request({
				url: 'http://v.juhe.cn/toutiao/index?type=tiyu&page=1&page_size=20&is_filter=1&key=5ddab5a7bc994f03649b1920f835ca6c'
			})
				.then((result) => {
					console.log(result);
					this.setData({
						Tab3swiperList: result.data.result.data
					});
					for (let i = 0; i < 20; i++) {
						this.data.Tab3swiperList[i].date = this.timesFun(this.data.Tab3swiperList[i].date);
						this.data.Tab3timeRecord[i] = this.data.Tab3swiperList[i].date.timesString;
					}
				})
				.then((res) => {
					this.setData({
						Tab3times: this.data.Tab3timeRecord
					});
				});
		}
		if (e.detail.current == '3') {
			request({
				url: 'http://v.juhe.cn/toutiao/index?type=caijing&page=1&page_size=20&is_filter=1&key=5ddab5a7bc994f03649b1920f835ca6c'
			})
				.then((result) => {
					console.log(result);
					this.setData({
						Tab3swiperList: result.data.result.data
					});
					for (let i = 0; i < 20; i++) {
						this.data.Tab3swiperList[i].date = this.timesFun(this.data.Tab3swiperList[i].date);
						this.data.Tab3timeRecord[i] = this.data.Tab3swiperList[i].date.timesString;
					}
				})
				.then((res) => {
					this.setData({
						Tab3times: this.data.Tab3timeRecord
					});
				});
		}
	},
	switchNav: function(e) {
		if (this.data.timebefore == 0) {
			this.setData({
				timebefore: e.timeStamp
			});
			return;
		}
		this.setData({
			timenow: e.timeStamp
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
				timebefore: e.timeStamp
			});
		} else {
			this.setData({
				timebefore: e.timeStamp
			});
		}
		var cur = e.target.dataset.current;
		if (this.data.currentTab == cur) {
			return false;
		} else {
			this.setData({
				currentTab: cur
			});
			if ( e.target.dataset.current == '1') {
				request({
					url: 'http://v.juhe.cn/toutiao/index?type=yule&page=1&page_size=20&is_filter=1&key=5ddab5a7bc994f03649b1920f835ca6c'
				})
					.then((result) => {
						console.log(result);
						this.setData({
							Tab2swiperList: result.data.result.data
						});
						for (let i = 0; i < 20; i++) {
							this.data.Tab2swiperList[i].date = this.timesFun(this.data.Tab2swiperList[i].date),
							this.data.Tab2timeRecord[i] = this.data.Tab2swiperList[i].date.timesString;
						}
					})
					.then((res) => {
						this.setData({
							Tab2times: this.data.Tab2timeRecord
						});
					});
			}
			if ( e.target.dataset.current == '2') {
				request({
					url: 'http://v.juhe.cn/toutiao/index?type=tiyu&page=1&page_size=20&is_filter=1&key=5ddab5a7bc994f03649b1920f835ca6c'
				})
					.then((result) => {
						console.log(result);
						this.setData({
							Tab3swiperList: result.data.result.data
						});
						for (let i = 0; i < 20; i++) {
							this.data.Tab3swiperList[i].date = this.timesFun(this.data.Tab3swiperList[i].date),
							this.data.Tab3timeRecord[i] = this.data.Tab3swiperList[i].date.timesString;
						}
					})
					.then((res) => {
						this.setData({
							Tab3times: this.data.Tab3timeRecord
						});
					});
			}
			if ( e.target.dataset.current == '3') {
				request({
					url: 'http://v.juhe.cn/toutiao/index?type=caijing&page=1&page_size=20&is_filter=1&key=5ddab5a7bc994f03649b1920f835ca6c'
				})
					.then((result) => {
						console.log(result);
						this.setData({
							Tab4swiperList: result.data.result.data
						});
						for (let i = 0; i < 20; i++) {
							this.data.Tab4swiperList[i].date = this.timesFun(this.data.Tab4swiperList[i].date);
							this.data.Tab4timeRecord[i] = this.data.Tab4swiperList[i].date.timesString;
						}
					})
					.then((res) => {
						this.setData({
							Tab4times: this.data.Tab4timeRecord
						});
					});
			}
		}
	},
	navToArticle: function(e) {
		console.log(e);
		let urllocation = e.path;
		tt.navigateTo({
			url: urllocation, // 指定页面的url
			success(res) {
				console.log('调用成功');
			},
			fail(res) {
				console.log('navigateTo调用失败');
			}
		});
	},
	timesFun: function(timesData) {
		//获取时间差
		var dateBegin = new Date(timesData.replace(/-/g, '/')); //将-转化为/，使用new Date
		var dateEnd = new Date(); //获取当前时间
		var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
		var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
		var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
		var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
		//计算相差分钟数
		var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
		var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
		//计算相差秒数
		var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
		var seconds = Math.round(leave3 / 1000);
		var timesString = '';

		if (dayDiff != 0) {
			timesString = dayDiff + '天之前';
		} else if (dayDiff == 0 && hours != 0) {
			timesString = hours + '小时之前';
		} else if (dayDiff == 0 && hours == 0) {
			timesString = minutes + '分钟之前';
		}
		return {
			timesString: timesString
		};
	},
	loadmore: function(e) {
		console.log(e);
		this.setData({
			hidden: false
		});
	},
	onPullDownRefresh: function(e) {
		console.log(this.data.currentTab);
		let tab = this.data.currentTab;
		if (tab == 0) {
			request({
				url: 'http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html'
			})
				.then((result) => {
					// console.log(result);
					this.setData({
						Tab1swiperList: result.data.T1348647853363
					});
					for (let i = 0; i < 41; i++) {
						this.data.Tab1swiperList[i].mtime = this.timesFun(this.data.Tab1swiperList[i].mtime);
						this.data.Tab1timerecord[i] = this.data.Tab1swiperList[i].mtime.timesString;
					}
				})
				.then((res) => {
					this.setData({
						Tab1times: this.data.Tab1timerecord
					});
					tt.hideNavigationBarLoading(); //完成停止加载

					tt.stopPullDownRefresh(); //停止下拉刷新
				});
		}
		if (tab == 1) {
			request({
				url: 'http://c.3g.163.com/nc/article/list/T1348648517839/0-20.html'
			})
				.then((result) => {
					console.log(result);
					this.setData({
						Tab2swiperList: result.data.T1348648517839
					});
					for (let i = 0; i < 20; i++) {
						this.data.Tab2swiperList[i].mtime = this.timesFun(this.data.Tab2swiperList[i].mtime);
						this.data.Tab2timeRecord[i] = this.data.Tab2swiperList[i].mtime.timesString;
					}
				})
				.then((res) => {
					this.setData({
						Tab2times: this.data.Tab2timeRecord
					});
					tt.hideNavigationBarLoading(); //完成停止加载

					tt.stopPullDownRefresh(); //停止下拉刷新
				});
		}
		if (tab == 2) {
			request({
				url: 'http://c.3g.163.com/nc/article/list/T1348649079062/0-20.html'
			})
				.then((result) => {
					console.log(result);
					this.setData({
						Tab3swiperList: result.data.T1348649079062
					});
					for (let i = 0; i < 20; i++) {
						this.data.Tab3swiperList[i].mtime = this.timesFun(this.data.Tab3swiperList[i].mtime);
						this.data.Tab3timeRecord[i] = this.data.Tab3swiperList[i].mtime.timesString;
					}
				})
				.then((res) => {
					this.setData({
						Tab3times: this.data.Tab3timeRecord
					});
					tt.hideNavigationBarLoading(); //完成停止加载

					tt.stopPullDownRefresh(); //停止下拉刷新
				});
		}
		if (tab == 3) {
			request({
				url: 'http://c.3g.163.com/nc/article/list/T1467284926140/0-20.html '
			})
				.then((result) => {
					console.log(result);
					this.setData({
						Tab4swiperList: result.data.T1467284926140
					});
					for (let i = 0; i < 10; i++) {
						this.data.Tab4swiperList[i].mtime = this.timesFun(this.data.Tab4swiperList[i].mtime);
						this.data.Tab4timeRecord[i] = this.data.Tab4swiperList[i].mtime.timesString;
					}
				})
				.then((res) => {
					this.setData({
						Tab4times: this.data.Tab4timeRecord
					});
					tt.hideNavigationBarLoading(); //完成停止加载

					tt.stopPullDownRefresh(); //停止下拉刷新
				});
		}
	},
	onReachBottom: function(e) {
		this.setData({
			currentPage: this.data.currentPage + 1,
		});
		request({
			url:
				'http://v.juhe.cn/toutiao/index?type=top&page=' +
				this.data.currentPage +
				'&page_size=20&is_filter=1&key=5ddab5a7bc994f03649b1920f835ca6c'
		})
			.then((result) => {
				console.log(result);
				this.setData({
					Tab1swiperList: this.data.Tab1swiperList.concat(result.data.result.data),
					// winHeight: this.data.winHeight + 2000
				});
				for (let i = 0; i < 40; i++) {
					this.data.Tab1swiperList[i].mtime = this.timesFun(this.data.Tab1swiperList[i].mtime);
					this.data.Tab1timerecord[i] = this.data.Tab1swiperList[i].mtime.timesString;
				}
			})
			.then((res) => {
				this.setData({
					Tab1times: this.data.Tab1timerecord,
					hidden:true
				});
			});
	}
});
