import GameMath from "./GameMath.js";

export default function init(this: GameMath) {
    for (const key in this.variables) {
        delete this.variables[key];
    }
}
