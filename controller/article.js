const { Article, User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body.article)
    article.author = req.user._id
    article.populate('author').execPopulate() // 根据id在数据库中查询 映射对象
    await article.save()
    res.status(201).json({
      article
    })
  } catch (err) {
    next(err)
  }
}

exports.getArticles = async (req, res, next) => {
  try {
    const {
      limit = 20,
      offset = 0,
      tag,
      author
    } = req.query // 解构赋值 获取给的请求体

    const filter = {}

    if (tag) {
      filter.tagList = tag  // 包含关系
    }
    
    if (author) {
      const user = await User.findOne({ username: author })
      filter.author = user ? user._id : null
    }

    const articles = await Article.find(filter)
      .skip(Number.parseInt(offset)) // 跳过多少条
      .limit(Number.parseInt(limit)) // 取多少条
      .sort({
        // -1 倒叙， 1 升序
        createdAt: -1
      })
    const articlesCount = await Article.countDocuments()
    res.status(200).json({
      articles,
      articlesCount
    })
  } catch (err) {
    next(err)
  }
}
exports.getFeedArticles = async (req, res, next) => {
  try {
    res.send('post /users/login')
  } catch (err) {
    next(err)
  }
}
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId)
    if (!article) {
      return res.status().end()
    }
    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
}
exports.updateArticle = async (req, res, next) => {
  try {
    const article = req.article
    const bodyArticle = req.body.article
    article.title = bodyArticle.title || article.title
    article.description = bodyArticle.description || article.description
    article.body = bodyArticle.body || article.body
    await article.save()
    res.status(201).json({
      article
    })
  } catch (err) {
    next(err)
  }
}
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = req.article
    await article.remove()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
exports.createArticleComment = async (req, res, next) => {
  try {
    res.send('post /users/login')
  } catch (err) {
    next(err)
  }
}
exports.getArticleComment = async (req, res, next) => {
  try {
    res.send('post /users/login')
  } catch (err) {
    next(err)
  }
}
exports.deleteArticleComment = async (req, res, next) => {
  try {
    res.send('post /users/login')
  } catch (err) {
    next(err)
  }
}
exports.favoriteArticle = async (req, res, next) => {
  try {
    res.send('post /users/login')
  } catch (err) {
    next(err)
  }
}
exports.unfavoriteArticle = async (req, res, next) => {
  try {
    res.send('post /users/login')
  } catch (err) {
    next(err)
  }
}