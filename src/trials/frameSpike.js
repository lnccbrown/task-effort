import { lang } from '../config/main'
import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { startGame } from '../lib/balloon'

const frameSpike = (duration, value, effort) => {
  const code = eventCodes.frameSpike
  return {
    type: 'html_keyboard_response',
    stimulus: '',
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true,
    //trial_duration: duration,
    on_start: (trial) => {
      trial.stimulus = baseStimulus(`<canvas id="myCanvas"></canvas>`, true) + photodiodeGhostBox()
    },
    on_load: () => startGame(value, [0, 1], effort, [15, -1], [true, false], [true, true], function(data = 'data') {console.log('data')}, 'frameSpike') + pdSpotEncode(code),
    on_finish: (data) => data.code = code
  }
}

export default frameSpike
