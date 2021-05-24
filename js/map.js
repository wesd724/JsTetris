import { canvas, rect } from "./canvas.js";
import { blockSize } from "./block.js";

const row = canvas.height / 20;
const column = canvas.width / 20;
const mapCoordinate = [];

const initializeMap = () => {
    for(let i = 0; i < row; i++) {
        mapCoordinate[i] = [];
        for(let j = 0; j < column; j++) {
            mapCoordinate[i][j] = 0;
        }
    }
}

const drawMap = () => {
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < column; j++) {
            if(mapCoordinate[i][j] == 0) {
                rect(j * blockSize,  i * blockSize, blockSize - 1, blockSize - 1, "DarkSlateGray"); 
            }
            else if(mapCoordinate[i][j] == 1) {
                rect(j * blockSize, i * blockSize, blockSize - 1, blockSize - 1, "Blue");
            }
        }
    }
}

export { mapCoordinate, initializeMap, drawMap};