import type BattleScene from "../BattleScene.js";
import type { Image, BoxNinePatchConfig } from "../../../Types.js";
import Keys from "../../../keys.js";
import update from "./boxUpdate.js";

export default class BoxNinePatch extends Phaser.GameObjects.Container {
    constructor(scene: BattleScene, config: BoxNinePatchConfig) {
        super(scene, config.x, config.y);
        this.boxLength = config.length;
        //middle.
        this.Middle = scene.add.sprite(
            0, 0,
            Keys.Sheet.platForm, "middle");
        this.Middle.setScale(config.length / this.Middle.width, 1);
        this.add(this.Middle);

        //left.
        this.Left = scene.add.image(
            -(this.Middle.displayWidth / 2), 0,
            Keys.Sheet.platForm, "left");
        this.add(this.Left);

        //right.
        this.Right = scene.add.image(
            (this.Middle.displayWidth / 2), 0, Keys.Sheet.platForm, "right");
        this.add(this.Right);

        scene.add.existing(this);
        //set box color,
        if (config.tint) {
            this.Middle.setTint(config.tint);
            this.Left.setTint(config.tint);
            this.Right.setTint(config.tint);
        }

        this.update = update;
    }
    setTint(color: number) {
        this.Middle.setTint(color);
        this.Left.setTint(color);
        this.Right.setTint(color);
    }
    Middle: Image;
    Left: Image;
    Right: Image;
    boxLength: number;
}