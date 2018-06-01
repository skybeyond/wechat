//index.js
//获取应用实例
const app = getApp()

console.log(app);

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    indicatorDots:true,
    autoplay:true,
    loadingHidden: false
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.request({
      url:'https://m.nalijie.cn/API/App/index',
      method:'POST',
      data:{'type':'getheadline'},
      header:{
        'Accept':'applocation/json'
      },
      success:function(res){
        console.log(res.data.data);
        that.setData({
          images:res.data.data
        })
        setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  handleTap:function(event){

    //var pos = event.currentTarget;
    var postid = event.target.dataset.postId;
    //console.log(pos);
    //console.log(postid);
    wx.navigateTo({
      url: '../brand/index?id='+postid
    })
  }
})
