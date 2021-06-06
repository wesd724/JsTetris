import { rect } from "./canvas.js";
import { length, blockSize, index } from "./block.js";
import { paint } from "./render.js";
import { column as width } from "./map.js";
import { blockShape } from "./blockShape.js";

const size = 6;
const window = Array.from({ length: size }).map(x => x = new Array(size).fill(0));

const previewWindow = () => {
    for(let i = 0; i < size; i++) {
        window[0][i] = 2;
        window[size - 1][i] = 2;
        window[i][0] = 2;
        window[i][size - 1] = 2;
    }
}

let currentIndex = 0;
let nextIndex = 0;

const nextBlock = () => {
    currentIndex = nextIndex;
    nextIndex = Math.floor(Math.random() * 7);
    
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
                window[1 + i][1 + j] = 0;
        }
    }
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            if(blockShape[nextIndex][0][i][j] == 1) {
                window[1 + i][1 + j] = 1;
            }
        }
    }
    return currentIndex;
}
        
const drawPreview = () => {
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            if(window[i][j] == 0) {
                rect((j + width) * blockSize, i * blockSize, blockSize - 1, blockSize - 1, "#c7b198"); 
            } else if(window[i][j] == 1) {
                rect((j + width) * blockSize, i * blockSize, blockSize - 1, blockSize - 1, "#4d4c7d"); 
            } else if(window[i][j] == 2) {
                rect((j + width) * blockSize, i * blockSize, blockSize - 1, blockSize - 1, "#323232"); 
            }
        }
    }
}

export { previewWindow, nextBlock, drawPreview };