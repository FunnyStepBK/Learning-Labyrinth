const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;
const { v4: uuid } = require('uuid');

const chapterSchema = new Schema({
  chapterId: {
    type: String,
    required: true,
    unique: true
  },
  chapterName: {
    type: String, 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: [
    {
      type: { type: String, required: true },
      sectionTitle: { type: String, required: true },
      data: { type: String, required: true }
    }
  ],
  quizzes: [
    {
      title: {
        type: String,
        default: 'Quiz',
        required: true
      },
      quizId: { 
        type: String,
        required: true,
        unique: true
      },
      questions: [
        {
          questionHeading: { type: String, required: true },
          question: { type: String, required: true },
          options: { type: [String], required: true },
          correctAnswer: { type: String, required: true }
        }
      ]
    }
  ]
}, { _id: false });

const courseSchema = new Schema({
  courseKeyCharacters: { type: String, required: true },
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  courseName: {
    type: String, 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  chapters: [chapterSchema]
}, {
  timestamps: true 
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
