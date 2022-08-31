import type { BattleStartConfig } from "../../../Types.js";
import type Director from "./Director.js";
export default function startGame(this: Director, config: BattleStartConfig) {
    this.AttackLoader.startGame(config);
    this.Heart.Image.setCollisionCategory(this.heartCol);
}