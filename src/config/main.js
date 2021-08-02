// src/config/main.js
// This is the main configuration file where universal and default settings should be placed.
// These settings can then be imported anywhere in the app as they are exported at the botom of the file.

// import { jsPsych } from "jspsych-react";
import _ from "lodash";
import { eventCodes } from "./trigger";

const canvasSize = 600;
const x25 = canvasSize * 0.25;
const x20 = canvasSize * 0.2;
const x33 = canvasSize * 0.33;
const x75 = canvasSize * 0.75;
const x8 = canvasSize * 0.0833;
const x58 = canvasSize * 0.5833;
const x42 = canvasSize * 0.4166;
const x41 = canvasSize * 0.41;
const x17 = canvasSize * 0.1667;
const x90 = canvasSize * 0.9;
const x70 = canvasSize * 0.7;
const x2 = canvasSize * 0.01667;
const x68 = canvasSize * 0.683333;
const canvasSettings = {
  frameDimensions: [x33, x75],
  frameXpos: [x8, x58],
  frameYpos: x8,
  frameLinecolor: "#ffffff",
  balloonXpos: [x25, x75],
  balloonYpos: x68,
  spikeWidth: x8,
  spikeRefHeight: x42,
  spikeXpos: [x25, x75],
  spikeYpos: x17,
  textXpos: [x20, x70],
  textYpos: x90,
  rewProbXpos: x41,
  rewProbYpos: x90,
  lineHeight: x2,
  balloonRadius: x2,
  balloonBaseHeight: x8 + x75 - x68 - x2, // Balloon base height
  spiketopHeight: x17 - x8, // top height left from frame to spike
  inflateByHE: x75 / 800,
  inflateByNHE: x75 / 65,
};
// mapping of letters to key codes
const keys = {
  P: 80,
  Q: 81,
  space: 32,
  experimenter: "m", // key experimenter presses to quit payment screen
};

// all the possible environments for the task:
const AT_HOME = process.env.REACT_APP_AT_HOME === "true";
const MTURK = process.env.REACT_APP_TURK === "true";
// const MTURK = !jsPsych.turk.turkInfo().outsideTurk;
let IS_ELECTRON = true;
let ONLINE = false;
let FIREBASE = process.env.REACT_APP_FIREBASE === "true";
let PROLIFIC = false;

try {
  window.require("electron");
} catch {
  IS_ELECTRON = false;
}

// if AT_HOME and not in-lab/in-clinic EEG electron version,
// then assume it's online in the browser
// with MTurk or Prolific
ONLINE = AT_HOME && !IS_ELECTRON ? true : false;
//ONLINE = true;
console.log("ONLINE:", ONLINE);

// note: it _is_ possible to do both firebase & mturk if desired
// but for now assumine if not mturk then it's prolific and firebase:
if (ONLINE) {
  PROLIFIC = !MTURK;
  if (PROLIFIC) {
    FIREBASE = true;
  }
}

// set whether photodiode visible or not
const PHOTODIODE_ON = false;

// get language file
const lang = require("../language/en_us.json");
// note: prolific lang is lumped in with en_us.json
if (MTURK) {
  // if this is mturk, merge in the mturk specific language
  const mlang = require("../language/en_us.mturk.json");
  _.merge(lang, mlang);
}

const defaultBlockSettings = {
  probs: ["100%"],
  value: [1, 0],
  effort: [20, 0],
  high_effort: [],
  get_reward: [],
  counterbalance: false,
  keys: [],
  repeats_per_condition: 1, // number of times every condition is repeated
  is_practice: false,
  photodiode_active: false,
  num_breaks: 0,
};

// high effort timeout (in seconds)
const high_effort_time = 25;

// how long to countdown (in seconds)
const countdownWait = 3;

export {
  keys,
  defaultBlockSettings,
  lang,
  countdownWait,
  eventCodes,
  ONLINE,
  MTURK,
  PROLIFIC,
  AT_HOME,
  IS_ELECTRON,
  FIREBASE,
  PHOTODIODE_ON,
  canvasSize,
  canvasSettings,
  high_effort_time,
};
