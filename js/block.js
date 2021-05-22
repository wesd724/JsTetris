import { canvas, rect } from "./canvas.js";

let location = [];
const blockSize = 20;
const row = canvas.height / 20;
const column = canvas.width / 20;

const blockCoordinate = () => {
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < column; j++) {
            rect(j * blockSize,  i * blockSize, blockSize - 1, blockSize - 1, "	DarkSlateGray");
        }
    }
}

export { blockCoordinate };