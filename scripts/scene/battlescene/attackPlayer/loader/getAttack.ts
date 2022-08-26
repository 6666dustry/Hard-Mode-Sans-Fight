import { SingleAttack } from "../../../../Types.js";
import AttackLoader from "../attackLoader.js";
/**
 * return next attack.
 * @param this 
 * @param nextFile 
 * @returns 
 */
export default function getAttack(this: AttackLoader, nextFile?: boolean): SingleAttack[] {
    nextFile == null && (nextFile = true);
    let data: SingleAttack[];
    if (this.first) {
        this.first = false;
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