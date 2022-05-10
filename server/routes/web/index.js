module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newTitles = ['让声音被看到，KPL无障碍直播间5月8日春决上线，与你同战！', '狄某有话说 | 4月数据盘点：峡谷违规少，上分没烦恼', '5.5王者好物专场直播！等你上车！', 'QQ x王者荣耀2022五五朋友节活动', '甜音导航送福利', '5月10日全服不停机更新公告', '5月10日英雄平衡性调整丨项羽、哪吒、李信增强，暃降温', '5月9日体验服赛季体验积分、段位奖励发放公告', '5月7日体验服停机更新公告', '5月6日体验服不停机更新公告']
        const newsList = newTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })

        await Article.deleteMany({})

        await Article.insertMany(newsList)
        res.send(newsList)
    })

    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //     name: '新闻分类'
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean()
        // res.send(parent)
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        /* mongodb origin style aggregate pipeline
        db.getCollection('categories').aggregate([
            {"$match":{"parent":ObjectId('626a9ea9dd9fa7bcf0d32054')}},
            {"$lookup":{"from":'articles',"localField":'_id',"foreignField":'categories','as':"newsList"}},
            {"$addFields":{"newsList":{"$slice":["$newsList",0,5]}}}
        ])
        */
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({ //数组前面添加内容
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean() //populate categories关联出_id对应的categories信息
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门')
                    ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })

    app.use('/web/api', router)
}