import BattleScene from "../BattleScene.js";
import Director from "../director/Director.js";
import type { EndTurn, SingleAttack } from "../../../Types.js";
import loadAttack from "./loadAttack.js";
import catchOrder from "./catchAttack.js";
import catchRND from "./catchRND.js";
import retry from "./retry.js";
import startAttack from "./startAttack.js";
import endEnemyTurn from "./endEnemyTurn.js";
import endPlayerTurn from "./endPlayerTurn.js";
import endAttack from "./endAttack.js";
import getAttack from "./getAttack.js";
export default class AttackLoader {
    constructor(scene: BattleScene, director: Director) {
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
        this.endConfig = {};

        this.loadAttack = loadAttack;
        this.catchAttack = catchOrder;
        this.catchRND = catchRND;
        this.getAttack = getAttack;
        this.endPlayerTurn = endPlayerTurn;
        this.endEnemyTurn = endEnemyTurn;
        this.startAttack = startAttack;
        this.retry = retry;
        this.endAttack = endAttack;
    }
    readonly scene: BattleScene;
    readonly director: Director;
    readonly loadAttack: typeof loadAttack;
    readonly catchAttack: typeof catchOrder;
    readonly endPlayerTurn: typeof endPlayerTurn;
    readonly catchRND: typeof catchRND;
    readonly getAttack: typeof getAttack;
    readonly startAttack: typeof startAttack;
    readonly endEnemyTurn: typeof endEnemyTurn;
    readonly retry: typeof retry;
    readonly endAttack: typeof endAttack;
    SingleAttack!: SingleAttack;
    /**if true, player can use commands. */
    playerTurn: boolean;
    /**running attack position. */
    runAttackPos: number;
    /**load file position */
    loadFilePos: number;
    /**now turn`s all attacks. */
    loadingAttack!: SingleAttack[];
    /** file name. */
    attackName!: string;
    /**is now resting turn. */
    resting: boolean;
    phase: 1 | 2;
    /**is player pushed fight command? */
    attacked: boolean;
    /**is first attack? */
    first: boolean;
    playSingle: boolean;
    /**playing attack functions. */
    Loading: {
        loadAttack?: {
            [P in keyof Phaser.Time.TimerEvent]: P extends "callback" ? typeof loadAttack :
            Phaser.Time.TimerEvent[P]
        };
        startAttack?: {
            [P in keyof Phaser.Time.TimerEvent]: P extends "callback" ? typeof startAttack :
            Phaser.Time.TimerEvent[P]
        };
    };
    /**end attack config. */
    endConfig: EndTurn;
    getPhaseLength(): number {
        switch (this.phase) {
            case 1:
                return this.scene.config.Phase1.length;
            case 2:
                return this.scene.config.Phase2.length;
            default:
                return this.scene.config.Phase1.length;
        }
    }
    isPhaseEnd(): boolean {
        return (!this.first && (this.resting || this.loadFilePos + 1 >= this.getPhaseLength()));
    }
}