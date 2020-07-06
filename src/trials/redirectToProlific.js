import { jsPsych } from "jspsych-react";

const redirectToProlific = (completion_url, duration) => {
  //   console.log(`${completion_url}`);
  let url = `${completion_url}`;

  function redirect(url) {
    setTimeout(() => {
      window.location.replace(url);
    }, duration);
  }

  return {
    type: "html_keyboard_response",
    choices: jsPsych.NO_KEYS,
    stimulus: "",
    response_ends_trial: false,
    trial_duration: duration,
    on_finish: () => {
      redirect(url, duration);
    },
  };
};

export default redirectToProlific;
