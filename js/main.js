import  bg from "./background.js";
import { initializeMap, drawMap } from "./map.js";
import render from "./render.js";
import { previewWindow, nextBlock, drawPreview } from "./previewWindow.js"
import { showScore } from "./score.js"

bg();

initializeMap();
previewWindow();
nextBlock();

drawMap();
drawPreview();

showScore();

document.addEventListener("click", render);
//setInterval(render, 300);