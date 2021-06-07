import { text } from "./canvas.js";

export let score = 0;
export const showScore = () => {
    text(`score: ${score}`, 255, 320, 'bold 19px Verdana');
}

export const addScore = () => {
    score++;
}

export const showOperationKey = () => {
    text("move key", 262, 180, 'bold 15px serif');
    text("←↓→", 265, 210, '23px Verdana');
    text("rotation block", 250, 250, 'bold 15px serif');
    text("space bar", 267, 270, '13px Verdana');
}