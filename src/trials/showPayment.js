import { lang, AT_HOME, MTURK, eventCodes } from '../config/main'
import { jsPsych } from 'jspsych-react'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { baseStimulus } from '../lib/markup/stimuli'
import { formatDollars, addCursor } from '../lib/utils'


const showPayment = (duration) => {
  const startCode = eventCodes.showPaymentStart
  const endCode = eventCodes.showPaymentEnd

  const total_earnings = 0 // initialize idk

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
        const value = jsPsych.data.get().select('value').values
        const last = value[value.length - 1]
        const total_cumulative = last.trial_cumulative_earnings
        const total_earnings = total_cumulative / 20 // $1 for every 20 pts

        trial.stimulus = baseStimulus(`<h1>${lang.payment.earned}<br>${formatDollars(total_earnings)}</h1>`, true) +
                       photodiodeGhostBox()
      },
      on_finish: (data) => {
        pdSpotEncode(endCode)
        data.code = [startCode, endCode]
        data.total_earnings = total_earnings
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
