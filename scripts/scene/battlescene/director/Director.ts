import CombatZoneDirector from "../combatzone/CombatZoneDirector.js";
import Heart from "../heart/Heart.js";
import Commands from "../commands/Commands.js";
import Statuses from "../statuses/Statuses.js";
import Sans from "../sans/Sans.js";
import BattleScene from "scene/battlescene/BattleScene.js";
import BoneDirector from "../bone/BoneDirector.js";
import BlasterDirector from "../gasterblaster/BlasterDirector.js";
import Jumps from "../jump/Jumps.js";
import SansText from "../sanstext/SansText.js";
import Debug from "../debug/Debug.js";
import GameMath from "../math/GameMath.js";
import searchVariable from "./searchVariable.js";
import AudioPlayer from "../audio/AudioPlayer.js";
import PlatFormDirector from "../platForm/platformDirector.js";
import Keys from "../../../keys.js";
import { gameDebug } from "../../../main.js";
import Effect from "../effect/Effect.js";
import removeAll from "./removeAll.js";
import AttackLoader from "../attackPlayer/attackLoader.js";
import MoveKey from "../../../MoveKey.js";
import startGame from "./startGame.js";
type key = Phaser.Input.Keyboard.Key;
/**
 * battle scene's operating system.
 */
export default class Director {
    /**
     * 
     * @param scene BattleScene reference.
     */
    constructor(scene: BattleScene, cursors: MoveKey, xKey: key, zKey: key) {
        this.cursors = cursors;
        this.xKey = xKey;
        this.zKey = zKey;
        this.scene = scene;
        this.Sans = new Sans(scene, 320, 170, this);
        this.SansText = new SansText(scene, 490, 140, zKey, this);
        this.heartCol = 1;

        this.AttackLoader = new AttackLoader(scene, this);


        this.combatCol = 2;

        this.CombatzoneDirector = new CombatZoneDirector(scene, this.combatCol, this.heartCol, this);

        this.Statuses = new Statuses(scene, this, 410);

        this.Heart = new Heart(scene, this.heartCol, this);

        this.Commands = new Commands(scene, this, this.Heart, this.CombatzoneDirector, this.Statuses);

        this.boneCol = 3;
        this.BoneDirector = new BoneDirector(scene, this.boneCol, this);

        this.blasterCol = 4;
        this.BlasterDirector = new BlasterDirector(scene, this.blasterCol, this);

        this.PlatFormCol = 5;
        this.PlatFormDirector = new PlatFormDirector(scene, this.PlatFormCol, this, this.heartCol);
        this.Debug = new Debug(scene, this);


        this.Debug.setMode(gameDebug);


        this.Jumps = new Jumps(this);

        this.GameMath = new GameMath(scene, this);

        this.AudioPlayer = new AudioPlayer(scene, this);

        this.Effect = new Effect(scene, this);

        this.Statuses.setSetting(this.scene.config.settings || {});

        this.searchVariable = searchVariable;
        this.removeAll = removeAll;
        this.startGame = startGame;
    }
    readonly scene: BattleScene;
    readonly Heart: Heart;
    /**heart collide category. */
    readonly heartCol: number;
    /**combat zone collide category.*/
    readonly combatCol: number;
    readonly CombatzoneDirector: CombatZoneDirector;
    readonly Commands: Commands;
    readonly Statuses: Statuses;
    readonly Sans: Sans;
    readonly SansText: SansText;
    readonly BoneDirector: BoneDirector;
    readonly boneCol: number;
    readonly BlasterDirector: BlasterDirector;
    readonly blasterCol: number;
    readonly Jumps: Jumps;
    readonly Debug: Debug;
    readonly GameMath: GameMath;
    readonly AudioPlayer: AudioPlayer;
    readonly PlatFormDirector: PlatFormDirector;
    readonly PlatFormCol: number;
    readonly Effect: Effect;
    readonly AttackLoader: AttackLoader;

    readonly cursors: MoveKey;
    readonly xKey: key;
    readonly zKey: key;
    readonly searchVariable: typeof searchVariable;
    readonly removeAll: typeof removeAll;
    readonly startGame: typeof startGame;
    update(time: number, fps: number): void {
        if (!this.scene) {
            return;
        }
        if (!this.AttackLoader.playerTurn) {
            this.Heart.update(this.cursors, time);
        } else {
            this.Commands.update(this.cursors, this.xKey, this.zKey);
        }

        this.CombatzoneDirector.update();
        this.Sans.update(time);
        this.Statuses.update(time);
        this.BoneDirector.update(time);
        this.BlasterDirector.update(time, fps);
        this.PlatFormDirector.update();
        this.Debug.update(time, fps);

        this.CombatzoneDirector.update(true);

        if (this.xKey.ctrlKey) {
            if (this.scene.config.single) {
                this.scene.scene.start(Keys.Scene.singleSelect, this.scene.config);
            } else {
                this.scene.scene.start(Keys.Scene.mainMenu, this.scene.config);
            }
        }
    }
} 