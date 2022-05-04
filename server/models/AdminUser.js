const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10) // 10-12加密指数
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)