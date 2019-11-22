import experimentStart from '../trials/experimentStart'
import preamble from './preamble'
import experimentEnd from '../trials/experimentEnd'
import { buildCountdown, pracBlockCountdown1, exptBlockCountdown1 } from '../trials/countdown'
import taskBlock from './taskBlock'
import userId from '../trials/userId'
import { MTURK, lang, countdownWait } from '../config/main'
import { practiceBlock1, practiceBlock2, practiceBlock3 } from '../config/practice'
import { exptBlock1 } from '../config/experiment'
import { tutorialBlock } from '../config/tutorial'

import startCode from '../trials/startCode'


const primaryTimeline = [
        experimentStart(),
        userId(),
        preamble,
        buildCountdown(pracBlockCountdown1, countdownWait),
        taskBlock(practiceBlock1),
        buildCountdown(exptBlockCountdown1, countdownWait),
        taskBlock(exptBlock1),
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
        experimentEnd(3000)
        ]

export const tl = (MTURK) ? mturkTimeline : primaryTimeline
