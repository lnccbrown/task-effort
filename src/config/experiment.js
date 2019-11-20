import { defaultBlockSettings } from './main';
import { deepCopy } from '../lib/utils'

// FIRST EXPERIMENT BLOCK SETTINGS

// create copy of default settings
let exptBlock1 = deepCopy(defaultBlockSettings)


exptBlock1.probs = ["100%", "100%", "50%", "50%"]
exptBlock1.counterbalance = true

export {
  exptBlock1
}
