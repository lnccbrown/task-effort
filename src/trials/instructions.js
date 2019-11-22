import { lang } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'

const screenOne = baseStimulus(`
    <div class='instructions'>
    <h1>${lang.instructions.welcome}</h1>
    <br></br>
    <p>${lang.instructions.choose_btwn_two_balloons}</p>
    <p>${lang.instructions.pop_balloon_earn_money}</p>
    <p>${lang.instructions.points_to_bonus_conversion}</p>
    </div>
    `, true)

const screenTwo = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.two_balloons}</p>
    <p>${lang.instructions.blue_balloon_points}</p>
    <p>${lang.instructions.green_balloon_points}</p>
    <p>${lang.instructions.green_balloon_pop_time}</p>
    </div>
    `, true)

const screenThree = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.green_balloon_pump_bonus}</p>
    <p>${lang.instructions.green_balloon_variable_points_pumps}</p>
    <p>${lang.instructions.blue_balloon_constant_points_pumps}</p>
    </div>
    `, true)

const screenFour = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.reward_prob_variable}</p>
    <p>${lang.instructions.reward_prob_certain}</p>
    <p>${lang.instructions.reward_prob_display_event}</p>
    </div>
    `, true)

const screenFive = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.pump_keys}</p>
    <p>${lang.instructions.choice_locked_in}</p>
    </div>
    `, true)

const screenSix = baseStimulus(`
    <div class='instructions'>
    <p>${lang.prompt.continue.post_instructions}</p>
    </div>
    `, true)

const instructions = () => {

  let instructionsArray = [
    screenOne,
    screenTwo,
    screenThree,
    screenFour,
    screenFive,
    screenSix
  ]

  return(
    {
      type: 'instructions',
      show_clickable_nav: true,
      pages: instructionsArray
    }
  )
}

export default instructions
