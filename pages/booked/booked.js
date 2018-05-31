// pages/booked/booked.js
const app = getApp();
const config = app.globalData.config;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime:  null,
    multiArray: [[], []],
    multiIndex: [0, 0],
    exps: null,
    visible: false,
    iconType: null,
    description: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    try {
      const date = new Date();
      const years = date.getFullYear();
      const months = date.getMonth() + 1;
      const days = date.getDate();
      let minutes = date.getMinutes();
      let hours = date.getHours();
      hours = hours >= 10 ? hours:`0${hours}`;
      minutes = minutes >= 10 ? minutes:`0${minutes}`;
      const time = `${hours}:${minutes}`;
      this.setData({
        date: `${years}-${months}-${days}`,
        startDate: `${years}-${months}-${days}`,
        endDate: `${years}-${months}-${days + 7}`,
        startTime: time,
        endTime: time
      });
      this.pullRestExp();
    } catch (e) {
    }
  },
  bindDateChange: function (e) {
    const date = e.detail.value;
    this.setData({
      date: date
    });
  },
  bindStartTimeChange: function (e) {
    const time = e.detail.value;
    this.setData({
      startTime: time
    });
  },
  bindEndTimeChange: function (e) {
    const time = e.detail.value;
    this.setData({
      endTime: time
    });
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    });
  },
  bindMultiPickerColumnChange: function (e) {
    const column = e.detail.column;
    const value = e.detail.value;
    const multiArray = this.data.multiArray;
    const multiIndex = this.data.multiIndex;
    const exps = this.data.exps;
    multiIndex[column] = value;
    if (column == 0) {
      multiArray[1] = [];
      for (let i = 0; i < exps[value].children.length; i++) {
        multiArray[1].push({
          id: exps[value].children[i].value,
          name: exps[value].children[i].label
        });
      }
      multiIndex[1] = 0;
    }
    this.setData({
      multiArray: multiArray,
      multiIndex: multiIndex
    });
  },
  pullRestExp: function () {
    try {
      const date = this.data.date;
      let start = this.data.startTime;
      let end = this.data.endTime;
      if (date && start && end) {
        wx.request({
          url: `${config.server}/api/restexps`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            date,
            start,
            end
          }),
          success: (res) => {
            if (res.data && res.data.err == 0) {
              const exps = res.data.exps;
              const multiArray = this.data.multiArray;
              for (let i = 0; i < exps.length; i++) {
                multiArray[0].push({
                  id: exps[i].value,
                  name: exps[i].label
                });
              }
              for (let i = 0; i < exps[0].children.length; i++) {
                multiArray[1].push({
                  id: exps[0].children[i].value,
                  name: exps[0].children[i].label
                });
              }
              this.setData({
                exps: exps,
                multiArray: multiArray
              });
            }
          }
        });
      }
    } catch (e) {
    }
  },
  formSubmit: function (e) {
    if (!app.globalData.login) {
      return wx.navigateTo({
        url: '/pages/login/login',
      });
    }
    const value = e.detail.value;
    const multiIndex = value.location;
    const multiArray = this.data.multiArray;
    value.exp = multiArray[0][multiIndex[0]].id;
    value.tab = multiArray[1][multiIndex[1]].id;
    delete value.location;
    if (!value.exp || !value.tab) {
      return 0;
    }
    try {
      const token = wx.getStorageSync('token');
      wx.request({
        url: `${config.server}/api/user/addreserve`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        data: JSON.stringify(value),
        success: (res) => {
          console.log(res);
          if (res.data && res.data.err == 0) {
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
    } catch (e) {
    }
  },
  bindSure: function () {
    this.setData({
      visible: false
    });
    if (this.data.iconType == 'success') {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
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