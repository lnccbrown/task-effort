import { lang,  MTURK } from '../config/main'
import { jsPsych } from 'jspsych-react'

// quiz helper functions
const quizOptions = (blockSettings) => {
  const arr = [
    `${lang.quiz.answer_opts.yes}`,
    `${lang.quiz.answer_opts.no}`
    ]
  return arr
}

const quizPrompts = [
  `${lang.quiz.prompt.green_balloon_high_effort}`,
  `${lang.quiz.prompt.reward_certainty}`,
  `${lang.quiz.prompt.green_balloon_bonus}`,
  `${lang.quiz.prompt.bonus}`,
  `${lang.quiz.prompt.rew_feedback}`,
  `${lang.quiz.prompt.cumulative_rew}`
]

// Quiz Trial
const quiz = (blockSettings) => {
  console.log(blockSettings.quiz)

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
    `${lang.quiz.answer_opts.no}`,
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
