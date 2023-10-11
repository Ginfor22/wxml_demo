Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_image_src:[],
    goods_data:[],
    goods_price:[],
    islike:true,
    firstitems: [
      { id:'1',text1: '运费', text2: '免运费',text3: '剩余 46'},
      { id:'2',text1: '优惠', text2: '实付满一件部分地区包邮',text3:'', arrows: '/images/jiantou.png'} 
    ],
    seconditems: [
      { id:'1',text1: '服务', text2: '收货后结算 · 快递发货',text3:'', arrows: '/images/jiantou.png'},
      { id:'2',text1: '选择', text2: '颜色分类；尺码',text3:'', arrows: '/images/jiantou.png'} 
    ],
    thirditems: [
      { id:'1',text1: '商品评价', text2: '',text3:'暂无评价'}
    ],

  },
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  onLoad: function (options) {
    this.setData({goods_image_src:options.src});
    this.setData({goods_data:options.data});
    this.setData({goods_price:options.price});
  },
  entry:function(e){
    wx.switchTab({
      url: '/pages/sort/sort',
    }) 
  },
  kefu:function(e){
    wx.navigateTo({
      url: '/pages/phone/phone',
    }) 
  },

  buy:function(e){
    wx.navigateTo({
      url: '/pages/addgoods/addgoods',
    })
  },
  //点击加入购物车触发
carts:function(e){
  let array=wx.getStorageSync('options')||[];
  let data=this.options;
  let index=array.findIndex(v=>v.name ===this.options.data);
  if(index===-1){
    this.options.num=1;
    array.push(this.options);
  }else{
    options[index].num++;
  }
  console.log(this.options);
  console.log(e);
  // data.url=this.options.url;
  // data.name=this.options.name;
  // data.price=this.options.price;
  // array.push({
  //   data:data
  // })
  wx.setStorage({
    key: 'options',
    data: array
  })
  wx.showToast({
    title: '加入成功',
    icon:'success',
    mask:true
  })
}
  
})