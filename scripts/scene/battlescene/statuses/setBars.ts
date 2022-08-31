import type Statuses from "./Statuses.js";
export default function setBars(this: Statuses): void {
    this.HpBar.setScale((this.hp - this.kr) / this.barLength, 1.3);
    this.KrBar.setScale(this.kr / this.barLength, 1.3);

    this.KrBar.setPosition((this.HpBar.x + (this.HpBar.displayWidth / 2)) + (this.KrBar.displayWidth / 2), 0);

    this.HpBar.setPosition((this.HpBackGround.x - this.HpBackGround.displayWidth / 2) + (this.HpBar.displayWidth / 2), 0);
}