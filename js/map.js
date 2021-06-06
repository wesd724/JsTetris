import { rect } from "./canvas.js";
import { blockSize } from "./block.js";

const row = 21;
const column = 12;
const mapCoordinate = [];

const initializeMap = () => {
    for(let i = 0; i < row; i++) {
        mapCoordinate[i] = [];
        for(let j = 0; j < column; j++) {
            mapCoordinate[i][j] = 0;
        }
    }
// same code
// 1. Array.from({length: row}, () => new Array(column).fill(0))
// 2. Array.from({length: row}).map(x => new Array(column).fill(0))
    
    for(let i = 0; i < row; i++) {
        mapCoordinate[i][0] = 2;
        mapCoordinate[i][column - 1] = 2;
        mapCoordinateCopy[i][0] = 2;
        mapCoordinateCopy[i][column - 1] = 2;
    }
    for(let i = 0; i < column; i++) {
        mapCoordinate[row - 1][i] = 2;
        mapCoordinateCopy[row - 1][i] = 2;
    }
}

const mapCoordinateCopy = Array.from({ length: row }, () => Array(column).fill(0));


const drawMap = () => {
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < column; j++) {
            if(mapCoordinate[i][j] == 0) {
                rect(j * blockSize,  i * blockSize, blockSize - 1, blockSize - 1, "#8e9775"); 
            } else if(mapCoordinate[i][j] == 1) {
                rect(j * blockSize, i * blockSize, blockSize - 1, blockSize - 1, "#282846");
            } else if(mapCoordinate[i][j] == 2) {
                rect(j * blockSize, i * blockSize, blockSize - 1, blockSize - 1, "#4a503d");
            }
        }
    }
}

export { mapCoordinate, mapCoordinateCopy, initializeMap, drawMap, row, column };