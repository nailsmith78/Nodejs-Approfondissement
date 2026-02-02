const Article = require("./articles.schema");
const User = require('../users/users.model');

class ArticleService {
    getAll() {
        return Article.find({});
    }
    get(id) {
        return Article.findById(id);
    }
    getByUser(userId) {
        if (!userId) return [];
        const articles = Article.find({ user: userId }).populate('user', '-password');
        return articles;
    }

    create(data) {
        const article = new Article(data);
        return article.save();
    }
    update(id, data) {
        return Article.findByIdAndUpdate(id, data, { new: true });
    }
    delete(id) {
        return Article.deleteOne({ _id: id });
    }
}

module.exports = new ArticleService();