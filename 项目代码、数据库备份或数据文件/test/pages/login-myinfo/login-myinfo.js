//var app = getApp()
const app =getApp()
Page({  
    data: {   
      login: false,
      count_id_no_confirm: 0,
      count_id_no_pay: 0,
      count_id_no_reputation: 0,
      count_id_no_transfer: 2,
      userInfo: {},    
      hasUserInfo: false,        
      canIUse: wx.canIUse('button.open-type.getUserInfo'),   
      orderItems: [
      {        
        id: 1,        
        name: '待付款',        
        url: 'bill',        
        imageurl: '/images/pay.png',
      },
      {        
        id: 2,        
        name: '待收货',        
        url: 'bill',        
        imageurl: '/images/deliver.png',
      },
      {        
        id: 3,        
        name: '待评价',        
        url: 'bill',        
        imageurl: '/images/recieve.png'
      },
      {        
        id: 4,        
        name: '售后',        
        url: 'bill',        
        imageurl: '/images/aftersales.png'
      }
    ],
    menuitems: [
      { id:'1',text: '我的收藏', url: '#', arrows: '/images/jiantou.png'},
      { id:'2',text: '地址管理', url: '#', arrows: '/images/jiantou.png'},
      { id:'3',text: '在线客服', url: '#', arrows: '/images/jiantou.png' },
      { id:'4',text: '账号管理', url: '#', arrows: '/images/jiantou.png'}
    ]
  },  
login() {
    wx.navigateTo({
    url: '/pages/login/login',
    })
},
//事件处理函数
toOrder: function (e) {
  var $id = e.currentTarget.dataset.id;
  console.log($id)
  if ("1"== $id){
    wx.navigateTo({
      url:'/pages/myorder/myorder',
    })
  }
  if ("2" == $id) {
    wx.navigateTo({
      url:'/pages/myorder/myorder',
    })
  }
  if ("3" == $id) {
    wx.navigateTo({
      url: '/pages/myorder/myorder',
    })
  }
  if ("4" == $id) {
    wx.navigateTo({
      url:'/pages/phone/phone',
    })
  }
},
onLoad: function() {
  console.log("login"+this.data.login)
  var loginOk2=this.data.login;
  var loginOk1=wx.getStorageSync('loginOk')
   console.log('loginOk1'+loginOk1);
  this.setData({
    login:loginOk1,
  })
  console.log(this.data.login)
   wx.setStorage({
    data: loginOk2,
    key: 'loginOk',
  })
  var that=this
  // 查看是否授权
  wx.getSetting({
    success: function(res) {
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({
          success: function(res) {
            // app.globalData.userInfo = res.userInfo
            // that.setData({
            //   userInfo: res.userInfo,
            //   hasUserInfo: true
            // })
            // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
            // 根据自己的需求有其他操作再补充
            // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
            wx.login({
              success: res => {
                // 获取到用户的 code 之后：res.code
                console.log("用户的code:" + res.code);
                 }
               })
             }
         })       
      } else {
        // 用户没有授权
        // 改变 isHide 的值，显示授权页面
        that.setData({
          isHide: true
        });
      }
    }
  });

},
getUserInfo: function(e) {
  console.log(e)
  app.globalData.userInfo = e.detail.userInfo
  this.setData({
    userInfo: e.detail.userInfo,
    hasUserInfo: true
  })
},
bindGetUserInfo: function(e) {
  if (e.detail.userInfo) {
    //用户按了允许授权按钮
    var that = this;
    // 获取到用户的信息了，打印到控制台上看下
    console.log("用户的信息如下：");
    console.log(e.detail.userInfo);
    //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
    that.setData({
      isHide: false
    });
  } else {
    //用户按了拒绝按钮
    wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      showCancel: false,
      confirmText: '返回授权',
      success: function(res) {
        // 用户没有授权成功，不需要改变 isHide 的值
        if (res.confirm) {
          console.log('用户点击了“返回授权”');
        }
      }
    });
  }
},
allOrderBtn:function(e){
    wx.navigateTo({
      url:'/pages/myorder/myorder',
    })
},
fourBtn:function(e){
  var $id = e.currentTarget.dataset.id;
  console.log($id)
  if ("1"== $id){
    wx.navigateTo({
      url:'#',
    })
  }
  if ("2" == $id) {
    wx.navigateTo({
      url:'/pages/addressList/addressList',
    })
  }
  if ("3" == $id) {
    wx.navigateTo({
      url: '/pages/phone/phone',
    })
  }
  if ("4" == $id) {
    wx.navigateTo({
      url:'/pages/login/login',
    })
  }
}

})