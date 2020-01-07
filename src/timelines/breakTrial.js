// import trials
import { jsPsych } from 'jspsych-react'
import breakScreen from '../trials/breakScreen'

const breakTrial = (blockSettings, blockDetails, opts) => {
  // initialize trial details
  let trialDetails = {
    start_time: Date.now()
  }

  let timeline = breakScreen()

  return {
		type: 'html_keyboard_response',
		timeline: timeline
	}
}

export default breakTrial
