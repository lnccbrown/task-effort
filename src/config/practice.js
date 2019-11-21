import { defaultBlockSettings } from './main';
import { deepCopy } from '../lib/utils'

// PRACTICE BLOCK SETTINGS

// create copy of default settings
let practiceBlock1 = deepCopy(defaultBlockSettings)
let practiceBlock2 = deepCopy(defaultBlockSettings)
let practiceBlock3 = deepCopy(defaultBlockSettings)

practiceBlock1.probs = ["100%"]
practiceBlock1.is_practice = true

practiceBlock2.probs = ["100%"]
practiceBlock2.is_practice = true
practiceBlock2.value = [0, 5]
practiceBlock2.effort = [0, 100]

practiceBlock3.probs = ["50%"]
practiceBlock3.is_practice = true
practiceBlock3.value = [1, 5]
practiceBlock3.effort = [20, 100]


// export the settings
export {
	practiceBlock1,
	practiceBlock2,
	practiceBlock3
}
