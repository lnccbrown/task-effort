import { eventCodes, canvasSize, canvasSettings } from "../config/main";
import { photodiodeGhostBox, pdSpotEncode } from "../lib/markup/photodiode";
import { removeCursor } from "../lib/utils";
import { drawText } from "../lib/drawUtils";
import { addData } from "../lib/taskUtils";

const CANVAS_SIZE = canvasSize;
const canvasHTML = `<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" id="jspsych-canvas">
    Your browser does not support HTML5 canvas
  </canvas>`;
const fixationHTML = `<div id="fixation-dot" class="color-white"> </div>`;

const rewardProbability = (duration, blockSettings, opts, trialDetails) => {
  let stimulus =
    `<div class="effort-container">` +
    canvasHTML +
    fixationHTML +
    photodiodeGhostBox() +
    `</div>`;

  const startCode = eventCodes.rewardProbabilityStart;
  const endCode = eventCodes.rewardProbabilityEnd;

  let probability = blockSettings.is_practice ? opts : opts.prob;

  return {
    type: "call_function",
    async: true,
    func: (done) => {
      document.getElementById("jspsych-content").innerHTML = stimulus;

      // set up canvas
      let canvas = document.querySelector("#jspsych-canvas");
      let ctx = canvas.getContext("2d");

      const rewProbDraw = () => {
        // transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawText(
          ctx,
          `${probability}`,
          canvasSettings.rewProbXpos,
          canvasSettings.rewProbYpos,
          "undefined"
        );
      };

      trialDetails.probability = probability;
      trialDetails.subtrial_type = "reward_prob";

      rewProbDraw();
      setTimeout(() => {
        done(addData(trialDetails, blockSettings, opts));
      }, duration);
    },
    on_load: () => {
      removeCursor("experiment");
      pdSpotEncode(startCode);
    },
    on_finish: (data) => {
      pdSpotEncode(endCode);
      data.encode = [startCode, endCode];
    },
  };
};

export default rewardProbability;
