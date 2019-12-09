// Event trigger settings - used in both the react app (renderer) and the electron app (main)
const comName = 'COM7'

// NOTE - these event codes must match what is in src/config/trigger.js
const eventCodes = {
	fixation: 1,
	rewardProbability: 5,
	frameSpike: 6,
	costBenefits: 8,
	choice: 9,
	pressBalloon: 10,
	cumulativeRewards: 11,
	rewardFeedback: 12,
	show_earnings: 7,
	test_connect: 32,
	open_task: 18
}

// this is module.exports isntead of just exports as it is also imported into the electron app
module.exports = {
	comName,
	eventCodes
}
