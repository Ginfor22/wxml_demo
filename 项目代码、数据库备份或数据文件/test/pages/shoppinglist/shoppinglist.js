//index.js
var app = getApp()
Page({
  data: {
    goodsList: {
      saveHidden: true,
      totalPrice: 0,
      allSelect: true,
      noSelect: false,
      list: []
    },
    shopDeliveryPrice:[],
    delBtnWidth: 120,    //删除按钮宽度单位（rpx）
  },

  buyBtn:function(e){
      wx.switchTab({
        url: '/pages/sort/sort',
      })
}
  
  


})
