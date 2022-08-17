//this place is export MainMenu and load all data.
import BackGround from "../backGround.js";
import Keys from "../keys.js";
import MoveKey from "../MoveKey.js";
//MainMenu load many resource.
export default class MainMenu extends Phaser.Scene {
    constructor() {
        super(Keys.Scene.mainMenu);
        this.textSets = [];
        this.texts = [];
        this.selected = 0;
        this.Phase1 = [];
        this.Phase2 = [];
        this.Phase1RND = [];
        this.Phase2RND = [];
        this.shakePower = 30;
    }
    BackGround;
    shakePower;
    textSets;
    cursors;
    zKey;
    selector;
    texts;
    title;
    selected;
    AttackOrders;
    Phase1;
    Phase2;
    Phase1RND;
    Phase2RND;
    config;
    rainBone;
    preload() {
        /**load game data. */
        const ARGARRAY = [
            [Keys.Image.heart, "image/heart/heart.png"],
            [Keys.Image.break, "image/heart/breakedheart.png"],
            [Keys.Image.block, "image/battlezone/whiteblock.png"],
            [Keys.Image.HPfont, "image/commands/HP.png"],
            [Keys.Image.KRfont, "image/commands/KR.png"],
            [Keys.Image.speech, "image/sans/speechbubble.png"],
            [Keys.Sheet.fight, "image/commands/fight.png",
                { frameWidth: 112, frameHeight: 44 }],
            [Keys.Sheet.act, "image/commands/act.png",
                { frameWidth: 112, frameHeight: 44 }],
            [Keys.Sheet.item, "image/commands/item.png",
                { frameWidth: 112, frameHeight: 44 }],
            [Keys.Sheet.mercy, "image/commands/Mercy.png",
                { frameWidth: 112, frameHeight: 44 }],
            [Keys.Image.target, "image/commands/target.png"],
            [Keys.Sheet.tagBar, "image/commands/targetBar.png", { frameWidth: 16, frameHeight: 131 }],
            [Keys.Image.bone, "image/attack/bone.png", { frameWidth: 12, frameHeight: 6 }],
            [Keys.Image.particleBone, "image/attack/bone.png"],
            [Keys.Sheet.shard, "image/heart/shard.png", "image/heart/shard_atlas.json"],
            [Keys.Sheet.attacked, "image/commands/strike.png", "image/commands/strike_atlas.json"],
            [Keys.Sheet.sansHead, "image/sans/head.png", "image/sans/head_atlas.json"],
            [Keys.Sheet.sansTorso, "image/sans/torsoes.png", "image/sans/torsoes_atlas.json"],
            [Keys.Sheet.sansLeg, "image/sans/leg.png"],
            [Keys.Sheet.sansSweet, "image/sans/sweet.png", "image/sans/sweet_atlas.json"],
            [Keys.Sheet.blaster, "image/gasterblaster/gasterblaster.png", "image/gasterblaster/gasterblaster_atlas.json"],
            [Keys.Sheet.platForm, "image/platform/Platform1.png", "image/platform/platform1_atlas.json"],
            [Keys.Audio.battleText, "media/battletext.ogg"],
            [Keys.Audio.sansText, "media/SansSpeak.ogg"],
            [Keys.Audio.cursor, "media/MenuCursor.ogg"],
            [Keys.Audio.select, "media/MenuSelect.ogg"],
            [Keys.Audio.fight, "media/PlayerFight.ogg"],
            [Keys.Audio.heal, "media/PlayerHeal.ogg"],
            [Keys.Audio.damage, "media/PlayerDamaged.ogg"],
            [Keys.Audio.shatter, "media/HeartShatter.ogg"],
            [Keys.Audio.split, "media/HeartSplit.ogg"],
            [Keys.Audio.BGM, "media/mus_zz_megalovania.ogg"],
            [Keys.Audio.blast0, "media/GasterBlast.ogg"],
            [Keys.Audio.blast1, "media/GasterBlast2.ogg"],
            [Keys.Audio.blaster, "media/GasterBlaster.ogg"],
            [Keys.Audio.slam, "media/Slam.ogg"],
            [Keys.Audio.warning, "media/Warning.ogg"],
            [Keys.Audio.boneStab, "media/BoneStab.ogg"],
            [Keys.Audio.ding, "media/Ding.ogg"],
            [Keys.Audio.flash, "media/Flash.ogg"]
        ];
        //load system.
        for (const ARGS of ARGARRAY) {
            switch (ARGS[1].slice(-3)) {
                case "ogg":
                    this.load.audio(ARGS[0], ARGS[1]);
                    break;
                case "png":
                    if (ARGS[2]) {
                        if (typeof ARGS[2] === "string") {
                            if (ARGS[2].slice(-4) === "json") {
                                this.load.atlas(ARGS[0], ARGS[1], ARGS[2]);
                            }
                        }
                        else {
                            this.load.spritesheet(ARGS[0], ARGS[1], ARGS[2]);
                        }
                    }
                    else {
                        this.load.image(ARGS[0], ARGS[1]);
                    }
                    break;
                case "xml":
                    this.load.xml(ARGS[0], ARGS[1]);
                    break;
                default: {
                    break;
                }
            }
        }
        this.load.json("menutext", "data/menutext.json");
        this.load.json(Keys.Json.attack, "data/attacks/attackloader.json");
    }
    create(config) {
        this.sound.stopAll();
        this.BackGround = new BackGround(this);
        this.AttackOrders = this.cache.json.get(Keys.Json.attack);
        for (let index = 0; index < this.AttackOrders.Phase1.length; index++) {
            const element = this.AttackOrders.Phase1[index];
            if (typeof element === "string" && element.slice(-4) === "json") {
                this.load.json(element, Keys.preFix + element);
                this.Phase1[index] = element;
            }
            else {
                console.error("error attack name in" + element);
            }
        }
        for (let index = 0; index < this.AttackOrders.Phase2.length; index++) {
            const element = this.AttackOrders.Phase2[index];
            if (typeof element === "string" && element.slice(-4) === "json") {
                this.load.json(element, Keys.preFix + element);
                this.Phase2[index] = element;
            }
            else {
                console.error("error attack name in" + element);
            }
        }
        for (let index = 0; index < this.AttackOrders.Phase1RND.length; index++) {
            const element = this.AttackOrders.Phase1RND[index];
            if (typeof element === "string" && element.slice(-4) === "json") {
                this.load.json(element, Keys.preFix + element);
                this.Phase1RND[index] = element;
            }
            else {
                console.error("error attack name in" + element);
            }
        }
        for (let index = 0; index < this.AttackOrders.Phase2RND.length; index++) {
            const element = this.AttackOrders.Phase2RND[index];
            if (typeof element === "string" && element.slice(-4) === "json") {
                this.load.json(element, Keys.preFix + element);
                this.Phase2RND[index] = element;
            }
            else {
                console.error("error attack name in" + element);
            }
        }
        this.load.start();
        this.tweens.add({
            targets: this.cameras.main,
            props: {
                scrollY: `+=${this.shakePower}`
            },
            duration: 2500,
            repeat: -1,
            yoyo: true,
            ease: "Quad.easeInOut"
        });
        this.textSets = this.cache.json.get("menutext").textSets;
        this.cursors = new MoveKey(this);
        this.selector = this.add.image(190, 115, Keys.Image.heart);
        this.selector.setTint(0xff0000);
        this.config = config;
        this.config.Phase1 = this.Phase1;
        this.config.Phase1RND = this.Phase1RND;
        this.config.Phase2 = this.Phase2;
        this.config.Phase2RND = this.Phase2RND;
        this.zKey = this.input.keyboard.addKey("Z");
        for (const ARGS of this.textSets) {
            this.texts.push(this.add.text(ARGS[0], ARGS[1], ARGS[2], ARGS[3]).setScale(0.5));
        }
        this.add.text(this.scale.width / 2, this.scale.height / 4, "Hard Mode Sans Fight", {
            fontFamily: "battlefont",
            fontSize: "60px"
        }).setOrigin(0.5);
        this.title = this.add.text(this.scale.width, this.scale.height, "    version: not ready", {
            fontFamily: "battlefont",
            fontSize: "20px"
        }).setOrigin(1);
    }
    update() {
        this.BackGround.update();
        if (this.cursors.upIsJustDown) {
            this.selected <= 0 || this.selected--;
            this.sound.play(Keys.Audio.cursor);
        }
        if (this.cursors.downIsJustDown) {
            this.selected >= this.textSets.length - 1 || this.selected++;
            this.sound.play(Keys.Audio.cursor);
        }
        if (Phaser.Input.Keyboard.JustDown(this.zKey)) {
            switch (this.selected) {
                case 0:
                    this.config.single = false;
                    this.config.singleAttack = undefined;
                    this.scene.start(Keys.Scene.battleScene, this.config);
                    break;
                case 1:
                    this.scene.start(Keys.Scene.singleSelect, this.config);
                    break;
                case 2:
                    this.scene.start(Keys.Scene.setting, this.config);
                    break;
            }
            this.sound.play(Keys.Audio.select);
        }
        ;
        this.selector.setPosition(this.textSets[this.selected][0] - 30, this.textSets[this.selected][1] + 15);
    }
}
//# sourceMappingURL=MainMenu.js.map