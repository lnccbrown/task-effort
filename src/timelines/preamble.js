import { AT_HOME } from "../config/main";
import { prePracticeInstructions } from "../trials/instructions";
import welcome from "../trials/welcome";
import startCode from "../trials/startCode";
import { practiceBlock1 } from "../config/practice";

const preamble = {
  type: "html_keyboard_response",
  stimulus: "",
  timeline: AT_HOME
    ? [welcome, prePracticeInstructions(practiceBlock1)]
    : [startCode(), welcome, prePracticeInstructions(practiceBlock1)],
};

export default preamble;
