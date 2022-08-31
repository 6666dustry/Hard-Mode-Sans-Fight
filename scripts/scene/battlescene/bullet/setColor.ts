import type Bullet from "./bullet.js";
export default function setColor(this: Bullet, color: number) {
    for (const iterator of this.tints) {
        if (iterator) {
            iterator.setTint && iterator.setTint(color);
        }
    }
}