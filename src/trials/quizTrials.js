import { lang,  MTURK } from '../config/main'
import { jsPsych } from 'jspsych-react'
import { baseStimulus } from '../lib/markup/stimuli'
import { addCursor } from '../lib/utils'

// quiz helper functions
const quizOptions = () => {
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
  `${lang.quiz.retake}`,
]

// Quiz Trial
const quiz = () => {

  const preamble = `<div class="quiz_container">
                    <h3>${lang.quiz.respond_correctly}</h3>
                    </div>`

  let questions = [
    {
      prompt: quizPrompts[0],
      options: quizOptions(),
      required: true
    },{
      prompt: quizPrompts[1],
      options: quizOptions(),
      required: true
    },{
      prompt: quizPrompts[2],
      options: quizOptions(),
      required: true
    },{
      prompt: quizPrompts[3],
      options: quizOptions(),
      required: true
    },{
      prompt: quizPrompts[4],
      options: quizOptions(),
      required: true
    },{
      prompt: quizPrompts[5],
      options: quizOptions(),
      required: true
    },{
      prompt: quizPrompts[6],
      options: quizOptions(),
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
      data.ans_choices = quizOptions()
      let answer = JSON.parse(data.responses)
      data.answer = []
      let len = (MTURK) ? quizPrompts.length + 1 : quizPrompts.length
      for (let i=0; i<len; i++) {
        data.answer.push(answer['Q'+i])
      }
    }
  })
}

const retakeFeedback = (data) => {

  let feedback = [
    lang.quiz.incorrect_response + '<br>' +
    lang.quiz.review
  ]

  return (
    {
      type: 'html_keyboard_response',
      stimulus: '',
      response_ends_trial: true,
      on_load: () => {
        addCursor('experiment')
      },
      on_start: (trial) => {
        trial.stimulus = baseStimulus(`<h1>${feedback}</h1>`, true)
      }
    }
  )
}


const reshowRules = () => {

  let rules = [
    quizPrompts[0] + '<br></br>' +
    quizPrompts[1] + '<br></br>' +
    quizPrompts[2] + '<br></br>' +
    quizPrompts[3] + '<br></br>' +
    quizPrompts[4] + '<br></br>' +
    quizPrompts[5] + '<br></br>' +
    quizPrompts[6] + '<br></br>' +
    quizPrompts[7]
  ]

  return (
    {
      type: 'html_keyboard_response',
      stimulus: '',
      response_ends_trial: true,
      on_load: () => {
        addCursor('experiment')
      },
      on_start: (trial) => {
        trial.stimulus = baseStimulus(`<p>${rules}</p>`, true)
      }
    }
  )
}


const retakeLoop = () => {
  return {
    timeline: [
      retakeFeedback(),
      reshowRules(),
      quiz()
    ],
    loop_function: (data) => {
      const prevData = jsPsych.data.getLastTrialData().values()[0]
      const prevAnswers = prevData.answer

      if (prevAnswers.includes(`${lang.quiz.answer_opts.no}`)) {
        return true
      } else {
        return false
      }
    }
  }
}


// loop function
// (https://www.jspsych.org/overview/timeline/#looping-timelines)
let quizTimeline = () => {
  return {
    timeline: [ quiz(), retakeLoop() ],
    type: 'html_keyboard_response'
  }
}


export default quizTimeline
