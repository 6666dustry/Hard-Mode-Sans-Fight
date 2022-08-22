import { SingleAttack } from "../../../Types.js";
import AttackLoader from "./attackLoader.js";
/**
 * return next attack.
 * @param this 
 * @param nextFile 
 * @returns 
 */
export default function getAttack(this: AttackLoader, nextFile?: boolean): SingleAttack[] {
    nextFile == undefined && (nextFile = true);
    let data: SingleAttack[];
    if (this.first) {
        data = this.catchAttack();
    } else {
        if (this.attacked) {
            this.attacked = false;
            if (nextFile) {
                this.loadFilePos++;
            }
            data = this.catchAttack();
        } else {
            data = this.catchRND();
        }
    }
    return data;
}