import { getHeartPos } from "../../../Types.js";
import Heart from "./Heart.js";

function getPosition(this: Heart, config: getHeartPos) {
    if (config.x) {
        this.director.GameMath.variables[config.x] = this.Image.x;
    }
    if (config.y) {
        this.director.GameMath.variables[config.y] = this.Image.y;
    }
}
export default getPosition;