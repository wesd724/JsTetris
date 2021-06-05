import { canvas, ctx, text } from "./canvas.js";

let score = 0;
export const showScore = () => {
    text(`score: ${score}`, 255, 280, 'bold 19px Verdana');
}

export const addScore = () => {
    score++;
}