import buildCountdown from '../trials/countdown'
import preamble from './preamble'
import experimentEnd from '../trials/experimentEnd'
import taskBlock from './taskBlock'
import userId from '../trials/userId'

import { MTURK, lang } from '../config/main'
import { practiceBlock1, practiceBlock2, practiceBlock3 } from '../config/practice'
import { exptBlock1 } from '../config/experiment'
import { tutorialBlock } from '../config/tutorial'

import startCode from '../trials/startCode'


const primaryTimeline = [
        //preamble,
        //buildCountdown(lang.countdown.message1, 3),
        //taskBlock(practiceBlock1),
        //buildCountdown(lang.countdown.message2, 3),
        //taskBlock(practiceBlock2),
        //buildCountdown(lang.countdown.message3, 3),
        //taskBlock(practiceBlock3),
        //buildCountdown(lang.countdown.message4, 3),
        taskBlock(exptBlock1),
        experimentEnd(5000)
        ]

const mturkTimeline = [
        preamble,
        buildCountdown(lang.countdown.message1, 3),
        taskBlock(tutorialBlock),
        buildCountdown(lang.countdown.message2, 3),
        taskBlock(exptBlock1),
        experimentEnd(3000)
        ]

export const tl = (MTURK) ? mturkTimeline : primaryTimeline
