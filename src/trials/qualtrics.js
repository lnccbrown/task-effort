import { qualtricsHTML } from "../lib/markup/qualtrics";
import { jsPsych } from "jspsych-react";

const qualtrics = () => {
  let stimulus = qualtricsHTML;

  return {
    type: "html_keyboard_response",
    choices: jsPsych.NO_KEYS,
    stimulus: stimulus,
    response_ends_trial: true,
    on_load: () => {},
    on_finish: (data) => {},
  };
};

export default qualtrics;
