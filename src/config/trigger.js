// NOTE - these event codes must match what is in public/config/trigger.js
const eventCodes = {
	fixationStart: 1,
	fixationEnd: 2,
	rewardProbabilityStart: 3,
	rewardProbabilityEnd: 4,
	frameSpikeStart: 5,
	frameSpikeEnd: 6,
	costBenefitsStart: 7,
	costBenefitsEnd: 8,
	choiceStart: 9,
	choiceEnd: 10,
	pressBalloonStart: 11,
	pressBalloonEnd: 12,
	cumulativeRewardsStart: 13,
	cumulativeRewardsEnd: 14,
	rewardFeedbackStart: 15,
	rewardFeedbackEnd: 16,
	show_earnings: 30,
	test_connect: 40,
	open_task: 50
}

// this is module.exports isntead of just exports as it is also imported into the electron app
module.exports = {
	eventCodes
}
