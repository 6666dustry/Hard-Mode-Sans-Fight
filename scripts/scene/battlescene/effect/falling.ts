import type { AllReadonly, FallingConfig } from "../../../Types.js";
import type Effect from "./Effect.js";
import checkType from "../checkType.js";
export default function falling(this: Effect, config: AllReadonly<FallingConfig>) {
    const DATA = checkType(config, {
        direction: {
            type: "string",
            default: "right"
        },
        duration: {
            type: "number",
            default: 1000
        },
        playAnim: {
            type: "boolean",
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);

    this.director.Heart.setGravity(
        {
            direction: DATA.direction,
            color: "falling",
        });

    this.director.Sans.falling = DATA.direction;

    if (DATA.playAnim) {
        this.director.Sans.setVisual({
            target: "torso",
            anim: `${ DATA.direction }Slam`,
            autoInit: true,
        });
    }

    this.fallingEnd = this.scene.time.delayedCall(
        DATA.duration, () => {
            this.director.Sans.falling = undefined;
            this.director.Sans.setVisual(
                {
                    frame: "default"
                }
            );
            this.director.Heart.setGravity(
                {
                    direction: DATA.direction,
                    color: "blue",
                });
        }, undefined, this
    );
}