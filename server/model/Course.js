const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  chapterId: {
    type: String,
    required: true,
    unique: true
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
      quizId: { type: String, required: true, unique: true },
      questions: [
        {
          question: { type: String, required: true },
          options: { type: [String], required: true },
          correctAnswer: { type: String, required: true }
        }
      ]
    }
  ],
}, {
  timestamps: true
});

const courseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  chapters: [chapterSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;