import checkType from "../../checkType.js";
export default function getPos(config) {
    const DATA = checkType(config, {
        left: {
            type: ["string", "boolean"],
            default: false
        },
        right: {
            type: ["string", "boolean"],
            default: false
        },
        top: {
            type: ["string", "boolean"],
            default: false
        },
        bottom: {
            type: ["string", "boolean"],
            default: false
        },
        width: {
            type: ["string", "boolean"],
            default: false
        },
        height: {
            type: ["string", "boolean"],
            default: false
        },
        centerX: {
            type: ["string", "boolean"],
            default: false
        },
        centerY: {
            type: ["string", "boolean"],
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