// imports
import { eventCodes, canvasSize, canvasSettings } from "../config/main";
import { photodiodeGhostBox, pdSpotEncode } from "../lib/markup/photodiode";
import { removeCursor } from "../lib/utils";
import { addData } from "../lib/taskUtils";
import { drawEffort, drawSpike, drawText } from "../lib/drawUtils";

const CANVAS_SIZE = canvasSize;
const canvasHTML = `<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" id="jspsych-canvas">
    Your browser does not support HTML5 canvas
  </canvas>`;
const fixationHTML = `<div id="fixation-dot" class="color-white"> </div>`;

const costBenefits = (duration, blockSettings, opts, trialDetails) => {
  let stimulus =
    `<div class="effort-container">` +
    canvasHTML +
    fixationHTML +
    photodiodeGhostBox() +
    `</div>`;

  const startCode = eventCodes.costBenefitsStart;

  let probability = blockSettings.is_practice ? opts : opts.prob;
  let value = blockSettings.is_practice ? blockSettings.value : opts.value;
  let effort = blockSettings.is_practice ? blockSettings.effort : opts.effort;
  let high_effort = blockSettings.is_practice
    ? blockSettings.high_effort
    : opts.high_effort;

  return {
    type: "call_function",
    async: true,
    func: (done) => {
      // add stimulus to the DOM
      document.getElementById("jspsych-content").innerHTML = stimulus;
      // $('#jspsych-content').addClass('task-container')

      // set up canvas
      let canvas = document.querySelector("#jspsych-canvas");
      let ctx = canvas.getContext("2d");

      const canvasDraw = () => {
        // transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var inflateBy;
        var spikeHeight = [0, 0];
        for (let i = 0; i < 2; i++) {
          if (high_effort[i]) {
            inflateBy = canvasSettings.inflateByHE;
          } else {
            inflateBy = canvasSettings.inflateByNHE;
          }

          // how far should the spike be
          var targetDist = 2 * inflateBy * (effort[i] - 1);
          var balloonBaseHeight =
            canvasSettings.balloonBaseHeight + 2 * canvasSettings.balloonRadius;
          // distance of the spike from the top
          spikeHeight[i] = effort[i]
            ? canvasSettings.frameDimensions[1] -
              balloonBaseHeight -
              targetDist -
              canvasSettings.spiketopHeight
            : 0;
        }

        drawText(
          ctx,
          `${probability}`,
          canvasSettings.rewProbXpos,
          canvasSettings.rewProbYpos,
          "undefined"
        );

        // drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[0], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
        drawEffort(
          ctx,
          value[0],
          effort[0],
          canvasSettings.textXpos[0],
          canvasSettings.textYpos,
          high_effort[0]
        );
        drawSpike(
          ctx,
          canvasSettings.spikeWidth,
          spikeHeight[0],
          canvasSettings.spikeXpos[0],
          canvasSettings.spikeYpos,
          canvasSettings.frameLinecolor,
          canvasSettings.frameLinecolor,
          false
        );

        // drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[1], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
        drawEffort(
          ctx,
          value[1],
          effort[1],
          canvasSettings.textXpos[1],
          canvasSettings.textYpos,
          high_effort[1]
        );
        drawSpike(
          ctx,
          canvasSettings.spikeWidth,
          spikeHeight[1],
          canvasSettings.spikeXpos[1],
          canvasSettings.spikeYpos,
          canvasSettings.frameLinecolor,
          canvasSettings.frameLinecolor,
          false
        );
      };

      trialDetails.probability = probability;
      trialDetails.effort = effort;
      trialDetails.high_effort = high_effort;
      trialDetails.value = value;
      trialDetails.subtrial_type = "cost_benefits";

      canvasDraw();
      setTimeout(() => {
        done(addData(trialDetails, blockSettings, opts));
      }, duration);
    },
    on_load: () => {
      removeCursor("experiment");
      pdSpotEncode(startCode);
    },
    on_finish: (data) => {
      data.code = startCode;
    },
  };
};

export default costBenefits;
