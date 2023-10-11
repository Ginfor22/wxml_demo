// Page({
//   data: {
//   phone:'',
//   password:'',
//   },
//   // 获取输入账号
//   phoneInput: function (e) {
//   this.setData({
//   phone: e.detail.value
//   })
//   }, 
//   // 获取输入密码
//   passwordInput: function (e) {
//   this.setData({
//   password: e.detail.value 
//   })
//   },  
//   // 登录 
//   login: function () {
//   if (this.data.phone.length == 0 && this.data.password.length == 0) {
//   wx.showToast({
//   title: '未输入信息', 
//   icon: 'loading', 
//   duration: 1000 
//   }) 
//   } 
//   else if (this.data.phone.length == 0 ) {
//   wx.showToast({
//   title: '用户名不能为空', 
//   icon: 'loading', 
//   duration: 1000
//   })
//   }
//   else if (this.data.password.length == 0) {
//   wx.showToast({
//   title: '密码不能为空',
//   icon: 'loading',
//   duration: 1000 
//   }) 
//   } 
//   else{
//   // 这里修改成跳转的页面
//   wx.showToast({
//   title: '登录成功', 
//   icon: 'success',
//   duration: 2000 
//   }) 
//   } 
//   },

//   /**
//   * 用户点击右上角分享 
//   */
//   onShareAppMessage: function () {
//   }
  
//   })
  
   
Page({
  data: {
    username: '',
    uname_desc_obj: {}, //code 1 正确  0  不正确  message 显示的信息
    pwd: '',
    pwd_desc_obj: {}, //code 1 正确  0  不正确  message 显示的信息
  },
  //获取用户名
  getName(e) {
    console.log(e.detail.value);
    let inputName = e.detail.value
    // 非空判断 
    if (inputName == '') {
      this.setData({
        uname_desc_obj: {
          code: 1,
          message: ''
        }
      })
      return
    }

    // 对输入的内容进行判断
    // 用户名是 字母数字下画线，5-10位
    let nameReg = /^[a-z|A-Z|_][a-z|A-Z|_|0-9]{4,9}$/
    let tt = e.detail.value.match(nameReg)
    if (!tt) {
      // 不符合规则
      this.setData({
        uname_desc_obj: {
          code: 0,
          message: '请输入5-10位字符以字母或下画线开头'
        }
      })
      return
    }

    this.setData({
      uname_desc_obj: {
        code: 1,
        message: '正在查询...'
      }
    })

    queryName({
      data: {
        username: e.detail.value
      },
      success: res => {
        console.log('111', res);
        this.setData({
          uname_desc_obj: {
            code: res.data.code,
            message: res.data.msg
          }
        })
      }
    })
  },
  //获取用户账号
  getZhangHao(event) {
  console.log('获取输入的账号', event.detail.value)
  this.setData({
   zhanghao: event.detail.value
  })
  },
  // 获取密码
  getMiMa(e) {
    if (this.data.pwd.trim() == '') {
      this.setData({
        pwd_desc_obj: {
          code: 1,
          message: ''
        }
      })
      return
    }

    // 密码是 6 位以上字符
    if (this.data.pwd.trim().length < 6) {
      this.setData({
        pwd_desc_obj: {
          code: 0,
          message: '密码必须是 6 位以上字符'
        }
      })
      return
    }
    this.setData({
      pwd_desc_obj: {
        code: 1,
        message: '密码可用'
      }
    })
  },
  
  //注册
  btnRegClick() {
    // 
    if (this.data.uname_desc_obj.code != 1 || this.data.pwd_desc_obj.code != 1) {
      // 用户名密码没通地
      wx.showToast({
        title: '用户名密码不正确，请重新输入!',
        icon: 'none',
        duration: 2000
      }),
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }

    //联网注册
    reg({
      data: {
        username: this.data.username,
        pwd: MD5(this.data.pwd)
      },
      success: ret => {
        console.log(ret);
        wx.showToast({
          title: ret.data.msg,
          icon: 'none'
        })
        if (ret.data.code == 1) { // 注册成功
          //注册成功跳转至登陆页面

          wx.showToast({
            title: '注册成功',
            icon:'success',
            duration:1000
          })

          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/login/login?username='+this.data.username+'&pwd='+this.data.pwd,
            })
          }, 1000);

        } else {
          wx.showToast({
            title: '注册失败,请联系管理员',
            icon: 'none'
          })
        }
      }
    })
  }
  })