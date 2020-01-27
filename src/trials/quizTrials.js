import { lang,  MTURK } from '../config/main'
import { jsPsych } from 'jspsych-react'
import { addCursor } from '../lib/utils'

// quiz helper functions
const quizOptions = (blockSettings) => {
  const arr = [
    `${lang.quiz.answer_opts.yes}`,
    `${lang.quiz.answer_opts.no}`
    ]
  return arr
}

const quizPrompts = [
  `${lang.quiz.prompt.probability}`,
  `${lang.quiz.prompt.two_balloons}`,
  `${lang.quiz.prompt.choice}`,
  `${lang.quiz.prompt.blue_balloon_points}`,
  `${lang.quiz.prompt.green_effort_variable}`,
  `${lang.quiz.prompt.pump_time}`,
  `${lang.quiz.prompt.green_bonus}`,
]

// Quiz Trial
const quiz = (blockSettings) => {

  const preamble = `<div class="quiz_container">
                    <h3>${lang.quiz.respond_correctly}</h3>
                    </div>`

  let questions = [
    {
      prompt: quizPrompts[0],
      options: quizOptions(blockSettings),
      required: true
    },{
      prompt: quizPrompts[1],
      options: quizOptions(blockSettings),
      required: true
    },{
      prompt: quizPrompts[2],
      options: quizOptions(blockSettings),
      required: true
    },{
      prompt: quizPrompts[3],
      options: quizOptions(blockSettings),
      required: true
    },{
      prompt: quizPrompts[4],
      options: quizOptions(blockSettings),
      required: true
    },{
      prompt: quizPrompts[5],
      options: quizOptions(blockSettings),
      required: true
    }
  ]

  return({
    type: "survey_multi_choice",
    preamble: preamble,
    questions: questions,
    on_load: () => {
      addCursor('experiment')
    },
    on_finish: function(data) {
      // TODO Unique Id
      data.uniqueId = 'uniqueId'
      data.prompt = quizPrompts
      data.ans_choices = quizOptions(blockSettings)
      let answer = JSON.parse(data.responses)
      data.answer = []
      let len = (MTURK) ? quizPrompts.length + 1 : quizPrompts.length
      for (let i=0; i<len; i++) {
        data.answer.push(answer['Q'+i])
      }
    }
  })
}

const passedQuiz = (blockSettings, prevData) => {
  const correctAnswer = [
    `${lang.quiz.answer_opts.yes}`,
    `${lang.quiz.answer_opts.yes}`,
    `${lang.quiz.answer_opts.yes}`,
    `${lang.quiz.answer_opts.yes}`,
    `${lang.quiz.answer_opts.yes}`,
    `${lang.quiz.answer_opts.yes}`
  ]

  if (MTURK) correctAnswer.push("true")

  const reducer = (accumulator, currentValue) => (
    accumulator && (currentValue === correctAnswer.shift())
  )

  const passed_quiz = (prevData.answer.reduce(reducer, true))

  return !(passed_quiz)
}

// const quizCheck = (blockSettings) => {
//   return(
//     {
//       type: "html_keyboard_response",
//       timeline: () => {
//         const transition = {
//           stimulus: [
//           `<h2>${lang.quiz.answer.incorrect}</h2>` +
//           `<p>${lang.quiz.direction.retake}</p>`
//           ],
//           prompt: lang.prompt.continue.press,
//           data: { 'passed_quiz': false }
//         }
//         return generateWaitSet(transition, 1000)
//       },
//       conditional_function: () => !blockSettings.quiz.first_attempt
//     }
//   )
// }

// loop function is if button pressed was a draw button (https://www.jspsych.org/overview/timeline/#looping-timelines)
let quizTimeline = (blockSettings) => {
  return {
    timeline: [ quiz(blockSettings) ],
    type: 'html_keyboard_response',
    loop_function: (data) => {
      const prevData = jsPsych.data.getLastTrialData().values()[0]
      return (passedQuiz(blockSettings, prevData)) ? true : false
    }
  }
}

export default quizTimeline
