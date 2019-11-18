import { lang } from '../config/main'
import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'

const pressBalloon = (duration) => {
  const code = eventCodes.pressBalloon
  return {
    type: 'html_keyboard_response',
    stimulus: '',
    response_ends_trial: false,
    trial_duration: duration,
    on_start: (trial) => {
      trial.stimulus = baseStimulus(`<h1>Press Balloon</h1>`, true) +
      photodiodeGhostBox()
    },
    on_load: () => pdSpotEncode(code),
    on_finish: (data) => data.code = code
  }
}

export default pressBalloon
