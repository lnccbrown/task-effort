import { lang, AT_HOME, MTURK, eventCodes } from '../config/main'
import { jsPsych } from 'jspsych-react'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { baseStimulus } from '../lib/markup/stimuli'
import { formatDollars, addCursor } from '../lib/utils'


const showPayment = (duration) => {
  const startCode = eventCodes.showPaymentStart
  const endCode = eventCodes.showPaymentEnd

  if (!AT_HOME || MTURK) {
      return {
      type: 'html_keyboard_response',
      stimulus: '',
      response_ends_trial: false,
      trial_duration: duration,
      on_load: () => {
        pdSpotEncode(startCode)
        addCursor('experiment')
      },
      on_start: (trial) => {
        let total_earnings = 0
        debugger
        // let bonusTrial = jsPsych.data.get().filterCustom((t) => t.value && t.value.earnings_bonus > 0)
        // if (bonusTrial.count() > 0) {
        //   bonus = bonusTrial.values()[0].value.earnings_bonus
        // }

        trial.stimulus = baseStimulus(`<h1>${lang.bonus}${formatDollars()}</h1>`, true) +
                       photodiodeGhostBox()
      },
      on_finish: (data) => {
        pdSpotEncode(endCode)
        data.code = [startCode, endCode]
      }
    }
  }
  else {
    return {
    type: 'html_keyboard_response',
    trial_duration: 1,
    on_load: () => addCursor('experiment')
    }
  }
}
export default showPayment
