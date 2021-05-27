import { canvas, rect } from "./canvas.js";
import { paint } from "./render.js";
import { mapCoordinate } from "./map.js";

const blockShape = [
    [
        [1, 0, 0, 0], // 0,0,0
        [1, 0, 0, 0], // 0,1,0
        [1, 0, 0, 0], // 0,2,0
        [1, 1, 1, 0]  // 0,3,0
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
//let index = Math.floor(Math.random() * 7);
let index = 0;
console.log(index);
let fillBlock = 0;
let dy = 0;

const height = canvas.height / 20;
const width = canvas.width / 20;
const blockSize = 20;
let blockCoordinate = { x: 10, y: 1 };

const downBlock = () => {
    if(status) {  
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
            checkFloor();
        }
    }
}

const moveBlock = (e, index) => {
    if(status) {
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
                checkFloor();
            }
        }
    }
}



const checkFloor = () => {
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

document.addEventListener("keydown", (e) => {
    moveBlock(e, index);
    paint();
});

export { blockSize, downBlock, moveBlock };