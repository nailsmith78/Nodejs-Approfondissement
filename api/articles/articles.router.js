const express = require("express");
const router = express.Router();
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');
const articlesController = require("./articles.controller");


router.use(auth, isAdmin);
router.post("/", articlesController.create);
router.put("/:id", articlesController.update);
router.delete("/:id", articlesController.delete);

module.exports = router;
