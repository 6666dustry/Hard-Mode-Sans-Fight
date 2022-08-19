
import {
    BlastersConfig,
    BlasterType,
    BonesConfig,
    BoneType,
    combatZoneConfig,
    combatzoneType,
    EnemyTextConfig,
    EnemyTextType,
    HeartConfig,
    HeartType,
    JumpsConfig,
    JumpsType,
    SansConfig,
    SansType,
    SingleAttack,
    GameMathType,
    GameMathConfig,
    AudioConfig,
    AudioType,
    PlatFormConfig,
    PlatFormType,
    EffectConfig,
    EffectType,
    EndTurn
} from "../../../Types.js";
import AttackLoader from "./attackLoader.js";
/**
   * deliver data to another module.
   */
export default function loadAttack(this: AttackLoader, attack: SingleAttack) {
    let noData = false;
    if (!attack) {
        console.error(`attack is not defined at ${ this.runAttackPos }`);
        this.endAttack({});
    }

    if (attack.category !== "endAttack" && attack.category !== "endattack") {
        if (!attack.data) {
            console.warn(`data is not defined at ${ this.runAttackPos }`);
        }

        if (!attack.type) {
            console.warn(`type is not defined at ${ this.runAttackPos }`);
        }
    }

    if (!noData) {


        const D = this.director;
        switch (attack.category) {
            case "combatzone":
            case "combatZone":
                D.CombatzoneDirector.router(
                    attack.data as combatZoneConfig,
                    attack.type as combatzoneType);
                break;

            case "heart":
                D.Heart.router(
                    attack.data as HeartConfig,
                    attack.type as HeartType);
                break;

            case "bone":
                D.BoneDirector.router(
                    attack.data as BonesConfig,
                    attack.type as BoneType);
                break;

            case "gasterblaster":
            case "blaster":
                D.BlasterDirector.router(
                    attack.data as BlastersConfig,
                    attack.type as BlasterType);
                break;

            case "sanstext":
                D.SansText.router(
                    attack.data as EnemyTextConfig,
                    attack.type as EnemyTextType);
                break;

            case "sans":
                D.Sans.router(
                    attack.data as SansConfig,
                    attack.type as SansType);
                break;

            case "jump":
                D.Jumps.router(
                    attack.data as JumpsConfig,
                    attack.type as JumpsType);
                break;
            case "math":
                D.GameMath.router(
                    attack.data as GameMathConfig,
                    attack.type as GameMathType);
                break;

            case "audio":
                D.AudioPlayer.router(
                    attack.data as AudioConfig,
                    attack.type as AudioType
                );
                break;

            case "platform":
                D.PlatFormDirector.router(
                    attack.data as PlatFormConfig,
                    attack.type as PlatFormType
                );
                break;

            case "effect":
                D.Effect.router(
                    attack.data as EffectConfig,
                    attack.type as EffectType);
                break;
            case "endAttack":
            case "endattack":
                this.endAttack(attack.data as EndTurn);
                break;

            default:
                console.warn(`category is not defined at ${ this.runAttackPos } `);
                break;
        }
    }

    if (attack.category === "jump" || attack.category === "endAttack" || attack.category === "endattack") {

    } else {
        this.runAttackPos++;
    }

    if (attack.category !== "endAttack" &&
        attack.category !== "endattack" &&
        attack.category !== "sanstext") {
        if (attack.category === "jump" && attack.wait && attack.wait > 0) {
            this.Loading.startAttack = this.scene.time.delayedCall(attack.wait, () => {
                this.startAttack();
            }) as typeof this.Loading.startAttack;
        } else
            this.startAttack();

    }
}