import { lang } from '../config/main'
import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { keys, canvasSize, canvasSettings } from '../config/main'
import { drawBalloon, drawSpike, drawFrame } from '../lib/drawUtils'
import { jsPsych } from 'jspsych-react'
import $ from 'jquery'

const CANVAS_SIZE = canvasSize
const canvasHTML = `<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" id="jspsych-canvas">
    Your browser does not support HTML5 canvas
  </canvas>`
// const fixationHTML = `<div id="fixation-dot" class="color-white"> </div>`

const pressBalloon = (duration, effort, high_effort) => {
  let stimulus = `<div class="effort-container">` + canvasHTML + photodiodeGhostBox() + `</div>`

  return {
    type: 'call_function',
    async: true,
    func: (done) => {
      // send trigger events
      const code = eventCodes.pressBalloon

      // add stimulus to the DOM
      document.getElementById('jspsych-content').innerHTML = stimulus
      // $('#jspsych-content').addClass('task-container')

      // set up canvas
      let canvas = document.querySelector('#jspsych-canvas');
      let ctx = canvas.getContext('2d');
      let timeWhenStarted = (new Date()).getTime()
      var inflateBy, popped=0, countPumps=0, radius=canvasSettings.balloonRadius;

      const canvasDraw = () => {
        // transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var spikeHeight = [0, 0]
        for (let i =0 ; i < 2; i++)
        {
          if (high_effort[i]) {
              inflateBy = canvasSettings.frameDimensions[1] / 10000
          }
          else {
              inflateBy = canvasSettings.frameDimensions[1] / 100
          }

          // how far should the spike be
          var targetDist = 2 * inflateBy * (effort[i] - 1);
          var balloonHeight = canvasSettings.balloonHeight;
          // distance of the spike from the top
          spikeHeight[i] = effort[i]?(canvasSize - balloonHeight - targetDist):0;
        }
        if (jsPsych.data.get().select('value').values[0] == 'q')
        {
          drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[0], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
          drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[0], canvasSettings.spikeXpos[0], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
          drawBalloon(ctx, effort[0], high_effort[0], canvasSettings.balloonXpos[0], canvasSettings.balloonYpos, radius)
        }
        else{
          drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[1], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
          drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[1], canvasSettings.spikeXpos[1], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
          drawBalloon(ctx, effort[1], high_effort[1], canvasSettings.balloonXpos[1], canvasSettings.balloonYpos, radius)
        }
      }

      canvasDraw()

      function inflate(radius){
        // if (popped){
        //   return
        // }

        let rts = []
        // Record RT relative to when trial started
        var timeWhenPressed = (new Date()).getTime();
        var rt = timeWhenPressed - timeWhenStarted
        rts.push(rt);

        // record time if this is the first pump
        if (countPumps === 0) {
            timeWhenStarted = (new Date()).getTime();
        }
        countPumps++;

        // inflate balloon
        radius += inflateBy;
        // y -= inflateBy;

        // redraw
        drawBalloon(ctx, effort[0], high_effort[0], canvasSettings.balloonXpos[0], canvasSettings.balloonYpos, 40)

        // if (hitSpike() && !highEffort) {
        //     pop();
        // }

        // if (hitSpike() && highEffort) {
        //     // Remove current spike
        //     drawEqTriangle(this.myGame.context,
        //                    this.spikeWidth,
        //                    this.spikeHeight,
        //                    this.x, 0,
        //                    '#080808',
        //                    '#080808', true);

        //     // Spike retracts
        //     var targetDist = 2 * this.inflateBy * (this.pumpsRequired - this.countPumps - 1);
        //     var balloonHeight = 2 * this.radius + this.baseHeight;
        //     // distance of the spike from the top
        //     this.spikeHeight = canvasHeight - balloonHeight;
        //     this.updateSpike();
        // }
      }
      let key;
      const handleEventListener = (event) => {
        // get event key and record time
        key = event.keyCode

        if (key == keys[jsPsych.data.get().select('value').values[0]]) {
            pdSpotEncode(code)

            inflate(radius)
            // and unbind the event listener to stop recording keys
            $(document).unbind('keydown', handleEventListener)
            // finish trial
            done(key)
        }
        else {
            pdSpotEncode(code)

            inflate(radius)
            // and unbind the event listener to stop recording keys
            $(document).unbind('keydown', handleEventListener)
            // finish trial
            done(key)
        }
      }
      // Bind event listener to document
      $(document).bind('keydown', handleEventListener)
      pdSpotEncode(code)
    }
  }
}

export default pressBalloon
