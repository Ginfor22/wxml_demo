const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

function initData(that) {
  inputVal = '';
  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '愿您健康，愿您快乐，但愿我千万个祝福永远陪伴您左右！'
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '你好'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}
Page({
  data: {
    scrollHeight: '100vh',
    inputBottom: 0
  },
  onLoad: function(options) {
    initData(this);
    this.setData({
    });
  },
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
  },

  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    // wx.navigateBack({})
    wx.navigateBack({})
  }


})
