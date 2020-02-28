import { lang } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'

const recordNow = () => {
  let stimulus = baseStimulus(`
    <div class='instructions'>
    <h1>${lang.prompt.begin_recording}
    </div>
    `, true)

  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.confirm_recording,
    response_ends_trial: true
  }
}

export default recordNow
