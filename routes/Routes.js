const router = require("express").Router();

const authRoutes = require("./AuthRoutes");
const PatientSpaceRouter = require("./PatientSpace");
const drugRouter = require('./drug.router');
const prescriptionRouter = require('./prescription.router');
const doctorRouter = require('./doctor.router');
const allergyRouter = require('./allergy.router');


router.use("/auth", authRoutes);
router.use('/patient', PatientSpaceRouter);
router.use('/drug', drugRouter);
router.use('/prescription', prescriptionRouter);
router.use('/doctor', doctorRouter);
router.use('/allergy', allergyRouter);

module.exports = router;
