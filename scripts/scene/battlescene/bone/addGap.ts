import { BoneConfig, GapBoneConfig } from "../../../Types.js";
import BoneDirector from "./BoneDirector.js";

export default function addGap(this: BoneDirector, config: GapBoneConfig) {
    const X = config.x || 0,
        Y = config.y || 0;

    const PADDING = config.padding || 20;

    const LENGTH = config.length || 100;

    const TOP_LENGTH = config.topLength || 20;

    let BoneConfig: BoneConfig = {
        x: X,
        y: Y,
        length: TOP_LENGTH,
        angle: config.angle,
        speed: config.speed,
        speedAngle: config.speedAngle,
        anchor: config.anchor,
        tween: config.tween,
        lifetime: config.lifetime
    };
    this.addSingle(BoneConfig);
    let bottomPos = new Phaser.Math.Vector2(X, Y + PADDING + TOP_LENGTH);

    if (config.angle) {
        Phaser.Math.RotateAround(bottomPos, X, Y, Phaser.Math.DegToRad(config.angle));
    }

    BoneConfig.x = bottomPos.x;
    BoneConfig.y = bottomPos.y;
    BoneConfig.length = LENGTH - (PADDING + TOP_LENGTH);

    this.addSingle(BoneConfig);
}