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

describe("tester API Articles", () => {
    let token;
    const USER_ID = "fake";
    const MOCK_DATA = [
        {
            _id: USER_ID,
            name: "ana",
            email: "nfegeg@gmail.com",
            password: "azertyuiop",
        },
    ];
    const MOCK_ARTICLE_CREATED = [
        {
            title: "Article test 1",
            content: "Contenu de l article numero 1",
            status: "draft"
        },
    ];


    /*
        test("[Article] Create Article", async () => {
            const res = await request(app)
                .post("/api/articles")
                .send(MOCK_ARTICLE_CREATED)
            expect(res.status).toBe(201);
            expect(res.body.name).toBe(MOCK_ARTICLE_CREATED.name);
        });
    */

    test("[Article] getAll Article", async () => {
        const res = await request(app)
            .get("/api/articles")
        expect(res.status).toBe(201);
        expect(res.body.lenght).not.toBe(0);
    });


    afterEach(() => {
        jest.restoreAllMocks();
    });
});
