// Event trigger settings - used in both the react app (renderer) and the electron app (main)
const comName = 'COM7'

// NOTE - these event codes must match what is in src/config/trigger.js
const eventCodes = {
	fixationStart: 1,
	fixationEnd: 2,
	rewardProbabilityStart: 10,
	rewardProbabilityEnd: 11,
	frameSpikeStart: 20,
	frameSpikeEnd: 21,
	costBenefitsStart: 30,
	costBenefitsEnd: 31,
	choiceStart: 40,
	choiceEnd: 41,
	pressBalloonStart: 50,
	pressBalloonEnd: 51,
	cumulativeRewardsStart: 60,
	cumulativeRewardsEnd: 61,
	rewardFeedbackStart: 70,
	rewardFeedbackEnd: 71,
	show_earnings: 3,
	test_connect: 4,
	open_task: 5
}

// this is module.exports isntead of just exports as it is also imported into the electron app
module.exports = {
	comName,
	eventCodes
}
