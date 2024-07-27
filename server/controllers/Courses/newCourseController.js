"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course = require('../../model/Course');
const path = require('path');
const fsPromises = require('fs').promises;
require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.evn') });
const { v4: uuid } = require('uuid');
const generateId = (keyCharacter) => `${keyCharacter}${uuid()}`;
const handleNewCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = req.headers['x-api-key'];
        const validKeys = [process.env.API_KEY_1, process.env.API_KEY_2];
        // * - Check if the API key is Valid
        if (!validKeys.includes(key)) {
            return res.status(401).json({
                errorCode: '#1003',
                message: 'Invalid API key',
                success: false
            });
        }
        const templatePath = path.join(__dirname, '..', '..', 'templates', 'courseTemplate.json');
        const courseData = JSON.parse(yield fsPromises.readFile(templatePath, 'utf-8'));
        if (!courseData) {
            return res.status(404).json({
                errorCode: '#1002',
                message: 'Please provide the course Data, And try again.',
                success: false
            });
        }
        const createdCourses = [];
        for (const course of courseData) {
            const keyCharacters = course.courseKeyCharacters;
            course.courseId = generateId(keyCharacters);
            course.chapters.forEach((chapter) => {
                chapter.chapterId = generateId(keyCharacters);
                chapter.quizzes.forEach((quiz) => {
                    quiz.quizId = generateId(keyCharacters);
                });
            });
            const result = yield Course.create(course);
            createdCourses.push(result);
        }
        return res.status(200).json({
            message: `Successfully created the course/courses`,
            success: true,
            courseData
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            errorCode: '#1005',
            message: 'Server encountered an unexpected condition.',
            success: false
        });
    }
});
module.exports = handleNewCourse;
