// imports
import { eventCodes } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { canvasSize, canvasSettings } from '../config/main'
import { drawSpike, drawFrame } from '../lib/drawUtils'

const CANVAS_SIZE = canvasSize
const canvasHTML = `<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" id="jspsych-canvas">
    Your browser does not support HTML5 canvas
  </canvas>`
const fixationHTML = `<div id="fixation-dot" class="color-white"> </div>`

  const frameSpike = (duration, effort, high_effort) => {
    let stimulus = `<div class="effort-container">` + canvasHTML + fixationHTML + photodiodeGhostBox() + `</div>`

    const startCode = eventCodes.frameSpikeStart
    const endCode = eventCodes.frameSpikeEnd

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
            }
            else {
                inflateBy = canvasSettings.inflateByNHE
            }

            // how far should the spike be
            var targetDist = 2 * inflateBy * (effort[i] - 1);
            var balloonBaseHeight = canvasSettings.balloonBaseHeight + (2*canvasSettings.balloonRadius);
            // distance of the spike from the top
            spikeHeight[i] = effort[i]?(canvasSettings.frameDimensions[1] - balloonBaseHeight - targetDist - canvasSettings.spiketopHeight):0;
          }
          // var spikeRefHeight = canvasSettings.spikeRefHeight;
          // var spikeHeight = [effort[0]?spikeRefHeight - effort[0]:0, effort[1]?spikeRefHeight - effort[1]:0];
          drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[0], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
          drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[0], canvasSettings.spikeXpos[0], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)

          drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[1], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
          drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[1], canvasSettings.spikeXpos[1], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
      }

      canvasDraw()
      pdSpotEncode(startCode)
      setTimeout(
        () => {
          done()
        },
        duration)
      pdSpotEncode(endCode)
    }
  }
}
export default frameSpike
