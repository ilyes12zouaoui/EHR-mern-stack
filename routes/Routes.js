const router = require("express").Router();

const authRoutes = require("./AuthRoutes");
const PatientSpaceRouter = require("./PatientSpace");
const drugRouter = require("./drug.router");
const prescriptionRouter = require("./prescription.router");
const doctorRouter = require("./doctor.router");
const allergyRouter = require("./allergy.router");
const PharmacistANDThirdPartyRouter = require("./PharmacistANDThirdParty");
const Brain = require("./Brain");

const chatRouter = require("./ChatRouter");

router.use("/auth", authRoutes);
router.use("/patient", PatientSpaceRouter);
router.use("/drug", drugRouter);
router.use("/prescription", prescriptionRouter);
router.use("/doctor", doctorRouter);
router.use("/allergy", allergyRouter);
router.use("/PharmacistANDThirdParty", PharmacistANDThirdPartyRouter);
router.use("/brain", Brain);

router.use("/chat", chatRouter);

module.exports = router;
