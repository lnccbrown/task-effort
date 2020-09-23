import { jsPsych } from "jspsych-react";
import {
  eventCodes,
  keys,
  canvasSize,
  canvasSettings,
  high_effort_time,
} from "../config/main";
import { photodiodeGhostBox, pdSpotEncode } from "../lib/markup/photodiode";
import { removeCursor } from "../lib/utils";
import { drawBalloon, drawSpike, drawEffort, drawText } from "../lib/drawUtils";

const CANVAS_SIZE = canvasSize;
const canvasHTML = `<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" id="jspsych-canvas">
    Your browser does not support HTML5 canvas
  </canvas>`;

const pressBalloon = (duration, blockSettings, opts) => {
  let stimulus =
    `<div class="effort-container">` +
    canvasHTML +
    photodiodeGhostBox() +
    `</div>`;

  let valid_keys = blockSettings.keys;
  let is_practice = blockSettings.is_practice;

  const startCode = eventCodes.pressBalloonStart;
  const endCode = eventCodes.pressBalloonEnd;

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
      let values = jsPsych.data.get().select("value").values;
      let last = values[values.length - 1];
      if (last.key) {
        // set up canvas
        let canvas = document.querySelector("#jspsych-canvas");
        let ctx = canvas.getContext("2d");
        let timeWhenStarted = new Date().getTime();
        let inflateBy,
          popped = 0,
          countPumps = 0,
          radius = canvasSettings.balloonRadius,
          spikeHeight,
          reward;
        let balloonBaseHeight =
          canvasSettings.balloonBaseHeight + 2 * canvasSettings.balloonRadius;
        let balloonYpos = canvasSettings.balloonYpos;
        let points,
          data = {};
        let keys_pressed = jsPsych.data.get().select("value").values;
        let choice = keys_pressed[keys_pressed.length - 1];

        if (choice.high_effort) {
          inflateBy = canvasSettings.inflateByHE;
        } else {
          inflateBy = canvasSettings.inflateByNHE;
        }

        const canvasDraw = () => {
          // transparent background
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawText(
            ctx,
            `${probability}`,
            canvasSettings.rewProbXpos,
            canvasSettings.rewProbYpos,
            "undefined"
          );

          var targetDist = 2 * inflateBy * (choice.effort - 1);
          spikeHeight = choice.effort
            ? canvasSettings.frameDimensions[1] -
              balloonBaseHeight -
              targetDist -
              canvasSettings.spiketopHeight
            : 0;
          if (choice.key === keys["Q"]) {
            // drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[0], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
            drawSpike(
              ctx,
              canvasSettings.spikeWidth,
              spikeHeight,
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
              choice.effort,
              choice.high_effort,
              canvasSettings.balloonXpos[0],
              canvasSettings.balloonYpos,
              radius
            );
          } else {
            // drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[1], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
            drawSpike(
              ctx,
              canvasSettings.spikeWidth,
              spikeHeight,
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
              choice.effort,
              choice.high_effort,
              canvasSettings.balloonXpos[1],
              canvasSettings.balloonYpos,
              radius
            );
          }
        };

        canvasDraw();
        var timer = setInterval(function () {
          var now = new Date().getTime();
          var percTimePassed =
            (now - timeWhenStarted) / 1000 / high_effort_time;
          // console.log("percTimePassed", percTimePassed);

          // previously, was checking for at least 1 pump before starting
          // popTimeout timer basically... which isn't ideal, like so:
          //           if ((percTimePassed >= 1) & (countPumps > 0)) {
          if (percTimePassed >= 1) {
            if (!choice.high_effort) {
              points = 0;
            }
            popTimeout();
            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            done(data);
          }
        }, 50);
        function computeReward() {
          if (choice.high_effort && choice.get_reward) {
            points = choice.value * (countPumps / choice.effort);
            // console.log("choice.value", choice.value);
            // console.log("countPumps", countPumps);
            // console.log("choice.effort", choice.effort);
            // console.log("points", points);
            points = Math.round(points * 100) / 100;
            // console.log("round(points*100)/100", points);
          } else if (!choice.get_reward) {
            points = 0;
          } else {
            points = choice.value;
          }

          return points;
        }

        function pop() {
          clearInterval(timer);
          // pop balloon
          popped = true;
          // this.deleteCircle();

          reward = computeReward();
          // console.log("reward", reward);
          // console.log("reward", reward);
          data = {
            reward: reward,
            is_practice: is_practice,
            subtrial_type: "inflate_balloon",
            rt: rts,
            pumps: countPumps,
            timeWhenPopped: new Date().getTime(),
            firstPress: rts[0],
            lastPress: rts[rts.length - 1],
          };
        }

        function popTimeout() {
          clearInterval(timer);
          // pop balloon
          popped = true;
          // this.deleteCircle();
          if (choice.high_effort) {
            reward = computeReward();
          } else {
            reward = 0;
          }

          // if rts is empty (i.e. they didn't press/pump, only chose a balloon)
          // set rts[0] to empty
          const noPresses = rts.length === 0 ? true : false;
          console.log("noPresses", noPresses);

          data = {
            reward: reward,
            is_practice: is_practice,
            subtrial_type: "inflate_balloon",
            rt: rts,
            pumps: countPumps,
            firstPress: noPresses ? rts : rts[0],
            lastPress: noPresses ? rts : rts[rts.length - 1],
          };

          console.log("data", data);
        }
        function hitSpike() {
          var balloonBase = canvasSettings.balloonBaseHeight;
          var balloonHeight = balloonBase + 2 * radius;
          var remaining =
            canvasSettings.frameDimensions[1] -
            balloonHeight -
            canvasSettings.spiketopHeight;
          var crash = false;
          if (spikeHeight > remaining) {
            crash = true;
          }
          return crash;
        }

        let rts = [];

        function inflate(choice) {
          // if (popped){
          //   return
          // }

          // Record RT relative to when trial started
          var timeWhenPressed = new Date().getTime();
          var rt = timeWhenPressed - timeWhenStarted;
          rts.push(rt);

          // record time if this is the first pump
          if (countPumps === 0) {
            timeWhenStarted = new Date().getTime();
          }
          countPumps++;
          radius += inflateBy;
          balloonYpos -= inflateBy;

          // redraw
          if (choice.key === keys["Q"]) {
            drawBalloon(
              ctx,
              choice.effort,
              choice.high_effort,
              canvasSettings.balloonXpos[0],
              balloonYpos,
              radius
            );
          }
          if (choice.key === keys["P"]) {
            drawBalloon(
              ctx,
              choice.effort,
              choice.high_effort,
              canvasSettings.balloonXpos[1],
              balloonYpos,
              radius
            );
          }
          if (hitSpike() && !choice.high_effort) {
            pop();
          }
          if (hitSpike() && choice.high_effort) {
            if (choice.key === keys["Q"]) {
              drawSpike(
                ctx,
                canvasSettings.spikeWidth,
                spikeHeight,
                canvasSettings.spikeXpos[0],
                canvasSettings.spikeYpos,
                canvasSettings.frameLinecolor,
                canvasSettings.frameLinecolor,
                true
              );
              drawBalloon(
                ctx,
                choice.effort,
                choice.high_effort,
                canvasSettings.balloonXpos[0],
                balloonYpos,
                radius
              );
            }
            if (choice.key === keys["P"]) {
              drawSpike(
                ctx,
                canvasSettings.spikeWidth,
                spikeHeight,
                canvasSettings.spikeXpos[1],
                canvasSettings.spikeYpos,
                canvasSettings.frameLinecolor,
                canvasSettings.frameLinecolor,
                true
              );
              drawBalloon(
                ctx,
                choice.effort,
                choice.high_effort,
                canvasSettings.balloonXpos[1],
                balloonYpos,
                radius
              );
            }
            var balloonBase = canvasSettings.balloonBaseHeight;
            var balloonHeight = balloonBase + 2 * radius;
            spikeHeight =
              canvasSettings.frameDimensions[1] -
              balloonHeight -
              canvasSettings.spiketopHeight;
            if (choice.key === keys["Q"]) {
              drawSpike(
                ctx,
                canvasSettings.spikeWidth,
                spikeHeight,
                canvasSettings.spikeXpos[0],
                canvasSettings.spikeYpos,
                canvasSettings.frameLinecolor,
                canvasSettings.frameLinecolor,
                false
              );
            }
            if (choice.key === keys["P"]) {
              drawSpike(
                ctx,
                canvasSettings.spikeWidth,
                spikeHeight,
                canvasSettings.spikeXpos[1],
                canvasSettings.spikeYpos,
                canvasSettings.frameLinecolor,
                canvasSettings.frameLinecolor,
                false
              );
            }
            // if (countPumps > choice.effort + 10) {
            //   pop()
            //   return
            // }
          }
        }
        function after_response(info) {
          let keys_pressed = jsPsych.data.get().select("value").values;
          let choice = keys_pressed[keys_pressed.length - 1];
          if (info.key === choice.key) {
            inflate(choice);
            if (popped) {
              jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
              done(data);
            }
          }
        }

        // start the response listener
        var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: valid_keys,
          rt_method: "date",
          persist: true,
          allow_held_key: false,
        });
      } else {
        done(0);
      }
    },
    on_load: () => {
      removeCursor("experiment");
      pdSpotEncode(startCode);
    },
    on_finish: (data) => {
      pdSpotEncode(endCode);
      data.code = [startCode, endCode];
    },
  };
};

export default pressBalloon;
