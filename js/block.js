import { canvas, rect } from "./canvas.js";
import { paint } from "./render.js";
import { mapCoordinate } from "./map.js";

const blockShape = [
    [
        [1, 0, 0, 0], // 0,0,0
        [1, 0, 0, 0], // 0,1,0
        [1, 0, 0, 0], // 0,2,0
        [1, 0, 0, 0]  // 0,3,0
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
        [1, 1, 0],
        [0, 1, 1],
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

const blockSize = 20;
let index = Math.floor(Math.random() * 7);
console.log(index);
const blockCoordinate = { x: 10, y: 1 };
//let blockCoordinateCopy = blockCoordinate;

const downBlock = () => {
    if(status) {  
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
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
        checkFloor();
    }
}

const moveBlock = (e, index) => {
    if(status) {
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
                        mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                    }
                }
            }
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
                        mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                    }
                }
            }
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
                        mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                    }
                }
            }
        }
        checkFloor();
    }
}



const checkFloor = () => {
    for(let i = 0; i < canvas.width / 20; i++) {
        if(mapCoordinate[canvas.height / 20 - 1][i] == 1) {
            status = false;
            break;
        }
    }
}

document.addEventListener("keydown", (e) => {
    moveBlock(e, index);
    paint();
});

export { blockSize, downBlock, moveBlock };