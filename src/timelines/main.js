import experimentStart from '../trials/experimentStart'
import preamble from './preamble'
import experimentEnd from '../trials/experimentEnd'
import { buildCountdown, pracBlockCountdown1, exptBlockCountdown1, exptBlockCountdown2, exptBlockCountdown3, exptBlockCountdown4} from '../trials/countdown'
import taskBlock from './taskBlock'
import userId from '../trials/userId'
import { MTURK, lang, countdownWait } from '../config/main'
import { practiceBlock1 } from '../config/practice'
import { exptBlock1, exptBlock2, exptBlock3, exptBlock4 } from '../config/experiment'

import startCode from '../trials/startCode'


const primaryTimeline = [
        experimentStart(),
        userId(),
        preamble,
        buildCountdown(pracBlockCountdown1, countdownWait),
        taskBlock(practiceBlock1),
        buildCountdown(exptBlockCountdown1, countdownWait),
        taskBlock(exptBlock1),
        buildCountdown(exptBlockCountdown2, countdownWait),
        taskBlock(exptBlock2),
        buildCountdown(exptBlockCountdown3, countdownWait),
        taskBlock(exptBlock3),
        buildCountdown(exptBlockCountdown4, countdownWait),
        taskBlock(exptBlock4),
        experimentEnd(3000)
        ]

const mturkTimeline = [
        experimentStart(),
        userId(),
        preamble,
        buildCountdown(pracBlockCountdown1, countdownWait),
        taskBlock(practiceBlock1),
        buildCountdown(exptBlockCountdown1, countdownWait),
        taskBlock(exptBlock1),
        buildCountdown(exptBlockCountdown2, countdownWait),
        taskBlock(exptBlock2),
        buildCountdown(exptBlockCountdown3, countdownWait),
        taskBlock(exptBlock3),
        buildCountdown(exptBlockCountdown4, countdownWait),
        taskBlock(exptBlock4),
        experimentEnd(3000)
        ]

export const tl = (MTURK) ? mturkTimeline : primaryTimeline
