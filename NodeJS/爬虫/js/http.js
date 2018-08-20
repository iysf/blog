var config = require('./config')
var request = require('request')
var fs = require('fs')
var city = require('./config/city.js')
var db = {
  hospitalId: require('./config/json.js')
}

// db
// var mongodb = require('mongodb')
// var server = new mongodb.Server('127.0.0.1', 27017, {})
// var client = new mongodb.Db('mydatabase', server, {w: 1})
// var DB_URL = 'mongodb://127.0.0.1:27017'
