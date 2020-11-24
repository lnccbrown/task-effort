import { eventCodes } from "../config/main";
import { jitter50, removeCursor } from "../lib/utils";
import { pdSpotEncode } from "../lib/markup/photodiode";
import { jsPsych } from "jspsych-react";

const practiceAndMainBlockDivider = (duration) => {

  const startCode = eventCodes.practiceAndMainBlockDivider;

  return {
    type: "html_keyboard_response",
    choices: jsPsych.NO_KEYS,
    stimulus: '',
    response_ends_trial: false,
    trial_duration: jitter50(duration),
    on_load: () => {
      removeCursor("experiment");
      pdSpotEncode(startCode);
    },
    on_finish: (data) => {
      data.code = startCode;
    },
  };
};

export default practiceAndMainBlockDivider;
