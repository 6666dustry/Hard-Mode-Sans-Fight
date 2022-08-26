import { BattleStartConfig, jsonFile } from "../../../../Types.js";
import AttackLoader from "../attackLoader.js";

export default function startGame(this: AttackLoader, config: BattleStartConfig) {
    if (config.single) {
        this.attackName = this.scene.config.singleAttack as jsonFile;


        this.loadingAttack = this.scene.cache.json.get(this.scene.config.singleAttack as jsonFile).attacks;
    }
    this.endPlayerTurn(config.single);
}