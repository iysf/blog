// 项目、插件、记录
var express = require('express'),
        app = express(),
    request = require('request')

app.use(function (req, res, next) {
  if (req.url.indexOf('/webapi') != -1) {
    console.log("methods:", req.method)
    console.log("req/url:", req.url)
    console.log("pathName:", req.url.pathname)
    if (req.method == 'GET') {
      // 
    } else if (req.method == 'POST') {

    }
    var requestApi = 'http://47.94.74.150:9060' + req.url.slice(7)
    // var doubanApi = 'https://api.douban.com/v2/book/1220562'

    var qs = {
      params: {account: '15712804364'},
    }
    qs.params = JSON.stringify(qs.params)

    request({url: requestApi, method: 'get', qs, json: true}, function (error, response, body) {
      // console.log("server response:", response)
      console.log("server body:", body)
      res.send(body)
    })

  } else {
    res.sendFile(__dirname + '/index.html')
  }
})


app.listen(3000)
