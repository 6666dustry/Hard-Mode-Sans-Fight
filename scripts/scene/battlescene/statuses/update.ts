import type Statuses from "./Statuses.js";
export default function update(this: Statuses, time: number): void {
    this.setBars();
    if (this.practice && this.hp - this.kr < this.practiceRetryHp) {
        this.hp = this.maxHp;
        this.kr = 0;
        this.setDisplay();
        this.director.AttackLoader.retry();
    }

    if (this.hp <= 0 && this.kr <= 0) {
        this.gameOver();
    }

    if (this.noTakeDamage) {
        this.hp = this.maxHp;
        this.kr = 0;
        this.setDisplay();
    }

    if (this.tookDamage) {
        this.tookDamage = false;
    } else {
        this.damageCounter = this.takeDamageSpeed;
    }
}