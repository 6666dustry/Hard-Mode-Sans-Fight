import { getCombatzonePos } from "../../../../Types.js";
import CombatZone from "./combatzone.js";

function getPos(this: CombatZone, config: getCombatzonePos) {
    const SET_TO = this.director.GameMath.variables;
    if (config.bottom) {
        SET_TO[config.bottom] = this.boxDy;
    }
    if (config.right) {
        SET_TO[config.right] = this.boxDx;
    }
    if (config.top) {
        SET_TO[config.top] = this.boxY;
    }
    if (config.left) {
        SET_TO[config.left] = this.boxX;
    }
    if (config.centerX) {
        SET_TO[config.centerX] = this.midPoint.x;
    }
    if (config.centerY) {
        SET_TO[config.centerY] = this.midPoint.y;
    }
    if (config.width) {
        SET_TO[config.width] = this.RectSize.width;
    }
    if (config.height) {
        SET_TO[config.height] = this.RectSize.height;
    }
}
export default getPos;