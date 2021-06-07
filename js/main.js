import bg from "./background.js";
import { initializeMap, drawMap } from "./map.js";
import { previewWindow, nextBlock, drawPreview } from "./previewWindow.js";
import { showScore, showOperationKey as showUI } from "./UI.js";
import render from "./render.js";


bg();

initializeMap();
previewWindow();
nextBlock();

drawMap();
drawPreview();

showUI();
showScore();

let Interval = 0
Interval = setInterval(render, 350);

export { Interval };