var area = require('../../utils/area.js');
var areaInfo = []; //所有省市区县数据
var provinces = []; //省
var provinceNames = []; //省名称
var citys = []; //城市
var cityNames = []; //城市名称
var countys = []; //区县
var countyNames = []; //区县名称
var value = [0, 0, 0]; //数据位置下标
var addressList = null;

Page({
  data: {
    transportValues: ["收货时间不限", "周六日/节假日收货", "周一至周五收货"],
    transportIndex: 0,
  },
  bindTransportDayChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
    transportIndex: e.detail.value
    })
  },
  saveAddress: function(e) {
    var consignee = e.detail.value.consignee;
    var mobile = e.detail.value.mobile;
    var transportDay = e.detail.value.transportDay;
    var address = e.detail.value.address;
    console.log(transportDay + "," + address);
    var arr = wx.getStorageSync('addressList') || [];
    console.log("arr,{}", arr);
    addressList = {
      consignee: consignee,
      mobile: mobile,
      address:address,
      transportDay: transportDay
    }
    arr.push(addressList);
    wx.setStorageSync('addressList', arr);
    wx.navigateBack({
    })
  }
})
