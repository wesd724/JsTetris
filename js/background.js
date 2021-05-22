import { canvas } from "./canvas.js";

export default function background () {
    document.body.appendChild(canvas);
    canvas.style.backgroundColor = "#F7C3D9";
}

