import {login} from '../../utils/http'
import {
  MD5
} from '../../utils/md5'
const app=getApp();
Page({
  data: {
  username: '',
  password: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad(options) {
  //   let username, pwd
  //   if (options) {
  //     username = options.username
  //     pwd = options.pwd
  //   }
  //   // 如果没有传递来的，就尝试获得本地存储的数据
  //   if (!username) {
  //     username = wx.getStorageSync('username')
  //     pwd = wx.getStorageSync('pwd')
  //   }
  //   this.setData({
  //     username: username || '',
  //     pwd: pwd || ''
  //   })
  // },
  //获取输入的账号
  // getZhangHao(event) {
  //   this.setData({
  //   zhanghao: event.detail.value
  //   })
  // },
  // //获取输入的密码
  // getMiMa(event) {
  //   this.setData({
  //   mima: event.detail.value
  //   })
  // },
  // btnLoginClick() {
  //   //简单的非空判断
  //   if (this.data.username == '' || this.data.pwd == '') {
  //     wx.showToast({
  //       title: '用户名或密码不能为空',
  //       icon: 'none',
  //       duration: 1000
  //     })
  //     return
  //   }
  //   console.log(MD5(this.data.pwd));
    // 开始登陆
  // login({
  //     data: {
  //       username: this.data.username,
  //       pwd: MD5(this.data.pwd)
  //     },
  //     success: ret => {
  //       console.log(ret);
  //       wx.showToast({
  //         title: ret.data.msg,
  //         icon: 'none',
  //         duration: 1000
  //       })
  //       if (ret.data.code == 1) {
  //         // 登陆成功
  //         // 保存用户名密码
  //         wx.setStorage({
  //           key: 'username',
  //           data: this.data.username
  //         })
  //         wx.setStorageSync('pwd', this.data.pwd)
  //         setTimeout(() => {
  //           wx.navigateTo({
  //             url: '/pages/my/my?username='+this.data.username+'&pwd='+this.data.pwd,
  //           })
  //         }, 1000);
  //       }
  //     }
  //   })
  // },
  login: function () {
    wx.request({
        url: 'http://localhost:3000/users/login?username=' + this.data.username + "&password=" + this.data.password,
        success: res => {
            // console.log(res.data);
            if (res.data.code == 0) {
                //给全局变量赋值
                // console.log(res.data.data)
                app.globalData.id=res.data.data.id;
                wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 2000
                })
                setTimeout(function () {
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }, 1000)
            }else{
                this.data.username='',
                this.data.password='',
                wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    })
},

  login1(){
    wx.navigateTo({
      url: '/pages/login-myinfo/login-myinfo',
    })
  },
  register(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
})
