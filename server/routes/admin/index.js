module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')

    const router = express.Router({
        mergeParams: true
    })
    // const req.Model = require('../../models/req.Model')

    // 新增分类
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //修改分类
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除分类
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 获取所有分类
    router.get('/', async (req, res) => {
        //使用inflection可以将categories变为单数大写形式的req.Model，正是我们需要的模式名称
        // const modelName = require('inflection').classify(req.params.resource)
        // const Model = require(`../../models/${modelName}`)
        // populate关联字段
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    //获取某个分类
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')

    // 利用resource方法构建通用CRUD功能，利用中间件，链式处理，默认next函数时省略的
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


    //处理上传数据 multer
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        //拼接地址
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body //解构
        // 1.根据用户名找用户
        // 因为admin_user模型中select是默认不取出来，查询时需要强制取出,不然获取不到密码
        const user = await AdminUser.findOne({ username }).select('+password')
        // 2.校验密码 使用http-assert简化代码量
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        // 3.返回token
        const token = jwt.sign({
            id: user._id,
            // _id: user._id,
            // username: user.username,
        }, app.get('secret'))
        res.send({ token })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}