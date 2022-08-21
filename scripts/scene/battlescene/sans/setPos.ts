import { AllReadonly, SetPositionConfig } from "../../../Types.js";
import checkType from "../checkType.js";
import Sans from "./Sans.js";

export default function setSansPosition(this: Sans, config: AllReadonly<SetPositionConfig>) {
    const DATA = checkType(config, {
        x: {
            type: ["number", "boolean"],
            default: false
        },
        y: {
            type: ["number", "string", "boolean"],
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);
    if (DATA.x !== false) {
        this.x = DATA.x;
    }
    if (DATA.y !== false) {
        if (DATA.y === "auto" || DATA.y === true) {
            this.yAuto = true;
        } else {
            this.yAuto = false;
            this.y = DATA.y || this.y;
        }
    }
}