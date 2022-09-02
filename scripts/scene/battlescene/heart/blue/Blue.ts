import BattleScene from "../../BattleScene.js";
import Base from "../../director/Base.js";
import Director from "../../director/Director.js";
import Heart from "../Heart.js";
import movement from "./movement.js";
import onGravity from "./onGravity.js";
import onJump from "./onJump.js";
import setCollisionGravity from "./setCollisionGravity.js";
import isFalling from "./isFalling.js";
export default class Blue extends Base(class { }) {
    constructor(scene: BattleScene, director: Director, heart: Heart) {
        super();
        this.BaseConstructor(scene, director);
        this.jumpTime = 0;
        this.jumping = false;
        this.jumped = false;
        this.canJump = false;

        this.Heart = heart;

        this.movement = movement;
        this.onGravity = onGravity;
        this.onJump = onJump;
        this.setCollisionGravity = setCollisionGravity;
    }
    jumped: boolean;
    jumping: boolean;
    jumpTime: number;
    canJump: boolean;
    Heart: Heart;
    readonly movement: typeof movement;
    readonly onGravity: typeof onGravity;
    readonly onJump: typeof onJump;
    readonly setCollisionGravity: typeof setCollisionGravity;
    public get isFalling(): boolean {
        return isFalling.call(this);
    }
    touching() {
        switch (this.Heart.gravityDirection) {
            case "down":
                this.canJump = this.Heart.collidingAt.bottom;
                break;
            case "up":
                this.canJump = this.Heart.collidingAt.top;
                break;
            case "left":
                this.canJump = this.Heart.collidingAt.left;
                break;
            case "right":
                this.canJump = this.Heart.collidingAt.right;
                break;
        }
    }
    notTouching() {
        this.canJump = false;
        if (!this.jumping) {
            this.jumpTime = 0;
        }
    }
}
