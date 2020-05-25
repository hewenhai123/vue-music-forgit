var express = require('express')
var fs = require('fs')
var bodyParse = require('body-parser')
const axios = require('axios')
var app = express()

const port = 3800

app.listen(port, (a, b, c) => {
  // console.log(app)
  console.log('服务器已经启动了')
})
