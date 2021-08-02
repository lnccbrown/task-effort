// import trials

import fixation from "../trials/fixation";
import rewardProbability from "../trials/rewardProbability";
import frameSpike from "../trials/frameSpike";
import choice from "../trials/choice";
import costBenefits from "../trials/costBenefits";
import { ONLINE } from "../config/main";
import pressBalloon from "../trials/pressBalloon";
import rewardFeedback from "../trials/rewardFeedback";
import cumulativeReward from "../trials/cumulativeReward";
import trialEnd from "../trials/trialEnd";

const taskTrial = (blockSettings, blockDetails, opts) => {
  // initialize trial details
  let trialDetails = {
    trial_earnings: 0,
    trial_cumulative_earnings: 0,
    value: [],
    effort: [],
    high_effort: [],
    probability: [],
    start_time: Date.now(),
  };

  // timeline
  let timeline = [
    // show condition
    fixation(300),
    rewardProbability(1000, blockSettings, opts, trialDetails),
    //frameSpike(700, blockSettings, opts, trialDetails),
    //costBenefits(1500, blockSettings, opts, trialDetails),
    choice(6000, blockSettings, opts, trialDetails),
    pressBalloon(25000, blockSettings, opts),
    fixation(500),
    rewardFeedback(1000, blockSettings, opts, trialDetails),
    fixation(500),
    cumulativeReward(1000, blockSettings, blockDetails, opts, trialDetails),
    // end the trial
    trialEnd(500),
    ];
    
        let timeline_inlab = [
            // show condition
            fixation(300),
            rewardProbability(1000, blockSettings, opts, trialDetails),
            frameSpike(700, blockSettings, opts, trialDetails),
            costBenefits(1500, blockSettings, opts, trialDetails),
            choice(6000, blockSettings, opts, trialDetails),
            pressBalloon(25000, blockSettings, opts),
            fixation(500),
            rewardFeedback(1000, blockSettings, opts, trialDetails),
            fixation(500),
            cumulativeReward(1000, blockSettings, blockDetails, opts, trialDetails),
            // end the trial
            trialEnd(500),
        ];
  return {
    type: "html_keyboard_response",
      timeline: ONLINE ? timeline : timeline_inlab,
  };
};

export default taskTrial;