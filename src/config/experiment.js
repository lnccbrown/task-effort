import { defaultBlockSettings } from './main';
import { deepCopy } from '../lib/utils'

// FIRST EXPERIMENT BLOCK SETTINGS

// create copy of default settings
let exptBlock1 = deepCopy(defaultBlockSettings)
let exptBlock2 = deepCopy(defaultBlockSettings)
let exptBlock3 = deepCopy(defaultBlockSettings)
let exptBlock4 = deepCopy(defaultBlockSettings)


exptBlock1.probs = '100%'

exptBlock2.probs = '100%'

exptBlock3.probs = '50%'

exptBlock4.probs = '50%'


export {
  exptBlock1,
  exptBlock2,
  exptBlock3,
  exptBlock4
}
