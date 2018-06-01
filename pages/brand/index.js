var app = getApp()
Page({
    data: {
        
    },
    onLoad: function(options) {
        console.log(options.id);
        var that = this
        
        wx.request({
            url: 'https://m.nalijie.cn/API/App/index',
            method: 'POST',
            data: {'type':'getheadline'},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                //console.log(res);
                that.setData({
                    brandList: res.data.data
                });
            }
        })
    }

})