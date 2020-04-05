const mongoose = require('mongoose')
const GoalModel = require('../src/models/GoalModel')
const SkillModel = require('../src/models/SkillModel')
const LessonModel = require('../src/models/LessonModel')

module.exports = {
  async up() {
    const lesson = new LessonModel({
      _id: mongoose.Types.ObjectId(),
      name: 'LessonModel for relations test',
    })

    const skill = new SkillModel({
      _id: mongoose.Types.ObjectId(),
      name: 'SkillModel for relations test',
      lessons: [lesson._id],
    })

    const goal = new GoalModel({
      _id: mongoose.Types.ObjectId(),
      name: 'GoalModel for relations test',
      skills: [skill._id],
    })

    try {
      await lesson.save()
      await skill.save()
      await goal.save()
    } catch (error) {
      console.log('error: ', error) // eslint-disable-line
      throw new Error(error)
    }
  },

  async down() {
    try {
      await GoalModel.deleteOne({ name: 'GoalModel for relations test' })
      await SkillModel.deleteOne({ name: 'SkillModel for relations test' })
      await LessonModel.deleteOne({ name: 'LessonModel for relations test' })
    } catch (error) {
      console.log('error: ', error) // eslint-disable-line
      throw new Error(error)
    }
  },
}
