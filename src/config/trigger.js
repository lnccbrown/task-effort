// NOTE - these event codes must match what is in public/config/trigger.js
const eventCodes = {
  practiceAndMainBlockDivider: 250,
  fixationStart: 1, // this is fixation dot onset
  // fixationEnd: 2, // this is fixation dot offset
  rewardProbabilityStart: 10, // reward probability (50% or 100%) onset
  // rewardProbabilityEnd: 11, // reward probability (50% of 100%) offset
  frameSpikeStart: 20, // frame and spike onset
  // frameSpikeEnd: 21, // frame and spike offset
   costBenefitsStart: 30, // points and effort values for both options onset
  // costBenefitsEnd: 31, // points and effort values for both options offset
  choiceStart: 40, // frame + spike + balloons, when participant can choose blue or green
  // choiceEnd: 41, // frame + spike + balloons offset, once participant has made a choice
  pressBalloonStart: 50, // once participant is able to pump the balloon by pressing a key
  // pressBalloonEnd: 51, // once the balloon has popped (once 25 secs from pressBalloonStart is over)
  cumulativeRewardsStart: 60, // total points earned thus far onset
  // cumulativeRewardsEnd: 61, // total points earned thus far offse
  rewardFeedbackStart: 70, // trial reward feedback onset
  // rewardFeedbackEnd: 71, // trial reward feedback offset
  showPaymentStart: 80, // end of task earnings screen onset
  // showPaymentEnd: 81, // end of task earnings screen offset
  trialFinishStart: 90, // marks when trial starts (fixation onset) -- currently NOT in use
  // trialFinishEnd: 91, // marks when trial ends (reward feedback offset)
  test_connect: 4,
  open_task: 5, // when the app is opened, send this code
};

// this is module.exports isntead of just exports as it is also imported into the electron app
module.exports = {
  eventCodes,
};
