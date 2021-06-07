import { Interval } from "./main.js"
import { paint } from "./render.js";
import { mapCoordinate, mapCoordinateCopy } from "./map.js";
import { blockShape } from "./blockShape.js";
import { nextBlock, drawPreview } from "./previewWindow.js";
import { addScore, score } from "./UI.js"

let fillBlock = 0;
let dy = 0;
let rotation = 0;
let index = Math.floor(Math.random() * 7);

const length = blockShape[index][rotation][rotation].length;
const height = 21;
const width = 12;
const blockSize = 20;
const blockCoordinate = { x: 3, y: -1 };

const downBlock = () => {
    collisionDetection(40);
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            if(blockShape[index][rotation][i][j] == 1) {
                dy = i;
                mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
            }
        }
    }
}

const moveBlock = (e) => {
    fillBlock = 0;
    if(e.keyCode == 37) {// ←
        if(collisionDetection(e.keyCode)) {
            for(let i = 0; i < length; i++) {
                for(let j = 0; j < length; j++) {
                    if(blockShape[index][rotation][i][j] == 1) {
                        mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                    }
                }
            }
        }
    }
    else if(e.keyCode == 39) {// →
        if(collisionDetection(e.keyCode)) {
            for(let i = 0; i < length; i++) {
                for(let j = 0; j < length; j++) {
                    if(blockShape[index][rotation][i][j] == 1) {
                        mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                    }
                }
            }
        }
    }
    else if(e.keyCode == 40) {//↓
        collisionDetection(e.keyCode)
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    dy = i;
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                }
            }
        }
    }
    else if(e.keyCode == 32) {
        rotationBlock();
    }
}

const collisionDetection = keyCode => {
    if(keyCode == 40) {
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                   if(blockCoordinate.y > -1) mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 0;
                }
            }
        }
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    if(mapCoordinate[blockCoordinate.y + 1 + i][blockCoordinate.x + j] == 1 ||
                       mapCoordinate[blockCoordinate.y + 1 + i][blockCoordinate.x + j] == 2) {
                       for(let i = 0; i < length; i++) {
                           for(let j = 0; j < length; j++) {
                               if(blockShape[index][rotation][i][j] == 1) {
                                   mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                               }
                           }
                        }
                        initializeSetting();
                        return;
                    }
                 }
             }
         }
         blockCoordinate.y++;
    } else if(keyCode == 37) { //←
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 0;
                }
            }
        }
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    if(mapCoordinate[blockCoordinate.y + i][blockCoordinate.x - 1 + j] == 1 ||
                      mapCoordinate[blockCoordinate.y + i][blockCoordinate.x - 1 + j] == 2) {
                       for(let i = 0; i < length; i++) {
                           for(let j = 0; j < length; j++) {
                               if(blockShape[index][rotation][i][j] == 1) {
                                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                               }
                           }
                        }
                        return 0;
                    }
                }
            }
        }
        blockCoordinate.x--;
        return 1;
    } else if(keyCode == 39) { //→
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 0;
                }
            }
        }
        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(blockShape[index][rotation][i][j] == 1) {
                    if(mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + 1 + j] == 1 ||
                      mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + 1 + j] == 2) {
                       for(let i = 0; i < length; i++) {
                           for(let j = 0; j < length; j++) {
                               if(blockShape[index][rotation][i][j] == 1) {
                                    mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] = 1;
                               }
                           }
                        }
                        return 0;
                    }
                }
            }
        }
        blockCoordinate.x++;
        return 1;
    }
}

const deleteFilledLine = () => {
    for(let i = 0; i < height - 1; i++) {
        fillBlock = 0;
        for(let j = 1; j < width - 1; j++) {
            if(mapCoordinate[i][j] == 1) {
                fillBlock++;
                if(fillBlock == width - 2) {
                    addScore();
                    for(let j = 1; j < width - 1; j++) {
                        mapCoordinate[i][j] = 0;
                     }
                    allLinedown(i);
                }
            } else break;
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
    for(let i = 1; i < width - 1; i++) mapCoordinate[0][i] = 0;
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
                if(mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] == 1 ||
                   mapCoordinate[blockCoordinate.y + i][blockCoordinate.x + j] == 2) {
                    //if a block a non-rotable
                    if(rotation == -1) rotation = 3;
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
    
    for(let i = 0; i < length; i++) {
        for(let j = length - 1; j >= 0; j--) {
            if(blockShape[index][rotation][j][i] == 1) {
                if(mapCoordinate[blockCoordinate.y + j + 1][blockCoordinate.x + i] == 1) {
                    initializeSetting();
                    return;
                } else break;
            }
        }
    }
}

const endCheck = () => {
    for(let i = 1; i < width - 1; i++) {
        if(mapCoordinate[1][i] == 1) {
            document.removeEventListener("keydown", draw);
            clearInterval(Interval);
            let status = confirm(`your score: ${score}\nRestart?`);
            if(status) location.reload();
            else break;
        }
    }
}

const initializeSetting = () => {
    index = nextBlock();
    rotation = 0;
    deleteFilledLine();
    blockCoordinate.y = 0;
    blockCoordinate.x = 3;
    endCheck();
}

const draw = (e) => {
    moveBlock(e);
    paint();
}

document.addEventListener("keydown", draw);

export { length, blockSize, downBlock, moveBlock, index };