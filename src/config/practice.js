import { defaultBlockSettings } from './main';
import { deepCopy } from '../lib/utils'

// PRACTICE BLOCK SETTINGS

// create copy of default settings
let practiceBlock1 = deepCopy(defaultBlockSettings)

practiceBlock1.probs = [
	"100%",
	"100%",
	"50%"
]

practiceBlock1.value = [
	(1,0),
	(0,5),
	(1,5)
]

practiceBlock1.effort = [
	(20,0),
	(0,100),
	(20,100)
]

practiceBlock1.is_practice = true

// export the settings
export default practiceBlock1
