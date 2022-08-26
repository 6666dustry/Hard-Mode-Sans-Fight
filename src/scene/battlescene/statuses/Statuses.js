import Keys from "../../../keys.js";
import krDecrease from "./krDecrease.js";
import setBars from "./setBars.js";
import healHp from "./healHp.js";
import setSetting from "./setSettnig.js";
export default class Statuses extends Phaser.GameObjects.Container {
    /**
     * add hp bar and more.
     * @param scene battle scene reference.
     * @param OPERATOR operator reference.
     */
    constructor(scene, OPERATOR, y) {
        super(scene, 320, y);
        this.director = OPERATOR;
        this.hp = 92;
        this.kr = 0;
        this.maxHp = 92;
        this.barSize = 15;
        this.takeDamageSpeed = 2;
        this.noTakeDamage = false;
        this.takeKr = 4;
        this.damageCounter = 0;
        this.takenDamage = false;
        this.HpBar = this.scene.add.image(0, 0, Keys.Image.block);
        this.HpBar.setTint(0xffff00);
        this.KrBar = this.scene.add.image(0, 0, Keys.Image.block);
        this.KrBar.setTint(0xff00ff);
        this.HpBackGround = this.scene.add.image(-15, 0, Keys.Image.block);
        this.HpBackGround.setTint(0xff0000);
        this.HpBackGround.setScale(this.maxHp / this.barSize, 1.3);
        this.HP = scene.add.image(-90, 0, Keys.Image.HPfont);
        this.KR = scene.add.image(60, 0, Keys.Image.KRfont);
        this.playerText = this.scene.add.text(-213, 0, "CHARA   LV19", {
            fontFamily: "gameHUB",
            fontSize: "128px"
        }).setScale(0.18).setOrigin(0.5, 0.5);
        this.hpText = this.scene.add.text(140, 0, `${this.hp} / ${this.maxHp}`, {
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
            this.KR
        ]);
        scene.add.existing(this);
        this.setDepth(Keys.Depth.statuses);
        this.krDecrease = krDecrease;
        this.setBars = setBars;
        this.healHp = healHp;
        this.setSetting = setSetting;
        scene.time.delayedCall(400, this.krDecrease, undefined, this);
    }
    director;
    hp;
    kr;
    maxHp;
    HpBar;
    KrBar;
    HpBackGround;
    hpText;
    playerText;
    HP;
    KR;
    takeDamageSpeed;
    takeKr;
    takenDamage;
    noTakeDamage;
    damageCounter;
    barSize;
    krDecrease;
    setBars;
    healHp;
    setSetting;
    setDisplay() {
        if (this.hp <= this.kr) {
            this.kr = this.hp - 1;
        }
        this.hpText.setText(`${this.hp} / ${this.maxHp}`);
        if (this.kr > 0) {
            this.hpText.setTint(0xff00ff);
        }
        else {
            this.hpText.setTint(0xffffff);
        }
    }
    takeDamage(takeKr) {
        if (this.director.Heart.Image.visible === true && !this.takenDamage) {
            this.takenDamage = true;
            if (this.damageCounter === this.takeDamageSpeed) {
                this.damageCounter = 0;
                if (this.hp - this.kr <= this.takeKr) {
                    this.hp--;
                    this.kr = this.hp - 1;
                    this.scene.sound.play(Keys.Audio.damage);
                    this.hpText.setText(`${this.hp} / ${this.maxHp}`).setTint(0xff00ff);
                }
                else {
                    this.hp--;
                    if (takeKr || takeKr == null) {
                        if (!this.scene.config.settings || !this.scene.config.settings.noKr) {
                            this.kr += this.takeKr;
                        }
                    }
                    this.setDisplay();
                    this.scene.sound.play(Keys.Audio.damage);
                }
            }
            else {
                this.damageCounter++;
            }
        }
    }
    update(time) {
        this.setBars();
        if (this.hp - this.kr < 60 && this.scene.config.settings && this.scene.config.settings.practice) {
            this.hp = this.maxHp;
            this.kr = 0;
            this.setDisplay();
            this.director.AttackLoader.retry();
        }
        if (this.hp <= 0 && this.kr <= 0) {
            this.scene.sound.stopByKey(Keys.Audio.BGM);
            const X = this.director.Heart.Image.x, Y = this.director.Heart.Image.y;
            this.scene.scene.start(Keys.Scene.gameOver, {
                x: X, y: Y,
                attack: this.scene.config
            });
        }
        if (this.noTakeDamage) {
            this.hp = this.maxHp;
            this.kr = 0;
            this.setDisplay();
        }
        if (this.takenDamage) {
            this.takenDamage = false;
        }
        else {
            this.damageCounter = this.takeDamageSpeed;
        }
    }
}
//# sourceMappingURL=Statuses.js.map