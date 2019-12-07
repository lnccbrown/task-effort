import { lang } from '../config/main'
import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
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
      let last = rewards[rewards.length - 1]
      // console.log(rewards)
      if (is_practice){
        cumulative_reward = last['reward']
      }
      else{
        for(let i = 0; i < rewards.length; i++){
          let reward = rewards[i]
          if(reward['is_practice'] == false){
            cumulative_reward += reward['reward']
          }
        }
      }

      let stimulus = `<div class="effort-container">` + `<h1>${cumulative_reward}</h1>` + photodiodeGhostBox() + `</div>`
      document.getElementById('jspsych-content').innerHTML = stimulus
      setTimeout(() => {
        done()
      }, duration);

      pdSpotEncode(code)
    }
  }
}

export default cumulativeReward
