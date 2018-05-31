//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    visible: false,
    iconType: 'warn',
    description: ''
  },
  bindScanning: function () {
    const login = app.globalData.login;
    if (login) {
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          const label = JSON.parse(res.result).label;
          if (label == 'hdu_race_laboratory') {
            this.scanningOpen();
          } else {
            this.setData({
              visible: true,
              iconType: 'warn',
              description: '二维码无效'
            });
          }
        }
      });
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }
  },
  scanningOpen: function () {
    const config = app.globalData.config;
    const token = wx.getStorageSync('token');
    wx.request({
      url: `${config.server}/api/scanning/open`,
      method: 'GET',
      header: {
        'x-access-token': token
      },
      success: (res) => {
        if (res.data.err == 0) {
          this.setData({
            visible: true,
            iconType: 'success',
            description: res.data.msg
          });
        } else {
          this.setData({
            visible: true,
            iconType: 'warn',
            description: res.data.msg
          });
        }
      }
    });
  },
  bindCancelModal: function (e) {
    if (e.target.id != e.currentTarget.id) {
      return;
    }
    this.setData({
      visible: false
    });
  },
  onLoad: function () {
  },
})
