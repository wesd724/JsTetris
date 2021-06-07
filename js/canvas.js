const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 360;
canvas.height = 420;
canvas.style.position = "absolute";
canvas.style.left = "50px";
canvas.style.top = "50px";

const rect = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

const text = (text, x, y, font, color = "black") => {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

export { canvas, ctx, rect, text };

