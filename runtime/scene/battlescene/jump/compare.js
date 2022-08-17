function compare(config) {
    let canJump = false;
    switch (config.type) {
        case "true":
            if (!!config.valueA) {
                canJump = true;
            }
            break;
        case "false":
            if (!config.valueA) {
                canJump = true;
            }
            break;
        case "zero":
            if (config.valueA === 0) {
                canJump = true;
            }
            break;
        case "notZero":
            if (config.valueA !== 0) {
                canJump = true;
            }
            break;
        default: {
            if (config.valueB != null) {
                switch (config.type) {
                    case "equal":
                    case "=":
                        if (config.valueA === config.valueB) {
                            canJump = true;
                        }
                        break;
                    case "notEqual":
                    case "!=":
                        if (config.valueA !== config.valueB) {
                            canJump = true;
                        }
                        break;
                    case "less":
                    case "<":
                        if (config.valueA < config.valueB) {
                            canJump = true;
                        }
                        break;
                    case "notLess":
                    case ">=":
                        if (!(config.valueA < config.valueB)) {
                            canJump = true;
                        }
                        break;
                    case "greater":
                    case ">":
                        if (config.valueA > config.valueB) {
                            canJump = true;
                        }
                        break;
                    case "notGreater":
                    case "<=":
                        if (!(config.valueA > config.valueB)) {
                            canJump = true;
                        }
                        break;
                    default:
                        console.error(`jump type is incorrect at ${this.director.AttackLoader.runAttackPos}
    name:${config.type}`);
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
        if (typeof config.to !== "number") {
            to = this.searchLabel(config.to);
        }
        else {
            to = config.to;
        }
        if (config.rel) {
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
export default compare;
//# sourceMappingURL=compare.js.map