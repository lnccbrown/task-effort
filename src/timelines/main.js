import buildCountdown from '../trials/countdown'
import preamble from './preamble'
import experimentEnd from '../trials/experimentEnd'
import taskBlock from './taskBlock'
import userId from '../trials/userId'

import { MTURK, lang } from '../config/main'
import { practiceBlock1, practiceBlock2, practiceBlock3 } from '../config/practice'
import { exptBlock1 } from '../config/experiment'
import { bluePracticeInstructions, greenPracticeInstructions, realPracticeInstructions, postPracticeInstructions } from '../trials/instructions'
import quizTimeline from '../trials/quizTrials'

import startCode from '../trials/startCode'

const primaryTimeline = [
        // preamble,
        // buildCountdown(lang.countdown.practice1, 3),
        bluePracticeInstructions(),
        taskBlock(practiceBlock1),
        greenPracticeInstructions(),
        taskBlock(practiceBlock2),
        realPracticeInstructions(),
        taskBlock(practiceBlock3),
        quizTimeline(practiceBlock1),
        postPracticeInstructions(),
        buildCountdown(lang.countdown.expt1, 3),
        taskBlock(exptBlock1),
        experimentEnd(5000)
        ]

const mturkTimeline = [
        preamble,
        buildCountdown(lang.countdown.practice1, 3),
        bluePracticeInstructions(),
        taskBlock(practiceBlock1),
        greenPracticeInstructions(),
        taskBlock(practiceBlock2),
        realPracticeInstructions(),
        taskBlock(practiceBlock3),
        quizTimeline(practiceBlock1),
        postPracticeInstructions(),
        buildCountdown(lang.countdown.expt1, 3),
        taskBlock(exptBlock1),
        experimentEnd(5000)
        ]

export const tl = (MTURK) ? mturkTimeline : primaryTimeline
