import type { stepTypes } from "../../Types.js";

export default function stepType(stepFrom: number, stepTo: stepTypes
): number {
    if (typeof stepTo === "number") {
        return stepFrom + stepTo;

    } else if (typeof stepTo === "object") {
        if ("values" in stepTo) {
            return stepTo.values[Phaser.Math.Between(0, stepTo.values.length)];

        } else {
            //if ("max" in stepTo) {
            let add = 0;
            if (stepTo.add) {
                add = stepFrom;
            }

            if (stepTo.integer) {
                return Phaser.Math.Between(stepTo.min || 0, stepTo.max) + add;
            } else {
                return Phaser.Math.FloatBetween(stepTo.min || 0, stepTo.max) + add;
            }
            //W}
        }

    } else {
        console.error(`${ stepTo } is not number or object.`);

        return 0;
    }
}