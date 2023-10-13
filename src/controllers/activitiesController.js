const StudentSubject = require("../../edusyslink-core-api/default-models/studentsSubjects");
const Subject = require("../../edusyslink-core-api/default-models/subjects");
const Activity = require("../../edusyslink-core-api/default-models/activities");
const { Sequelize } = require("sequelize");

exports.findActivitiesPerStudentSubjects = async (req, res) => {
  try {
    const studentSubject = await StudentSubject.findAll({
      include: [
        {
          model: Subject,
          as: "subject",
        },
      ],
      where: { student_id: req.params.studentId },
    });

    let subjectsIds = studentSubject.map(
      (element) => element.subject.subject_id
    );

    let activities = await Activity.findAll({
      where: {
        subject_id: {
          [Sequelize.Op.in]: subjectsIds,
        },
      },
      include: [
        {
          model: Subject,
          as: "subject",
        },
      ],
    });

    return res.json(activities);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};
