import { jsPsych } from "jspsych-react";
import { eventCodes } from "../config/main";
import { photodiodeGhostBox, pdSpotEncode } from "../lib/markup/photodiode";
import { removeCursor } from "../lib/utils";
import { addData } from "../lib/taskUtils";

const rewardFeedback = (duration, blockSettings, opts, trialDetails) => {
  const startCode = eventCodes.rewardFeedbackStart;

  return {
    type: "call_function",
    async: true,
    func: (done) => {
      // send trigger events
      let rewards = jsPsych.data.get().select("value").values;
      let last = rewards[rewards.length - 1];
      let stimulus;
        console.log("last:", last);
        console.log("rewards:", rewards);
        if (last) {
        stimulus =
          `<div class="effort-container"><h1>+${last.reward.toFixed(2)}</h1>` +
          photodiodeGhostBox() +
          `</div>`;
        trialDetails.trial_earnings = last.reward;
      } else {
        stimulus =
          `<div class="effort-container"><h1>+${0}</h1>` +
          photodiodeGhostBox() +
          `</div>`;
        trialDetails.trial_earnings = 0;
      }
      document.getElementById("jspsych-content").innerHTML = stimulus;

      trialDetails.subtrial_type = "reward_feedback";
      trialDetails.trial_cumulative_earnings += trialDetails.trial_earnings;

      setTimeout(() => {
        done(addData(trialDetails, blockSettings, opts));
      }, duration);
    },
    on_load: () => {
      removeCursor("experiment");
      pdSpotEncode(startCode);
    },
    on_finish: (data) => {
      data.code = startCode;
    },
  };
};

export default rewardFeedback;
