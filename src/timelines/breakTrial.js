// import trials
import break from '../trials/break'

const breakTrial = (blockSettings, blockDetails, opts) => {
  // initialize trial details
  let trialDetails = {
    start_time: Date.now()
  }

  // timeline
  let timeline = [
    break()
  ]
    return {
  		type: 'html_keyboard_response',
  		timeline: timeline
  	}
}

export default breakTrial
