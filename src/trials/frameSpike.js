import { lang } from '../config/main'
import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { canvasSettings } from '../config/main'
import { drawText, drawSpike, drawFrame } from '../lib/balloon'

const CANVAS_SIZE = canvasSettings.canvasSize
const canvasHTML = `<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" id="jspsych-canvas">
    Your browser does not support HTML5 canvas
  </canvas>`


  const frameSpike = (duration, value, effort) => {
    let stimulus = `<div class="effort-container">` + canvasHTML + photodiodeGhostBox() + `</div>`

    return {
      type: 'call_function',
      async: true,
      func: (done) => {
        // send trigger events
        const code = eventCodes.frameSpike

        // add stimulus to the DOM
        document.getElementById('jspsych-content').innerHTML = stimulus
        // $('#jspsych-content').addClass('task-container')

        // set up canvas
        let canvas = document.querySelector('#jspsych-canvas');
        let ctx = canvas.getContext('2d');

        const canvasDraw = () => {
          // transparent background
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          var spikeRefHeight = canvasSettings.spikeRefHeight
          var spikeHeight = [effort[0]?spikeRefHeight - effort[0]:0, effort[1]?spikeRefHeight - effort[1]:0]
          drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[0], canvasSettings.Ypos, canvasSettings.frameLinecolor, false)
          drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[0], canvasSettings.spikeXpos[0], canvasSettings.Ypos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
          
          drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[1], canvasSettings.Ypos, canvasSettings.frameLinecolor, false)
          drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[1], canvasSettings.spikeXpos[1], canvasSettings.Ypos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
        }

        canvasDraw()
        pdSpotEncode(code)
        setTimeout(
          () => {
            done()
          },
          2000)
      }
    }
}
export default frameSpike
