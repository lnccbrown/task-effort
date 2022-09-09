import { jsPsych } from "jspsych-react";
import { eventCodes, keys, canvasSize, canvasSettings } from "../config/main";
import { photodiodeGhostBox, pdSpotEncode } from "../lib/markup/photodiode";
import { removeCursor } from "../lib/utils";
import { drawBalloon, drawSpike, drawText, drawEffort } from "../lib/drawUtils";

const CANVAS_SIZE = canvasSize;
const canvasHTML = `<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" id="jspsych-canvas">
    Your browser does not support HTML5 canvas
  </canvas>`;
const fixationHTML = `<div id="fixation-dot" class="color-white"> </div>`;

const choice = (duration, blockSettings, opts, trialDetails) => {
  let stimulus =
    `<div class="effort-container">` +
    canvasHTML +
    fixationHTML +
    photodiodeGhostBox() +
    `</div>`;

    const startCode = eventCodes.choiceStart;

    duration = blockSettings.is_practice ? 5000000 : duration; // make practice choices have no timeout
    let probability = blockSettings.is_practice ? opts : opts.prob;
    let value = blockSettings.is_practice ? blockSettings.value : opts.value;
    let effort = blockSettings.is_practice ? blockSettings.effort : opts.effort;
    let high_effort = blockSettings.is_practice
        ? blockSettings.high_effort
        : opts.high_effort;
    let valid_keys = blockSettings.keys;
    let get_reward = blockSettings.is_practice
        ? blockSettings.get_reward
        : opts.get_reward;

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
            let timeWhenStarted = new Date().getTime();

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
                drawEffort(
                    ctx,
                    value[0],
                    effort[0],
                    canvasSettings.textXpos[0],
                    canvasSettings.textYpos,
                    high_effort[0]
                );
                drawBalloon(
                    ctx,
                    effort[0],
                    high_effort[0],
                    canvasSettings.balloonXpos[0],
                    canvasSettings.balloonYpos,
                    canvasSettings.balloonRadius
                );

        // drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[1], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
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
        drawEffort(
          ctx,
          value[1],
          effort[1],
          canvasSettings.textXpos[1],
          canvasSettings.textYpos,
          high_effort[1]
        );
        drawBalloon(
          ctx,
          effort[1],
          high_effort[1],
          canvasSettings.balloonXpos[1],
          canvasSettings.balloonYpos,
          canvasSettings.balloonRadius
        );
       };

            canvasDraw();
            var timer = setInterval(function () {
                var now = new Date().getTime();
                var percTimePassed = (now - timeWhenStarted) / 1000 / (duration / 1000);

        if (percTimePassed >= 1) {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
          clearInterval(timer);
          var returnObj = {
            key: 0,
            effort: 0,
            value: 0,
            high_effort: 0,
            get_reward: 0,
            subtrial_type: "choice",
          };
          done(returnObj);
        }
      }, 20);
      function after_response(info) {
        clearInterval(timer);
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        if (info.key === keys["Q"]) {
          // 1 key
          var timeWhenPressed = new Date().getTime();
          var rt = timeWhenPressed - timeWhenStarted;
          var returnObj = {
            rt:rt,
            key: info.key,
            effort: effort[0],
            value: value[0],
            high_effort: high_effort[0],
            get_reward: get_reward[0],
            subtrial_type: "choice",
          };
          done(returnObj);
        } else if (info.key === keys["P"]) {
          // 0 key
          timeWhenPressed = new Date().getTime();
          rt = timeWhenPressed - timeWhenStarted;
          returnObj = {
            rt:rt,
            key: info.key,
            effort: effort[1],
            value: value[1],
            high_effort: high_effort[1],
            get_reward: get_reward[1],
            subtrial_type: "choice",
          };
          done(returnObj);
        }
      }
        trialDetails.probability = probability;
        trialDetails.effort = effort;
        trialDetails.high_effort = high_effort;
        trialDetails.value = value;
        trialDetails.subtrial_type = "choice";

            var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_response,
                valid_responses: valid_keys,
                rt_method: "date",
                persist: true,
                allow_held_key: false,
            });
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

export default choice;
