const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 420;
canvas.height = 680;

const rect = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

export { canvas, ctx, rect };

