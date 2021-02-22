import { lang } from "../config/main";
import { baseStimulus } from "../lib/markup/stimuli";
import { addCursor } from "../lib/utils";

const welcomeScreenOne = baseStimulus(
  `
    <div class='instructions'>
    <h1 style='font-size:2.5vw;'>${lang.instructions.welcome}</h1>
    <br>
    ${lang.instructions.choose_btwn_two_balloons}</p>
    ${lang.instructions.your_job}</p>
    </div>
    `,
  true
);

const welcomeScreenTwo = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>'${lang.instructions.pop_balloon_earn_money}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.points_to_bonus_conversion}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.cumulative_rewards}</p>
    </div>
    `,
  true
);

const bluePracticeScreen = baseStimulus(
  `
    <div class='instructions'>
    <pstyle='font-size:1.75vw;'>${lang.instructions.two_balloons}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.blue_balloon_points}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.blue_practice_pump}</p>
    </div>
    `,
  true
);

const greenPracticeScreenOne = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>${lang.instructions.green_balloon_points}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.green_balloon_pop_time}</p>
    </div>
    `,
  true
);

const greenPracticeScreenTwo = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>${lang.instructions.green_balloon_pump_bonus}</p>
    </div>
    `,
  true
);

const greenPracticeScreenThree = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>${lang.instructions.green_practice_pump}</p>
    </div>
    `,
  true
);

const realPracticeScreenOne = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>${lang.instructions.green_balloon_variable_points_pumps}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.blue_balloon_constant_points_pumps}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.wait_pump}</p>
    </div>
    `,
  true
);

const realPracticeScreenTwo = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>${lang.instructions.reward_prob_variable}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.reward_prob_certain}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.prob_display_location}</p>
    </div>
    `,
  true
);

const realPracticeScreenThree = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>${lang.instructions.reward_prob_display_event}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.missed_choice}</p>
    </div>
    `,
  true
);

const realPracticeScreenFour = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>${lang.instructions.pump_keys}</p>
    <p style='font-size:1.75vw;'>${lang.instructions.choice_locked_in}</p>
    </div>
    `,
  true
);

const readyScreen = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>${lang.instructions.ready}</p>
    </div>
    `,
  true
);

const qualtricsIntroScreenOne = baseStimulus(
  `
    <div class='instructions'>
    <p style='font-size:1.75vw;'>${lang.questionnaires.intro}</p>
    </div>
    `,
  true
);

// First few instructions screens
const prePracticeInstructions = () => {
  let instructionsArray = [welcomeScreenOne, welcomeScreenTwo];

  return {
    type: "instructions",
    show_clickable_nav: true,
    pages: instructionsArray,
    on_load: () => {
      addCursor("experiment");
    },
  };
};

// Instruction screens re: blue balloon
const bluePracticeInstructions = () => {
  let bluePracticeInstructionsArray = [bluePracticeScreen];

  return {
    type: "instructions",
    show_clickable_nav: true,
    pages: bluePracticeInstructionsArray,
    on_load: () => {
      addCursor("experiment");
    },
  };
};

// Instruction screens re: green balloon
const greenPracticeInstructions = () => {
  let greenPracticeInstructionsArray = [
    greenPracticeScreenOne,
    greenPracticeScreenTwo,
    greenPracticeScreenThree,
  ];

  return {
    type: "instructions",
    show_clickable_nav: true,
    pages: greenPracticeInstructionsArray,
    on_load: () => {
      addCursor("experiment");
    },
  };
};

// Instruction screens re: 1 real practice trials
// where both balloons are possible choices
const realPracticeInstructions = () => {
  let realPracticeInstructionsArray = [
    realPracticeScreenOne,
    realPracticeScreenTwo,
    realPracticeScreenThree,
    realPracticeScreenFour,
  ];

  return {
    type: "instructions",
    show_clickable_nav: true,
    pages: realPracticeInstructionsArray,
    on_load: () => {
      addCursor("experiment");
    },
  };
};

// Instructions after practice trials
const postPracticeInstructions = () => {
  let postPracticeInstructionsArray = [readyScreen];

  return {
    type: "instructions",
    show_clickable_nav: true,
    pages: postPracticeInstructionsArray,
    on_load: () => {
      addCursor("experiment");
    },
  };
};

// Instructions before Qualtrics questionnaires
const qualtricsIntro = () => {
  let instructionsArray = [qualtricsIntroScreenOne];

  return {
    type: "instructions",
    show_clickable_nav: true,
    pages: instructionsArray,
    on_load: () => {
      addCursor("experiment");
    },
  };
};

export {
  prePracticeInstructions,
  bluePracticeInstructions,
  greenPracticeInstructions,
  realPracticeInstructions,
  postPracticeInstructions,
  qualtricsIntro,
};
