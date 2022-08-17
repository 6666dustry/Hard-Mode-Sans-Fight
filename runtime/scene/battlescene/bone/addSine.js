import step from "../step.js";
function addSine(data) {
    //make copy.
    let copyData = {
        x: data.x,
        y: data.y,
        length: data.length || 150,
        speed: data.speed || 0,
        speedAngle: data.speedAngle || 0,
        angle: data.angle || 0,
        frequency: data.frequency || 1,
        amplitude: data.amplitude || 20,
        padding: data.padding || 40,
        interval: data.interval || 75,
        count: data.count || 20,
        step: data.step,
        color: data.color || "white",
        lifetime: data.lifetime || Infinity
    };
    let upBone, downBone;
    let wave = 0;
    let add;
    this.repeats.push(this.scene.time.addEvent({
        callback: () => {
            upBone = {
                x: copyData.x,
                y: copyData.y,
                length: (copyData.length / 2) - (copyData.padding / 2),
                speed: copyData.speed || 0,
                speedAngle: copyData.speedAngle || 0,
                angle: copyData.angle || 0,
                lifetime: copyData.lifetime
            },
                downBone = {
                    x: copyData.x,
                    y: copyData.y + (copyData.length / 2) + (copyData.padding / 2),
                    length: (copyData.length / 2) - (copyData.padding / 2),
                    speed: copyData.speed || 0,
                    speedAngle: copyData.speedAngle || 0,
                    angle: copyData.angle || 0,
                    tweenAnchor: "bottom",
                    lifetime: copyData.lifetime
                };
            if (copyData.angle) {
                let rotate = new Phaser.Math.Vector2(downBone.x, downBone.y);
                Phaser.Math.RotateAround(rotate, copyData.x, copyData.y, Phaser.Math.DegToRad(copyData.angle));
                downBone.x = rotate.x;
                downBone.y = rotate.y;
            }
            upBone.length += Math.sin(wave) * copyData.amplitude;
            downBone.length -= Math.sin(wave) * copyData.amplitude;
            if (downBone.angle) {
                let POS = new Phaser.Math.Vector2(0, Math.sin(wave) * copyData.amplitude);
                Phaser.Math.Rotate(POS, Phaser.Math.DegToRad(downBone.angle));
                downBone.y += POS.y;
                downBone.x += POS.x;
            }
            else {
                downBone.y += Math.sin(wave) * copyData.amplitude;
            }
            this.addSingle(upBone);
            this.addSingle(downBone);
            if (copyData.step) {
                step(copyData, copyData.step);
            }
            add = copyData.interval * copyData.frequency;
            wave += add;
        },
        callbackScope: this,
        args: [],
        repeat: copyData.count,
        delay: copyData.interval,
    }));
}
export default addSine;
//# sourceMappingURL=addSine.js.map