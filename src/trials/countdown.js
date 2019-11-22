import { lang } from '../config/main'
import * as _ from 'lodash'

// build a countdown transition with the given text and number of seconds
const buildCountdown = (text, time) => {
  const times = _.range(time, 0 , -1)
  const timeline = times.map( (val) => {return({ prompt: `
		  	<div class='task_container'>
	  	    <h1>${text}<br><br>
		  	${val}</h1></div>` })})

  return ({
    type: 'html_keyboard_response',
    stimulus: '',
    trial_duration: 1000,
    response_ends_trial: false,
    timeline:  timeline
  })
}

// specify possible texts to go into buildCountdown
const pracBlockCountdown1 = lang.countdown.practice1
const exptBlockCountdown1 = lang.countdown.expt1
const exptBlockCountdown2 = lang.countdown.expt2
const exptBlockCountdown3 = lang.countdown.expt3
const exptBlockCountdown4 = lang.countdown.expt4

export {
  buildCountdown,
  pracBlockCountdown1,
  exptBlockCountdown1,
  exptBlockCountdown2,
  exptBlockCountdown3,
  exptBlockCountdown4,
}
