import { BoneConfig, MultiBoneConfig, MultiConfig, platformMultiConfig, PlatFormSingleConfig } from "../../Types.js";
import Bone from "./bone/bone.js";
import makeDeepCopy from "./makeDeepCopy.js";
import step from "./step.js";
export default function addMulti<Single extends BoneConfig | PlatFormSingleConfig, Type extends Bone["moveType"]>(this: {
    repeats: Phaser.Time.TimerEvent[];
    scene: Phaser.Scene;
    addSingle: (arg0: Single, arg1?: Type, arg2?: {
        [k: string]: boolean;
    }) => any;
}, data: Parameters<typeof this.addSingle>[0] & MultiConfig, type?: Parameters<typeof this.addSingle>[1]) {
    let copyData: MultiBoneConfig | platformMultiConfig = makeDeepCopy<Readonly<platformMultiConfig> | Readonly<MultiBoneConfig>>(data);
    copyData.count = copyData.count || 5;
    copyData.delay = copyData.delay || 0;
    if (copyData.delay && copyData.delay > 0) {
        this.repeats.push(this.scene.time.addEvent({
            callback: () => {
                this.addSingle(copyData as Single, type, {
                    step: true,
                    delay: true,
                    count: true,
                    startAt: true
                });
                if (copyData.step) {
                    step(copyData as any, copyData.step as any);
                }
            },
            callbackScope: this,
            args: [],
            repeat: copyData.count,
            delay: copyData.delay,
            startAt: copyData.startAt,
        }));
    } else {
        for (let index: number = 0; index < copyData.count; index++) {
            this.addSingle(copyData as Single, type, {
                step: true,
                delay: true,
                count: true,
                startAt: true
            });
            if (copyData.step) {
                step(copyData as any, copyData.step as any);
            }
        }
    }
}