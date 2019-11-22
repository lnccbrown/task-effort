import { lang } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { formatDollars } from '../lib/utils'

const screenOne = baseStimulus(`
    <div class='instructions'>
    <h1>${lang.instructions.welcome}</h1>
    <br></br>
    <p>${lang.instructions.p1}</p>
    <p>${lang.instructions.p2}</p>
    <p>${lang.instructions.p3}</p>
    </div>
    `, true)

const screenTwo = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p4}</p>
    <p>${lang.instructions.p5}</p>
    <p>${lang.instructions.p6}</p>
    <p>${lang.instructions.p7}</p>
    </div>
    `, true)

const screenThree = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p8}</p>
    <p>${lang.instructions.p9}</p>
    <p>${lang.instructions.p10}</p>
    </div>
    `, true)

const screenFour = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p11}</p>
    <p>${lang.instructions.p12}</p>
    </div>
    `, true)

const screenFive = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p13}</p>
    <p>${lang.instructions.p14}</p>
    <p>${lang.instructions.p15}</p>
    </div>
    `, true)

const screenSix = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p16}</p>
    </div>
    `, true)

const instructions = (blockSettings, key) => {

  let instructionsArray = [
    screenOne,
    screenTwo,
    screenThree,
    screenFour,
    screenFive,
    screenSix
    // screenSeven,
    // screenEight,
    // screenNine(blockSettings)
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
