import { lang } from "../config/main";
import { baseStimulus } from "../lib/markup/stimuli";

const relaxReminder = () => {
  return {
    type: "html_keyboard_response",
    stimulus: "",
    prompt: lang.prompt.continue.press,
    response_ends_trial: true,

    on_start: (trial) => {
      trial.stimulus = baseStimulus(
        `
      <div class='instructions'>
      <h2>${lang.prompt.relax_reminder}
      </h2>
      </div>
      `,
        true
      );
    },
  };
};

export default relaxReminder;
