import { lang, ONLINE, MTURK, PROLIFIC } from "../config/main";
import { getUserId, getTurkUniqueId } from "../lib/utils";
import { baseStimulus } from "../lib/markup/stimuli";

<<<<<<< Updated upstream
const userId = () => {
  if (MTURK) {
    return {
      type: "html_keyboard_response",
      stimulus: baseStimulus(`<h1>${lang.userid.set}</h1>`, true),
      response_ends_trial: false,
      trial_duration: 800,
      on_finish: (data) => {
        const uniqueId = getTurkUniqueId();
        console.log(uniqueId);
      },
    };
=======
const userId = (blockSettings) => {
  if (ONLINE) {
    if (MTURK) {
      return {
        type: "html_keyboard_response",
        stimulus: baseStimulus(`<h1>${lang.userid.set}</h1>`, true),
        response_ends_trial: false,
        trial_duration: 800,
        on_finish: (data) => {
          const uniqueId = getTurkUniqueId();
          console.log(uniqueId);
        },
      };
    } else if (PROLIFIC) {
      return {
        type: "survey_text",
        questions: [
          {
            prompt: baseStimulus(`<h1>${lang.userid.set_prolific}</h1>`, true),
          },
        ],
        on_finish: (data) => {
          getUserId(data);
        },
      };
    }
>>>>>>> Stashed changes
  } else {
    return {
      type: "survey_text",
      questions: [
        { prompt: baseStimulus(`<h1>${lang.userid.set}</h1>`, true) },
      ],
      on_finish: (data) => {
        getUserId(data);
      },
    };
  }
};

export default userId;
