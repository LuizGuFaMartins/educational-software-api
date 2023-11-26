const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activitiesController");
const subjectsController = require("../controllers/subjectsController");
const { verifyToken } = require("../../edusyslink-core-api/middlewares/authentication-middleware");

// activities
router.get("/activities/:studentId", verifyToken, activityController.findActivitiesPerStudentSubjects);

// subjects
router.get("/subjects/registered/:studentId", verifyToken, subjectsController.findPerStudent);
router.post("/subjects/cancel", verifyToken, subjectsController.cancelSubscription);
router.post("/subjects/subscribe", verifyToken, subjectsController.subscribe);

module.exports = router;
