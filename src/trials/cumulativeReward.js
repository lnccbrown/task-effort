import { eventCodes, lang } from "../config/main";
import { photodiodeGhostBox, pdSpotEncode } from "../lib/markup/photodiode";
import { removeCursor } from "../lib/utils";
import { addData } from "../lib/taskUtils";
import { jsPsych } from "jspsych-react";

const cumulativeReward = (
  duration,
  blockSettings,
  blockDetails,
  opts,
  trialDetails
) => {
  const startCode = eventCodes.cumulativeRewardsStart;
  const endCode = eventCodes.cumulativeRewardsEnd;

  return {
    type: "call_function",
    async: true,
    func: (done) => {
      // send trigger events
      let cumulative_reward = 0;
      let rewards = jsPsych.data.get().select("value").values;

      for (let i = 0; i < rewards.length; i++) {
        let reward = rewards[i];
        if (blockSettings.is_practice) {
          if (reward["is_practice"] === true) {
            cumulative_reward += reward["reward"];
            trialDetails.trial_cumulative_earnings = cumulative_reward;
          }
        } else {
          if (reward["is_practice"] === false) {
            cumulative_reward += reward["reward"];
            trialDetails.trial_cumulative_earnings = cumulative_reward;
          }
        }
      }

      trialDetails.subtrial_type = "cumulative_rewards";

      let stimulus =
        `<div class="effort-container"><h1>${
          lang.cumulative_rew.total
        }${cumulative_reward.toFixed(2)}</h1>` +
        photodiodeGhostBox() +
        `</div>`;
      document.getElementById("jspsych-content").innerHTML = stimulus;
      setTimeout(() => {
        done(addData(trialDetails, blockSettings, opts));
      }, duration);
    },
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

export default cumulativeReward;
