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

const taskTrial = (blockSettings, blockDetails, probs) => {
  // initialize trial details
  let trialDetails = {
    trial_earnings: 0,
    start_time: Date.now()
  }

  // timeline
  let timeline = [
    // show condition
    fixation(500), // need ITI of ~500 btwn trials
    rewardProbability(500, probs),
    frameSpike(300, blockSettings.value, blockSettings.effort),
    costBenefits(700, blockSettings.value, blockSettings.effort),
    choice(5000),
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
