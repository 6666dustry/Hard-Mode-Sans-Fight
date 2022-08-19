import checkType from "../checkType.js";
export default function compare(config) {
    const DATA = checkType(config, {
        to: ["number", "string"],
        type: "string",
        valueA: "number",
        valueB: {
            type: "number",
            default: undefined
        },
        rel: {
            type: "boolean",
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);
    let canJump = false;
    switch (DATA.type) {
        case "true":
            if (!!DATA.valueA) {
                canJump = true;
            }
            break;
        case "false":
            if (!DATA.valueA) {
                canJump = true;
            }
            break;
        case "zero":
            if (DATA.valueA === 0) {
                canJump = true;
            }
            break;
        case "notZero":
            if (DATA.valueA !== 0) {
                canJump = true;
            }
            break;
        default: {
            if (DATA.valueB != null) {
                switch (DATA.type) {
                    case "equal":
                    case "=":
                        if (DATA.valueA === DATA.valueB) {
                            canJump = true;
                        }
                        break;
                    case "notEqual":
                    case "!=":
                        if (DATA.valueA !== DATA.valueB) {
                            canJump = true;
                        }
                        break;
                    case "less":
                    case "<":
                        if (DATA.valueA < DATA.valueB) {
                            canJump = true;
                        }
                        break;
                    case "notLess":
                    case ">=":
                        if (!(DATA.valueA < DATA.valueB)) {
                            canJump = true;
                        }
                        break;
                    case "greater":
                    case ">":
                        if (DATA.valueA > DATA.valueB) {
                            canJump = true;
                        }
                        break;
                    case "notGreater":
                    case "<=":
                        if (!(DATA.valueA > DATA.valueB)) {
                            canJump = true;
                        }
                        break;
                    default:
                        console.error(`jump type is incorrect at ${this.director.AttackLoader.runAttackPos}
    name:${DATA.type}`);
                        break;
                }
            }
            else {
                console.warn(`valueB is not defined at ${this.director.AttackLoader.runAttackPos}`);
                return false;
            }
        }
    }
    if (canJump) {
        let to;
        if (typeof DATA.to !== "number") {
            to = this.searchLabel(DATA.to);
        }
        else {
            to = DATA.to;
        }
        if (DATA.rel) {
            this.director.AttackLoader.runAttackPos += to;
        }
        else {
            this.director.AttackLoader.runAttackPos = to;
        }
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=compare.js.map