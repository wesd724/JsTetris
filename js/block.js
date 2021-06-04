import { canvas, rect } from "./canvas.js";
import { paint } from "./render.js";
import { mapCoordinate, mapCoordinateCopy } from "./map.js";
import { blockShape } from "./blockShape.js";

let fillBlock = 0;
let dy = 0;
let rotation = 0;
let index = Math.floor(Math.random() * 7);

const length = blockShape[index][rotation][rotation].length;
const height = canvas.height / 20;
const width = canvas.width / 20;
const blockSize = 20;
const blockCoordinate = { x: 10, y: -1 };

const downBlock = () => {
    blockCoordinate.y++;
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            if(blockShape[index][rotation][i][j] == 1) {
                if(blockCoordinate.y > 0)
                    mapCoordinate[blockCoordinate.y - 1 + i][blockCoordinate.x + j] = 0;
            }
        }
    }
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            if(blockShape[index][rotation][i][j] == 1) {
                dy = i;
                mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
            }
        }
    }
    if(blockCoordinate.y + dy == height - 1) {
        initializeSetting();
    } else {
        collisionDetection(40);
    }
}

const moveBlock = (e) => {
    fillBlock = 0;
    if(e.keyCode == 37) {// ←
        collisionDetection(e.keyCode);
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                        mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + 1 + j] = 0;
                }
            }
        }
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
    }
    else if(e.keyCode == 39) {// →
        collisionDetection(e.keyCode);
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x - 1 + j] = 0;
                }
            }
        }
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
    }
    else if(e.keyCode == 40) {//↓
        blockCoordinate.y++;
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                  if(blockCoordinate.y > 0)
                      mapCoordinate[blockCoordinate.y - 1 + i][blockCoordinate.x + j] = 0;
                }
            }
        }
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    dy = i;
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
        
        if(blockCoordinate.y + dy == height - 1) {
            initializeSetting();
        } else {
            collisionDetection(e.keyCode);
        }
    }
    else if(e.keyCode == 32) {
        rotationBlock();
    }
}

const deleteFilledLine = () => {
    let lineNumber = 0;
    for(let i = 0; i < height; i++) {
        for(let j = 0; j < width; j++) {
            if(mapCoordinate[i][j] == 1) {
                fillBlock++;
                if(fillBlock == width - 1) {
                    lineNumber = i;
                    console.log(`DELETE ${lineNumber}`);
                    for(let i = 0; i < width; i++) {
                        mapCoordinate[lineNumber][i] = 0;
                     }
                    allLinedown(lineNumber);
                }
            } else {
                fillBlock = 0;
                break;
            }
        }
    }
}

const allLinedown = lineNumber => {
    for(let i = 0; i < lineNumber; i++) {
        for(let j = 0; j < width; j++) {
            mapCoordinateCopy[i][j] = mapCoordinate[i][j];
        }
    }
    for(let i = 0; i < lineNumber; i++) {
        for(let j = 0; j < width; j++) {
            mapCoordinate[i + 1][j] = mapCoordinateCopy[i][j];
        }
    }
    for(let i = 0; i < width; i++) mapCoordinate[0][i] = 0;
}

const rotationBlock = () => {
     // Delete current block
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            if(blockShape[index][rotation][i][j] == 1) {
                  mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 0;
            }
        }
    }

    if(rotation + 1 > 3) rotation = -1;
     // Determine if a block is rotatable
    for(let i = 0; i < length; i++) { //↓
        for(let j = 0; j < length; j++) {
            if(blockShape[index][rotation + 1][i][j] == 1) {
                if(mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] == 1) {
                    //if a block a non-rotable
                    if(rotation == -1) rotation = 3;
                    console.log("Impossible Rotation");
                    for(let i = 0; i < length; i++) {
                        for(let j = 0; j < length; j++) {
                            if(blockShape[index][rotation][i][j] == 1) {
                                mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                            }
                        }
                    }
                    return;
                }
            }
        }
    }
    
    // if a block a rotable
    if(rotation < 3) rotation++;
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            if(blockShape[index][rotation][i][j] == 1) {
                mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
            }
        }
    }
}

const collisionDetection = keyCode => {
    if(keyCode == 40) {
        for(let i = 0; i < length; i++) {
            for(let j = length - 1; j >= 0; j--) {
                if(blockShape[index][rotation][j][i] == 1) {
                    if(mapCoordinate[blockCoordinate.y + j + 1][blockCoordinate.x + i] == 1) {
                        initializeSetting();
                        break;
                    } else break;
                }
            }
        }
    } else if(keyCode == 37) { //←
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][j][i] == 1) {
                    if(mapCoordinate[blockCoordinate.y + j][blockCoordinate.x + i - 1] == 1 ||
                      blockCoordinate.x + i <= 0) {
                        return blockCoordinate.x;
                    } else if(mapCoordinate[blockCoordinate.y + j][blockCoordinate.x + i - 1] == 0) {
                        if(j < length - 1 && blockShape[index][rotation][j + 1][i] == 1) continue;
                        return blockCoordinate.x--;
                    }
                }
            }
        }
    } else if(keyCode == 39) { //→
        for(let i = length - 1; i >= 0; i--) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][j][i] == 1) {
                    if(mapCoordinate[blockCoordinate.y + j][blockCoordinate.x + i + 1] == 1 ||
                      blockCoordinate.x + i >= width - 1) {
                        return blockCoordinate.x;
                    } else if(mapCoordinate[blockCoordinate.y + j][blockCoordinate.x + i + 1] == 0) {
                        if(j < length - 1 && blockShape[index][rotation][j + 1][i] == 1) continue;
                        return blockCoordinate.x++;
                    }
                }
            }
        }
    }
}

const initializeSetting = () => {
    index = Math.floor(Math.random() * 7);
    rotation = 0;
    deleteFilledLine();
    blockCoordinate.y = 1;

}

document.addEventListener("keydown", (e) => {
    moveBlock(e);
    paint();
});

export { blockSize, downBlock, moveBlock };