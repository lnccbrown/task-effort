// config/main.js
// This is the main configuration file where universal and default settings should be placed.
// These settins can then be imported anywhere in the app as they are exported at the botom of the file.

import { jsPsych } from 'jspsych-react'
import _ from 'lodash'
import { eventCodes } from './trigger'

const canvasSettings = {
	canvasSize: 600 // canvas is a square
}


// mapping of letters to key codes
const keys = {
	"A": 65,
	"B": 66,
	"C": 67,
	"F": 70,
	"J": 74,
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
	counterbalance: false,
	repeats_per_condition: 1, // number of times every condition is repeated
	is_practice: false,
	is_tutorial: false,
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
	canvasSettings
}
