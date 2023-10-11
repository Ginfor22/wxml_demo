Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    allChecked: false, 
    totalPrice: 0, 
    totalNum: 0, 
    cart: []
  },

  onLoad: function (options) {
    let goods=wx.getStorageSync("options");
    this.setData({
      cart:goods
    });
  },
  setCart(cart){
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    })
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync('options', cart);
  },
  //显示
  onShow(){
    const cart=wx.getStorageSync('options')||[];
    this.setCart(cart);
  },
  //数量加减
  handleItemNumEdit(e){
    const{operation,name}=e.currentTarget.dataset;
    let {cart}=this.data;
    console.log(name);
    const index=cart.findIndex(v=>v.data===name);
    console.log(index);
    cart[index].num+=operation;
    this.setCart(cart);
  },
  //单选按钮
  handleItemChange(e){
    const name=e.currentTarget.dataset.name;
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.data===name);
    console.log(index);
    //cart[index].checked=!cart[index].checked;
    allChecked=!allChecked;
    this.setCart(cart);
  },
  //全选按钮
  handleItemAllCheck(e){
    let {cart,allChecked}=this.data;
    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  }
})