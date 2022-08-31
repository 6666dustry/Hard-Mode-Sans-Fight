import type BattleScene from "scene/battlescene/BattleScene.js";
import type { combatZoneConfig, combatzoneType, MatterSp, } from "../../../../Types";
import type Director from "../../director/Director.js";
import type CombatZoneDirector from "../CombatZoneDirector.js";
import setRect from "./setRect.js";
import update from "./update.js";
import Keys from "../../../../keys.js";
import getPos from "./getPos.js";
import tweenRect from "./tweenRect.js";
import router from "../../router.js";
import { gameDebug } from "../../../../main.js";
export default class CombatZone extends Phaser.GameObjects.Group {
    /**
     * 
     * @param scene BattleScene reference.
     * @param collide CombatZone collide category reference.
     * @param heartCol heart collide category reference.
     * @param director Operator reference.
     */
    constructor(scene: BattleScene, collide: number, heartCol: number, director: Director, CombatZoneDirector: CombatZoneDirector) {
        super(scene);
        scene.add.existing(this);

        this.collide = collide;
        this.heartCol = heartCol;
        this.director = director;
        this.CombatZoneDirector = CombatZoneDirector;

        const MENU_RECT = CombatZoneDirector.menuRect;
        this.RectSize = new Phaser.Geom.Rectangle(MENU_RECT.x, MENU_RECT.y, MENU_RECT.dx - MENU_RECT.x, MENU_RECT.dy - MENU_RECT.y);

        this.moving = false;
        this.thickness = CombatZoneDirector.thickness;
        if (gameDebug) {
            this.RectBox = scene.add.graphics({
                x: 0,
                y: 0,
                lineStyle: { color: 0x0000ff, width: 1.5, alpha: 0.5 }
            });
            this.RectBox.setDepth(Keys.Depth.debug);
        }

        const IMAGE: string = Keys.Image.block;

        const KEY: ["up", "down", "left", "right"] = ["up", "down", "left", "right"];
        for (const iterator of KEY) {
            this[iterator] = scene.matter.add.sprite(0, 0, IMAGE);
            this.add(this[iterator]);
            this[iterator].setCollisionCategory(this.collide);
            this[iterator].setCollidesWith(this.heartCol);
            this[iterator].state = iterator;
            (this[iterator].body as MatterJS.BodyType).label = Keys.Label[iterator];
            this[iterator].setStatic(true);
            this[iterator].setFriction(0, 0, 0);
        }

        this.setDepth(Keys.Depth.combatzone);

        this.RenderZone = scene.add.renderTexture(this.RectSize.x, this.RectSize.y, this.RectSize.width, this.RectSize.height);

        this.RenderZone.setDepth(Keys.Depth.combatDisplay);
        this.RenderZone.camera.roundPixels = true;


        this.Background = scene.add.rectangle(this.RectSize.x, this.RectSize.y, this.RectSize.width, this.RectSize.height, 0x000000);
        this.Background.visible = false;
        this.Background.setOrigin(0);

        this.setRect = setRect;
        this.getPos = getPos;
        this.tweenRect = tweenRect;
        this.update = update;

        this.setRect(MENU_RECT, true);
    }
    /**combatzone collide category */
    readonly collide: number;
    /**heart collide category */
    readonly heartCol: number;
    readonly director: Director;
    readonly CombatZoneDirector: CombatZoneDirector;
    readonly RenderZone: Phaser.GameObjects.RenderTexture;
    right!: MatterSp;
    down!: MatterSp;
    left!: MatterSp;
    up!: MatterSp;
    moving: boolean;
    readonly RectSize: Phaser.Geom.Rectangle;
    RectBox?: Phaser.GameObjects.Graphics;
    readonly Background: Phaser.GameObjects.Rectangle;
    thickness: number;
    /**
     * set one combatzone stick.
     * @param config stick config.
     * @returns matter Sprite.
     */
    readonly setRect: typeof setRect;
    readonly getPos: typeof getPos;
    readonly update: typeof update;
    readonly tweenRect: typeof tweenRect;
    get boxX(): number {
        return this.RectSize.x;
    }

    set boxX(x: number) {
        this.RectSize.x = x;
    }
    get boxY(): number {
        return this.RectSize.y;
    }
    set boxY(y: number) {
        this.RectSize.y = y;
    }
    get boxDx(): number {
        return this.RectSize.right;
    }
    set boxDx(dx: number) {
        this.RectSize.right = dx;
    }
    get boxDy(): number {
        return this.RectSize.bottom;
    }
    set boxDy(dy: number) {
        this.RectSize.bottom = dy;
    }
    get midPoint(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.RectSize.centerX, this.RectSize.centerY);
    }
    /**
     * combatzone set operator.
     * @param config combatzone data. 
     * @param type zone set types.
     */
    router(config: combatZoneConfig, type: combatzoneType) {
        switch (type) {
            case "getPosition":
                type = "getPos";
                break;
        }
        router.call(this, config, type);
        return true;
    }
}