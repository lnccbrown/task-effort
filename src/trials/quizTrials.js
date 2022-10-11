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

//If conditionals for no-prob
let quizPrompts = []
let quizRules = []
if(process.env.REACT_APP_settingsOverload === "remove-probability"){
  quizPrompts = [
    `1. ${lang.quiz.prompt.more_pumps}`,
    `2. ${lang.quiz.prompt.bonus_blue_np}`,
    `3. ${lang.quiz.prompt.bonus_green_np}`,
    `4. ${lang.quiz.prompt.total_shown_np}`,
    `5. ${lang.quiz.prompt.points_to_money_np}`,
    `6. ${lang.quiz.retake}`
  ];
  quizRules = [
    `1. ${lang.quiz.rules.shown_blue_green_on_screen}`,
    `2. ${lang.quiz.rules.job}`,
    `3. ${lang.quiz.rules.blue_req_20}`,
    `4. ${lang.quiz.rules.green_vary_bonus}`,
    `5. ${lang.quiz.rules.twenty_five_secs_green}`,
    `6. ${lang.quiz.rules.bonus_green_spike}`,
    `7. ${lang.quiz.any_questions}`,
    `8. ${lang.quiz.retake}`
  ];
}
    
else{
  quizPrompts = [
    `1. ${lang.quiz.prompt.more_pumps}`,
    `2. ${lang.quiz.prompt.reward_certainty_reach_spike}`,
    `3. ${lang.quiz.prompt.bonus_blue}`,
    `4. ${lang.quiz.prompt.bonus_green}`,
    `5. ${lang.quiz.prompt.total_shown}`,
    `6. ${lang.quiz.prompt.points_to_money}`,
    `${lang.quiz.retake}`,
  ];
  quizRules = [
    `1. ${lang.quiz.rules.shown_probability}`,
    `2. ${lang.quiz.rules.shown_blue_green_on_screen}`,
    `3. ${lang.quiz.rules.job}`,
    `4. ${lang.quiz.rules.blue_req_20}`,
    `5. ${lang.quiz.rules.green_vary_bonus}`,
    `6. ${lang.quiz.rules.twenty_five_secs_green}`,
    `7. ${lang.quiz.rules.bonus_green_spike}`,
    `8. ${lang.quiz.any_questions}`,
    `${lang.quiz.retake}`,
  ];
}

// Quiz Trial
const quiz = (blockSettings) => {
  const preamble = `<div class="quiz_container">
                    <h3>${lang.quiz.confirm_understanding}</h3>
                    </div>`;

  let questions = [
    {
      prompt: quizPrompts[0],
      options: blueOrGreen,
      required: true, 
    }
  ]

  for (let i=1; i < quizPrompts.length - 1; i++){
    questions.push(
      {
        prompt: quizPrompts[i],
        options: quizOptions(),
        required: true
      }
    )
  }
  return {
    type: "survey_multi_choice",
    show_clickable_nav: true,
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

const retakeFeedback = (blockSettings) => {
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

const reshowRules = (blockSettings) => {
  let rules = quizRules.join("<br></br>")
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

const retakeLoop = (blockSettings) => {
  return {
    timeline: [
      retakeFeedback(blockSettings),
      reshowRules(blockSettings),
      quiz(blockSettings),
    ],
    loop_function: () => {
      const prevData = jsPsych.data.getLastTrialData().values()[0];
      const prevAnswers = prevData.answer;

      let correctAnswers = [
        `${lang.quiz.answer_opts.green}`,
        `${lang.quiz.answer_opts.false}`,
        `${lang.quiz.answer_opts.false}`,
        `${lang.quiz.answer_opts.true}`,
        `${lang.quiz.answer_opts.true}`,
        `${lang.quiz.answer_opts.true}`,
      ];

      //Remove the 2nd element if no-prob
      if(process.env.REACT_APP_settingsOverload === "remove-probability"){
        correctAnswers.splice(2, 1);
      }

      if (
        JSON.stringify(prevAnswers.slice(0, 6)) !==
        JSON.stringify(correctAnswers)
      ) {
        blockSettings.quiz_attempts += 1;
        console.log(blockSettings.quiz_attempts);
        return true;
      } else {
        return false;
      }
    },
  };
};

const checkRetake = (blockSettings) => {
  return {
    timeline: [retakeLoop(blockSettings)],
    conditional_function: () => {
      const prevData = jsPsych.data.getLastTrialData().values()[0];
      const prevAnswers = prevData.answer;

      let correctAnswers = [
        `${lang.quiz.answer_opts.green}`,
        `${lang.quiz.answer_opts.false}`,
        `${lang.quiz.answer_opts.false}`,
        `${lang.quiz.answer_opts.true}`,
        `${lang.quiz.answer_opts.true}`,
        `${lang.quiz.answer_opts.true}`,
      ];

      //different correctAnswers if no-prob
      if(process.env.REACT_APP_settingsOverload === "remove-probability"){
        correctAnswers = [
          `${lang.quiz.answer_opts.green}`,  
          `${lang.quiz.answer_opts.false}`,
          `${lang.quiz.answer_opts.true}`,
          `${lang.quiz.answer_opts.true}`,
          `${lang.quiz.answer_opts.true}`,
        ]
      }



      if (
        JSON.stringify(prevAnswers.slice(0, 6)) !==
        JSON.stringify(correctAnswers)
      ) {
        blockSettings.quiz_attempts += 1;
        console.log(blockSettings.quiz_attempts);
        return true;
      } else {
        console.log(blockSettings.quiz_attempts);
        return false;
      }
    },
  };
};

// loop function
// (https://www.jspsych.org/overview/timeline/#looping-timelines)
let quizTimeline = (blockSettings) => {
  if (blockSettings !== undefined) {
    // console.log(blockSettings.quiz_attempts);
    return {
      timeline: [quiz(blockSettings), checkRetake(blockSettings)],
      type: "html_keyboard_response",
    };
  } else {
    return {
      timeline: [quiz(), checkRetake()],
      type: "html_keyboard_response",
    };
  }
};

export default quizTimeline;
