import { canvas, ctx } from "./canvas.js";
import { drawMap } from "./map.js";
import { downBlock } from "./block.js";
import { drawPreview } from "./previewWindow.js"
import { showScore, showOperationKey as showUI } from "./UI.js"
const paint = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPreview();
    showScore();
    showUI();
}

const render = () => {
    downBlock();
    paint();
}

export { render as default, paint };