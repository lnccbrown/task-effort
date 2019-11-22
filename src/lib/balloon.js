// 0.1 declare canvas width and height
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight / 1.5;

// 0.2 declare variables to help us position the elements on the canvas
var x25 = canvasWidth * 0.25;
var x12 = canvasWidth * 0.126;
var x38 = canvasWidth * 0.38;


// Main class for drawing and inflating a single balloon
class Balloon {
    constructor(highEffort, highEffortTime, reward, pumpsRequired, color, radius, x, xframe, y, points, side, myGame, onTrialFinish, type) {
        this.highEffort = highEffort; // is this a high effort balloon?
        this.highEffortTime = highEffortTime; // how long until the balloon pops in secs
        this.reward = reward; // whether a reward is received for popping this balloon
        this.pumpsRequired = pumpsRequired; // how many pumps are required to hit the spike
        this.color = color; // balloon color
        this.radius = radius; // starting size of the balloon
        this.x = x; // x-coord
        this.xframe = xframe; // x-coord
        this.y = y; // y-coord
        this.xframe = xframe; // x-coord
        this.text = ""; // text display on top of balloon (used for displaying reward info)
        this.countPumps = 0; // current number of pumps
        this.timeWhenStarted = 0; // time when first pump was done
        this.popped = false; // is this balloon popped?
        this.spikeWidth = 30;
        this.frameWidth = 200;       
        this.frameHeight = 440;
        this.points = points; // number of points rewarded for popping this balloon
        this.side = side; // left or right
        this.myGame = myGame; // canvas to draw on
        this.onTrialFinish = onTrialFinish; // function to call if balloon pops
        this.baseHeight = 20; // height of bottom of the balloon
        this.timer = null; // used for changing the color
        this.rts = [];
        this.type = type;
        // compute how much in screen-space the balloon inflates each step
        if (this.highEffort) {
            this.inflateBy = canvasHeight / 800.
        }
        else {
            this.inflateBy = canvasHeight / 45.
        }

        // how far should the spike be
        var targetDist = 2 * this.inflateBy * (this.pumpsRequired - 1);
        var balloonHeight = 2 * this.radius + this.baseHeight;
        // distance of the spike from the top
        this.spikeHeight = canvasHeight - balloonHeight - targetDist;

        this.startTimer();

        //this.inflateBy = this.inflateBy * 5;
    }

    updateSpike() {
        var ctx = this.myGame.context;

        // Draw text
        if(this.type == 'costBenefits'){
            ctx.font = '20px Consolas';
            ctx.fillStyle = '#000000';
            this.text = `${this.points} pts ${this.pumpsRequired} pumps`
            ctx.fillText(this.text, this.x -100, this.y-10);
        }
        

        // Draw spike
        drawEqTriangle(ctx,
                       this.spikeWidth,
                       this.spikeHeight,
                       this.x, 0,
                       '#000000',
                       '#000000', false);
        
        // Draw Frame
        drawRect(ctx, this.frameWidth, this.frameHeight, this.xframe, 0, '#ffffff', '#000000', false)
    }


    inflate() {
        // inflate balloon once, called by the keyboard-listeners
        if (this.popped) {
            return
        }

        // Record RT relative to when trial started
        var timeWhenPressed = (new Date()).getTime();
        var rt = timeWhenPressed - this.myGame.timeWhenStarted;
        this.rts.push(rt);

        // record time if this is the first pump
        if (this.countPumps === 0) {
            this.timeWhenStarted = (new Date()).getTime();
        }
        this.countPumps++;

        // inflate balloon
        this.radius += this.inflateBy;
        this.y -= this.inflateBy;

        // redraw
        this.updateSpike();

        if (this.hitSpike() && !this.highEffort) {
            this.pop();
        }

        if (this.hitSpike() && this.highEffort) {
            // Remove current spike
            drawEqTriangle(this.myGame.context,
                           this.spikeWidth,
                           this.spikeHeight,
                           this.x, 0,
                           '#000000',
                           '#000000', true);

            // Spike retracts
            var targetDist = 2 * this.inflateBy * (this.pumpsRequired - this.countPumps - 1);
            var balloonHeight = 2 * this.radius + this.baseHeight;
            // distance of the spike from the top
            this.spikeHeight = canvasHeight - balloonHeight;
            this.updateSpike();
        }
    }

    hitSpike() {
        var balloonHeight = canvasHeight - (this.baseHeight + 2 * this.radius);
        var crash = false;
        if (this.spikeHeight > balloonHeight) {
            crash = true;
        }
        return crash;
    }

    // pop() {
    //     // pop balloon
    //     clearInterval(this.timer);
    //     this.popped = true;
    //     this.deleteCircle();

    //     var reward = this.computeReward()
    //     if (reward == 1) {
    //         this.text = "You win " + reward + " point.";
    //     }
    //     else {
    //         this.text = "You win " + reward + " points.";
    //     }
    //     this.updateSpike();
    //     this.timeWhenPopped = (new Date()).getTime();

