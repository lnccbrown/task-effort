import { jsPsych } from "jspsych-react";
import { lang } from "../config/main";
import { baseStimulus } from "../lib/markup/stimuli";
import { addCursor } from "../lib/utils";

// quiz helper functions
const quizOptions = () => {
  const arr = [
    `${lang.quiz.answer_opts.true}`,
    `${lang.quiz.answer_opts.false}`,
  ];
  return arr;
};

const blueOrGreen = [
  `${lang.quiz.answer_opts.blue}`,
  `${lang.quiz.answer_opts.green}`,
];

const quizPrompts = [
  `${lang.quiz.prompt.more_pumps}`,
  `${lang.quiz.prompt.reward_certainty_reach_spike}`,
  `${lang.quiz.prompt.bonus_blue}`,
  `${lang.quiz.prompt.bonus_green}`,
  `${lang.quiz.prompt.total_shown}`,
  `${lang.quiz.prompt.points_to_money}`,
  `${lang.quiz.retake}`,
];

const quizRules = [
  `${lang.quiz.rules.shown_probability}`,
  `${lang.quiz.rules.shown_blue_green_on_screen}`,
  `${lang.quiz.rules.job}`,
  `${lang.quiz.rules.blue_req_20}`,
  `${lang.quiz.rules.green_vary_bonus}`,
  `${lang.quiz.rules.twenty_five_secs_green}`,
  `${lang.quiz.rules.bonus_green_spike}`,
  `${lang.quiz.any_questions}`,
  `${lang.quiz.retake}`,
];

// Quiz Trial
const quiz = () => {
  const preamble = `<div class="quiz_container">
                    <h3>${lang.quiz.confirm_understanding}</h3>
                    </div>`;

  let questions = [
    {
      prompt: quizPrompts[0],
      options: blueOrGreen,
      required: true,
    },
    {
      prompt: quizPrompts[1],
      options: quizOptions(),
      required: true,
    },
    {
      prompt: quizPrompts[2],
      options: quizOptions(),
      required: true,
    },
    {
      prompt: quizPrompts[3],
      options: quizOptions(),
      required: true,
    },
    {
      prompt: quizPrompts[4],
      options: quizOptions(),
      required: true,
    },
    {
      prompt: quizPrompts[5],
      options: quizOptions(),
      required: true,
    },
  ];

  return {
    type: "survey_multi_choice",
    preamble: preamble,
    questions: questions,
    on_load: () => {
      addCursor("experiment");
    },
    on_finish: function (data) {
      data.uniqueId = "uniqueId";
      data.prompt = quizPrompts;
      data.ans_choices = quizOptions();
      let answer = JSON.parse(data.responses);
      data.answer = [];
      let len = quizPrompts.length - 1; // - 1 bc last quizPrompts is not part of quiz
      for (let i = 0; i < len; i++) {
        data.answer.push(answer["Q" + i]);
      }
    },
  };
};

const retakeFeedback = (data) => {
  let feedback = [lang.quiz.incorrect_response + "<br>" + lang.quiz.review];

  return {
    type: "html_keyboard_response",
    stimulus: "",
    response_ends_trial: true,
    on_load: () => {
      addCursor("experiment");
    },
    on_start: (trial) => {
      trial.stimulus = baseStimulus(`<h1>${feedback}</h1>`, true);
    },
  };
};

const reshowRules = () => {
  let rules = [
    quizRules[0] +
      "<br></br>" +
      quizRules[1] +
      "<br></br>" +
      quizRules[2] +
      "<br></br>" +
      quizRules[3] +
      "<br></br>" +
      quizRules[4] +
      "<br></br>" +
      quizRules[5] +
      "<br></br>" +
      quizRules[6] +
      "<br></br>" +
      quizRules[7] +
      "<br></br>" +
      quizRules[8],
  ];

  return {
    type: "html_keyboard_response",
    stimulus: "",
    response_ends_trial: true,
    on_load: () => {
      addCursor("experiment");
    },
    on_start: (trial) => {
      trial.stimulus = baseStimulus(`<p>${rules}</p>`, true);
    },
  };
};

const retakeLoop = () => {
  return {
    timeline: [retakeFeedback(), reshowRules(), quiz()],
    loop_function: () => {
      const prevData = jsPsych.data.getLastTrialData().values()[0];
      const prevAnswers = prevData.answer;

      const correctAnswers = [
        `${lang.quiz.answer_opts.green}`,
        `${lang.quiz.answer_opts.false}`,
        `${lang.quiz.answer_opts.false}`,
        `${lang.quiz.answer_opts.true}`,
        `${lang.quiz.answer_opts.true}`,
        `${lang.quiz.answer_opts.true}`,
      ];

      if (
        JSON.stringify(prevAnswers.slice(0, 6)) !==
        JSON.stringify(correctAnswers)
      ) {
        return true;
      } else {
        return false;
      }
    },
  };
};

const checkRetake = () => {
  return {
    timeline: [retakeLoop()],
    conditional_function: () => {
      const prevData = jsPsych.data.getLastTrialData().values()[0];
      const prevAnswers = prevData.answer;

      const correctAnswers = [
        `${lang.quiz.answer_opts.green}`,
        `${lang.quiz.answer_opts.false}`,
        `${lang.quiz.answer_opts.false}`,
        `${lang.quiz.answer_opts.true}`,
        `${lang.quiz.answer_opts.true}`,
        `${lang.quiz.answer_opts.true}`,
      ];

      if (
        JSON.stringify(prevAnswers.slice(0, 6)) !==
        JSON.stringify(correctAnswers)
      ) {
        return true;
      } else {
        return false;
      }
    },
  };
};

// loop function
// (https://www.jspsych.org/overview/timeline/#looping-timelines)
let quizTimeline = () => {
  return {
    timeline: [quiz(), checkRetake()],
    type: "html_keyboard_response",
  };
};

export default quizTimeline;
