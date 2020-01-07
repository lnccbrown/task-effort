// import trials
import { lang } from '../config/main'
import breakScreen from '../trials/breakScreen'
import buildCountdown from '../trials/countdown'

const breakTrial = () => {

  let timeline = [
    breakScreen(),
    buildCountdown(lang.countdown.post_break_resume, 3)
  ]

    return {
  		type: 'html_keyboard_response',
  		timeline: timeline
  	}
}

export default breakTrial
