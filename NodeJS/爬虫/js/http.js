var request = require('request')
var fs = require('fs')
//
// var url = 'http://m.soyoung.com/yuehui/product'

// 【玻尿酸隆鼻】下单免费打车【海薇1ml】注射额头、太阳穴、苹果肌、下巴、面颊、鼻子
// app机构、

// http://m.soyoung.com/normal/cpwap253775?_json=1
// 
request({
  // url: 'http://m.soyoung.com/yuehui/product?ajax=1&lver=0.0.0',
  url: 'http://m.soyoung.com/normal/cpwap253775?_json=1',
  method: 'GET',
  // form: {
  //   // 城市ID
  //   // district_id
  //   index: 499
  // },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}, function (error, response, body) {
  // console.log('error:', error)
  // console.log('body:', body)
  // body = JSON.parse(body)
  console.log('response:', response)
  fs.writeFile(__dirname + '/data.json', body, (error) => {
    console.log('error:', error)
  })
})
