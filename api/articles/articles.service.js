const Article = require("./articles.schema");

class ArticleService {

    create(data) {
        const article = new Article(data);
        return article.save();
    }
    update(id, data) {
        return article.findByIdAndUpdate(id, data, { new: true });
    }
    delete(id) {
        return article.deleteOne({ _id: id });
    }
}

module.exports = new ArticleService();