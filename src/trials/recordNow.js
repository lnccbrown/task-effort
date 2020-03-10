import { lang } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { jsPsych } from 'jspsych-react'

const recordNow = () => {

  return {
    type: 'html_keyboard_response',
    stimulus: '',
    prompt:  lang.prompt.confirm_recording,
    response_ends_trial: true,

    on_start: (trial) => {
    let userId = jsPsych.data.get().select('patient_id').values
    console.log(userId)

    trial.stimulus = baseStimulus(`
      <div class='instructions'>
      <h1>${lang.prompt.begin_recording}<br>
      ${lang.prompt.name_eeg_file}<br>
      ${userId}
      ${lang.prompt.effort_suffix}</h1>
      </div>
      `, true)
    }
  }

}

export default recordNow
