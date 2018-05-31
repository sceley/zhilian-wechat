// pages/login/login.js
const app = getApp();
const config = app.globalData.config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    iconType: null,
    description: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  navigation: function (e) {
    wx.navigateTo({
      url: '/pages/logup/logup'
    });
  },
  formSubmit: function (e) {
    const body = e.detail.value;
    if (!body.account) {
      return this.setData({
        visible: true,
        iconType: 'warn',
        description: "账号不能为空"
      });
    }
    if (!(body.password && body.password.length >= 6 && body.password.length <= 16)) {
      return this.setData({
        visible: true,
        iconType: 'warn',
        description: "密码为6-16位"
      });
    }
    wx.request({
      url: `${config.server}/api/user/login`,
      method: 'POST',
      data: JSON.stringify(body),
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        if (res.data && res.data.err == 0) {
          try {
            wx.setStorageSync('token', res.data.token);
            app.globalData.login = true;
            app.pullUserInfo(() => {
              wx.navigateBack();
            });
          } catch (e) {
          }
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
  bindSure: function () {
    this.setData({
      visible: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})