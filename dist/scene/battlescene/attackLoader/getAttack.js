/**
 * return next attack.
 * @param this
 * @param nextFile
 * @returns
 */
export default function getAttack(nextFile) {
    nextFile == null && (nextFile = true);
    let data;
    if (this.first) {
        this.first = false;
        data = this.catchAttack();
    }
    else {
        if (this.attacked) {
            this.attacked = false;
            if (nextFile) {
                this.loadFilePos++;
            }
            data = this.catchAttack();
        }
        else {
            data = this.catchRND();
        }
    }
    return data;
}
//# sourceMappingURL=getAttack.js.map