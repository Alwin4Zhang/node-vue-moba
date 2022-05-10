const express = require('express')

const app = express()

//express实例上设置对象
app.set('secret', 'i2u34y12oi3u6y8')

app.use(require('cors')())
app.use(express.json())
// 托管静态文件，可以直接用/uploads路径访问
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log("http://localhost:3000")
})