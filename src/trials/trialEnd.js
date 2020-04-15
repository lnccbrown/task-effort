import { eventCodes, IS_ELECTRON, AT_HOME } from "../config/main";
import { photodiodeGhostBox, pdSpotEncode } from "../lib/markup/photodiode";
import { removeCursor } from "../lib/utils";

const trialEnd = (duration) => {
  const endCode = eventCodes.trialFinishEnd;
  return {
    type: "html_keyboard_response",
    stimulus: "",
    response_ends_trial: false,
    trial_duration: duration,
    on_load: () => {
      removeCursor("experiment");
    },
    on_start: (trial, data) => {
      if (IS_ELECTRON && !AT_HOME) trial.stimulus += photodiodeGhostBox();
    },
    on_finish: (data) => {
      pdSpotEncode(endCode);
      data.code = endCode;
    },
  };
};

export default trialEnd;
