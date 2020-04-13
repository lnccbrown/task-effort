import { lang } from "../config/main";
import { photodiodeGhostBox } from "../lib/markup/photodiode";
import { baseStimulus } from "../lib/markup/stimuli";
import { addCursor } from "../lib/utils";

const experimentEnd = (duration) => {
  let stimulus =
    baseStimulus(`<h1>${lang.task.end}</h1>`, true) + photodiodeGhostBox();

  return {
    type: "html_keyboard_response",
    stimulus: stimulus,
    trial_duration: duration,
    on_load: () => {
      addCursor("experiment");
    },
  };
};

export default experimentEnd;
