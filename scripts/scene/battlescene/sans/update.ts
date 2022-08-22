import Sans from "./Sans.js";
/**
    * update image position.
    * @param time just time. in milliseconds.
    */
export default function update(this: Sans, time: number): void {
    if (this.yAuto) {
        this.setPosition(this.x, this.director.CombatzoneDirector.Zones.main.RectSize.y - (this.leg.y + this.leg.height / 2) - + 20);
    }

    if (this.slamming) {
        const MOVE = 4;
        switch (this.torso.frame.name as "torso" | "shrug" | "torsoside1" | "torsoside2" | "torsoupside1" | "torsoupside2" | "torsoupside3") {
            case "torsoside1":
                this.head.setPosition(MOVE, this.headY);
                this.torso.setPosition(MOVE, 0);
                break;
            case "torsoside2":
                this.head.setPosition(-MOVE, this.headY);
                this.torso.setPosition(-MOVE, 0);
                break;
            case "torsoupside1":
                this.head.setPosition(0, this.headY - MOVE / 2);
                this.torso.setPosition(0, -MOVE / 2);
                break;
            case "torsoupside3":
                this.head.setPosition(0, this.headY + MOVE / 2);
                this.torso.setPosition(0, MOVE / 2);
                break;
            default:
                this.head.setPosition(0, this.headY);
                this.torso.setPosition(0, 0);
                break;
        }
    } else {

        switch (this.state) {
            case "dancing":

                this.head.setPosition(
                    Math.sin(this.animX),
                    Math.sin(this.animY) + this.headY + Math.cos(((time / this.animSpeed * 2) % Math.PI) * 2 - Math.PI) * 0.5);

                this.animX = ((time / this.animSpeed) % Math.PI) * 2 - Math.PI;
                this.animY = ((time / (this.animSpeed / 2)) % Math.PI) * 2 - Math.PI;

                this.torso.setPosition(Math.sin(this.animX), Math.sin(this.animY) * 1.3);
                break;

            case "tired":
                this.head.setPosition(
                    0,
                    this.torso.y + this.headY);
                this.animY = ((time / (this.animSpeed * 3.75)) % Math.PI) * 2 - Math.PI;
                this.torso.setPosition(0, Math.sin(this.animY) * 1.3);
                break;

            case "stop":
                break;
        }
    }
    if (this.falling) {
        let changeHead = false;
        switch (this.falling) {
            case "down":
                if (this.y < 0) {
                    this.y = this.scene.game.scale.height;
                    changeHead = true;
                }
                this.y -= 10;
                break;
            case "up":
                if (this.y > this.scene.game.scale.height) {
                    this.y = 0;
                    changeHead = true;
                }
                this.y += 10;
                break;
            case "right":
                if (this.x < 0) {
                    this.x = this.scene.game.scale.width;
                    changeHead = true;
                }
                this.x -= 10;
                break;
            case "left":
                if (this.x > this.scene.game.scale.width) {
                    this.x = 0;
                    changeHead = true;
                }
                this.x += 10;
                break;
        }
        if (changeHead) {
            let frames = this.head.texture.getFrameNames();
            frames.forEach((value, index, array) => {
                if (value === "blueeye") {
                    let spliced = frames.splice(index, 1);
                }
            });
            frames.forEach((value, index, array) => {
                if (value === "yelloweye") {
                    let spliced = frames.splice(index, 1);
                }
            });

            this.head.setFrame(
                frames[Phaser.Math.Between(0, frames.length - 1)]
            );
        }
    }
    this.sweet.setPosition(this.head.x, this.head.y - 20);
};