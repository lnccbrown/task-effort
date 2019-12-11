import { eventCodes } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { jsPsych } from 'jspsych-react'
import { lang } from '../config/main'

const cumulativeReward = (duration, is_practice) => {

  const startCode = eventCodes.cumulativeRewardsStart
  const endCode = eventCodes.cumulativeRewardsEnd

  return {
    type: 'call_function',
    async: true,
    func: (done) => {
      // send trigger events
      const code = eventCodes.cumulativeReward
      let cumulative_reward = 0;
      let rewards = jsPsych.data.get().select('value').values

      for (let i = 0; i < rewards.length; i++) {
        let reward = rewards[i]
        if (is_practice) {
          if (reward['is_practice'] === true) {
            cumulative_reward += reward['reward']
          }
        } else {
          if (reward['is_practice'] === false) {
            cumulative_reward += reward['reward']
          }
        }
      }

      let stimulus = `<div class="effort-container"><h1>${lang.cumulative_rew.total}${(cumulative_reward).toFixed(2)}</h1>` + photodiodeGhostBox() + `</div>`
      document.getElementById('jspsych-content').innerHTML = stimulus
      setTimeout(() => {
        done()
      }, duration);

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

export default cumulativeReward
