import { defaultBlockSettings } from './main';
import { deepCopy } from '../lib/utils'

// FIRST EXPERIMENT BLOCK SETTINGS

// create copy of default settings
let exptBlock1 = deepCopy(defaultBlockSettings)

exptBlock1.probs = ["100%"]
exptBlock1.counterbalance = true
exptBlock1.value = [3, 1]
exptBlock1.effort = [100, 20]

let exptBlock2 = deepCopy(defaultBlockSettings)
let exptBlock3 = deepCopy(defaultBlockSettings)
let exptBlock4 = deepCopy(defaultBlockSettings)


export {
  exptBlock1,
  exptBlock2,
  exptBlock3,
  exptBlock4
}
