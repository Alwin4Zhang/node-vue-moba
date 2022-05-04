const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 一个英雄可能是多个身份
    body: { type: String }
})

module.exports = mongoose.model('Article', schema)