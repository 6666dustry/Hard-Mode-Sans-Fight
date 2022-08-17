/**
 * remove all bullets, reset counts and reset variables.
 * @param this
 */
function removeAll(continuePlay) {
    if (!continuePlay) {
        this.Jumps.init();
        this.GameMath.init();
    }
    this.BoneDirector.clear(false, true);
    this.BlasterDirector.clear(false, true);
    this.PlatFormDirector.clear(false, true);
}
export default removeAll;
//# sourceMappingURL=removeAll.js.map