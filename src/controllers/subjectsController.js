const StudentSubject = require("../models/studentsSubjects");
const Subject = require("../../edusyslink-core-api/default-models/subjects");
const { Sequelize } = require("sequelize");
const Teacher = require("../../edusyslink-core-api/default-models/teachers");

exports.findPerStudent = async (req, res) => {
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

    let subjects = await Subject.findAll({
      where: {
        subject_id: {
          [Sequelize.Op.in]: subjectsIds,
        },
      },
      include: [
        {
          model: Teacher,
          as: "teacher",
        },
      ],
    });

    return res.json(subjects);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const studentSubject = await StudentSubject.destroy({
      where: {
        student_id: req.body.student_id,
        subject_id: req.body.subject_id,
      },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

exports.subscribe = async (req, res) => {
  try {
    const existent = await StudentSubject.findOne({
      where: {
        student_id: req.body.student_id,
        subject_id: req.body.subject_id,
      },
    });

    if (!existent) {
      const studentSubject = await StudentSubject.create({
        student_id: req.body.student_id,
        subject_id: req.body.subject_id,
      });
    } else {
      return res
        .status(409)
        .json({ error: "Estudante já matriculado na disciplina" });
    }

    return res.status(201).json(studentSubject);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}
