import type BattleScene from "../BattleScene.js";
import type Director from "../director/Director.js";
import Keys from "../../../keys.js";
import krDecrease from "./krDecrease.js";
import setBars from "./setBars.js";
import healHp from "./healHp.js";
import setSetting from "./setSettnig.js";
import update from "./update.js";
import takeDamage from "./takeDamage.js";
import gameOver from "./gameOver.js";
import Base from "../director/Base.js";
export default class Statuses extends
    Base(Phaser.GameObjects.Container)
{
    /**
     * add hp bar and more.
     * @param scene battle scene reference.
     * @param director operator reference.
     */
    constructor(scene: BattleScene, director: Director, y: number) {
        super(scene, 320, y, undefined);
        this.BaseConstructor(scene, director);
        this.hp = 92;
        this.kr = 0;
        this.maxHp = 92;
        this.practiceRetryHp = 50;
        this.barLength = 15;
        this.takeDamageSpeed = 2;
        this.takeKrAmount = 4;
        this.damageCounter = 0;
        this.noTakeDamage = false;
        this.tookDamage = false;
        this.noKr = false;
        this.practice = false;

        this.HpBar = this.scene.add.image(0, 0, Keys.Image.block);
        this.HpBar.setTint(0xffff00);

        this.KrBar = this.scene.add.image(0, 0, Keys.Image.block);
        this.KrBar.setTint(0xff00ff);

        this.HpBackGround = this.scene.add.image(-15, 0, Keys.Image.block);
        this.HpBackGround.setTint(0xff0000);
        this.HpBackGround.setScale(this.maxHp / this.barLength, 1.3);

        this.HP = scene.add.image(-90, 0, Keys.Image.HPfont);
        this.KR = scene.add.image(60, 0, Keys.Image.KRfont);

        this.playerText = this.scene.add.text(-213, 0, "CHARA   LV19", {
            fontFamily: "gameHUB",
            fontSize: "128px"
        }).setScale(0.18).setOrigin(0.5, 0.5);

        this.hpText = this.scene.add.text(140, 0, `${ this.hp } / ${ this.maxHp }`, {
            fontFamily: "gameHUB",
            fontSize: "128px"
        }).setScale(0.18).setOrigin(0.5, 0.5);

        this.add([
            this.hpText,
            this.playerText,
            this.HpBackGround,
            this.HpBar,
            this.KrBar,
            this.HP,
            this.KR]);

        scene.add.existing(this);
        this.setDepth(Keys.Depth.statuses);

        this.krDecrease = krDecrease;
        this.setBars = setBars;
        this.healHp = healHp;
        this.setSetting = setSetting;
        this.takeDamage = takeDamage;
        this.gameOver = gameOver;
        this.update = update;
        scene.time.delayedCall(400,
            this.krDecrease, undefined, this);
    }
    hp: number;
    kr: number;
    maxHp: number;
    practiceRetryHp: number;
    takeDamageSpeed: number;
    takeKrAmount: number;
    damageCounter: number;
    HpBar: Phaser.GameObjects.Image;
    KrBar: Phaser.GameObjects.Image;
    HpBackGround: Phaser.GameObjects.Image;
    hpText: Phaser.GameObjects.Text;
    playerText: Phaser.GameObjects.Text;
    HP: Phaser.GameObjects.Image;
    KR: Phaser.GameObjects.Image;
    tookDamage: boolean;
    noTakeDamage: boolean;
    noKr: boolean;
    practice: boolean;
    readonly barLength: number;
    readonly krDecrease: typeof krDecrease;
    readonly setBars: typeof setBars;
    readonly healHp: typeof healHp;
    readonly setSetting: typeof setSetting;
    readonly takeDamage: typeof takeDamage;
    readonly gameOver: typeof gameOver;
    setDisplay() {
        if (this.hp <= this.kr) {
            this.kr = this.hp - 1;
        }
        this.hpText.setText(
            `${ this.hp } / ${ this.maxHp }`
        );
        if (this.kr > 0) {
            this.hpText.setTint(0xff00ff);
        } else {
            this.hpText.setTint(0xffffff);
        }
    }

}