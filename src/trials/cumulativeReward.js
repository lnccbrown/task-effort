import { eventCodes } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { jsPsych } from 'jspsych-react'

const cumulativeReward = (duration, is_practice) => {

  return {
    type: 'call_function',
    async: true,
    func: (done) => {
      // send trigger events
      const code = eventCodes.cumulativeReward
      let cumulative_reward = 0;
      let rewards = jsPsych.data.get().select('value').values
      
      for(let i = 0; i < rewards.length; i++){
        let reward = rewards[i]
        if (is_practice){
          if(reward['is_practice'] === true){
            cumulative_reward += reward['reward']
          }
        }
        else{
          if(reward['is_practice'] === false){
            cumulative_reward += reward['reward']
          }
        }
      }

      let stimulus = `<div class="effort-container"><h1>${cumulative_reward}</h1>` + photodiodeGhostBox() + `</div>`
      document.getElementById('jspsych-content').innerHTML = stimulus
      setTimeout(() => {
        done()
      }, duration);

      pdSpotEncode(code)
    }
  }
}

export default cumulativeReward
