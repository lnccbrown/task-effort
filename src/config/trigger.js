// NOTE - these event codes must match what is in public/config/trigger.js
const eventCodes = {
	fixation: 1,
	rewardProbability: 2,
	frameSpike: 3,
	costBenefits: 4,
	choice: 5,
	pressBalloon: 6,
	cumulativeRewards: 7,
	rewardFeedback: 8,
	show_earnings: 9,
	test_connect: 32,
	open_task: 18
}

// this is module.exports isntead of just exports as it is also imported into the electron app
module.exports = {
	eventCodes
}
