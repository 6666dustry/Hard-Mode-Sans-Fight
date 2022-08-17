import CircleBone from "./circleBone.js";
/**
 * 
 * @param this 
 * @returns padding of bones in degrees.
 */
function getPadding(this: CircleBone) {
    if (this.padding === "equal") {
        if (this.count === "single") {
            return 0;
        }
        return 360 / this.count;
    } else {
        return this.padding;
    }
}
export default getPadding;