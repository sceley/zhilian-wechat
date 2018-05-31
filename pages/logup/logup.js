// pages/logup/logup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderArray: [{
      id: 1,
      name: '男'
    }, {
      id: 0,
      name: '女'
    }],
    genderIndex: 0,
    gradeIndex: 0,
    gradeArray: [{
      id: 1,
      name: '大一'
    }, {
      id: 2,
      name: '大二'
    }, {
      id: 3,
      name: '大三'
    }, {
      id: 4,
      name: '大四'
    }],
    config: null,
    visible: false,
    iconType: null,
    description: null
  },
  formSubmit: function (e) {
    const value = e.detail.value;
    value.gender = this.data.genderArray[value.gender].id;
    value.grade = this.data.gradeArray[value.grade].id;
    if (value.password != value['confirm-password']) {
      return this.setData({
        visible: true,
        iconType: 'warn',
        description: "两次密码不匹配"
      });
    }
    delete value['confirm-password'];
    const config = this.data.config;
    wx.request({
      url: `${config.server}/api/mobile/user/logup`,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(value),
      success: (res) => {
        console.log(res);
        if (res.data && res.data.err == 0) {
          this.setData({
            visible: true,
            iconType: 'success',
            description: '注册成功'
          });
        } else {
          this.setData({
            visible: true,
            iconType: 'warn',
            description: res.data.msg
          });
        }
      }
    })
  },
  bindSexChange: function (e) {
    this.setData({
      genderIndex: e.detail.value
    });
  },
  bindGradeChange: function (e) {
    this.setData({
      gradeIndex: e.detail.value
    });
  },
  bindSure: function () {
    if (this.data.iconType == 'success') {
      wx.switchTab({
        url: '/pages/mine/mine',
      });
    } else {
      this.setData({
        visible: false
      });
    }
  },
  bindModalCancel: function (e) {
    if (e.target.id != e.currentTarget.id) {
      return;
    } else {
      this.setData({
        visible: false
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const appInstance = getApp();
    this.setData({
      config: appInstance.globalData.config
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