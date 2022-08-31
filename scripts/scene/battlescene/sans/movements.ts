import Sans from "./Sans.js";

export function dancing(this: Sans, time: number) {
    this.head.setPosition(
        Math.sin(this.animX),
        Math.sin(this.animY) + this.headY + Math.cos(((time / this.animSpeed * 2) % Math.PI) * 2 - Math.PI) * 0.5);

    this.animX = ((time / this.animSpeed) % Math.PI) * 2 - Math.PI;
    this.animY = ((time / (this.animSpeed / 2)) % Math.PI) * 2 - Math.PI;

    this.torso.setPosition(Math.sin(this.animX), Math.sin(this.animY) * 1.3);
}
export function tired(this: Sans, time: number) {
    this.head.setPosition(
        0,
        this.torso.y + this.headY);
    this.animY = ((time / (this.animSpeed * 3.75)) % Math.PI) * 2 - Math.PI;
    this.torso.setPosition(0, Math.sin(this.animY) * 1.3);
}