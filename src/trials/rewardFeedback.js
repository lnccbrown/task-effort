import { eventCodes } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { jsPsych } from 'jspsych-react'

const rewardFeedback = (duration) => {
  return {
    type: 'call_function',
    async: true,
    func: (done) => {
      // send trigger events
      const code = eventCodes.rewardFeedback
      let rewards = jsPsych.data.get().select('value').values
      let last = rewards[rewards.length - 1]
      console.log(last.reward)
      let stimulus = `<div class="effort-container">` + `<h1>+${last.reward}</h1>` + photodiodeGhostBox() + `</div>`
      document.getElementById('jspsych-content').innerHTML = stimulus
      setTimeout(() => {
        done()
      }, duration);

      pdSpotEncode(code)
    }
  }
}

export default rewardFeedback
