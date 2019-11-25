import { lang } from '../config/main'
import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { startGame } from '../lib/balloon'

const costBenefits = (duration, value, effort) => {
  const code = eventCodes.costBenefits
  return {
    type: 'html_keyboard_response',
    stimulus: '',
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true,
    //trial_duration: duration,
    on_start: (trial) => {
      trial.stimulus = baseStimulus(`<canvas id="myCanvas"></canvas>`, true) + photodiodeGhostBox()
    },
    on_load: () => pdSpotEncode(code),
    on_finish: (data) => data.code = code
  }
}

export default costBenefits
