// pages/profile/profile.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const userInfo = app.globalData.userInfo;
    console.log(userInfo);
    switch (userInfo.grade) {
      case 1:
        userInfo.grade = "一年级";
        break;
      case 2:
        userInfo.grade = "二年级";
        break;
      case 3:
        userInfo.grade = "三年级";
        break;
      case 4:
        userInfo.grade = "四年级";
        break;
      default:
        userInfo.grade = "未知";
        break;
    }
    this.setData({
      userInfo: userInfo
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