import checkType from "../../checkType.js";
export default function getPos(config) {
    const DATA = checkType(config, {
        left: {
            type: ["number", "boolean"],
            default: false
        },
        right: {
            type: ["number", "boolean"],
            default: false
        },
        top: {
            type: ["number", "boolean"],
            default: false
        },
        bottom: {
            type: ["number", "boolean"],
            default: false
        },
        width: {
            type: ["number", "boolean"],
            default: false
        },
        height: {
            type: ["number", "boolean"],
            default: false
        },
        centerX: {
            type: ["number", "boolean"],
            default: false
        },
        centerY: {
            type: ["number", "boolean"],
            default: false
        },
        zone: {
            type: "string",
            default: "main"
        }
    }, this.director.AttackLoader.runAttackPos);
    const SET_TO = this.director.GameMath.variables;
    if (DATA.bottom) {
        SET_TO[DATA.bottom] = this.boxDy;
    }
    if (DATA.right) {
        SET_TO[DATA.right] = this.boxDx;
    }
    if (DATA.top) {
        SET_TO[DATA.top] = this.boxY;
    }
    if (DATA.left) {
        SET_TO[DATA.left] = this.boxX;
    }
    if (DATA.centerX) {
        SET_TO[DATA.centerX] = this.midPoint.x;
    }
    if (DATA.centerY) {
        SET_TO[DATA.centerY] = this.midPoint.y;
    }
    if (DATA.width) {
        SET_TO[DATA.width] = this.RectSize.width;
    }
    if (DATA.height) {
        SET_TO[DATA.height] = this.RectSize.height;
    }
}
//# sourceMappingURL=getPos.js.map