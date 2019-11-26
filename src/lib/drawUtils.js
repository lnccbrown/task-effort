import { canvasSettings } from '../config/main'

function drawText(ctx, points, pumpsRequired, cx, cy, high_effort){
    var color;
    if (high_effort){
        color = 'green'
    }
    else if(pumpsRequired==0){
        color = 'white'
    }
    else{
        color = 'blue'
    }
    ctx.font = '20px Consolas';
    ctx.fillStyle = color;
    var lineHeight = canvasSettings.lineHeight;
    ctx.lineHeight = lineHeight;
    let text = `${points} pts` 
    let text2 = `${pumpsRequired} pumps`
    ctx.fillText(text, cx+lineHeight, cy);
    ctx.fillText(text2, cx-lineHeight, cy+(lineHeight*2));
}

function drawSpike(ctx, w, h, cx, cy, fillColor, lineColor, clear){
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

function drawFrame(ctx, w, h, cx, cy, lineColor, clear){
    ctx.save();
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

function drawBalloon(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.scale(0.75, 1);
    ctx.arc(100 * 1 / 0.75, 0 - 100, 100, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.restore();
}

export{
    drawText,
    drawSpike,
    drawFrame,
    drawBalloon
}