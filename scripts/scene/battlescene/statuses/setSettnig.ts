import { BattleStartConfig } from "../../../Types.js";
import Statuses from "./Statuses.js";

export default function setSetting(this: Statuses, config: NonNullable<BattleStartConfig["settings"]>) {
    if (config.easyMode) {
        this.takeDamageSpeed = 4;
        this.takeKr = 2;
        this.HpBar.setTint(0x00ff00);
    } else {
        this.takeDamageSpeed = 2;
        this.takeKr = 4;
    }

    if (config.infHP) {
        this.noTakeDamage = true;
    } else {
        this.noTakeDamage = false;
    }

    if (config.phase2) {
        this.director.AttackLoader.phase = 2;
    }
}