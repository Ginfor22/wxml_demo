Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '待付款', index: 0 }, { name: '待收货', index: 1 }, { name: '待评价', index: 2 }],
  },
 
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },
 
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
 
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
 
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.waitPayShow()
        break
      case 1:
        that.waitRecieveShow()
        break
      case 2:
        that.waitCommentShow()
        break
    }
  },
  waitPayShow:function(){
    this.setData({
      waitPayOrder: [{ name: "蝈蝈自制在线商城", state: "待付款", introduce: "梅雪仿花罗日常汉服", status: "未付款", url: "/images/q4.jpg", money: "239.00" }, { name: "蝈蝈自制在线商城", state: "待付款", introduce: "棠棠者华绿意春夏马面",status: "未付款", url: "/images/14.jpg", money: "229.00" }],
    })
  },
  waitRecieveShow: function(){
    this.setData({
      waitRecieveOrder: [{ name: "蝈蝈自制在线商城", state: "待收货", introduce: "珍珠白鸢尾与勿忘草半袖褂子",status: "已付款", url: "/images/q19.jpg", money: "386.00" }]
    })
  },
 
  waitCommentShow: function () {
    this.setData({
      waitCommentOrder: [{ name: "蝈蝈自制商城", state: "待评价", introduce: "明制竖领对襟衫琵琶",status: "已付款", url: "/images/q9.jpg", money: "339.00" }],
    })
  },
 
  
})
 