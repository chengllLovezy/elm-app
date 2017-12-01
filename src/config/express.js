express = require('express')

var app = express();


app.get('/home/foodNav',function (req, res, next) {
  console.log(11)
})

app.listen(8080)
