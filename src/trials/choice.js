import { eventCodes } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { keys, canvasSize, canvasSettings } from '../config/main'
import { drawBalloon, drawSpike, drawFrame } from '../lib/drawUtils'
import { jsPsych } from 'jspsych-react'

const CANVAS_SIZE = canvasSize
const canvasHTML = `<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" id="jspsych-canvas">
    Your browser does not support HTML5 canvas
  </canvas>`
const fixationHTML = `<div id="fixation-dot" class="color-white"> </div>`

const choice = (duration, value, effort, high_effort, valid_keys, get_reward) => {
  let stimulus = `<div class="effort-container">` + canvasHTML + fixationHTML + photodiodeGhostBox() + `</div>`

  const startCode = eventCodes.choiceStart
  const endCode = eventCodes.choiceEnd

  return {
    type: 'call_function',
    async: true,
    func: (done) => {
      // add stimulus to the DOM
      document.getElementById('jspsych-content').innerHTML = stimulus
      // $('#jspsych-content').addClass('task-container')

      // set up canvas
      let canvas = document.querySelector('#jspsych-canvas');
      let ctx = canvas.getContext('2d');

      const canvasDraw = () => {
        // transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var inflateBy;
        var spikeHeight = [0, 0]
        for (let i =0 ; i < 2; i++)
        {
          if (high_effort[i]) {
              inflateBy = canvasSettings.inflateByHE
          } else {
              inflateBy = canvasSettings.inflateByNHE
          }

          // how far should the spike be
          var targetDist = 2 * inflateBy * (effort[i] - 1);
          var balloonBaseHeight = canvasSettings.balloonBaseHeight + (2 * canvasSettings.balloonRadius);
          // distance of the spike from the top
          spikeHeight[i] = effort[i] ? (canvasSettings.frameDimensions[1] - balloonBaseHeight - targetDist - canvasSettings.spiketopHeight) : 0;
        }

        drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[0], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
        drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[0], canvasSettings.spikeXpos[0], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
        drawBalloon(ctx, effort[0], high_effort[0], canvasSettings.balloonXpos[0], canvasSettings.balloonYpos, canvasSettings.balloonRadius)

        drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[1], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
        drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[1], canvasSettings.spikeXpos[1], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
        drawBalloon(ctx, effort[1], high_effort[1], canvasSettings.balloonXpos[1], canvasSettings.balloonYpos, canvasSettings.balloonRadius)
      }

      canvasDraw()
      function after_response(info) {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener)
        if (info.key === keys["Q"]) { // 1 key
          var returnObj = {
            "key": info.key,
            "effort": effort[0],
            "value": value[0],
            "high_effort": high_effort[0],
            "get_reward": get_reward[0]
          }
          done(returnObj)
        } else if (info.key === keys["P"]) { // 0 key
          returnObj = {
            "key": info.key,
            "effort": effort[1],
            "value": value[1],
            "high_effort": high_effort[1],
            "get_reward": get_reward[1]
          }
          done(returnObj)
        }
      }

      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: valid_keys,
          rt_method: 'date',
          persist: true,
          allow_held_key: false
      });

    },
    on_load: () => {
      pdSpotEncode(startCode)
    },
    on_finish: (data) => {
      pdSpotEncode(endCode)
      data.code = [startCode, endCode]
    }
  }
}

export default choice
