import { Pos2 } from "../../../Types.js";
import PlatForm from "./platform.js";
import Keys from "../../../keys.js";
function setLength(this: PlatForm) {
    this.Zone.boxLength = this.platLength;
    this.Scaffold.boxLength = this.platLength;

    const ANG: number = this.angle;

    this.setAngle(0);

    const BODY: MatterJS.BodyType = this.body as MatterJS.BodyType;

    this.scene.matter.body.scale(
        BODY,
        this.platLength / this.oldLength,
        1);

    const CHANGED = this.platLength - this.oldLength;
    let move = new Phaser.Math.Vector2(0, CHANGED / 2);
    if (this.tweenAnchor !== "middle") {

        if (this.tweenAnchor === "right") {
            move.rotate(Phaser.Math.DegToRad(ANG + 90));
            this.x += move.x;
            this.y += move.y;

        } else {
            move.rotate(Phaser.Math.DegToRad(ANG + 270));
            this.x += move.x;
            this.y += move.y;
        }
    }
    this.setAngle(ANG);
}
function setAngle(this: PlatForm) {
    if (this.tweenAnchor !== "middle") {
        let move = new Phaser.Math.Vector2(this.x, this.y);
        let origin = new Phaser.Math.Vector2(this.x + this.platLength / 2, this.y);

        if (this.tweenAnchor === "left") {

            Phaser.Math.RotateAround(origin, this.x, this.y, Phaser.Math.DegToRad(this.oldAngle + 180));
            Phaser.Math.RotateAround(move, origin.x, origin.y, Phaser.Math.DegToRad(this.angle - this.oldAngle));
            this.setPosition(move.x, move.y);
        } else {
            Phaser.Math.RotateAround(origin, this.x, this.y, Phaser.Math.DegToRad(this.oldAngle));
            Phaser.Math.RotateAround(move, origin.x, origin.y, Phaser.Math.DegToRad(this.angle - this.oldAngle));
            this.setPosition(move.x, move.y);
        }
    }
}
/**
 * 
 * @param this 
 * @returns is Heart riding this and move with this? boolean
 */
export default function update(this: PlatForm) {
    if (!this.body) {
        return false;
    }

    //set tweened  state.
    if (this.scene.tweens.isTweening(this)) {

        if (this.platLength !== this.oldLength) {
            setLength.call(this);
        }


        if (this.angle !== this.oldAngle) {
            setAngle.call(this);
        }


        switch (this.color) {
            case 0:
                this.Zone.setTint(Keys.Color.green);
                break;
            case 1:
                this.Zone.setTint(Keys.Color.purple);
                break;
        }
    }
    if (this.spin) {
        this.setAngle(this.angle + this.spin);
    }

    if (this.speed) {

        if (this.speedAngle) {
            // speed is not zero,run these.
            let To = new Phaser.Math.Vector2(this.speed, 0);
            To.rotate(Phaser.Math.DegToRad(this.speedAngle));

            this.x += To.x;
            this.y += To.y;
        } else {

            this.x += this.speed;
        }
    }

    this.Zone.update();
    this.Scaffold.update();


    let moved: Pos2 = {
        x: this.x - this.oldPosition.x,
        y: this.y - this.oldPosition.y
    };

    this.MatterObject.setCollidesWith(0);
    let edge = this.director.Heart.Edge;

    Phaser.Math.RotateAround(edge, this.director.Heart.Image.x, this.director.Heart.Image.y, this.rotation);

    let angle = Phaser.Math.Angle.BetweenPointsY(
        { x: this.x, y: this.y }, edge
    );

    /**radians */
    let nowRot: number = -this.rotation;

    let left: number = nowRot - Math.PI / 2;

    let right: number = nowRot + Math.PI / 2;

    let canRide: boolean = false;
    //is heart can ride platform?
    if (!(angle >= Math.min(left, right) && angle <= Math.max(left, right))) {

        this.MatterObject.setCollidesWith(this.heartCol);

        canRide = true;
    }

    let rideAndMove = false;
    if (canRide) {

        //friction system.
        this.scene.matter.overlap(
            this.body, [this.scene.director.Heart.Image.body as MatterJS.BodyType], () => {
                if (this.color === 0) {


                    const FORCE = new Phaser.Math.Vector2(this.scene.director.Heart.Force);

                    const DIRECTION = Phaser.Math.Angle.BetweenPointsY({ x: 0, y: 0 }, FORCE);

                    //is riding?
                    if ((DIRECTION > Math.min(left, right) && DIRECTION < Math.max(left, right))) {
                        this.scene.director.Heart.setDirection();
                        this.scene.director.Heart.Image.x += moved.x;
                        this.scene.director.Heart.Image.y += moved.y;
                        rideAndMove = true;
                        this.scene.director.Heart.Force = { x: 0, y: 0 };
                    }
                }
            }
        );
    }

    this.oldPosition = {
        x: this.x, y: this.y
    };
    this.oldAngle = this.angle;
    this.oldLength = this.platLength;
    return rideAndMove;
}
