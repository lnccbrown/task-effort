import { canvasSettings } from '../config/main'

function drawText(ctx, lang, cx, cy, langColor){
    var color;
    // var lang;
    if (langColor === 'undefined') {
        color = '#FFFFFF' // force white
    } else {
      color = langColor;
    }
    ctx.font = '40px Helvetica';
    ctx.fillStyle = color;
    var lineHeight = canvasSettings.lineHeight;
    ctx.lineHeight = lineHeight;
    let text = lang // should be %
    // let text2 = `${pumpsRequired} pumps`
    ctx.fillText(text, cx + lineHeight, cy);
    // ctx.fillText(text2, cx - lineHeight, cy + (lineHeight * 2));
}

// Text for how many pumps are required for each balloon
function drawEffort(ctx, points, pumpsRequired, cx, cy, high_effort){
    var color;
    if (high_effort) {
        color = '#7FFF00' // green
    } else if (pumpsRequired === 0) {
        color = 'black'
    } else {
        color = '#00FFFF' // blue
    }
    ctx.font = '20px Helvetica';
    ctx.fillStyle = color;
    var lineHeight = canvasSettings.lineHeight;
    ctx.lineHeight = lineHeight;
    let text = `${points} pts`
    let text2 = `${pumpsRequired} pumps`
    ctx.fillText(text, cx + lineHeight, cy);
    ctx.fillText(text2, cx - lineHeight, cy + (lineHeight * 2));
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
    } else {
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
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    if (clear) {
        ctx.clearRect(cx - w / 2,
                      cy,
                      cx,
                      cy + h);
    } else {
        ctx.rect(cx, cy, w, h);
        ctx.stroke();
    }
    ctx.closePath();
    ctx.save();
}

function drawBalloon(ctx, pumpsRequired, high_effort, cx, cy, radius){
    var color;
    if (high_effort) {
        color = '#7FFF00'
    }
    else if (pumpsRequired === 0) {
        color = 'black'
    } else {
        color = '#00FFFF'
    }
    ctx.save();
    ctx.beginPath();
    ctx.scale(0.75, 1);
    ctx.arc(cx * 1 / 0.75, cy, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.restore();
}

export{
    drawText,
    drawEffort,
    drawSpike,
    drawFrame,
    drawBalloon
}
