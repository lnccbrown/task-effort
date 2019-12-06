import { defaultBlockSettings } from './main';
import { deepCopy } from '../lib/utils'

// FIRST EXPERIMENT BLOCK SETTINGS

// create copy of default settings
let exptBlock1 = deepCopy(defaultBlockSettings)

exptBlock1.probs = ["100%", "100%", "50%", "50%"]
exptBlock1.counterbalance = true
exptBlock1.value = [3, 5, 7]
exptBlock1.effort = [100, 120, 150]
exptBlock1.keys = ['q', 'p']
exptBlock1.get_reward = [true, true, true, false]



export {
  exptBlock1
}
