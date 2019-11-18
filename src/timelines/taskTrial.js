// import trials
import fixation from '../trials/fixation'
import rewardProbability from '../trials/rewardProbability'
import frameSpike from '../trials/frameSpike'
import choice from '../trials/choice'
import costBenefits from '../trials/costBenefits'
import taskEnd from '../trials/taskEnd'

const taskTrial = (blockSettings, blockDetails, condition) => {
  // initialize trial details
  let trialDetails = {
    condition: condition,
    trial_earnings: 0,
    start_time: Date.now()
  }

  // timeline
  let timeline = [
    // show condition
    fixation(500), // need ITI of ~500 btwn trials
    rewardProbability(500),
    frameSpike(300),
    costBenefits(700),
    choice(5000),
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
