// config/main.js
// This is the main configuration file where universal and default settings should be placed.
// These settins can then be imported anywhere in the app as they are exported at the botom of the file.

import { jsPsych } from 'jspsych-react'
import _ from 'lodash'
import { eventCodes } from './trigger'
const canvasSize = 600
const x25 = canvasSize * 0.25
const x20 = canvasSize * 0.2
const x33 = canvasSize * 0.33
const x75 = canvasSize * 0.75
const x8 = canvasSize * 0.0833
const x58 = canvasSize * 0.5833
const x42 = canvasSize * 0.4166
const x17 = canvasSize * 0.1667
const x70 = canvasSize * 0.7
const x67 = canvasSize * 0.6667
const x2 = canvasSize * 0.01667
const x3 = canvasSize * 0.033333
const x68 = canvasSize * 0.683333
const canvasSettings = {
	frameDimensions: [x33, x75],
	frameXpos: [x8, x58],
	frameYpos: x8,
	frameLinecolor: '#ffffff',
	balloonXpos: [x25, x75],
	balloonYpos: x68,
	spikeWidth: x8,
	spikeRefHeight: x42,
	spikeXpos: [x25, x75],
	spikeYpos: x17,
	textXpos: [x20, x70],
	textYpos: x67,
	lineHeight: x2,
	balloonRadius: x2,
	balloonBaseHeight: x8 + x75 - x68 - x2, // Balloon base height
	spiketopHeight: x17 - x8, // top height left from frame to spike
	inflateByHE: x75 / 800,
	inflateByNHE: x75 / 65
}
// mapping of letters to key codes
const keys = {
	"A": 65,
	"B": 66,
	"C": 67,
	"F": 70,
	"J": 74,
	"P": 80,
	"Q": 81,
	"space": 32
}

// is this mechanical turk?
const MTURK = (!jsPsych.turk.turkInfo().outsideTurk)
const AT_HOME = (process.env.REACT_APP_AT_HOME === 'true')

// get language file
const lang = require('../language/en_us.json')
if (process.env.MTURK) { // if this is mturk, merge in the mturk specific language
  const mlang = require('../language/en_us.mturk.json')
	_.merge(lang, mlang)
}

const defaultBlockSettings = {
	probs: ["100%"],
	value: [1, 0],
	effort: [20, 0],
	high_effort: [],
	counterbalance: false,
	keys: [],
	repeats_per_condition: 1, // number of times every condition is repeated
	is_practice: false,
	photodiode_active: false,
}

// how long to countdown
const countdownWait = 3

export {
	keys,
	defaultBlockSettings,
	lang,
	countdownWait,
	eventCodes,
	MTURK,
	AT_HOME,
	canvasSize,
	canvasSettings
}
