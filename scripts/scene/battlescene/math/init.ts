import GameMath from "./GameMath.js";

function init(this: GameMath) {
    for (const key in this.variables) {
        delete this.variables[key];
    }
}
export default init;
