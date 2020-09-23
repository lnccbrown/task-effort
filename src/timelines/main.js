import buildCountdown from "../trials/countdown";
import preamble from "./preamble";
import experimentStart from "../trials/experimentStart";
import experimentEnd from "../trials/experimentEnd";
import taskBlock from "./taskBlock";
import showPayment from "../trials/showPayment";
import redirectToProlific from "../trials/redirectToProlific";
import userId from "../trials/userId";
import relaxReminder from "../trials/relaxReminder";
import recordNow from "../trials/recordNow";
import { ONLINE, lang, MTURK } from "../config/main";
import {
  practiceBlock1,
  practiceBlock2,
  practiceBlock3,
} from "../config/practice";
import { exptBlock1 } from "../config/experiment";
import {
  bluePracticeInstructions,
  greenPracticeInstructions,
  realPracticeInstructions,
  postPracticeInstructions,
} from "../trials/instructions";
import quizTimeline from "../trials/quizTrials";

const inLabTimeline = [
  experimentStart(),
  userId(),
  preamble,
  bluePracticeInstructions(),
  buildCountdown(lang.countdown.practice1, 3),
  taskBlock(practiceBlock1),
  greenPracticeInstructions(),
  buildCountdown(lang.countdown.practice2, 3),
  taskBlock(practiceBlock2),
  realPracticeInstructions(),
  buildCountdown(lang.countdown.practice3, 3),
  taskBlock(practiceBlock3),
  quizTimeline(practiceBlock3),
  relaxReminder(),
  recordNow(),
  postPracticeInstructions(),
  buildCountdown(lang.countdown.expt1, 3),
  taskBlock(exptBlock1),
  showPayment(5000, exptBlock1),
  experimentEnd(5000),
];

// online just means not using electron aka in-browser
const onlineTimeline = MTURK
  ? [
      experimentStart(),
      userId(),
      preamble,
      bluePracticeInstructions(),
      buildCountdown(lang.countdown.practice1, 3),
      taskBlock(practiceBlock1),
      greenPracticeInstructions(),
      buildCountdown(lang.countdown.practice2, 3),
      taskBlock(practiceBlock2),
      realPracticeInstructions(),
      buildCountdown(lang.countdown.practice3, 3),
      taskBlock(practiceBlock3),
      quizTimeline(practiceBlock3),
      postPracticeInstructions(),
      buildCountdown(lang.countdown.expt1, 3),
      taskBlock(exptBlock1),
      showPayment(5000, exptBlock1),
      experimentEnd(2000),
    ]
  : // PROLIFIC VERSION OF THE TASK BELOW:
    [
      // commented out for now/quick debugging:
      // experimentStart(),
      userId(),
      preamble,
      bluePracticeInstructions(),
      buildCountdown(lang.countdown.practice1, 3),
      taskBlock(practiceBlock1),
      greenPracticeInstructions(),
      buildCountdown(lang.countdown.practice2, 3),
      taskBlock(practiceBlock2),
      realPracticeInstructions(),
      buildCountdown(lang.countdown.practice3, 3),
      taskBlock(practiceBlock3),
      quizTimeline(practiceBlock3),
      postPracticeInstructions(),
      buildCountdown(lang.countdown.expt1, 3),
      taskBlock(exptBlock1),
      showPayment(5000, exptBlock1),
      buildCountdown(lang.countdown.redirect_to_prolific, 5),
      redirectToProlific(),
    ];

export const tl = ONLINE ? onlineTimeline : inLabTimeline;
