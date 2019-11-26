import { canvasSettings } from '../config/main'

function drawText(ctx, points, pumpsRequired, cx, cy){
    ctx.font = '20px Consolas';
    ctx.fillStyle = '#ffffff';
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

export{
    drawText,
    drawSpike,
    drawFrame
}