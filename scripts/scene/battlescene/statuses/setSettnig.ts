import type { BattleStartConfig } from "../../../Types.js";
import type Statuses from "./Statuses.js";

export default function setSetting(this: Statuses, config: NonNullable<BattleStartConfig["settings"]>) {
    if (config.easyMode) {
        this.takeDamageSpeed = 4;
        this.takeKrAmount = 2;
        this.HpBar.setTint(0x00ff00);
    } else {
        this.takeDamageSpeed = 2;
        this.takeKrAmount = 4;
    }

    if (config.infHP) {
        this.noTakeDamage = true;
    } else {
        this.noTakeDamage = false;
    }
    if (config.noKr) {
        this.noKr = true;
    }
    if (config.practice) {
        this.practice = true;
    }

    if (config.phase2) {
        this.director.AttackLoader.phase = 2;
    }
}