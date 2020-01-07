import { lang } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
// import { photodiodeGhostBox } from '../lib/markup/photodiode'

const break = () => {
  let stimulus = baseStimulus(`
    <div class='instructions'>
    <h1>${lang.break.prompt}
    </div>
    `, true)

  console.log('!! BREAK !!')

  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.break.done,
    response_ends_trial: true
  }
}

export default break
