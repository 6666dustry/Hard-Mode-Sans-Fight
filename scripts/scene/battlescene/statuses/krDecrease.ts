import type Statuses from "./Statuses.js";
export default function krDecrease(this: Statuses): void {

    if (this.hp <= 1) {
        this.kr = 0;
    } else {
        if (this.kr >= this.hp) {
            this.kr = this.hp - 1;
        }

        if (this.kr > 0) {
            this.kr--;
            this.hp--;
            this.hpText.setText(`${ this.hp } / ${ this.maxHp }`).setTint(0xff00ff);

        }
    }

    this.setDisplay();

    this.setBars();
    const WAIT: number =
        this.kr > 30 ? 200 :
            this.kr > 20 ? 400 :
                this.kr > 10 ? 600 : 800;
    this.scene.time.delayedCall(WAIT, this.krDecrease, undefined, this);
}