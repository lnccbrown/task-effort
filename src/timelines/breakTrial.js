// import trials
import breakScreen from '../trials/breakScreen'

const breakTrial = () => {

  let timeline = [
    breakScreen()
  ]

    return {
  		type: 'html_keyboard_response',
  		timeline: timeline
  	}
}

export default breakTrial
