import { lang, MTURK, PROLIFIC } from "../config/main";
import { getUserId, getTurkUniqueId, getProlificId } from "../lib/utils";
import { baseStimulus } from "../lib/markup/stimuli";

const userId = () => {
  if (MTURK) {
    return {
      type: "html_keyboard_response",
      stimulus: baseStimulus(
        `<div class='instructions'>
        <h1 style='font-size:1.75vw;'>${lang.userid.set}</h1>
        </div>`,
        true
      ),
      response_ends_trial: false,
      trial_duration: 800,
      on_finish: (data) => {
        const uniqueId = getTurkUniqueId();
        console.log(uniqueId);
      },
    };
  } else if (PROLIFIC) {
    return {
      type: "html_keyboard_response",
      stimulus: baseStimulus(
        `<div class='instructions'>
        <h1 style='font-size:1.75vw;'>${lang.userid.get_prolific}</h1>
        </div>`,
        true
      ),
      response_ends_trial: false,
      trial_duration: 1000,
      on_finish: (data) => {
        getProlificId(data);
        // console.log(uniqueId);
      },
      // previously: manual input of ID
      // type: "survey_text",
      // questions: [
      //   {
      //     prompt: baseStimulus(`<h1>${lang.userid.set_prolific}</h1>`, true),
      //   },
      // ],
      // on_finish: (data) => {
      //   getUserId(data);
      // },
    };
  } else {
    return {
      type: "survey_text",
      questions: [
        {
          prompt: baseStimulus(
            `<div class='instructions'>
            <h1 style='font-size:1.75vw; margin-bottom: -30vh;'>${lang.userid.set}</h1>
            </div>`,
            true
          ),
        },
      ],
      on_finish: (data) => {
        getUserId(data);
      },
    };
  }
};

export default userId;
