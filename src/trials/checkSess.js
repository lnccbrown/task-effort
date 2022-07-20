import userId from "../trials/userId";
import { jsPsych } from "jspsych-react";

const retakeLoop = () => {
    return {
      timeline: [	userId() ],
        loop_function: () => {
      const sess1 = jsPsych.data.getLastTrialData().values()[0];
        var sess =  parseInt(JSON.parse(sess1.responses)["Q1"]);
         
        if (
          sess != 1 & sess!=2
        ) {
          return true;
        } else {
          return false;
        }
        },
    };
    };

const checkSess = () => {
    return {
      timeline: [retakeLoop()],
      conditional_function: () => {
          const sess1 = jsPsych.data.getLastTrialData().values()[0];
      var sess =  parseInt(JSON.parse(sess1.responses)["Q1"]);
        if (
           sess != 1 & sess!=2
        ) {
          return true;
        } else {
          return false;
        }
      },
    };
  };
  let checkSessTimeline = () => {
      return {
      timeline: [checkSess()],
        type: "html_keyboard_response",
      };
    }
  export default checkSessTimeline;