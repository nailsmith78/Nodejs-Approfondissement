const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const User = require("../api/users/users.model");
const usersService = require("../api/users/users.service");
const Article = require("../api/articles/articles.schema");
const articlesService = require("../api/articles/articles.service");

describe("tester API users", () => {
    let token;
    // const USER_ID = "123";
    // const ARTICLE_ID = "456";
    const USER_ID = new mongoose.Types.ObjectId();
    const ARTICLE_ID = new mongoose.Types.ObjectId();
    const MOCK_DATA_USER = [
        {
            _id: USER_ID,
            name: "ana",
            email: "nfegeg@gmail.com",
            password: "azertyuiop",
            role: "admin"
        }
    ];
    const MOCK_DATA_ARTICLE = [
        {
            _id: ARTICLE_ID,
            title: "article 1",
            content: "contenu article 1",
            status: "draft",
        },
        {
            _id: ARTICLE_ID,
            title: "article 2",
            content: "contenu article 2",
            status: "draft",
        }
    ];

    const MOCK_DATA_ARTICLE_CREATED = {
        title: "article 1",
        content: "contenu article 1",
        user: USER_ID,
        status: "draft",

    };
    const MOCK_DATA_ARTICLE_UPDATE = {
        title: "article 1",
        content: "modification article 1",
        user: USER_ID,
        status: "draft",
    };

    beforeEach(() => {
        token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
        jest.spyOn(User, 'findById').mockResolvedValue(MOCK_DATA_USER[0]);
        jest.spyOn(Article, 'find').mockResolvedValue(MOCK_DATA_ARTICLE);

        /* creation*/
        jest.spyOn(Article.prototype, 'save').mockResolvedValue({   // article.save n est pas reconnu
            _id: ARTICLE_ID, ...MOCK_DATA_ARTICLE_CREATED, user: USER_ID,
        });

        /* update */
        jest.spyOn(Article, 'findByIdAndUpdate').mockResolvedValue({
            _id: ARTICLE_ID, ...(MOCK_DATA_ARTICLE_UPDATE), user: USER_ID
        });

        /* delete */
        jest.spyOn(Article, 'deleteOne').mockResolvedValue({ deletedCount: 1 });



    });

    /* test lecture des articles avec AUTH - test -*/
    /*
     test("[Articles] Get All", async () => {
         const res = await request(app)
             .get("/api/articles")
             .set("x-access-token", token);
         expect(res.status).toBe(200);
         expect(res.body.length).toBeGreaterThan(0);
         console.log(res.body);
     });*/

    /* test creation article */
    test("[Article] Create Article", async () => {
        const res = await request(app)
            .post("/api/articles")
            .send(MOCK_DATA_ARTICLE_CREATED)
            .set("x-access-token", token);
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(MOCK_DATA_ARTICLE_CREATED.title);
        expect(res.body.title).toBe(MOCK_DATA_ARTICLE_CREATED.title);
        expect(res.body.content).toBe(MOCK_DATA_ARTICLE_CREATED.content);
        expect(res.body._id).toBeDefined(); // Vérifie que l'_id est bien généré
        expect(res.body.user).toEqual(USER_ID.toString());
    });

    /* test update article */
    test("[Article] Update Article", async () => {
        const res = await request(app)
            .put(`/api/articles/${ARTICLE_ID}`)
            .send(MOCK_DATA_ARTICLE_UPDATE)
            .set("x-access-token", token);
        expect(res.status).toBe(200);
        expect(res.body.title).toBe(MOCK_DATA_ARTICLE_UPDATE.title);
        expect(res.body._id).toEqual(ARTICLE_ID.toString()); // Vérifie que l'_id est bien généré
        expect(res.body.user).toEqual(USER_ID.toString());
    });

    /* test delete article */
    test("[Article] Delete Article", async () => {
        const res = await request(app)
            .delete(`/api/articles/${ARTICLE_ID}`)
            .set("x-access-token", token);
        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
