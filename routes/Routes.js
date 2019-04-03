const router = require("express").Router();

const authRoutes = require("./AuthRoutes");
const PatientSpaceRouter = require("./PatientSpace");


router.use("/auth", authRoutes);
router.use('/patientspace', PatientSpaceRouter);
module.exports = router;
