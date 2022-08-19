import { AllReadonly, SetPositionConfig } from "../../../Types.js";
import checkType from "../checkType.js";
import Sans from "./Sans.js";

export default function setSansPosition(this: Sans, config: AllReadonly<SetPositionConfig>) {
    const DATA = checkType(config, {
        x: {
            type: "number",
            default: this.x
        },
        y: {
            type: ["number", "string", "boolean"],
            default: this.yAuto ? this.yAuto : this.y
        }
    }, this.director.AttackLoader.runAttackPos);

    this.x = DATA.x;
    if (DATA.y != null) {
        if (DATA.y === "auto" || DATA.y === true) {
            this.yAuto = true;
        } else {
            this.yAuto = false;
            this.y = DATA.y || this.y;
        }
    }
}