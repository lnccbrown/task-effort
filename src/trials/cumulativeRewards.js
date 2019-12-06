import { lang } from '../config/main'
import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { jsPsych } from 'jspsych-react'

const cumulativeRewards = (duration) => {
  const code = eventCodes.cumulativeRewards
  return {
    type: 'html_keyboard_response',
    stimulus: '',
    // prompt:  lang.prompt.continue.press,
    response_ends_trial: false,
    trial_duration: duration,
    on_start: (trial) => {
      trial.stimulus = baseStimulus(`<h1>${jsPsych.data.get().select('value').values[(jsPsych.data.get().select('value').values).length -1]}</h1>`, true) +
      photodiodeGhostBox()
    },
    on_load: () => pdSpotEncode(code),
    on_finish: (data) => data.code = code
  }
}

export default cumulativeRewards
