import taskTrial from './taskTrial'
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
	let timeline =  startingOpts.map( (probs) => taskTrial(blockSettings, blockDetails, probs))
	//let timeline = taskTrial(blockSettings, blockDetails)

  return {
		type: 'html_keyboard_response',
		timeline: timeline
	}
}

export default taskBlock
