import { stepTypes } from "../../Types.js";

export default function stepType(stepFrom: number, stepTo: stepTypes | number): number {
    if (typeof stepTo === "number") {
        return stepFrom + stepTo;
    }
    //if (stepTo.max) {
    let add = 0;
    if (stepTo.add) {
        add = stepFrom;
    }

    if (stepTo.integer) {
        return Phaser.Math.Between(stepTo.min || 0, stepTo.max) + add;
    } else {
        return Phaser.Math.FloatBetween(stepTo.min || 0, stepTo.max) + add;
    }
    // }
}