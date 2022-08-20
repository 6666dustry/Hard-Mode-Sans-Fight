import GasterBlaster from "./GasterBlaster.js";

export default function update(this: GasterBlaster, time: number, delta: number) {

    this.Face.anims.update(time, delta);

    let facePos: Phaser.Geom.Point = new Phaser.Geom.Point(
        this.x + this.Face.x,
        this.y + this.Face.y + this.Face.displayHeight);

    facePos = Phaser.Math.RotateAround(facePos, this.x, this.y, Phaser.Math.DegToRad(this.angle));

    const X: number = facePos.x,
        Y: number = facePos.y,
        SIZE: Phaser.Scale.ScaleManager = this.scene.scale;

    if (this.state === "moving" || this.state === "readyBlast") {

    } else {

        const ANG: number = Phaser.Math.Angle.WrapDegrees(this.angle);
        const PADDING: number = Math.max(this.Face.displayWidth, this.Face.displayHeight);
        switch (ANG) {
            //case 0:

            //break;

            default:
                if (ANG >= 0) {
                    //90~180.
                    if (ANG >= 90 && (
                        SIZE.height < Y - PADDING ||
                        SIZE.width < X - PADDING)) {
                        this.stopped || this.stopMove();
                    } else if (
                        //0~90.
                        SIZE.width < X - PADDING ||
                        0 > Y + PADDING) {
                        this.stopped || this.stopMove();
                    }
                } else {
                    //0~-90.
                    if (ANG >= -90 && (
                        0 > X + PADDING ||
                        0 > Y + PADDING)) {
                        this.stopped || this.stopMove();

                    } else if (
                        //-90~-180.
                        0 > X + PADDING ||
                        SIZE.height < Y - PADDING) {
                        this.stopped || this.stopMove();
                    }
                }
                break;
        }



        if (this.state === "endBlast" && this.stopped) {
            this.removeAll(true);
            this.destroy();
        }
    }
}