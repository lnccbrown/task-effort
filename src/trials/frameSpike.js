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

          drawText(ctx, value[0], effort[0])
          drawSpike(ctx, 2, 100, 50, 0, '#ffffff', '#ffffff', false)
          drawFrame(ctx, 200, 200, 50, 0, '#000111', '#ffffff', false)
        }

        canvasDraw()
        pdSpotEncode(code)
        setTimeout(
          () => {
            done()
          },
          10000)
      }
    }
}
export default frameSpike