    //     var data = {
    //         balloon: this.side,
    //         pumps: this.countPumps,
    //         timeWhenPopped: this.timeWhenPopped,
    //         timeWhenStarted: this.myGame.timeWhenStarted,
    //         points: reward,
    //         firstPress: this.rts[0],
    //         lastPress: this.rts[this.rts.length - 1],
    //         RTs: this.rts,
    //     };

    //     self = this;
    //     setTimeout(function () {self.onTrialFinish(data);}
    //                , 1000); // time btwn next trial (rew fb) and balloon pop
    //     return;
    // }

    computeReward() {
        if (this.highEffort && this.reward) {
            var points = this.points * (this.countPumps / this.pumpsRequired);
            points = Math.round(points * 100) / 100;
        }
        else if (!this.reward){
            var points = 0;
        }
        else {
            var points = this.points;
        }

        return points;
    }

    deleteCircle() {
        var ctx = this.myGame.context;
        var x = this.x;
        var y = this.y;
        var radius = this.radius;
        //now, erase the arc by clearing a rectangle that's slightly larger than the arc
        ctx.beginPath();
        ctx.clearRect(x - radius - 1 - this.baseHeight,
                      y - radius - 1 - this.baseHeight,
                      radius * 2 + 2 + this.baseHeight,
                      radius * 2 + 2 + this.baseHeight);
        ctx.closePath();
    }

    startTimer() {
        // high-effort balloons turn to white slowly
        var ctx = this.myGame.context;
        var hslColor = this.color;

        //rgb to hsl
        var rgb = hexToRgb(hslColor);
        var r = rgb.r;
        var g = rgb.g;
        var b = rgb.b;
        var hsl = rgbToHsl(r, g, b);
        var h = hsl[0];
        var s = hsl[1];
        var l = hsl[2];
        var lTime = 0;

        // lightness left until it gets white
        var lightLeft = 100 - l;

        var self = this;

        this.timer = setInterval(function() {
            var now = (new Date()).getTime();
            var percTimePassed = (now - self.myGame.timeWhenStarted) / 1000 / self.highEffortTime;

            if (self.highEffort & (self.countPumps > 0)) {
                // high effort balloon changes color
                lTime = l + lightLeft * percTimePassed;
                hslColor = 'hsl(' + h + ', ' + s + '%, ' + lTime + '%)';
                self.color = hslColor;
                self.updateSpike();
            }

            if ((percTimePassed >= 1.) & (self.countPumps > 0)) {
                if (!self.highEffort) {
                    self.points = 0;
                }
                self.pop();

            }
        }, 50) // time between updates of balloon inflation; 
        // previously 100 ms in wiecki version
        // need to change back to 150 ms in cntracs version
    }

}

function drawEqTriangle(ctx, w, h, cx, cy, fillColor, lineColor, clear){
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    if (clear) {
        ctx.clearRect(cx - w / 2,
                      cy,
                      cx,
                      cy + h);
    }
    else {
        ctx.moveTo(cx - w / 2, cy);
        ctx.lineTo(cx + w / 2, cy);
        ctx.lineTo(cx, cy + h);
        ctx.lineTo(cx - w / 2, cy);
        ctx.fill();
    }
    ctx.closePath();
    ctx.save();
}

function drawRect(ctx, w, h, cx, cy, fillColor, lineColor, clear){
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    if (clear) {
        ctx.clearRect(cx - w / 2,
                      cy,
                      cx,
                      cy + h);
    }
    else {
        ctx.rect(cx, cy, w, h);
        ctx.stroke();
    }
    ctx.closePath();
    ctx.save();
}

var GREEN = '#00ff00';
var BLUE = '#0000ff';
// value, reward, effort, time, high_effort, display
function startGame(value=[], reward=[], effort=[], time=[], high_effort=[], display=[], onTrialFinish, type) {
    var xPos = [x25, canvasWidth-x25];
    var xPosFrame = [x12, canvasWidth - x38];
    var sides = ['left', 'right'];
    var balloons = [null, null];
    var radius = 20;

    var myGame = {
        canvas: document.getElementById("myCanvas"),
        start: function(balloons) {
            this.canvas = document.getElementById("myCanvas");
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.context = this.canvas.getContext("2d");
            this.timeWhenStarted = (new Date()).getTime();

            if (display[0]) {
                balloons[0].updateSpike();
            }
            if (display[1]){
                balloons[1].updateSpike();
            }
        },
        clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    var color;
    for (var i = 0; i < 2; i++) {
        if (high_effort[i]) {
            color = GREEN;
        }
        else {
            color = BLUE;
        }
        if (display[i]) {
            balloons[i] = new Balloon(high_effort[i],
                                      time[i],
                                      reward[i],
                                      effort[i],
                                      color,
                                      radius,
                                      xPos[i],
                                      xPosFrame[i],
                                      canvasHeight - radius,
                                      value[i],
                                      sides[i],
                                      myGame,
                                      onTrialFinish,
                                      type
                                     );
        }
    }

    myGame.start(balloons);

    return balloons;
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255; 
    g /= 255; 
    b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}

// start game, now updated with parameters
//document.addEventListener('load', startGame([1, 3], [0, 1], [100, 5], [15, -1], [true, false], [true, true], function(data) {console.log(data)}));
export{
    startGame
}