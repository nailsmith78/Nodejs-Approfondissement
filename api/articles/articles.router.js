const express = require("express");
const router = express.Router();
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');
const articlesController = require("./articles.controller");

router.use(auth);
router.post("/", articlesController.create);
router.put("/:id", isAdmin, articlesController.update);
router.delete("/:id", isAdmin, articlesController.delete);

module.exports = router;
