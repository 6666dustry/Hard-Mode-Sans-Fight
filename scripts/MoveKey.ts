import { detectKeysConfig } from "./Types.js";
export default class MoveKey implements Phaser.Types.Input.Keyboard.CursorKeys {
    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.w = scene.input.keyboard.addKey("W");
        this.a = scene.input.keyboard.addKey("A");
        this.s = scene.input.keyboard.addKey("S");
        this.d = scene.input.keyboard.addKey("D");

        this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.upKeys = [this.up, this.w];
        this.leftKeys = [this.left, this.a];
        this.downKeys = [this.down, this.s];
        this.rightKeys = [this.right, this.d];

        this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.shift = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }
    readonly scene: Phaser.Scene;
    readonly w: Phaser.Input.Keyboard.Key;
    readonly a: Phaser.Input.Keyboard.Key;
    readonly s: Phaser.Input.Keyboard.Key;
    readonly d: Phaser.Input.Keyboard.Key;
    readonly up: Phaser.Input.Keyboard.Key;
    readonly left: Phaser.Input.Keyboard.Key;
    readonly down: Phaser.Input.Keyboard.Key;
    readonly right: Phaser.Input.Keyboard.Key;
    upKeys: Phaser.Input.Keyboard.Key[];
    leftKeys: Phaser.Input.Keyboard.Key[];
    downKeys: Phaser.Input.Keyboard.Key[];
    rightKeys: Phaser.Input.Keyboard.Key[];

    readonly space: Phaser.Input.Keyboard.Key;
    readonly shift: Phaser.Input.Keyboard.Key;

    public get upIsDown(): boolean {
        for (const iterator of this.upKeys) {
            if (iterator.isDown) {
                return true;
            }
        }
        return false;
    }
    public get leftIsDown(): boolean {
        for (const iterator of this.leftKeys) {
            if (iterator.isDown) {
                return true;
            }
        }
        return false;
    }
    public get downIsDown(): boolean {
        for (const iterator of this.downKeys) {
            if (iterator.isDown) {
                return true;
            }
        }
        return false;
    }
    public get rightIsDown(): boolean {
        for (const iterator of this.rightKeys) {
            if (iterator.isDown) {
                return true;
            }
        }

        return false;
    }

    public get upIsUp(): boolean {
        for (const iterator of this.upKeys) {
            if (iterator.isUp) {
                return true;
            }
        }

        return false;
    }
    public get leftIsUp(): boolean {
        for (const iterator of this.leftKeys) {
            if (iterator.isUp) {
                return true;
            }
        }

        return false;
    }
    public get downIsUp(): boolean {
        for (const iterator of this.downKeys) {
            if (iterator.isUp) {
                return true;
            }
        }

        return false;
    }
    public get rightIsUp(): boolean {
        for (const iterator of this.rightKeys) {
            if (iterator.isUp) {
                return true;
            }
        }
        return false;
    }

    public get upIsJustDown(): boolean {
        for (const iterator of this.upKeys) {
            if (Phaser.Input.Keyboard.JustDown(iterator)) {
                return true;
            }
        }
        return false;
    }
    public get leftIsJustDown(): boolean {
        for (const iterator of this.leftKeys) {
            if (Phaser.Input.Keyboard.JustDown(iterator)) {
                return true;
            }
        }
        return false;
    }
    public get downIsJustDown(): boolean {
        for (const iterator of this.downKeys) {
            if (Phaser.Input.Keyboard.JustDown(iterator)) {
                return true;
            }
        }
        return false;
    }
    public get rightIsJustDown(): boolean {
        for (const iterator of this.rightKeys) {
            if (Phaser.Input.Keyboard.JustDown(iterator)) {
                return true;
            }
        }
        return false;
    }
    detectKeys(direction: "up" | "left" | "down" | "right", config: detectKeysConfig) {
        let key: "Up" | "Down";
        switch (config.type) {
            case "up":
                key = "Up";
                break;
            case "down":
            default:
                key = "Down";
                break;
        }

        for (const iterator of this[`${ direction }Keys`]) {
            if (config.just) {
                if (Phaser.Input.Keyboard[`Just${ key }`](iterator)) {
                    return true;
                }
            } else {
                if (iterator[`is${ key }`]) {
                    return true;
                }
            }
        }
    }
    getDownKey() {
        let result = [];
        for (const key in this) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const element = this[key];
                if (element instanceof Phaser.Input.Keyboard.Key && element.isDown) {
                    result.push(key);
                }

            }
        }

        if (result.length <= 0) {
            result[0] = "nothing";
        }
        result;

        return result;
    }
}
