import { eventCodes } from "../config/main";
import { jitter50, removeCursor } from "../lib/utils";
import { pdSpotEncode, photodiodeGhostBox } from "../lib/markup/photodiode";
import { fixationHTML } from "../lib/markup/fixation";
import { jsPsych } from "jspsych-react";

const fixation = (duration) => {
  let stimulus = fixationHTML + photodiodeGhostBox();

  const startCode = eventCodes.fixationStart;
  const endCode = eventCodes.fixationEnd;

  return {
    type: "html_keyboard_response",
    choices: jsPsych.NO_KEYS,
    stimulus: stimulus,
    response_ends_trial: false,
    trial_duration: jitter50(duration),
    on_load: () => {
      removeCursor("experiment");
      pdSpotEncode(startCode);
    },
    on_finish: (data) => {
      pdSpotEncode(endCode);
      data.code = [startCode, endCode];
    },
  };
};

export default fixation;
