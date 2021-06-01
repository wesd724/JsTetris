import { canvas, rect } from "./canvas.js";
import { paint } from "./render.js";
import { mapCoordinate } from "./map.js";
import { blockShape } from "./blockShape.js";

let status = true;
//let index = Math.floor(Math.random() * 7);
let index = 2;
console.log(index);
let fillBlock = 0;
let dy = 0;
let dx = 0;
const length = blockShape[index].length;
const height = canvas.height / 20;
const width = canvas.width / 20;
const blockSize = 20;
const blockCoordinate = { x: 10, y: 1 };

const downBlock = () => {
    blockCoordinate.y++;
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            if(blockShape[index][i][j] == 1) {
                dy = i;
                mapCoordinate[blockCoordinate.y - 1 + dy][blockCoordinate.x + j] = 0;
            }
        }
    }
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            if(blockShape[index][i][j] == 1) {
                dy = i;
                mapCoordinate[blockCoordinate.y + dy][blockCoordinate.x + j] = 1;
            }
        }
    }
    if(blockCoordinate.y + dy == height - 1) {
        blockCoordinate.y = 1;
        checkFloorFull();
    } else {
        collisionDetection(40);
    }
}

const moveBlock = (e, index) => {
    fillBlock = 0;
    if(e.keyCode == 37) {// ←
        collisionDetection(e.keyCode)
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + 1 + j] = 0;
                }
            }
        }
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][i][j] == 1) {
                    dx = j;
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
    }
    else if(e.keyCode == 39) {// →
        collisionDetection(e.keyCode) 
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x - 1 + j] = 0;
                }
            }
        }
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][i][j] == 1) {
                    dx = j;
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
    }
    else if(e.keyCode == 40) {//↓
        blockCoordinate.y++;
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y - 1 + i][blockCoordinate.x + j] = 0;
                }
            }
        }
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][i][j] == 1) {
                    dy = i;
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
        if(blockCoordinate.y + dy == height - 1) {
            blockCoordinate.y = 1;
            checkFloorFull();
        } else {
            collisionDetection(e.keyCode);
        }
    }
}

const checkFloorFull = () => {
    for(let i = 0; i < width; i++) {
        if(mapCoordinate[height - 1][i] == 1) {
            fillBlock++;
            if(fillBlock == width) {
                for(let i = 0; i < width; i++) {
                    mapCoordinate[height - 1][i] = 0;
                }
            }
        }
    }
}
// collision detection with other block or wall when a block moves
const collisionDetection = (keyCode) => {
    if(keyCode == 40) {
        for(let i = 0; i <= dx; i++) {
            if(blockShape[index][dy][i] == 1 && mapCoordinate[blockCoordinate.y + dy + 1][blockCoordinate.x + i] == 1) {
                blockCoordinate.y = 1;
                break;
            }
        }
    } else if(keyCode == 37) { //←
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][j][i] == 1) {
                    if(mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j - 1] == 1) {
                        console.log(i , j);
                        return blockCoordinate.x;
                    } else if(mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j - 1] != 1) {
                        console.log(i, j);
                        return blockCoordinate.x--;
                    }
                }
            }
        }
    } else if(keyCode == 39) { //→
        for(let i = length - 1; i > 0; i--) {
            for(let j = 0; j > length; j++) {
                if(blockShape[index][j][i] == 1) {
                    if(mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j + 1] == 1) {
                        console.log(i, j);
                        return blockCoordinate.x;
                    } else if(mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j + 1] != 1) {
                        console.log(i, j);
                        return blockCoordinate.x++;
                    }
                }
            }
        }
    }
}

document.addEventListener("keydown", (e) => {
    moveBlock(e, index);
    paint();
});

export { blockSize, downBlock, moveBlock };