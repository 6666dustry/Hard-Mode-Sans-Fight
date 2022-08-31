import Keys from "../../../keys.js";
import type { bulletColor } from "../../../Types.js";
import type Bullet from "./bullet.js";
export default function setColorKey(this: Bullet, v: bulletColor, tints?: {
    setTint: (arg: number) => any;
}[]) {
    if (typeof v === "string") {
        switch (v) {
            case "white":
                this.color = 0;
                if (tints) {
                    this.setColor(Keys.Color.white);
                }
                break;
            case "blue":
                this.color = 1;
                if (tints) {
                    this.setColor(Keys.Color.blue);
                }
                break;
            case "orange":
                this.color = 2;
                if (tints) {
                    this.setColor(Keys.Color.orange);
                }
                break;
        }
    } else {
        this.color = Math.floor(v) % 3;
        switch (Math.floor(this.color) % 3) {
            case 0:
                if (tints) {
                    this.setColor(Keys.Color.white);
                }
                break;
            case 1:
                if (tints) {
                    this.setColor(Keys.Color.blue);
                }
                break;
            case 2:
                if (tints) {
                    this.setColor(Keys.Color.orange);
                }
                break;
        }
    }
}