// utilities specific to this app/task

import _ from 'lodash'

// initialize starting conditions for each trial within a block
const generateStartingOpts = (blockSettings) => {
	if(blockSettings.is_practice)
	{
		let startingOptions = blockSettings.probs.map( (c) => {
			// Repeat each starting condition the same number of times
			return _.range(blockSettings.repeats_per_condition).map( () => c )
		})
	
		return _.shuffle(_.flatten(startingOptions))
	}
	else
	{
		let opts = []
		for (let i = 0; i < blockSettings.probs.length; i++){
			for (let val in blockSettings.value){
				for (let eff in blockSettings.effort){
					opts.push({prob: blockSettings.probs[i], effort: [blockSettings.effort[eff],20], value: [blockSettings.value[val], 1]})
					if (blockSettings.counterbalance){
						opts.push({prob: blockSettings.probs[i], effort: [20, blockSettings.effort[eff]], value: [1, blockSettings.value[val]]});
					}
				}
			}
		}
		return _.shuffle(opts)
	}
}



export {
	generateStartingOpts
}
