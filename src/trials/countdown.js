import * as _ from "lodash";
import { removeCursor } from "../lib/utils";

// build a countdown transition with the given text and number of seconds
const buildCountdown = (text, time) => {
  const times = _.range(time, 0, -1);
  const timeline = times.map((val) => {
    return {
      prompt: `
		  	<div class='effort-container'>
	  	    <h1>${text}<br><br>
		  	${val}</h1></div>`,
    };
  });

  return {
    type: "html_keyboard_response",
    stimulus: "",
    trial_duration: 1000,
    response_ends_trial: false,
    timeline: timeline,
    on_load: () => {
      removeCursor("experiment");
    },
  };
};

export default buildCountdown;
