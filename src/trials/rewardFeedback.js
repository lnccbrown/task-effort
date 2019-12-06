import { lang } from '../config/main'
import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { jsPsych } from 'jspsych-react'

const rewardFeedback = (duration, is_practice) => {
  
  return {
    type: 'call_function',
    async: true,
    func: (done) => {
      // send trigger events
      const code = eventCodes.rewardFeedback
      let reward_feedback = 0;
      let rewards = jsPsych.data.get().select('value').values
      let last = rewards[rewards.length - 1]
      // console.log(rewards)
      if (is_practice){
        reward_feedback = last['reward']
      }
      else{
        for(let i = 0; i < rewards.length; i++){
          let reward = rewards[i]
          if(reward['is_practice'] == false){
            reward_feedback += reward['reward']
          }
        }
      }

      let stimulus = `<div class="effort-container">` + `<h1>${reward_feedback}</h1>` + photodiodeGhostBox() + `</div>`
      document.getElementById('jspsych-content').innerHTML = stimulus
      setTimeout(() => {
        done()
      }, duration);

      pdSpotEncode(code)
    }
  }
}

export default rewardFeedback
