import type Statuses from "./Statuses.js";
import Keys from "../../../keys.js";
export default function takeDamage(this: Statuses, takeKr?: boolean) {
    if (this.director.Heart.Image.visible === true && !this.tookDamage) {

        this.tookDamage = true;

        if (this.damageCounter === this.takeDamageSpeed) {

            this.damageCounter = 0;
            if (this.hp - this.kr <= this.takeKrAmount) {
                this.hp--;
                this.kr = this.hp - 1;
                this.scene.sound.play(Keys.Audio.damage);
                this.hpText.setText(
                    `${ this.hp } / ${ this.maxHp }`
                ).setTint(0xff00ff);

            } else {
                this.hp--;
                if ((takeKr || takeKr == null) && !this.noKr) {
                    this.kr += this.takeKrAmount;
                }

                this.setDisplay();

                this.scene.sound.play(Keys.Audio.damage);
            }
        } else {
            this.damageCounter++;
        }
    }
}