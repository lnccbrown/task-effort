import { defaultBlockSettings } from "./main";
import { deepCopy } from "../lib/utils";

// FIRST EXPERIMENT BLOCK SETTINGS

// create copy of default settings
let exptBlock1 = deepCopy(defaultBlockSettings);

exptBlock1.probs = ["100%", "100%", "50%", "50%"];
exptBlock1.counterbalance = true;
exptBlock1.get_subset = true;
exptBlock1.value = [3, 5, 7];
exptBlock1.effort = [50, 100, 200]; // default vals were: 100, 120, 150
exptBlock1.keys = ["q", "p", "m"];
exptBlock1.get_reward = [true, true, true, false];
exptBlock1.num_breaks = 3;

// debug settings where there are only 2 trials in main task block
//exptBlock1.probs = ["100%"];
//exptBlock1.counterbalance = true;
//exptBlock1.value = [3];
//exptBlock1.effort = [5];
//exptBlock1.keys = ["q", "p", "m"];
//exptBlock1.get_reward = [true];

export { exptBlock1 };
