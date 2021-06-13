import taskTrial from './taskTrial'
import breakTrial from './breakTrial'
import { generateStartingOpts } from '../lib/taskUtils'

const taskBlock = (blockSettings) => {
	// initialize block
	const startingOpts = generateStartingOpts(blockSettings)

	const blockDetails = {
		block_earnings: 0.0,
		optimal_earnings: 0.0,
		continue_block: true
	}

	// timeline = loop through trials
	let timeline = startingOpts.map((opt) => taskTrial(blockSettings, blockDetails, opt))

	if (blockSettings.num_breaks > 0) {
		let breakInterval = Math.floor(timeline.length / (blockSettings.num_breaks + 1))
		for (let iBreak = 1; iBreak < blockSettings.num_breaks + 1; iBreak++) {
			timeline.splice(iBreak * breakInterval, 0, breakTrial(iBreak))
		}
	}

	return {
		type: 'html_keyboard_response',
		timeline: timeline
	}
}

export default taskBlock
