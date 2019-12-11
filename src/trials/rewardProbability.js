import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'

const rewardProbability = (duration, probability) => {
  const startCode = eventCodes.rewardProbabilityStart
  const endCode = eventCodes.rewardProbabilityEnd

  return {
    type: 'html_keyboard_response',
    stimulus: '',
    response_ends_trial: false,
    trial_duration: duration,
    on_start: (trial) => {
      trial.stimulus = baseStimulus(`<h1>${probability}</h1>`, true) +
      photodiodeGhostBox()
    },
    on_load: () => {
      pdSpotEncode(startCode)
    },
    on_finish: (data) => {
      pdSpotEncode(endCode)
      data.code = [startCode, endCode]
    }
  }
}

export default rewardProbability
