import { eventCodes, MTURK } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'

const trialEnd = (trialDetails, duration) => {
    const endCode = eventCodes.trialFinish

    return {
      type: 'html_keyboard_response',
      stimulus: '',
      response_ends_trial: false,
      trial_duration: duration,
      on_load: () => {
      },
      on_start: (trial) => {
        if (!MTURK) trial.stimulus += photodiodeGhostBox()
      },
      on_finish: (data) => {
        pdSpotEncode(endCode)
        data.code = endCode
      }
    }
  }

export default trialEnd
