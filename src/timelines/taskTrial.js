// import trials
import fixation from '../trials/fixation'
import rewardProbability from '../trials/rewardProbability'
import frameSpike from '../trials/frameSpike'
import choice from '../trials/choice'
import costBenefits from '../trials/costBenefits'
import pressBalloon from '../trials/pressBalloon'
import cumulativeRewards from '../trials/cumulativeRewards'
import rewardFeedback from '../trials/rewardFeedback'
import taskEnd from '../trials/taskEnd'

const taskTrial = (blockSettings, blockDetails, opts) => {
  // initialize trial details
  let trialDetails = {
    trial_earnings: 0,
    start_time: Date.now()
  }
  // timeline
  let timeline = [
    // show condition
    fixation(500), // need ITI of ~500 btwn trials
    rewardProbability(500, blockSettings.is_practice?opts:opts.prob),
    frameSpike(5000, blockSettings.is_practice?blockSettings.effort:opts.effort, blockSettings.is_practice?blockSettings.high_effort:opts.high_effort),
    costBenefits(1000, blockSettings.is_practice?blockSettings.value:opts.value, blockSettings.is_practice?blockSettings.effort:opts.effort, blockSettings.is_practice?blockSettings.high_effort:opts.high_effort),
    choice(5000, blockSettings.is_practice?blockSettings.effort:opts.effort, blockSettings.is_practice?blockSettings.high_effort:opts.high_effort),
    fixation(200),
    pressBalloon(2500),
    cumulativeRewards(800),
    fixation(500),
    rewardFeedback(800),
    fixation(500),
    // end the trial
    taskEnd(trialDetails, 500)
  ]
    return {
  		type: 'html_keyboard_response',
  		timeline: timeline
  	}
}

export default taskTrial