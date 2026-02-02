const articlesService = require("./articles.service");

class ArticlesController {
    async create(req, res, next) {

        try {

            const userId = req.user._id;
            // console.log("req.user:", req.user);
            //   console.log("token:", req.headers['x-access-token']);
            const data = req.body;
            // on ajoute l'id de l'utilisateur
            const articleData = {
                ...data,
                user: userId
            };
            const article = await articlesService.create(articleData);
            req.io.emit("article:create", article);
            res.status(201).json(article);
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;
            //    console.log("req.params:", req.params);
            //   console.log("req.body:", req.body);
            const articleModified = await articlesService.update(id, data);
            res.json(articleModified);
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await articlesService.delete(id);
            req.io.emit("article:delete", { id });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ArticlesController();
