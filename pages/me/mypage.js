import { request } from '../../request/index.js';
Page({
	data: {
		winHeight: '',
		username: '',
		password: '',
		imageurl: '',
		nickname: '',
		imageshow: true,
		isLogin: false,
		hasUserInfo: false,
		tabshow: false
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		});
	},
	onTabItemTap(item) {
		console.log(item);
	},
	onShow: function() {
		// 生命周期函数--监听页面显示
		// wx.hideTabBar({})
	},
	onLoad: function() {
		tt.getSystemInfo({
			success: (res) => {
				var clientHeight = res.windowHeight;
				var clientWidth = res.windowWidth;
				var rpxR = 750 / clientWidth;
				var calc = clientHeight * rpxR - 180;
				// console.log(calc);
				this.setData({
					winHeight: clientHeight
				});
			}
		});
	},
	// 获取输入账号
	usernameInput: function(e) {
		this.setData({
			username: e.detail.value
		});
	},

	// 获取输入密码
	passwordInput: function(e) {
		this.setData({
			password: e.detail.value
		});
	},

	// 登录处理
	login: function() {
		var image = '';
		// if (this.data.username.length == 0 || this.data.password.length == 0) {

		// 	tt.showToast({
		// 		title: '账号或密码不能为空',
		// 		icon: 'none',
		// 		duration: 2000
		// 	});
		// } else {
		var that = this;
		// tt.hideTabBar();
		tt.checkSession({
			success() {
				console.log(`session 未过期`);
				tt.login({
					force: true,
					success(res) {
						console.log(`login 调用成功${res.code} 还有${res.isLogin}`);

						tt.getUserInfo({
							// withCredentials: true,
							// withRealNameAuthenticationInfo: true,
							success(res) {
								console.log(`getUserInfo 调用成功`, res.userInfo);
								image = res.userInfo.avatarUrl;
								that.setData({
									imageurl: image,
									nickname: res.userInfo.nickName,
									hasUserInfo: true,
									isLogin: true,
									imageshow: false
								});
								// tt.redirectTo({
								//   url: './meDetail/meDetail' ,// 指定页面的url
								//   success(res) {
								// 	console.log(res);
								//   },
								//   fail(res) {
								// 	console.log(`switchTab调用失败`);
								//   },
								// });
							},
							fail(res) {
								tt.showModal({
									title: '提示',
									content: '获取用户信息失败，这将影响您使用小程序，是否重新设置授权？',
									showCancel: true,
									cancelText: '否',
									confirmText: '是',
									success: function(res) {
										if (res.confirm) {
											tt.openSetting({
												success: function(res) {
													console.log(res);
													if (res.authSetting['scope.userInfo'] === true) {
														tt.getUserInfo({
															success: function(res) {
																console.log('重新登录成功');
																var userInfo = res.userInfo;
																var nickName = userInfo.nickName; //用户名
																var avatarUrl = userInfo.avatarUrl; //头像
																console.log('获取登录用户的所有信息');
																console.log(res.userInfo);
																that.setData({
																	imageurl: avatarUrl,
																	nickname: nickName,
																	hasUserInfo: true,
																	isLogin: true,
																	imageshow: false
																});
															}
														});
													}
												}
											});
										} else if (res.cancel) {
											console.log('用户取消授权个人信息');
										}
									}
								});
							}
						});
					}
				});
			},
			fail() {
				console.log(`session 已过期，需要重新登录`);
				tt.login({
					success: (res) => {
						console.log('登录成功', res);
					},
					fail: (err) => {
						console.log('登录失败', err);
					}
				});
			}
		});
	},
	loginout: function() {
		// tt.redirectTo({
		//   url: './mypage' // 指定页面的url
		// });
		var that =this
		tt.showModal({
			title: '提示',
			content: '是否确定退出登陆？',
			showCancel: true,
			cancelText: '否',
			confirmText: '是',
			success: function(res) {
				if (res.confirm) {
					that.setData({
						imageurl: '',
						nickname: '',
						hasUserInfo: false,
						isLogin: false,
						imageshow: true
					});
				} else {
				}
			}
		});
	}
});
// 访问获取openid
// tt.request({
//   url: 'https://developer.toutiao.com/api/apps/jscode2session', // 目标服务器url
//   data: {
//   },
//   success: (result) => {
//     console.log(result)
//   }
// });
