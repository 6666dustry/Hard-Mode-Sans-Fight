import BattleScene from "../BattleScene.js";
import Director from "../director/Director.js";
import type { EndTurn, jsonFile, SingleAttack } from "../../../Types.js";
import runAttack from "./runner/runAttack.js";
import catchOrder from "./loader/catchAttack.js";
import catchRND from "./loader/catchRND.js";
import retry from "./init/retry.js";
import startAttack from "./runner/startAttack.js";
import endEnemyTurn from "./init/endEnemyTurn.js";
import endPlayerTurn from "./init/endPlayerTurn.js";
import startGame from "./init/startGame.js";
import endAttack from "./init/endAttack.js";
import getAttack from "./loader/getAttack.js";
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

        this.runAttack = runAttack;
        this.catchAttack = catchOrder;
        this.catchRND = catchRND;
        this.getAttack = getAttack;
        this.endPlayerTurn = endPlayerTurn;
        this.endEnemyTurn = endEnemyTurn;
        this.startAttack = startAttack;
        this.retry = retry;
        this.endAttack = endAttack;
        this.startGame = startGame;
    }
    readonly scene: BattleScene;
    readonly director: Director;
    readonly runAttack: typeof runAttack;
    readonly catchAttack: typeof catchOrder;
    readonly endPlayerTurn: typeof endPlayerTurn;
    readonly catchRND: typeof catchRND;
    readonly getAttack: typeof getAttack;
    readonly startAttack: typeof startAttack;
    readonly endEnemyTurn: typeof endEnemyTurn;
    readonly retry: typeof retry;
    readonly endAttack: typeof endAttack;
    readonly startGame: typeof startGame;
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
    attackName!: jsonFile;
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
            [P in keyof Phaser.Time.TimerEvent]: P extends "callback" ? typeof runAttack :
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
    nextPhase() {
        this.first = true;
        this.phase++;
        this.loadFilePos = 0;
    }
}