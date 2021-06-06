import { canvas } from "./canvas.js";

export default function background () {
    document.body.appendChild(canvas);
    canvas.style.backgroundColor = "#CCFFC7";
}

