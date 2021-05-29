import { canvas, rect } from "./canvas.js";
import { paint } from "./render.js";
import { mapCoordinate } from "./map.js";

const blockShape = [
    [
        [1, 0, 0, 0], // 0,0,0
        [1, 0, 0, 0], // 0,1,0
        [1, 0, 0, 0], // 0,2,0
        [1, 1, 1, 0]  // 0,3,0 0,3,1 0,3,2
    ],
    [
        [1, 1, 0], // 1,0,0   1,0,1
        [1, 1, 0], // 1,1,0  1,1,1
        [0, 0, 0] 
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1, 0], // 3,0,0 3,0,1
        [0, 1, 1], // 3,1,1 3,1,2
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],  
];

let status = true;
let loop = true;
//let index = Math.floor(Math.random() * 7);
let index = 3;
console.log(index);
let fillBlock = 0;
let dy = 0;
let dx = 0;

const height = canvas.height / 20;
const width = canvas.width / 20;
const blockSize = 20;
const blockCoordinate = { x: 10, y: 1 };

const downBlock = () => {
    blockCoordinate.y++;
    for(let i = 0; i < blockShape[index].length; i++) {
        for(let j = 0; j < blockShape[index].length; j++) {
            if(blockShape[index][i][j] == 1) {
                dy = i;
                mapCoordinate[blockCoordinate.y - 1 + dy][blockCoordinate.x + j] = 0;
            }
        }
    }
    for(let i = 0; i < blockShape[index].length; i++) {
        for(let j = 0; j < blockShape[index].length; j++) {
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
        blockCoordinate.x--;
        for(let i = 0; i < blockShape[index].length; i++) {
            for(let j = 0; j < blockShape[index].length; j++) {
                if(blockShape[index][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + 1 + j] = 0;
                }
            }
        }
        for(let i = 0; i < blockShape[index].length; i++) {
            for(let j = 0; j < blockShape[index].length; j++) {
                if(blockShape[index][i][j] == 1) {
                    dx = j;
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
        collisionDetection(e.keyCode);
    }
    else if(e.keyCode == 39) {// →
        blockCoordinate.x++; 
        for(let i = 0; i < blockShape[index].length; i++) {
            for(let j = 0; j < blockShape[index].length; j++) {
                if(blockShape[index][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x - 1 + j] = 0;
                }
            }
        }
        for(let i = 0; i < blockShape[index].length; i++) {
            for(let j = 0; j < blockShape[index].length; j++) {
                if(blockShape[index][i][j] == 1) {
                    dx = j;
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
        collisionDetection(e.keyCode);
    }
    else if(e.keyCode == 40) {//↓
        blockCoordinate.y++;
        for(let i = 0; i < blockShape[index].length; i++) {
            for(let j = 0; j < blockShape[index].length; j++) {
                if(blockShape[index][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y - 1 + i][blockCoordinate.x + j] = 0;
                }
            }
        }
        for(let i = 0; i < blockShape[index].length; i++) {
            for(let j = 0; j < blockShape[index].length; j++) {
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
        for(let i = 0; i <= dy; i++) {
            for(let j = 0; j <= dx; j++) {
                if(blockShape[index][i][j] == 1 && mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + i - 1] == 1) {
                    console.log(9);
                    break; 
                }
            }
        }
    } else if(keyCode == 39) { //→
        for(let i = dy; i >= 0; i--) {
            for(let j = dx; j >= 0; j--) {
                if(blockShape[index][i][j] == 1) {
                    console.log(i, j);
                    break; 
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