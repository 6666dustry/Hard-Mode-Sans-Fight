//this place is export MainMenu and load all data.
import BackGround from "../BackGround.js";
import Keys from "../keys.js";
import MoveKey from "../MoveKey.js";
import { BattleStartConfig } from "../Types.js";
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
    BackGround!: BackGround;
    shakePower: number;
    textSets: any[];
    cursors!: MoveKey;
    zKey!: Phaser.Input.Keyboard.Key;
    selector!: Phaser.GameObjects.Image;
    texts: Phaser.GameObjects.Text[];
    title!: Phaser.GameObjects.Text;
    selected: 0 | 1 | 2;
    AttackOrders!: BattleStartConfig;
    Phase1: BattleStartConfig["Phase1"];
    Phase2: BattleStartConfig["Phase2"];
    Phase1RND: BattleStartConfig["Phase1RND"];
    Phase2RND: BattleStartConfig["Phase2RND"];
    config!: BattleStartConfig;
    rainBone!: Phaser.GameObjects.Particles.ParticleEmitterManager;
    preload(): void {
        let progress = this.add.graphics();
        let loading = this.add.text(320, 150, "loading...", {
            fontFamily: "battlefont",
            fontSize: "60px"
        }).setOrigin(0.5);
        let hsvWheel = Phaser.Display.Color.HSVColorWheel();
        this.load.on('progress', (value: number) => {

            progress.clear();
            progress.fillStyle(0xffffff, 1);

            if (hsvWheel) {

                const INDEX = Math.floor(value * hsvWheel.length - 1);
                if (INDEX >= 0) {

                    const RGB = hsvWheel[INDEX].r * 0xffff + hsvWheel[INDEX].g * 0xff + hsvWheel[INDEX].b;
                    loading.setTint(RGB);

                    //reverse.
                    const REVERSE_INDEX = (hsvWheel.length - 1) - INDEX;
                    const REVERSE_RGB = hsvWheel[REVERSE_INDEX].r * 0xffff + hsvWheel[REVERSE_INDEX].g * 0xff + hsvWheel[REVERSE_INDEX].b;

                    progress.fillStyle(0xffffff - REVERSE_RGB);
                }
            }

            progress.fillRect(0, 180, 640 * value, 60);
        });

        this.load.on('complete', function () {

            progress.destroy();
            loading.destroy();
        });

        this.load.image([{
            key: Keys.Image.heart,
            url: "image/heart/heart.png"
        },
        {
            key: Keys.Image.break,
            url: "image/heart/breakedheart.png"
        },
        {
            key: Keys.Image.block,
            url: "image/battlezone/whiteblock.png"
        },
        {
            key: Keys.Image.HPfont,
            url: "image/commands/HP.png"
        },
        {
            key: Keys.Image.KRfont,
            url: "image/commands/KR.png"
        },
        {
            key: Keys.Image.speech,
            url: "image/sans/speechbubble.png"
        },
        {
            key: Keys.Image.target,
            url: "image/commands/target.png"
        }, {
            key: Keys.Image.particleBone,
            url: "image/attack/bone.png"
        },
        {
            key: Keys.Sheet.sansLeg,
            url: "image/sans/leg.png",
        },]);


        this.load.spritesheet([{
            key: Keys.Sheet.fight,
            url: "image/commands/fight.png",
            frameConfig: { frameWidth: 112, frameHeight: 44 }
        },
        {
            key: Keys.Sheet.act,
            url: "image/commands/act.png",
            frameConfig: { frameWidth: 112, frameHeight: 44 }
        },
        {
            key: Keys.Sheet.item,
            url: "image/commands/item.png",
            frameConfig: { frameWidth: 112, frameHeight: 44 }
        },
        {
            key: Keys.Sheet.mercy,
            url: "image/commands/mercy.png",
            frameConfig: { frameWidth: 112, frameHeight: 44 }
        }, {
            key: Keys.Sheet.tagBar,
            url: "image/commands/targetBar.png",
            frameConfig: { frameWidth: 16, frameHeight: 131 }
        },
        {
            key: Keys.Image.bone,
            url: "image/attack/bone.png",
            frameConfig: { frameWidth: 12, frameHeight: 6 }
        }]);
        this.load.atlas([{
            key: Keys.Sheet.shard,
            textureURL: "image/heart/shard.png",
            atlasURL: "image/heart/shard_atlas.json",
        },
        {
            key: Keys.Sheet.attacked,
            textureURL: "image/commands/strike.png",
            atlasURL: "image/commands/strike_atlas.json",
        },
        {
            key: Keys.Sheet.sansHead,
            textureURL: "image/sans/head.png",
            atlasURL: "image/sans/head_atlas.json",
        },
        {
            key: Keys.Sheet.sansTorso,
            textureURL: "image/sans/torsoes.png",
            atlasURL: "image/sans/torsoes_atlas.json",
        },
        {
            key: Keys.Sheet.sansSweet,
            textureURL: "image/sans/sweet.png",
            atlasURL: "image/sans/sweet_atlas.json",
        },
        {
            key: Keys.Sheet.blaster,
            textureURL: "image/gasterblaster/gasterblaster.png",
            atlasURL: "image/gasterblaster/gasterblaster_atlas.json",
        },
        {
            key: Keys.Sheet.platForm,
            textureURL: "image/platform/Platform1.png",
            atlasURL: "image/platform/platform1_atlas.json",
        }]);

        this.load.audio([{
            key: Keys.Audio.battleText,
            url: "media/battletext.ogg"
        },
        {
            key: Keys.Audio.sansText,
            url: "media/SansSpeak.ogg"
        },
        {
            key: Keys.Audio.cursor,
            url: "media/MenuCursor.ogg"
        },
        {
            key: Keys.Audio.select,
            url: "media/MenuSelect.ogg"
        },
        {
            key: Keys.Audio.fight,
            url: "media/PlayerFight.ogg"
        },
        {
            key: Keys.Audio.heal,
            url: "media/PlayerHeal.ogg"
        },
        {
            key: Keys.Audio.damage,
            url: "media/PlayerDamaged.ogg"
        },
        {
            key: Keys.Audio.shatter,
            url: "media/HeartShatter.ogg"
        },
        {
            key: Keys.Audio.split,
            url: "media/HeartSplit.ogg"
        },
        {
            key: Keys.Audio.BGM,
            url: "media/You're Gonna Have A Bad Time - Megalovania (Undertale Remix).mp3"
        },
        {
            key: Keys.Audio.blast0,
            url: "media/GasterBlast.ogg"
        },
        {
            key: Keys.Audio.blast1,
            url: "media/GasterBlast2.ogg"
        },
        {
            key: Keys.Audio.blaster,
            url: "media/GasterBlaster.ogg"
        },
        {
            key: Keys.Audio.slam,
            url: "media/Slam.ogg"
        },
        {
            key: Keys.Audio.warning,
            url: "media/Warning.ogg"
        },
        {
            key: Keys.Audio.boneStab,
            url: "media/BoneStab.ogg"
        },
        {
            key: Keys.Audio.ding,
            url: "media/Ding.ogg"
        },
        {
            key: Keys.Audio.flash,
            url: "media/Flash.ogg"
        }]);

        this.load.json([{
            key: "menutext",
            url: "data/menutext.json"
        }, {
            key: Keys.Json.attack,
            url: "data/attacks/attackloader.json"
        }]);
    }
    create(config: BattleStartConfig): void {

        this.sound.stopAll();

        this.BackGround = new BackGround(this);

        this.AttackOrders = this.cache.json.get(Keys.Json.attack);

        //load attack data.
        for (let index = 0; index < this.AttackOrders.Phase1.length; index++) {
            const element = this.AttackOrders.Phase1[index];

            if (typeof element === "string" && element.slice(-4) === "json") {

                this.load.json(element, Keys.preFix + element);
                this.Phase1[index] = element;

            } else {
                console.error("error attack name in" + element);
            }
        }


        for (let index = 0; index < this.AttackOrders.Phase2.length; index++) {
            const element = this.AttackOrders.Phase2[index];

            if (typeof element === "string" && element.slice(-4) === "json") {

                this.load.json(element, Keys.preFix + element);
                this.Phase2[index] = element;

            } else {
                console.error("error attack name in" + element);
            }
        }

        for (let index = 0; index < this.AttackOrders.Phase1RND.length; index++) {
            const element = this.AttackOrders.Phase1RND[index];

            if (typeof element === "string" && element.slice(-4) === "json") {

                this.load.json(element, Keys.preFix + element);
                this.Phase1RND[index] = element;

            } else {
                console.error("error attack name in" + element);
            }
        }


        for (let index = 0; index < this.AttackOrders.Phase2RND.length; index++) {
            const element = this.AttackOrders.Phase2RND[index];

            if (typeof element === "string" && element.slice(-4) === "json") {

                this.load.json(element, Keys.preFix + element);
                this.Phase2RND[index] = element;

            } else {
                console.error("error attack name in" + element);
            }
        }


        this.load.start();



        this.tweens.add({
            targets: this.cameras.main,
            props: {
                scrollY: `+=${ this.shakePower }`
            },
            duration: 2500,
            repeat: -1,
            yoyo: true,
            ease: "Quad.easeInOut"
        }
        );



        this.textSets = this.cache.json.get("menutext").textSets;
        this.cursors = new MoveKey(this);
        this.selector = this.add.image(190, 115, Keys.Image.heart);
        this.selector.setTint(0xff0000);


        this.config = config || {};

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


        this.title = this.add.text(this.scale.width, this.scale.height, "    version: not ready (beta)", {
            fontFamily: "battlefont",
            fontSize: "20px"
        }).setOrigin(1);
    }
    update(): void {
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
        };

        this.selector.setPosition(this.textSets[this.selected][0] - 30, this.textSets[this.selected][1] + 15);
    }
}