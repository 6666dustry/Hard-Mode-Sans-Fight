import { AnchorConfig } from "../../Types.js";
import makeDeepCopy from "./makeDeepCopy.js";
/**
 * 
 * @param setFor 
 * @param makeCopy is need make deep copy? default is false.
 * @returns 
 */
export default function getAnchoredPos<Type extends AnchorConfig,>(setFor: Type, makeCopy?: boolean): Type {
    let result: Type;
    if (makeCopy) {
        result = makeDeepCopy(setFor) as Type;
    } else {
        result = setFor;
    }
    //set default angle.
    if (typeof result.angle !== "number") {
        result.angle = 0;
    }

    //set default anchor.
    if (!result.anchor) {
        result.anchor = {};
    }
    if (!result.anchor.x) {
        result.anchor.x = "bottom";
    }
    if (!result.anchor.y) {
        result.anchor.y = "bottom";
    }
    //set default origin.
    let origin = {
        x: {
            top: - result.width / 2,
            middle: 0,
            bottom: result.width / 2
        },
        y: {
            top: - result.height / 2,
            middle: 0,
            bottom: result.height / 2
        }
    };

    if (result.origin) {
        if (result.origin.width) {
            origin.x.top = result.width / 2 - result.origin.width;

            origin.x.middle = origin.x.top + result.origin.width / 2;
        }

        if (result.origin.height) {
            origin.y.top = result.height / 2 - result.origin.height;

            origin.y.middle = origin.y.top + result.origin.height / 2;
        }
    }

    let x: number = 0;

    if (typeof result.anchor.x === "string") {
        switch (result.anchor.x) {

            case "middle":
                x = result.x + origin.x.middle;
                break;
            case "bottom":
                x = result.x + origin.x.bottom;
                break;
            case "top":
                x = result.x + origin.x.top;
                break;
        }
    } else {

        x = result.x + result.anchor.x + origin.x.middle;
    }


    let y: number = 0;

    if (typeof result.anchor.y === "string") {

        switch (result.anchor.y) {
            case "middle":
                y = result.y + origin.y.middle;
                break;
            case "bottom":
                y = result.y + origin.y.bottom;
                break;
            case "top":
                y = result.y + origin.y.top;
                break;
        }
    } else {

        y = result.y + result.anchor.y + origin.y.middle;
    }


    let Pos: Phaser.Math.Vector2 = new Phaser.Math.Vector2(x, y);

    if (!(result.angle % 360 === 0)) {

        Pos = Phaser.Math.RotateAround(Pos, result.x, result.y,
            Phaser.Math.DegToRad(result.angle)
        );
    }

    result.x = Pos.x;
    result.y = Pos.y;
    return result;
}