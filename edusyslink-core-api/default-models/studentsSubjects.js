const Sequelize = require("sequelize");
const database = require("../resources/database");
const Subject = require("./subjects");
const Student = require("./students");

const StudentSubject = database.define(
  "students_subjects",
  {
    subject_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    student_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

StudentSubject.belongsTo(Subject, {
  foreignKey: "subject_id",
  allowNull: false,
});
StudentSubject.belongsTo(Student, {
  foreignKey: "student_id",
  allowNull: false,
});

StudentSubject.sync();

module.exports = StudentSubject;
