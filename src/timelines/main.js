import buildCountdown from '../trials/countdown'
import preamble from './preamble'
import experimentEnd from '../trials/experimentEnd'
import taskBlock from './taskBlock'
import userId from '../trials/userId'

import { MTURK, lang } from '../config/main'
import { practiceBlock1, practiceBlock2, practiceBlock3 } from '../config/practice'
import { exptBlock1, exptBlock2, exptBlock3, exptBlock4 } from '../config/experiment'

import startCode from '../trials/startCode'


const primaryTimeline = [
        preamble,
        buildCountdown(lang.countdown.message1, 3),
        taskBlock(practiceBlock1),
        buildCountdown(lang.countdown.message2, 3),
        taskBlock(practiceBlock2),
        buildCountdown(lang.countdown.message3, 3),
        taskBlock(practiceBlock3),
        buildCountdown(lang.countdown.message4, 3),
        taskBlock(exptBlock1),
        buildCountdown(lang.countdown.message5, 3),
        taskBlock(exptBlock2),
        buildCountdown(lang.countdown.message6, 3),
        taskBlock(exptBlock3),
        buildCountdown(lang.countdown.message7, 3),
        taskBlock(exptBlock4),
        experimentEnd(5000)
        ]

const mturkTimeline = [
        preamble,
        buildCountdown(lang.countdown.message1, 3),
        taskBlock(tutorialBlock),
        buildCountdown(lang.countdown.message2, 3),
        taskBlock(exptBlock2),
        experimentEnd(3000)
        ]

export const tl = (MTURK) ? mturkTimeline : primaryTimeline
