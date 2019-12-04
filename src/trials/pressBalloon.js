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

const pressBalloon = (duration) => {
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
      let inflateBy, popped=0, countPumps=0, radius=canvasSettings.balloonRadius, spikeHeight;
      let balloonBaseHeight = canvasSettings.balloonBaseHeight + (2*canvasSettings.balloonRadius);
      let balloonYpos = canvasSettings.balloonYpos;
      
      let keys_pressed = jsPsych.data.get().select('value').values
      let choice = keys_pressed[keys_pressed.length - 1]
      if (choice.high_effort) {
        inflateBy = canvasSettings.inflateByHE
      }
      else {
          inflateBy = canvasSettings.inflateByNHE
      }
      const canvasDraw = () => {
        // transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var targetDist = 2 * inflateBy * (choice.effort - 1);
        spikeHeight = choice.effort?(canvasSettings.frameDimensions[1] - balloonBaseHeight - targetDist - canvasSettings.spiketopHeight):0;
        if (choice.key == keys['Q']){
          // drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[0], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
          drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight, canvasSettings.spikeXpos[0], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
          drawBalloon(ctx, choice.effort, choice.high_effort, canvasSettings.balloonXpos[0], canvasSettings.balloonYpos, radius)
        }
        else{
          // drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[1], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
          drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight, canvasSettings.spikeXpos[1], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
          drawBalloon(ctx, choice.effort, choice.high_effort, canvasSettings.balloonXpos[1], canvasSettings.balloonYpos, radius)
        }
      }

      canvasDraw()
      function pop() {
        // pop balloon
        popped = true;
        // this.deleteCircle();

        // var reward = this.computeReward()
        // if (reward == 1) {
        //     this.text = "You win " + reward + " point.";
        // }
        // else {
        //     this.text = "You win " + reward + " points.";
        // }
        // this.updateSpike();
        // this.timeWhenPopped = (new Date()).getTime();

        // var data = {
        //     balloon: this.side,
        //     pumps: this.countPumps,
        //     timeWhenPopped: this.timeWhenPopped,
        //     timeWhenStarted: this.myGame.timeWhenStarted,
        //     points: reward,
        //     firstPress: this.rts[0],
        //     lastPress: this.rts[this.rts.length - 1],
        //     RTs: this.rts,
        };
      function hitSpike() {
        var balloonBase = canvasSettings.balloonBaseHeight
        var balloonHeight = (balloonBase + 2 * radius);
        var remaining = canvasSettings.frameDimensions[1] - balloonHeight - canvasSettings.spiketopHeight
        var crash = false;
        // console.log(spikeHeight, remaining)
        if (spikeHeight > remaining) {
            crash = true;
        }
        return crash;
      }
      function inflate(choice){
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
        console.log(countPumps)
        // inflate balloon
        // console.log(inflateBy)
        radius += inflateBy;
        balloonYpos -= inflateBy;

        // redraw
        if (choice.key == keys['Q']){
          drawBalloon(ctx, choice.effort, choice.high_effort, canvasSettings.balloonXpos[0], balloonYpos, radius) 
        }
        if (choice.key == keys['P']){
          drawBalloon(ctx, choice.effort, choice.high_effort, canvasSettings.balloonXpos[1], balloonYpos, radius) 
        }
        if (hitSpike() && !choice.high_effort){
          pop()
        }
        if (hitSpike() && choice.high_effort)
        {
          if (choice.key == keys['Q'])
          {
            drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight, canvasSettings.spikeXpos[0], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, true)
            drawBalloon(ctx, choice.effort, choice.high_effort, canvasSettings.balloonXpos[0], balloonYpos, radius)  
          }
          if (choice.key == keys['P'])
          {
            drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight, canvasSettings.spikeXpos[1], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, true)
            drawBalloon(ctx, choice.effort, choice.high_effort, canvasSettings.balloonXpos[1], balloonYpos, radius)  
          }
          var balloonBase = canvasSettings.balloonBaseHeight
          var balloonHeight = (balloonBase + (2* radius));
          spikeHeight = canvasSettings.frameDimensions[1] - balloonHeight - canvasSettings.spiketopHeight
          if (choice.key == keys['Q'])
          {
            drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight, canvasSettings.spikeXpos[0], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false) 
          }
          if (choice.key == keys['P'])
          {
            drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight, canvasSettings.spikeXpos[1], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false) 
          }
          if (countPumps > choice.effort+10){
            pop()
            return
          }
        }
      }
      function after_response(info) {
        let keys_pressed = jsPsych.data.get().select('value').values
        let choice = keys_pressed[keys_pressed.length - 1]
        if (info.key == choice.key){
          inflate(choice)
          if (popped){
            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener)
            done()
          }
        }
      }

      // start the response listener
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: ['q', 'p'],
          rt_method: 'date',
          persist: true,
          allow_held_key: false
      });
      pdSpotEncode(code)
    }
  }
}

export default pressBalloon
