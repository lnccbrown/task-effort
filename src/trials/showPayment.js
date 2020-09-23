import { jsPsych } from "jspsych-react";
import { lang, ONLINE, eventCodes } from "../config/main";
import { photodiodeGhostBox, pdSpotEncode } from "../lib/markup/photodiode";
import { baseStimulus } from "../lib/markup/stimuli";
import { formatDollars, addCursor } from "../lib/utils";

const showPayment = (duration, blockSettings) => {
  const startCode = eventCodes.showPaymentStart;
  const endCode = eventCodes.showPaymentEnd;

  let total_earnings = 0; // initialize idk
  let proceedKey = blockSettings.keys[2]; // 0 is q, 1 is p, 2 is m

  if (!ONLINE) {
    return {
      type: "html_keyboard_response",
      stimulus: "",
      choices: proceedKey,
      response_ends_trial: true,
      // trial_duration: duration,
      on_load: () => {
        pdSpotEncode(startCode);
        addCursor("experiment");
      },
      on_start: (trial) => {
        const value = jsPsych.data.get().select("value").values;
        const last = value[value.length - 1];
        const total_cumulative = last.trial_cumulative_earnings;

        total_earnings += total_cumulative / 20; // $1 for every 20 pts

        trial.stimulus =
          baseStimulus(
            `<h1>${lang.payment.earned}<br>${formatDollars(
              total_earnings
            )}<br></br>${lang.payment.experimenter}</h1>`,
            true
          ) + photodiodeGhostBox();
      },
      on_finish: (data) => {
        pdSpotEncode(endCode);
        data.code = [startCode, endCode];
        data.total_earnings = total_earnings;
        data.subtrial_type = "show_payment";
      },
    };
  } else {
    return {
      type: "html_keyboard_response",
      stimulus: "",
      choices: proceedKey,
      response_ends_trial: true,
      // trial_duration: duration,
      on_load: () => {
        pdSpotEncode(startCode);
        addCursor("experiment");
      },
      on_start: (trial) => {
        const value = jsPsych.data.get().select("value").values;
        const last = value[value.length - 1];
        const total_cumulative = last.trial_cumulative_earnings;
        // NOTE TO FUTURE SELF: likely to be changing payment scheme for online
        // version, divisor likely to change from 20 to 450
        // to match prev mturk samples
        total_earnings += total_cumulative / 20; // $1 for every 20 pts

        trial.stimulus =
          baseStimulus(
            `<h1>${lang.payment.earned}<br>${formatDollars(
              total_earnings
            )}<br>${lang.payment.bonus}<br></br>${lang.payment.proceed}</h1>`,
            true
          ) + photodiodeGhostBox();
      },
      on_finish: (data) => {
        pdSpotEncode(endCode);
        data.code = [startCode, endCode];
        data.total_earnings = total_earnings;
        data.subtrial_type = "show_payment";
      },
    };
  }
};
export default showPayment;
