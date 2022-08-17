import Director from "./Director.js";
/**
 * remove all bullets, reset counts and reset variables.
 * @param this 
 */
function removeAll(this: Director, continuePlay?: boolean) {
    if (!continuePlay) {
        this.Jumps.init();
        this.GameMath.init();
    }

    this.BoneDirector.clear(false, true);
    this.BlasterDirector.clear(false, true);
    this.PlatFormDirector.clear(false, true);
}
export default removeAll;