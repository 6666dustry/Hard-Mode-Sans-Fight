import Keys from "../../../keys.js";
/**
 * make sans anims.
 * @param scene
 */
function slamAnimMaker(scene) {
    const SPEED = 75;
    //up and down.
    scene.anims.create({
        key: Keys.Anim.downSlam,
        frames: [
            {
                key: Keys.Sheet.sansTorso,
                frame: "torsoupside1",
                duration: SPEED
            },
            {
                key: Keys.Sheet.sansTorso,
                frame: "torsoupside2",
                duration: SPEED
            },
            {
                key: Keys.Sheet.sansTorso,
                frame: "torsoupside3",
                duration: SPEED,
            },
        ],
    });
    //left and right.
    scene.anims.create({
        key: Keys.Anim.leftSlam,
        frames: [
            {
                key: Keys.Sheet.sansTorso,
                frame: "torsoside1",
                duration: SPEED
            },
            {
                key: Keys.Sheet.sansTorso,
                frame: "torsoside2",
                duration: SPEED
            },
        ]
    });
    //flash eye.
    scene.anims.create({
        key: Keys.Anim.flashEyes,
        frames: [
            {
                key: Keys.Sheet.sansHead,
                frame: "blueeye",
                duration: 50
            },
            {
                key: Keys.Sheet.sansHead,
                frame: "yelloweye",
                duration: 50
            }
        ],
        repeat: -1
    });
}
export default slamAnimMaker;
//# sourceMappingURL=slamAnimMaker.js.map