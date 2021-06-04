import  bg from "./background.js";
import { initializeMap, drawMap } from "./map.js";
import { moveBlock } from "./block.js";
import render from "./render.js";

bg();

initializeMap();
drawMap();
document.addEventListener("click", render);
setInterval(render, 300);