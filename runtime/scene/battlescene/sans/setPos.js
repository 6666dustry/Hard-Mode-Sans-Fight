import checkType from "../checkType.js";
export default function setSansPosition(config) {
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
        }
        else {
            this.yAuto = false;
            this.y = DATA.y || this.y;
        }
    }
}
//# sourceMappingURL=setPos.js.map