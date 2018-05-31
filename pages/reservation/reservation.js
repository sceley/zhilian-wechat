// pages/reservation/reservation.js
const utildate = require('../../utils/date.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: null,
    reservations: [],
    visible: false,
    cancelId: null,
    description: '确定删除？',
    iconType: 'warn'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const appInstance = getApp();
    const config = appInstance.globalData.config;
    const value = wx.getStorageSync('token');
    wx.request({
      url: `${config.server}/api/user/reserves`,
      method: 'GET',
      header: {
        'x-access-token': value
      },
      success: (res) => {
        if (res.data && !res.data.err) {
          let reservations = res.data.reserves;
          reservations = reservations.map(reservation => {
            reservation.date = utildate.getMonth(reservation.date);
            switch(reservation.status) {
              case 0:
                reservation.status = '待审核';
                break;
              case 1:
                reservation.status = "已审核";
                break;
              case 2:
                reservation.status = "执行中";
                break;
              case 3:
                reservation.status = "已执行";
                break;
              default:
                reservation.status = "未知";
                break;
            };
            return reservation;
          });
          this.setData({
            reservations: reservations
          });
        }
      }
    });
    this.setData({
      config: config
    });
  },
  bindCancel: function (e) {
    this.setData({
      visible: true,
      cancelId: e.target.id
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
  bindSureCancel: function (e) {
    const id = this.data.cancelId;
    const value = wx.getStorageSync('token');
    const config = this.data.config;
    wx.request({
      url: `${config.server}/api/user/reserve/${id}`,
      method: 'DELETE',
      header: {
        'x-access-token': value
      },
      success: (res) => {
        console.log(res);
        if (res.data.err == 0) {
          console.log('visible');
          let reservations = this.data.reservations;
          reservations = reservations.filter(reservation => reservation.id != id);
          this.setData({
            reservations: reservations,
            visible: false
          });
        }
      }
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