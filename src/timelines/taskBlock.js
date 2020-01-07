import taskTrial from './taskTrial'
import breakTrial from '../trials/breakTrial'
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
	let timeline = startingOpts.map( (opt) => taskTrial(blockSettings, blockDetails, opt))

	if (blockSettings.num_breaks > 0) {
		let breakInterval = Math.floor(startingOpts.length / (blockSettings.num_breaks + 1))
		let iBreak;
		for (iBreak in blockSettings.num_breaks) {
			timeline.splice(iBreak*breakInterval, 0, breakTrial)
	  }
	}
	debugger
	console.log(timeline)

  return {
		type: 'html_keyboard_response',
		timeline: timeline
	}
}

export default taskBlock
