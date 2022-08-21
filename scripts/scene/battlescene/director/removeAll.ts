import Director from "./Director.js";
/**
 * remove all bullets, reset counts and reset variables.
 * @param this 
 */
export default function removeAll(this: Director, continuePlay?: boolean) {
    if (!continuePlay) {
        this.Jumps.init();
        this.GameMath.init();
    }
    this.Effect.removeAll();
    this.BoneDirector.clear(false, true);
    this.BlasterDirector.clear(false, true);
    this.PlatFormDirector.clear(false, true);
}