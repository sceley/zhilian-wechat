//app.js
const config = require('./config.js');
App({
  onLaunch: function () {
    this.globalData.config = config;
    try {
      const token = wx.getStorageSync('token')
      if (token) {
        this.globalData.login = true;
        this.pullUserInfo();
      }
    } catch (e) {
    }
  },
  globalData: {
    userInfo: null,
    config: null,
    login: false
  },
  pullUserInfo: function (cb) {
    try {
      const token = wx.getStorageSync('token');
      wx.request({
        url: `${config.server}/api/user/info`,
        method: 'GET',
        header: {
          'x-access-token': token
        },
        success: (res) => {
          if (res.data && res.data.err == 0) {
            this.globalData.userInfo = res.data.user;
            if (cb) {
              cb();
            }
          }
        }
      });
    } catch (e) {
    }
  }
});