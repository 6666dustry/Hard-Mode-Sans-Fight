import { AllReadonly, BoneConfig, GapBoneConfig } from "../../../Types.js";
import checkType from "../checkType.js";
import BoneDirector from "./BoneDirector.js";

export default function addGap(this: BoneDirector, config: AllReadonly<GapBoneConfig>) {
    const DATA = checkType(config, {
        x: {
            type: "number",
            default: 0
        },
        y: {
            type: "number",
            default: 0
        },
        angle: {
            type: "number",
            default: 0
        },
        padding: {
            type: "number",
            default: 20
        },
        length: {
            type: "number",
            default: 100
        },
        topLength: {
            type: "number",
            default: 20
        },
        speed: {
            type: "number",
            default: 0
        },
        speedAngle: {
            type: "number",
            default: 0
        },
        anchor: {
            type: "object",
            default: {
                x: "bottom",
                y: "bottom"
            }
        },
        lifetime: {
            type: ["number", "boolean"],
            default: false
        },
        tween: {
            type: ["object", "boolean"],
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);
    const X = DATA.x || 0,
        Y = DATA.y || 0;

    const PADDING = DATA.padding || 20;

    const LENGTH = DATA.length || 100;

    const TOP_LENGTH = DATA.topLength || 20;

    let BoneConfig: BoneConfig = {
        x: X,
        y: Y,
        length: TOP_LENGTH,
        angle: DATA.angle,
        speed: DATA.speed,
        speedAngle: DATA.speedAngle,
        anchor: DATA.anchor,
        tween: DATA.tween,
        lifetime: DATA.lifetime
    };
    this.addSingle(BoneConfig);
    let bottomPos = new Phaser.Math.Vector2(X, Y + PADDING + TOP_LENGTH);

    if (DATA.angle) {
        Phaser.Math.RotateAround(bottomPos, X, Y, Phaser.Math.DegToRad(DATA.angle));
    }

    BoneConfig.x = bottomPos.x;
    BoneConfig.y = bottomPos.y;
    BoneConfig.length = LENGTH - (PADDING + TOP_LENGTH);

    this.addSingle(BoneConfig);
}