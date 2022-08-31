import type Statuses from "./Statuses.js";
import type BattleScene from "../BattleScene.js";
import Keys from "../../../keys.js";
export default function gameOver(this: Statuses) {
    this.scene.sound.stopByKey(Keys.Audio.BGM);
    const X: number = this.director.Heart.Image.x,
        Y: number = this.director.Heart.Image.y;
    this.scene.scene.start(Keys.Scene.gameOver, {
        x: X, y: Y,
        attack: (this.scene as BattleScene).config
    });
}