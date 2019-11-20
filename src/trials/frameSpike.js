import { lang } from '../config/main'
import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { startGame } from '../lib/balloon'
const frameSpike = (duration) => {
  const code = eventCodes.frameSpike
  return {
    type: 'html_keyboard_response',
    stimulus: '',
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true,
    //trial_duration: duration,
    on_start: (trial) => {
      trial.stimulus =  photodiodeGhostBox()
    },
    on_load: () => startGame([1, 3], [0, 1], [100, 5], [15, -1], [true, false], [true, true], function(data = 'data') {console.log('data')}) + pdSpotEncode(code),
    on_finish: (data) => data.code = code
  }
}

export default frameSpike
