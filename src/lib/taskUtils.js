// utilities specific to this app/task
import _ from "lodash";
import { ONLINE } from "../config/main";

// initialize starting conditions for each trial within a block
const generateStartingOpts = (blockSettings) => {
  if (blockSettings.is_practice) {
    let startingOptions = blockSettings.probs.map((c) => {
      // Repeat each starting condition the same number of times
      return _.range(blockSettings.repeats_per_condition).map(() => c);
    });
    return _.shuffle(_.flatten(startingOptions));
  } else {
    let opts = [];
    for (let i = 0; i < blockSettings.probs.length; i++) {
      for (let val in blockSettings.value) {
        for (let eff in blockSettings.effort) {
          opts.push({
            prob: blockSettings.probs[i],
            effort: [blockSettings.effort[eff], 20],
            value: [blockSettings.value[val], 1],
            high_effort: [true, false],
            get_reward: [
              blockSettings.get_reward[i],
              blockSettings.get_reward[i],
            ],
          });
          if (blockSettings.counterbalance) {
            opts.push({
              prob: blockSettings.probs[i],
              effort: [20, blockSettings.effort[eff]],
              value: [1, blockSettings.value[val]],
              high_effort: [false, true],
              get_reward: [
                blockSettings.get_reward[i],
                blockSettings.get_reward[i],
              ],
            });
          }
        }
      }
    }
    opts = _.shuffle(opts)

    // if get_subset is set to true,
    // means that it's partial counterbalance, 
    // as we won't fully represent all
    // trial type combos and thus throw out random 25% of trials
    if (ONLINE) {
      if (blockSettings.get_subset) {
        opts = _.slice(opts, 0, 54)
      }
    }
  return opts
  }
};

// save data
const addData = (trialDetails, blockSettings, opts) => {
  const data = {
    timestamp: Date.now(),
    trial_earnings: trialDetails.trial_earnings, // reward feedback
    trial_cumulative_earnings: trialDetails.trial_cumulative_earnings,
    reward_probability: trialDetails.probability,
    effort: blockSettings.is_practice ? blockSettings.effort : opts.effort, // how many pumps
    points: blockSettings.is_practice ? blockSettings.value : opts.value, // how many points
    get_reward: blockSettings.is_practice
      ? blockSettings.get_reward
      : opts.get_reward, // true or false
    high_effort: blockSettings.is_practice
      ? blockSettings.high_effort
      : opts.high_effort, // true or false
    keys: blockSettings.keys,
    subtrial_type: trialDetails.subtrial_type,
  };
  // console.log(data);
  return data;
};

export { generateStartingOpts, addData };
