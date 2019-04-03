const router = require("express").Router();

const authRoutes = require("./AuthRoutes");

router.use("/auth", authRoutes);

module.exports = router;
