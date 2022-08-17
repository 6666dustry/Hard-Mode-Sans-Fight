
import Bullet from "./bullet.js";

function getColorKey(this: Bullet): "white" | "blue" | "orange" {
    switch (Math.floor(this.color) % 3) {
        case 0:
            return "white";
        case 1:
            return "blue";
        case 2:
            return "orange";
        default:
            return "white";
    }
}
export default getColorKey;