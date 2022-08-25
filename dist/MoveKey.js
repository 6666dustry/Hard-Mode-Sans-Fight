/**
 * make w,a,s,d and cursorKeys.
 * @constructor
 */
export default class MoveKey {
    constructor(scene) {
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
    scene;
    w;
    a;
    s;
    d;
    up;
    left;
    down;
    right;
    space;
    shift;
    /**key of move to up. */
    upKeys;
    /**key of move to left. */
    leftKeys;
    /**key of move to down. */
    downKeys;
    /**key of move to right. */
    rightKeys;
    get upIsDown() {
        for (const iterator of this.upKeys) {
            if (iterator.isDown) {
                return true;
            }
        }
        return false;
    }
    get leftIsDown() {
        for (const iterator of this.leftKeys) {
            if (iterator.isDown) {
                return true;
            }
        }
        return false;
    }
    get downIsDown() {
        for (const iterator of this.downKeys) {
            if (iterator.isDown) {
                return true;
            }
        }
        return false;
    }
    get rightIsDown() {
        for (const iterator of this.rightKeys) {
            if (iterator.isDown) {
                return true;
            }
        }
        return false;
    }
    get upIsUp() {
        for (const iterator of this.upKeys) {
            if (iterator.isUp) {
                return true;
            }
        }
        return false;
    }
    get leftIsUp() {
        for (const iterator of this.leftKeys) {
            if (iterator.isUp) {
                return true;
            }
        }
        return false;
    }
    get downIsUp() {
        for (const iterator of this.downKeys) {
            if (iterator.isUp) {
                return true;
            }
        }
        return false;
    }
    get rightIsUp() {
        for (const iterator of this.rightKeys) {
            if (iterator.isUp) {
                return true;
            }
        }
        return false;
    }
    get upIsJustDown() {
        for (const iterator of this.upKeys) {
            if (Phaser.Input.Keyboard.JustDown(iterator)) {
                return true;
            }
        }
        return false;
    }
    get leftIsJustDown() {
        for (const iterator of this.leftKeys) {
            if (Phaser.Input.Keyboard.JustDown(iterator)) {
                return true;
            }
        }
        return false;
    }
    get downIsJustDown() {
        for (const iterator of this.downKeys) {
            if (Phaser.Input.Keyboard.JustDown(iterator)) {
                return true;
            }
        }
        return false;
    }
    get rightIsJustDown() {
        for (const iterator of this.rightKeys) {
            if (Phaser.Input.Keyboard.JustDown(iterator)) {
                return true;
            }
        }
        return false;
    }
    detectKeys(direction, config) {
        let key;
        switch (config.type) {
            case "up":
                key = "Up";
                break;
            case "down":
            default:
                key = "Down";
                break;
        }
        for (const iterator of this[`${direction}Keys`]) {
            if (config.just) {
                if (Phaser.Input.Keyboard[`Just${key}`](iterator)) {
                    return true;
                }
            }
            else {
                if (iterator[`is${key}`]) {
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
//# sourceMappingURL=MoveKey.js.map