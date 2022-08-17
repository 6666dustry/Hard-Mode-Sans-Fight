import loadAttack from "./loadAttack.js";
import attackPlayer from "./attackPlayer.js";
import catchOrder from "./catchAttack.js";
import catchRND from "./catchRND.js";
import retry from "./retry.js";
import startAttack from "./startAttack.js";
import endEnemyTurn from "./endEnemyTurn.js";
import endPlayerTurn from "./endPlayerTurn.js";
import endAttack from "./endAttack.js";
class AttackLoader {
    constructor(scene, director) {
        this.scene = scene;
        this.director = director;
        this.first = true;
        this.playerTurn = false;
        this.resting = false;
        this.attacked = false;
        this.playSingle = false;
        this.runAttackPos = 0;
        this.loadFilePos = 0;
        this.phase = 1;
        this.Loading = {};
        this.loadAttack = loadAttack;
        this.attackPlayer = attackPlayer;
        this.catchAttack = catchOrder;
        this.catchRND = catchRND;
        this.endPlayerTurn = endPlayerTurn;
        this.endEnemyTurn = endEnemyTurn;
        this.startAttack = startAttack;
        this.retry = retry;
        this.endAttack = endAttack;
    }
    scene;
    director;
    loadAttack;
    attackPlayer;
    catchAttack;
    endPlayerTurn;
    catchRND;
    startAttack;
    endEnemyTurn;
    retry;
    endAttack;
    SingleAttack;
    /**if true, player can use commands. */
    playerTurn;
    /**running attack position. */
    runAttackPos;
    /**load file position */
    loadFilePos;
    /**now turn`s all attacks. */
    loadingAttack;
    /** file name. */
    attackName;
    /**is now resting turn. */
    resting;
    phase;
    /**is player pushed fight command? */
    attacked;
    /**is first attack? */
    first;
    playSingle;
    /**playing attack functions. */
    Loading;
    /**end attack config. */
    endConfig;
    getPhaseLength() {
        switch (this.phase) {
            case 1:
                return this.scene.config.Phase1.length;
            case 2:
                return this.scene.config.Phase2.length;
            default:
                return this.scene.config.Phase1.length;
        }
    }
}
export default AttackLoader;
//# sourceMappingURL=attackLoader.js.map