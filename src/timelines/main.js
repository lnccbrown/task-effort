import buildCountdown from '../trials/countdown'
import preamble from './preamble'
import experimentEnd from '../trials/experimentEnd'
import taskBlock from './taskBlock'
import userId from '../trials/userId'

import { MTURK, lang } from '../config/main'
import { practiceBlock1 } from '../config/practice'
import { exptBlock1 } from '../config/experiment'
import { tutorialBlock } from '../config/tutorial'

import startCode from '../trials/startCode'

const primaryTimeline = [
        preamble,
        buildCountdown(lang.countdown.practice1, 3),
        taskBlock(practiceBlock1),
        buildCountdown(lang.countdown.expt1, 3),
        taskBlock(exptBlock1),
        experimentEnd(5000)
        ]

const mturkTimeline = [
        preamble,
        buildCountdown(lang.countdown.practice1, 3),
        taskBlock(practiceBlock1),
        buildCountdown(lang.countdown.expt1, 3),
        taskBlock(exptBlock1),
        experimentEnd(5000)
        ]

export const tl = (MTURK) ? mturkTimeline : primaryTimeline
