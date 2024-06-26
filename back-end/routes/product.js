const express = require("express");
const router = express.Router();

const {create} = require("../controllers/product");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin
);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;