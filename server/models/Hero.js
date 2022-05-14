const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    banner: { type: String }, // 背景图片
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 一个英雄可能是多个身份
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        delay: { type: String },
        cost: { type: String },
        tips: { type: String }
    }],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 顺风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 逆风出装
    usageTips: { type: String }, //使用技巧
    battleTips: { type: String }, //对抗技巧
    teamTips: { type: String }, //团战思路
    // 最佳搭档
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }],
    // 克制谁
    restraintHeros: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }],
    // 被谁克制
    restrainedHeros: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
})

module.exports = mongoose.model('Hero', schema, 'heroes')