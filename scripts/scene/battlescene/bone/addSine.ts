import type BoneDirector from "./BoneDirector.js";
import type { SineBoneConfig, BoneConfig, AllReadonly } from "../../../Types.js";
import step from "../step.js";
import checkType from "../checkType.js";
export default function addSine(this: BoneDirector, config: AllReadonly<SineBoneConfig>) {
    const DATA = checkType(config, {
        x: {
            type: "number",
            default: 0,
        },
        y: {
            type: "number",
            default: 0,
        },
        angle: {
            type: "number",
            default: 0,
        },
        speed: {
            type: "number",
            default: 0,
        },
        speedAngle: {
            type: "number",
            default: 0,
        },
        length: {
            type: "number",
            default: 150
        },
        frequency: {
            type: "number",
            default: 1
        },
        amplitude: {
            type: "number",
            default: 20
        },
        padding: {
            type: "number",
            default: 30
        },
        interval: {
            type: "number",
            default: 75
        },
        count: {
            type: "number",
            default: 20
        },
        step: {
            type: ["object", "boolean"],
            default: false
        },
        color: {
            type: ["number", "string"],
            default: 0
        },
        lifetime: {
            type: ["number", "boolean"],
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);
    //make copy.
    let copyData: Required<SineBoneConfig> = {
        x: DATA.x,
        y: DATA.y,
        length: DATA.length,
        speed: DATA.speed,
        speedAngle: DATA.speedAngle,
        angle: DATA.angle,
        frequency: DATA.frequency,
        amplitude: DATA.amplitude,
        padding: DATA.padding,
        interval: DATA.interval,
        count: DATA.count,
        step: DATA.step,
        color: DATA.color,
        lifetime: DATA.lifetime
    };
    let upBone: BoneConfig,
        downBone: BoneConfig;

    let wave: number = 0;

    let add: number;

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
            (upBone.length as number) += Math.sin(wave) * copyData.amplitude;
            (downBone.length as number) -= Math.sin(wave) * copyData.amplitude;
            if (downBone.angle) {
                let POS: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, Math.sin(wave) * copyData.amplitude);
                Phaser.Math.Rotate(POS, Phaser.Math.DegToRad(downBone.angle));
                (downBone.y as number) += POS.y;
                (downBone.x as number) += POS.x;
            } else {
                (downBone.y as number) += Math.sin(wave) * copyData.amplitude;
            }
            this.addSingle(upBone);
            this.addSingle(downBone);

            if (copyData.step) {
                step(copyData as any, copyData.step as any);
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