import { eventCodes, MTURK } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'

const trialEnd = (trialDetails, duration) => {
    const startCode = eventCodes.trialFinishStart
    const endCode = eventCodes.trialFinishEnd

    return {
      type: 'html_keyboard_response',
      stimulus: '',
      response_ends_trial: false,
      trial_duration: duration,
      on_load: () => {
        pdSpotEncode(startCode)
      },
      on_start: (trial) => {
        if (!MTURK) trial.stimulus += photodiodeGhostBox()
      },
      on_finish: (data) => {
        pdSpotEncode(endCode)
        data.code = [startCode, endCode]
      }
    }
  }

export default trialEnd
