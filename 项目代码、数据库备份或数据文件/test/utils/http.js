// 本地地址
// const BaseUrl = "http://192.168.1.8:8800"
// 下方是公网地址
const BaseUrl = "http://114.116.44.123:8800"

function request(url, reqObj) {

  // 模拟网速慢的情况
  setTimeout(() => {

    if (reqObj.showLoading) {
      wx.showLoading({
        title: '正在执行，请稍候。。',
      })
    }

    // 获得输入的内容以后，联接服务器查询用户名是否已存在
    wx.request({
      url: BaseUrl + url,
      method: reqObj.method || 'get',
      data: reqObj.data,
      success: res => {
        if (res.statusCode == 200) { // 联网成功
          reqObj.success(res)
        } else {
          console.log(res);
          wx.showToast({
            title: '联网失败，请稍后重试!',
            icon:'none',
            duration:1000
          })
        }

      },
      fail: res => {
        // 可以进行统一出错处理
        console.log(res);
        // wx.showToast({
        //   title: 'error' + res,
        // })
      },
      complete: ret => {
        if (reqObj.showLoading) {
          wx.hideLoading({})
        }
      }
    })
  }, 500)

}

/**
 * 查询用户名是否存在
 */
export function queryName(reqObj) {
  request('/user/query', reqObj)
}

/**
 * 注册新用户
 */
export function reg(reqObj) {
  reqObj.method = 'POST'
  reqObj.showLoading = true
  request('/user/reg', reqObj)
}

export function login(reqObj){
  reqObj.method = 'POST'
  reqObj.showLoading = true

  request('/user/login', reqObj)
}


export function deleteUser(reqObj){
  reqObj.method = 'POST'
  request('/user/delete', reqObj)
}


export function updateUserInfo(reqObj){
  reqObj.method = 'POST'
  reqObj.showLoading = true
  request('/user/update', reqObj)
}


export function userDetail(reqObj){
  reqObj.showLoading = true
  request('/user/detail', reqObj)
}

export function uploadImg(reqObj){
  reqObj.method = 'POST'
  reqObj.showLoading = true
  request('/file/updateimg', reqObj)
}

