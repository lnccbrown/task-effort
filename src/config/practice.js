import { defaultBlockSettings } from './main';
import { deepCopy } from '../lib/utils'

// PRACTICE BLOCK SETTINGS

// Practice Block 1 -- bluePractice
// create copy of default settings
let practiceBlock1 = deepCopy(defaultBlockSettings)

practiceBlock1.is_practice = true
practiceBlock1.probs = ["100%"]
practiceBlock1.value = [1, 0]
practiceBlock1.effort = [20, 0]
practiceBlock1.high_effort = [false, false]

// Practice Block 1 -- greenPractice
let practiceBlock2 = deepCopy(defaultBlockSettings)

practiceBlock2.is_practice = true
practiceBlock2.probs = ["100%"]
practiceBlock2.value = [0, 5]
practiceBlock2.effort = [0, 100]
practiceBlock2.high_effort = [false, true]

// Practice Block 1 -- realPractice
let practiceBlock3 = deepCopy(defaultBlockSettings)

practiceBlock3.is_practice = true
practiceBlock3.probs = ["50%"]
practiceBlock3.value = [1, 5]
practiceBlock3.effort = [20, 100]
practiceBlock3.high_effort = [false, true]

// export the settings
export {
	practiceBlock1,
	practiceBlock2,
	practiceBlock3
}
