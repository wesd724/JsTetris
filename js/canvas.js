const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const rect = (x, y, width, height, fillColor, borderWidth = null, borderColor = null) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
    ctx.closePath();
}

export { canvas, rect };

